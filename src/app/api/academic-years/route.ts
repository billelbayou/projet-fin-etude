import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour créer un étudiant" },
      { status: 401 }
    );
  }
  if (!session.user?.email) {
    return NextResponse.json(
      { error: "Email de l'utilisateur introuvable" },
      { status: 401 }
    );
  }

  const chef = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      managedDepartment: {
        select: {
          id: true,
        },
      },
    },
  });

  const departementId = chef?.managedDepartment?.id;
  try {
    const { nom, niveau, domaine, filiere, specialite } = await request.json();

    // Validate required fields
    if (!nom || !niveau || !domaine || !filiere) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new academic year with all fields
    const newYear = await prisma.anneeUniversitaire.create({
      data: {
        nom,
        niveau,
        domaine,
        filiere,
        specialite: specialite || null,
        departementId: departementId as string,
      },
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get("departmentId");

  if (!departmentId) {
    return NextResponse.json(
      { error: "departmentId are required" },
      { status: 400 }
    );
  }

  try {
    const academicYears = await prisma.anneeUniversitaire.findMany({
      where: {
        departementId: departmentId,
      },
      select: {
        id: true,
        nom: true,
        niveau: true,
        domaine: true,
        filiere: true,
        specialite: true,
      },
    });

    return NextResponse.json(academicYears);
  } catch (error) {
    console.error("Error fetching academic years:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
