"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface FormData {
  year: string;
  level: string;
  s1_moyenne: string;
  s1_credits: string;
  s2_moyenne: string;
  s2_credits: string;
}

interface ResultsData {
  yearAverage: string;
  totalCredits: string;
  status: string;
  statusColor: string;
}

export default function TranscriptYearForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    year: "",
    level: "",
    s1_moyenne: "",
    s1_credits: "",
    s2_moyenne: "",
    s2_credits: "",
  });

  const [results, setResults] = useState<ResultsData>({
    yearAverage: "-",
    totalCredits: "-",
    status: "Non calculé",
    statusColor: "text-gray-600",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    calculateResults();
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Validate year format (YYYY-YYYY)
    if (!/^\d{4}-\d{4}$/.test(formData.year)) {
      newErrors.year = "Format d'année invalide (ex: 2023-2024)";
    }

    // Validate level selection
    if (!["L1", "L2", "L3"].includes(formData.level)) {
      newErrors.level = "Veuillez sélectionner un niveau";
    }

    // Validate semester averages (0-20)
    ["s1_moyenne", "s2_moyenne"].forEach((field) => {
      const value = parseFloat(formData[field as keyof FormData]);
      if (isNaN(value)) {
        newErrors[field as keyof FormData] = "Valeur requise";
      } else if (value < 0 || value > 20) {
        newErrors[field as keyof FormData] = "Doit être entre 0 et 20";
      }
    });

    // Validate credits (0-30)
    ["s1_credits", "s2_credits"].forEach((field) => {
      const value = parseInt(formData[field as keyof FormData]);
      if (isNaN(value)) {
        newErrors[field as keyof FormData] = "Valeur requise";
      } else if (value < 0 || value > 30) {
        newErrors[field as keyof FormData] = "Doit être entre 0 et 30";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateResults = () => {
    const s1Moyenne = parseFloat(formData.s1_moyenne) || 0;
    const s2Moyenne = parseFloat(formData.s2_moyenne) || 0;
    const s1Credits = parseInt(formData.s1_credits) || 0;
    const s2Credits = parseInt(formData.s2_credits) || 0;

    const yearAverage = ((s1Moyenne + s2Moyenne) / 2).toFixed(2);
    const totalCredits = s1Credits + s2Credits;

    let status = "Non admis";
    let statusColor = "text-red-600";

    if (parseFloat(yearAverage) >= 10 && s1Moyenne >= 10 && s2Moyenne >= 10) {
      status = "Admis";
      statusColor = "text-green-600";
    } else if (totalCredits >= 30) {
      status = "Admis avec dette";
      statusColor = "text-yellow-600";
    }

    setResults({
      yearAverage,
      totalCredits: totalCredits.toString(),
      status,
      statusColor,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");
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
          level: formData.level,
          s1_moyenne: parseFloat(formData.s1_moyenne),
          s1_credits: parseInt(formData.s1_credits),
          s2_moyenne: parseFloat(formData.s2_moyenne),
          s2_credits: parseInt(formData.s2_credits),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'enregistrement");
      }

      toast.success(result.message || "Configuration enregistrée avec succès");

      // Reset form on success
      setFormData({
        year: "",
        level: "",
        s1_moyenne: "",
        s1_credits: "",
        s2_moyenne: "",
        s2_credits: "",
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue",
        { duration: 5000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">
        Configuration Année Universitaire
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Année Universitaire *
          </label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.year ? "border-red-500" : ""
            }`}
            placeholder="Ex: 2023-2024"
            required
          />
          {errors.year && (
            <p className="text-xs text-red-500 mt-1">{errors.year}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Format: YYYY-YYYY</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Niveau *</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.level ? "border-red-500" : ""
            }`}
            required
          >
            <option value="">Sélectionner un niveau</option>
            <option value="L1">Licence 1 (L1)</option>
            <option value="L2">Licence 2 (L2)</option>
            <option value="L3">Licence 3 (L3)</option>
          </select>
          {errors.level && (
            <p className="text-xs text-red-500 mt-1">{errors.level}</p>
          )}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-3">Semestre 1</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Moyenne *</label>
              <input
                type="number"
                name="s1_moyenne"
                value={formData.s1_moyenne}
                onChange={handleChange}
                min="0"
                max="20"
                step="0.01"
                className={`w-full p-2 border rounded ${
                  errors.s1_moyenne ? "border-red-500" : ""
                }`}
                required
              />
              {errors.s1_moyenne && (
                <p className="text-xs text-red-500 mt-1">{errors.s1_moyenne}</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Crédits obtenus *</label>
              <input
                type="number"
                name="s1_credits"
                value={formData.s1_credits}
                onChange={handleChange}
                min="0"
                max="30"
                className={`w-full p-2 border rounded ${
                  errors.s1_credits ? "border-red-500" : ""
                }`}
                required
              />
              {errors.s1_credits && (
                <p className="text-xs text-red-500 mt-1">{errors.s1_credits}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-3">Semestre 2</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Moyenne *</label>
              <input
                type="number"
                name="s2_moyenne"
                value={formData.s2_moyenne}
                onChange={handleChange}
                min="0"
                max="20"
                step="0.01"
                className={`w-full p-2 border rounded ${
                  errors.s2_moyenne ? "border-red-500" : ""
                }`}
                required
              />
              {errors.s2_moyenne && (
                <p className="text-xs text-red-500 mt-1">{errors.s2_moyenne}</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Crédits obtenus *</label>
              <input
                type="number"
                name="s2_credits"
                value={formData.s2_credits}
                onChange={handleChange}
                min="0"
                max="30"
                className={`w-full p-2 border rounded ${
                  errors.s2_credits ? "border-red-500" : ""
                }`}
                required
              />
              {errors.s2_credits && (
                <p className="text-xs text-red-500 mt-1">{errors.s2_credits}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-gray-50 mb-6">
        <h3 className="text-lg font-medium mb-3">Résultats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm">Moyenne annuelle</p>
            <p className="text-xl font-bold">{results.yearAverage}</p>
          </div>
          <div>
            <p className="text-sm">Total crédits</p>
            <p className="text-xl font-bold">{results.totalCredits}</p>
          </div>
          <div>
            <p className="text-sm">Statut</p>
            <p className={`text-xl font-bold ${results.statusColor}`}>
              {results.status}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enregistrement..." : "Enregistrer cette année"}
        </button>
      </div>
    </form>
  );
}
