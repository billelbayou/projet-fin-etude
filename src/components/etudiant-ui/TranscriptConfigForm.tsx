"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AcademicYearOption {
  id: string;
  nom: string;
  niveau: string;
  domaine: string;
  filiere: string;
  specialite: string;
}

export default function TranscriptYearForm({
  startingYear,
  departmentId,
}: {
  startingYear: string;
  departmentId: string;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    year: "",
    academicYearId: "",
    status: "PASSED" as "PASSED" | "PASSED_WITH_DEBT" | "FAILED",
  });

  const [academicYearOptions, setAcademicYearOptions] = useState<
    AcademicYearOption[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch academic year options based on selected year and department
  useEffect(() => {
    if (!formData.year || !departmentId) return;

    const fetchAcademicYears = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/academic-years?departmentId=${departmentId}`
        );
        const data = await response.json();
        setAcademicYearOptions(data);
      } catch (error) {
        console.error("Error fetching academic years:", error);
        toast.error("Erreur lors du chargement des canevas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAcademicYears();
  }, [formData.year, departmentId]);
  console.log(academicYearOptions);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.year || !formData.academicYearId) {
      toast.error("Veuillez sélectionner une année et un canevas");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/transcripts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: formData.year,
          academicYearId: formData.academicYearId,
          status: formData.status,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'enregistrement");
      }

      toast.success("Configuration enregistrée avec succès");

      // Reset form
      setFormData({
        year: "",
        academicYearId: "",
        status: "PASSED",
      });

      // Refresh the page to show the new entry
      router.refresh();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate year options starting from the student's starting year
  const generateYearOptions = () => {
    if (!startingYear) return [];

    const startYear = parseInt(startingYear.split("-")[0]);
    const currentYear = new Date().getFullYear();
    const options = [];

    for (let year = startYear; year <= currentYear; year++) {
      options.push(`${year}-${year + 1}`);
    }

    return options;
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">
        Configuration Année Universitaire
      </h2>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Année Universitaire *
          </label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Sélectionner une année</option>
            {generateYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Canevas *</label>
          <select
            name="academicYearId"
            value={formData.academicYearId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled={!formData.year || isLoading}
            required
          >
            <option value="">
              {isLoading ? "Chargement..." : "Sélectionner un canevas"}
            </option>
            {academicYearOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.nom}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Statut *</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="PASSED"
              checked={formData.status === "PASSED"}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600"
              required
            />
            <span className="text-green-600">Réussi</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="PASSED_WITH_DEBT"
              checked={formData.status === "PASSED_WITH_DEBT"}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-yellow-600">Réussi avec dette</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="FAILED"
              checked={formData.status === "FAILED"}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-red-600">Échec</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting || !formData.year || !formData.academicYearId}
        >
          {isSubmitting ? "Enregistrement..." : "Enregistrer cette année"}
        </button>
      </div>
    </form>
  );
}
