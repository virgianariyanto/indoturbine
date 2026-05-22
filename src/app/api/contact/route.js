import prisma from "@/src/lib/prisma";

/**
 * POST /api/contact
 * Receives JSON payload from the Contact form and stores it.
 */
export async function POST(request) {
  try {
    const { name, company, email, phone, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields (name, email, message)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const saved = await prisma.contactMessage.create({
      data: { name, company, email, phone, message },
    });

    return new Response(JSON.stringify(saved), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Contact API] Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
