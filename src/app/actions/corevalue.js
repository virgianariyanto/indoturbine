"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath, unstable_cache, revalidateTag } from "next/cache";

const DEFAULT_SECTION = {
  id: "corevalues",
  badge: "Our Foundation",
  title: "Core Values",
  description: "The driving principles that guide our engineering precision, telemetry accuracy, and commitment to service quality.",
  items: [
    {
      id: "default-val-1",
      icon: "Lightbulb",
      title: "INNOVATION",
      description: "Leveraging state-of-the-art telemetry and cutting-edge digital technologies to continuously optimize gas turbine performance.",
      order: 0,
    },
    {
      id: "default-val-2",
      icon: "Handshake",
      title: "INTEGRITY",
      description: "Upholding the highest standards of safety, quality, and transparent compliance in all industrial operations.",
      order: 1,
    },
    {
      id: "default-val-3",
      icon: "Trophy",
      title: "EXCELLENCE",
      description: "Striving for zero downtime through engineering precision, prompt field service support, and meticulous maintenance.",
      order: 2,
    },
    {
      id: "default-val-4",
      icon: "Users",
      title: "TEAMWORK",
      description: "Collaborating closely with our partners, engineering staff, and operators to deliver seamless industrial energy services.",
      order: 3,
    },
  ]
};

// Cached database query
const getCachedCoreValueData = unstable_cache(
  async () => {
    try {
      const data = await prisma.coreValueSection.findFirst({
        include: {
          items: {
            orderBy: {
              order: "asc",
            },
          },
        },
      });
      
      if (!data) {
        return DEFAULT_SECTION;
      }
      
      return data;
    } catch (error) {
      console.error("Error fetching Core Value data from DB:", error);
      return DEFAULT_SECTION;
    }
  },
  ["corevalues-section-data"],
  {
    tags: ["corevalues-section"],
  }
);

/**
 * Fetches the Core Value section data (cached).
 */
export async function getCoreValueData() {
  return getCachedCoreValueData();
}

/**
 * Updates the Core Value section and its items.
 * Requires active session.
 */
export async function updateCoreValueData(sectionData, itemsData) {
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
      return { success: false, error: "At least one Core Value item is required." };
    }

    for (const item of itemsData) {
      if (!item.title || !item.description || !item.icon) {
        return { success: false, error: "All core value items must have a title, description, and icon." };
      }
    }

    // 4. Update section & items using a database transaction
    const result = await prisma.$transaction(async (tx) => {
      // Upsert the main section
      const section = await tx.coreValueSection.upsert({
        where: { id: "corevalues" },
        update: {
          badge: sectionData.badge,
          title: sectionData.title,
          description: sectionData.description,
        },
        create: {
          id: "corevalues",
          badge: sectionData.badge,
          title: sectionData.title,
          description: sectionData.description,
        },
      });

      // Keep track of the valid IDs in itemsData to delete any removed items
      const validItemIds = itemsData
        .map((item) => item.id)
        .filter((id) => id && !id.startsWith("default-val-") && !id.startsWith("temp-"));

      // Delete items no longer present
      await tx.coreValueItem.deleteMany({
        where: {
          sectionId: "corevalues",
          NOT: {
            id: { in: validItemIds },
          },
        },
      });

      // Upsert current items
      const updatedItems = [];
      for (let i = 0; i < itemsData.length; i++) {
        const item = itemsData[i];
        const hasValidId = item.id && !item.id.startsWith("default-val-") && !item.id.startsWith("temp-");

        const payload = {
          icon: item.icon,
          title: item.title,
          description: item.description,
          order: i,
          sectionId: "corevalues",
        };

        let updatedItem;
        if (hasValidId) {
          updatedItem = await tx.coreValueItem.update({
            where: { id: item.id },
            data: payload,
          });
        } else {
          updatedItem = await tx.coreValueItem.create({
            data: payload,
          });
        }
        updatedItems.push(updatedItem);
      }

      return {
        ...section,
        items: updatedItems,
      };
    });

    // 5. Invalidate cache
    revalidateTag("corevalues-section");
    revalidatePath("/");

    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating Core Value data:", error);
    return { success: false, error: error.message || "Failed to update Core Value section content." };
  }
}
