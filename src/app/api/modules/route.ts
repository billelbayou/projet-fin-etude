import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function POST(request: Request) {
  try {
    const { name, credits, coefficient, unitId } = await request.json();

    // Create new module
    const newModule = await prisma.module.create({
      data: {
        nom: name,
        credits: credits,
        coefficient: coefficient,
        uniteId: unitId,
      },
    });

    return NextResponse.json(newModule, { status: 201 });
  } catch (error) {
    console.error("Error creating module:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
