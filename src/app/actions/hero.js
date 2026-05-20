"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath, unstable_cache, revalidateTag } from "next/cache";

// Default fallback content for the Hero section
const DEFAULT_HERO = {
  id: "hero",
  bgImageUrl: "/images/po-hsuan-huang-Y8H4rOxCf0g-unsplash.jpg",
  titlePart1: "INDO",
  titlePart2: "TURBINE",
  tag: "Integrated Turbine Services & Telemetry",
  description: "Empowering energy and manufacturing sectors with state-of-the-art gas turbine maintenance, precision engineering solutions, and high-performance real-time telemetry.",
  primaryBtnText: "Get Started",
  primaryBtnLink: "#contact",
  secondaryBtnText: "Explore Solutions",
  secondaryBtnLink: "#services",
};

// Cached database query
const getCachedHeroData = unstable_cache(
  async () => {
    try {
      const data = await prisma.heroSection.findFirst();
      return data || DEFAULT_HERO;
    } catch (error) {
      console.error("Error fetching hero data from DB:", error);
      return DEFAULT_HERO;
    }
  },
  ["hero-section-data"],
  {
    tags: ["hero-section"],
  }
);

/**
 * Fetches the Hero section data (cached).
 * Falls back to DEFAULT_HERO if no entry exists.
 */
export async function getHeroData() {
  return getCachedHeroData();
}

/**
 * Updates (upserts) the Hero section data in database.
 * Requires active session.
 */
export async function updateHeroData(data) {
  try {
    // 1. Authenticate user
    const reqHeaders = await headers();
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    // 2. Validate required fields
    if (!data.bgImageUrl || !data.titlePart1 || !data.description) {
      return { success: false, error: "Image, Title Part 1, and Description are required." };
    }

    // 3. Upsert data (id is always "hero")
    const payload = {
      bgImageUrl: data.bgImageUrl,
      titlePart1: data.titlePart1,
      description: data.description,
      tag: data.tag || null,
      titlePart2: data.titlePart2 || null,
      primaryBtnText: data.primaryBtnText || null,
      primaryBtnLink: data.primaryBtnLink || null,
      secondaryBtnText: data.secondaryBtnText || null,
      secondaryBtnLink: data.secondaryBtnLink || null,
    };

    const updatedData = await prisma.heroSection.upsert({
      where: { id: "hero" },
      update: payload,
      create: {
        id: "hero",
        ...payload,
      },
    });

    // 4. Invalidate cache
    revalidateTag("hero-section");
    revalidatePath("/");

    return { success: true, data: updatedData };
  } catch (error) {
    console.error("Error updating hero data:", error);
    return { success: false, error: error.message || "Failed to update Hero section content." };
  }
}

