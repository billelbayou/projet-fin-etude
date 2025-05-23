export default async function deleteAcademicYear(
  previousState: unknown,
  formData: FormData
) {
  const id = formData.get("id");
  if (!id) {
    return { success: false, error: "ID is required" };
  }
  try {
    const result = await fetch("/api/transcripts", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!result.ok) {
      throw new Error("Failed to delete the academic year");
    }
    return { success: true, message: "Année académique supprimée avec succès" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "Une erreur inconnue est survenue" };
    }
  }
}
