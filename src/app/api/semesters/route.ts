import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function POST(request: Request) {
  try {
    const { name, credits, coefficient, order, academicYearId } =
      await request.json();

    // Create new semester
    const newSemester = await prisma.semestre.create({
      data: {
        nom: name,
        credits: credits,
        coefficient: coefficient,
        ordre: order,
        anneeId: academicYearId,
      },
    });

    return NextResponse.json(newSemester, { status: 201 });
  } catch (error) {
    console.error("Error creating semester:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
