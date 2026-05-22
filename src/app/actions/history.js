"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath, unstable_cache, revalidateTag } from "next/cache";

const DEFAULT_HISTORY = {
  id: "history",
  badge: "Our Journey",
  title: "History & Milestones",
  description: "Over five decades of powering industrial operations, scaling our services, and pioneering telemetry solutions.",
  items: [
    {
      id: "default-hist-1",
      icon: "History",
      year: "1973",
      description: "Indoturbine is founded, establishing the initial footprint for gas turbine repairs and services in the region.",
      order: 0,
    },
    {
      id: "default-hist-2",
      icon: "Building2",
      year: "1980",
      description: "Expands service portfolio with the opening of our first dedicated turbine overhaul and maintenance facility.",
      order: 1,
    },
    {
      id: "default-hist-3",
      icon: "Gem",
      year: "1987",
      description: "Partners with global industrial energy leaders to distribute and service high-capacity rotating machinery.",
      order: 2,
    },
    {
      id: "default-hist-4",
      icon: "Milestone",
      year: "1995",
      description: "Achieves ISO quality certifications and expands operations to key offshore oil and gas turbine projects.",
      order: 3,
    },
    {
      id: "default-hist-5",
      icon: "Rocket",
      year: "Today",
      description: "Pioneering real-time telemetry, IoT diagnostic sensors, and smart engineering maintenance systems.",
      order: 4,
    },
  ]
};

// Cached database query
const getCachedHistoryData = unstable_cache(
  async () => {
    try {
      const data = await prisma.historySection.findFirst({
        include: {
          items: {
            orderBy: {
              order: "asc",
            },
          },
        },
      });

      if (!data) {
        return DEFAULT_HISTORY;
      }

      return data;
    } catch (error) {
      console.error("Error fetching History data from DB:", error);
      return DEFAULT_HISTORY;
    }
  },
  ["history-section-data"],
  {
    tags: ["history-section"],
  }
);

/**
 * Fetches the History section data (cached).
 */
export async function getHistoryData() {
  return getCachedHistoryData();
}

/**
 * Updates the History section and its milestones.
 * Requires active session.
 */
export async function updateHistoryData(sectionData, itemsData) {
  try {
    // 1. Authenticate user
    const reqHeaders = await headers();
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    // 2. Validate section fields
    if (!sectionData.badge || !sectionData.title || !sectionData.description) {
      return { success: false, error: "Section badge, title, and description are required." };
    }

    // 3. Validate items
    if (!Array.isArray(itemsData) || itemsData.length === 0) {
      return { success: false, error: "At least one History milestone is required." };
    }

    for (const item of itemsData) {
      if (!item.year || !item.description || !item.icon) {
        return { success: false, error: "All milestones must have a year, description, and icon." };
      }
    }

    // Verify that the HistorySection model exists on the Prisma client
    if (!prisma.historySection) {
      console.error('Prisma historySection model is undefined. Available models:', Object.keys(prisma));
      return { success: false, error: 'Server misconfiguration: historySection model not available.' };
    }

    const section = await prisma.historySection.upsert({
      where: { id: "history" },
      update: {
        badge: sectionData.badge,
        title: sectionData.title,
        description: sectionData.description,
      },
      create: {
        id: "history",
        badge: sectionData.badge,
        title: sectionData.title,
        description: sectionData.description,
      },
    });

    // 5. Delete removed milestones
    const validItemIds = itemsData
      .map((item) => item.id)
      .filter((id) => id && !id.startsWith("default-hist-") && !id.startsWith("temp-"));

    await prisma.historyMilestone.deleteMany({
      where: {
        sectionId: "history",
        NOT: { id: { in: validItemIds } },
      },
    });

    // 6. Upsert current items
    const updatedItems = [];
    for (let i = 0; i < itemsData.length; i++) {
      const item = itemsData[i];
      const hasValidId = item.id && !item.id.startsWith("default-hist-") && !item.id.startsWith("temp-");
      const payload = {
        icon: item.icon,
        year: item.year,
        description: item.description,
        order: i,
        sectionId: "history",
      };
      let updatedItem;
      if (hasValidId) {
        updatedItem = await prisma.historyMilestone.update({
          where: { id: item.id },
          data: payload,
        });
      } else {
        updatedItem = await prisma.historyMilestone.create({
          data: payload,
        });
      }
      updatedItems.push(updatedItem);
    }

    const result = { ...section, items: updatedItems };

    // 7. Invalidate cache
    revalidateTag("history-section");
    revalidatePath("/");

    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating History data:", error);
    return { success: false, error: error.message || "Failed to update History section content." };
  }
}
