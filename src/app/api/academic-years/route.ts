import { NextResponse } from "next/server";
import {prisma} from "@/db/prisma";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  try {
    // Create new academic year without year field
    const newYear = await prisma.anneeUniversitaire.create({
      data: {niveau: "L1"},
    });

    return NextResponse.json(newYear, { status: 201 });
  } catch (error) {
    console.error("Error creating academic year:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
