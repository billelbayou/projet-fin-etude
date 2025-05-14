// app/student/transcripts/fill/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface CourseModule {
  id: string;
  nom: string;
  credits: number;
  coefficient: number;
  note: number;
}

interface Unite {
  id: string;
  nom: string;
  note: number;
  credits: number;
  courseModules: CourseModule[];
}

interface Semestre {
  id: string;
  nom: string;
  ordre: number;
  note: number;
  credits: number;
  unites: Unite[];
}

interface Transcript {
  id: string;
  year: string;
  level: string;
  moyenne: number;
  credits: number;
  semestres: Semestre[];
}

export default function FillTranscriptPage() {
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const transcriptId = params?.id as string;

  // Calculate unit and semester notes based on module grades
  const calculateDerivedGrades = (
    currentTranscript: Transcript
  ): Transcript => {
    const updatedSemestres = currentTranscript.semestres.map((semestre) => {
      const updatedUnites = semestre.unites.map((unite) => {
        // Calculate unit average (weighted by coefficients)
        const moduleResults = unite.courseModules.map((mod) => ({
          note: mod.note,
          coefficient: mod.coefficient,
        }));

        const totalCoefficient = moduleResults.reduce(
          (sum, mod) => sum + mod.coefficient,
          0
        );
        const weightedSum = moduleResults.reduce(
          (sum, mod) => sum + mod.note * mod.coefficient,
          0
        );
        const unitAverage =
          totalCoefficient > 0 ? weightedSum / totalCoefficient : 0;

        // Calculate unit credits (only modules with note >= 10)
        const unitCredits = unite.courseModules
          .filter((mod) => mod.note >= 10)
          .reduce((sum, mod) => sum + mod.credits, 0);

        return {
          ...unite,
          note: parseFloat(unitAverage.toFixed(2)),
          credits: unitCredits,
        };
      });

      // Calculate semester average (simple average of units)
      const semesterAverage =
        updatedUnites.length > 0
          ? updatedUnites.reduce((sum, unite) => sum + unite.note, 0) /
            updatedUnites.length
          : 0;

      // Calculate semester credits (sum of unit credits)
      const semesterCredits = updatedUnites.reduce(
        (sum, unite) => sum + unite.credits,
        0
      );

      return {
        ...semestre,
        note: parseFloat(semesterAverage.toFixed(2)),
        credits: semesterCredits,
        unites: updatedUnites,
      };
    });

    // Calculate overall average (simple average of semesters)
    const overallAverage =
      updatedSemestres.length > 0
        ? updatedSemestres.reduce((sum, semestre) => sum + semestre.note, 0) /
          updatedSemestres.length
        : 0;

    // Calculate overall credits (sum of semester credits)
    const overallCredits = updatedSemestres.reduce(
      (sum, semestre) => sum + semestre.credits,
      0
    );

    return {
      ...currentTranscript,
      moyenne: parseFloat(overallAverage.toFixed(2)),
      credits: overallCredits,
      semestres: updatedSemestres,
    };
  };

  useEffect(() => {
    if (!transcriptId) return;

    const fetchTranscripts = async () => {
      try {
        const response = await fetch("/api/transcripts");
        if (!response.ok) throw new Error("Failed to fetch transcripts");

        const data = await response.json();
        if (data.success) {
          // Find the specific transcript we need
          const foundTranscript = data.data.find(
            (t: any) => t.id === transcriptId
          );

          if (foundTranscript) {
            // Transform the data to match our interface
            const formattedData = {
              ...foundTranscript,
              semestres: foundTranscript.semestres.map((semestre: any) => ({
                ...semestre,
                unites: semestre.unites.map((unite: any) => ({
                  ...unite,
                  courseModules: unite.modules, // Rename modules to courseModules
                })),
              })),
            };
            // Calculate initial derived grades
            setTranscript(calculateDerivedGrades(formattedData));
          } else {
            setError("Transcript not found");
          }
        } else {
          setError(data.error || "Failed to load transcripts");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load transcripts"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTranscripts();
  }, [transcriptId]);

  const handleModuleNoteChange = (
    semestreId: string,
    uniteId: string,
    moduleId: string,
    value: number
  ) => {
    if (!transcript) return;

    setTranscript((prev) => {
      if (!prev) return null;

      const updatedSemestres = prev.semestres.map((semestre) => {
        if (semestre.id !== semestreId) return semestre;

        const updatedUnites = semestre.unites.map((unite) => {
          if (unite.id !== uniteId) return unite;

          const updatedModules = unite.courseModules.map((mod) => {
            if (mod.id !== moduleId) return mod;
            return { ...mod, note: value };
          });

          return { ...unite, courseModules: updatedModules };
        });

        return { ...semestre, unites: updatedUnites };
      });

      // Recalculate all derived grades after module change
      const updatedTranscript = {
        ...prev,
        semestres: updatedSemestres,
      };
      return calculateDerivedGrades(updatedTranscript);
    });
  };

  const handleSubmit = async () => {
    if (!transcript || submitting) return;

    setSubmitting(true);
    try {
      // Prepare data for API (convert back to original format if needed)
      const submissionData = {
        ...transcript,
        semestres: transcript.semestres.map((semestre) => ({
          ...semestre,
          unites: semestre.unites.map((unite) => ({
            ...unite,
            modules: unite.courseModules, // Convert back to 'modules' for API
          })),
        })),
      };

      const response = await fetch(`/api/transcripts/${transcriptId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) throw new Error("Failed to save");

      const data = await response.json();
      if (data.success) {
        router.push("/etudiant/remplir-releves");
      } else {
        setError(data.error || "Failed to save transcript");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save transcript"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => router.push("/student/transcripts")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Transcripts
        </button>
      </div>
    );
  }

  if (!transcript) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Transcript not found
        </div>
        <button
          onClick={() => router.push("/student/transcripts")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Transcripts
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Fill Transcript: {transcript.level} - {transcript.year}
      </h1>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="font-semibold text-lg mb-2">Summary</h2>
        <p>
          Overall Average:{" "}
          <span className="font-bold">{transcript.moyenne.toFixed(2)}</span>
        </p>
        <p>
          Total Credits: <span className="font-bold">{transcript.credits}</span>
        </p>
      </div>

      <div className="space-y-8">
        {transcript.semestres.map((semestre) => (
          <div key={semestre.id} className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 border-b flex justify-between items-center">
              <h2 className="font-semibold text-lg">
                Semester {semestre.ordre}: {semestre.nom}
              </h2>
              <div className="text-right">
                <p className="text-sm">
                  Average:{" "}
                  <span className="font-medium">
                    {semestre.note.toFixed(2)}
                  </span>
                </p>
                <p className="text-sm">
                  Credits:{" "}
                  <span className="font-medium">{semestre.credits}</span>
                </p>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-6">
                {semestre.unites.map((unite) => (
                  <div key={unite.id} className="border rounded p-4">
                    <div className="mb-4 flex justify-between items-center">
                      <h3 className="font-medium text-gray-700">
                        Unit: {unite.nom}
                      </h3>
                      <div className="text-right">
                        <p className="text-sm">
                          Average:{" "}
                          <span className="font-medium">
                            {unite.note.toFixed(2)}
                          </span>
                        </p>
                        <p className="text-sm">
                          Credits:{" "}
                          <span className="font-medium">{unite.credits}</span>
                        </p>
                      </div>
                    </div>

                    <div className="ml-4 space-y-4">
                      <h4 className="font-medium text-gray-700">Modules:</h4>
                      {unite.courseModules.map((courseModule) => (
                        <div
                          key={courseModule.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <span className="font-medium">
                              {courseModule.nom}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              (Credits: {courseModule.credits}, Coeff:{" "}
                              {courseModule.coefficient})
                            </span>
                          </div>
                          <input
                            type="number"
                            min="0"
                            max="20"
                            step="0.1"
                            value={courseModule.note || 0}
                            onChange={(e) =>
                              handleModuleNoteChange(
                                semestre.id,
                                unite.id,
                                courseModule.id,
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-24 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => router.push("/student/transcripts")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded disabled:bg-green-300"
        >
          {submitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Save Transcript"
          )}
        </button>
      </div>
    </div>
  );
}
