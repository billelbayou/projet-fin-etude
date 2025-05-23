import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { emailChef, motDePasseChef, nomChef, prenomChef, nomDepartement } =
      body;

    // Vérifie que toutes les données sont fournies
    if (
      !emailChef ||
      !motDePasseChef ||
      !nomChef ||
      !prenomChef ||
      !nomDepartement
    ) {
      return NextResponse.json(
        { message: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Vérifie que l'email n'existe pas déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: emailChef },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Vérifie que le département n'existe pas déjà
    const existingDepartment = await prisma.departement.findUnique({
      where: { name: nomDepartement },
    });
    if (existingDepartment) {
      return NextResponse.json(
        { message: "Ce département existe déjà" },
        { status: 400 }
      );
    }
    // hash le mot de passe si nécessaire
    const hashedPassword = await bcrypt.hash(motDePasseChef, 10);
    // Crée le chef de département
    const chef = await prisma.user.create({
      data: {
        email: emailChef,
        motDePasse: hashedPassword, // tu peux ajouter un hash ici si tu utilises bcrypt
        nom: nomChef,
        prenom: prenomChef,
        role: "CHEF_DEPARTEMENT",
      },
    });

    // Crée le département et le lie au chef
    const departement = await prisma.departement.create({
      data: {
        name: nomDepartement,
        chefId: chef.id,
      },
    });

    return NextResponse.json({
      message: "Département et chef créés avec succès",
      departement,
      chef,
    });
  } catch (error) {
    console.error("Erreur lors de la création du département :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de la création" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const departments = await prisma.departement.findMany({
      include: {
        chef: {
          select: {
            nom: true,
            prenom: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}