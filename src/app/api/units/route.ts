import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function POST(request: Request) {
  try {
    const { name, credits, coefficient, semesterId } = await request.json();

    // Create new unit
    const newUnit = await prisma.unite.create({
      data: {
        nom: name,
        credits: credits,
        coefficient: coefficient,
        semestreId: semesterId,
      },
    });

    return NextResponse.json(newUnit, { status: 201 });
  } catch (error) {
    console.error("Error creating unit:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
