"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath, unstable_cache, revalidateTag } from "next/cache";

// Default fallback content for the Visi Misi section
const DEFAULT_VISIMISI = {
  id: "visimisi",
  visionTitle: "VISI",
  visionText: "To be the premier global provider of integrated gas turbine solutions and telemetry, driving industrial efficiency and sustainable energy innovation across the globe.",
  missionTitle: "MISI",
  missionText: "Delivering state-of-the-art engineering, precision maintenance, and real-time telemetry to maximize asset performance and operational reliability for our industrial partners.",
};

// Cached database query
const getCachedVisiMisiData = unstable_cache(
  async () => {
    try {
      const data = await prisma.visiMisiSection.findFirst();
      return data || DEFAULT_VISIMISI;
    } catch (error) {
      console.error("Error fetching Visi Misi data from DB:", error);
      return DEFAULT_VISIMISI;
    }
  },
  ["visimisi-section-data"],
  {
    tags: ["visimisi-section"],
  }
);

/**
 * Fetches the Visi Misi section data (cached).
 * Falls back to DEFAULT_VISIMISI if no entry exists.
 */
export async function getVisiMisiData() {
  return getCachedVisiMisiData();
}

/**
 * Updates (upserts) the Visi Misi section data in database.
 * Requires active session.
 */
export async function updateVisiMisiData(data) {
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
    if (!data.visionTitle || !data.visionText || !data.missionTitle || !data.missionText) {
      return { success: false, error: "Vision and Mission titles and texts are required." };
    }

    // 3. Upsert data (id is always "visimisi")
    const payload = {
      visionTitle: data.visionTitle,
      visionText: data.visionText,
      missionTitle: data.missionTitle,
      missionText: data.missionText,
    };

    const updatedData = await prisma.visiMisiSection.upsert({
      where: { id: "visimisi" },
      update: payload,
      create: {
        id: "visimisi",
        ...payload,
      },
    });

    // 4. Invalidate cache
    revalidateTag("visimisi-section");
    revalidatePath("/");

    return { success: true, data: updatedData };
  } catch (error) {
    console.error("Error updating Visi Misi data:", error);
    return { success: false, error: error.message || "Failed to update Visi & Misi section content." };
  }
}
