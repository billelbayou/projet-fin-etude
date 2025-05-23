"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Module {
  id: string;
  nom: string;
  coefficient: number;
  credits: number;
  uniteId: string;
}

interface Unite {
  id: string;
  nom: string;
  coefficient: number;
  credits: number;
  semestreId: string;
  modules: Module[];
}

interface Semestre {
  id: string;
  nom: string;
  coefficient: number;
  credits: number;
  anneeId: string;
  unites: Unite[];
}

interface AnneeUniv {
  id: string;
  nom: string;
  semestres: Semestre[];
}

interface Etudiant {
  id: string;
  user: {
    nom: string;
    prenom: string;
  };
  matricule: string;
}

interface AnneeNote {
  id: string;
  annee: string;
  statut: string;
  moyenne: number | null;
  credits: number | null;
  etudiant: Etudiant;
  anneeUniv: AnneeUniv;
  semestreNotes: any[]; // Adjust this based on actual structure
}

export default function RemplirReleve() {
  const { id } = useParams();
  const [anneeNote, setAnneeNote] = useState<AnneeNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [moduleGrades, setModuleGrades] = useState<Record<string, number>>({});
  const [yearAverage, setYearAverage] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchTranscript = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/transcripts/${id}`);
        if (!res.ok) throw new Error("Échec du chargement du relevé");
        const data = await res.json();
        setAnneeNote(data.data);

        // Initialize module grades
        const initialGrades: Record<string, number> = {};
        data.data.anneeUniv.semestres.forEach((s: Semestre) =>
          s.unites.forEach((u: Unite) =>
            u.modules.forEach((m: Module) => {
              initialGrades[m.id] = 0;
            })
          )
        );
        setModuleGrades(initialGrades);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTranscript();
  }, [id]);

  const handleGradeChange = (moduleId: string, value: string) => {
    const note = parseFloat(value) || 0;
    setModuleGrades((prev) => ({ ...prev, [moduleId]: note }));
  };

  const calculateCredits = (note: number, totalCredits: number) =>
    note >= 10 ? totalCredits : 0;

  const calculateUnitAverage = (unite: Unite) => {
    const total = unite.modules.reduce((sum, m) => {
      const note = moduleGrades[m.id] || 0;
      return sum + note * m.coefficient;
    }, 0);
    const coefTotal = unite.modules.reduce((sum, m) => sum + m.coefficient, 0);
    return coefTotal ? total / coefTotal : 0;
  };

  const calculateSemesterAverage = (semestre: Semestre) => {
    const total = semestre.unites.reduce((sum, u) => {
      const avg = calculateUnitAverage(u);
      return sum + avg * u.coefficient;
    }, 0);
    const coefTotal = semestre.unites.reduce(
      (sum, u) => sum + u.coefficient,
      0
    );
    return coefTotal ? total / coefTotal : 0;
  };

  const calculateYearAverage = () => {
    if (!anneeNote) return 0;
    const total = anneeNote.anneeUniv.semestres.reduce((sum, s) => {
      const avg = calculateSemesterAverage(s);
      return sum + avg * s.coefficient;
    }, 0);
    const coefTotal = anneeNote.anneeUniv.semestres.reduce(
      (sum, s) => sum + s.coefficient,
      0
    );
    return coefTotal ? total / coefTotal : 0;
  };

  const calculateYearTotalCredits = () => {
    if (!anneeNote) return 0;
    console.log(anneeNote);
    return anneeNote.anneeUniv.semestres.reduce((total, s) => {
      return (
        total +
        s.unites.reduce((uTotal, u) => {
          const avg = calculateUnitAverage(u);
          return uTotal + calculateCredits(avg, u.credits);
        }, 0)
      );
    }, 0);
  };

  useEffect(() => {
    if (anneeNote) {
      setYearAverage(calculateYearAverage());
    }
  }, [moduleGrades, anneeNote]);

  const totalCreditsObtained = calculateYearTotalCredits();

  let finalStatus = "";
  let finalColor = "";

  if (yearAverage >= 10) {
    finalStatus = "Validé";
    finalColor = "bg-green-100 text-green-800";
  } else if (yearAverage < 10 && totalCreditsObtained >= 30) {
    finalStatus = "Validé avec dettes";
    finalColor = "bg-yellow-100 text-yellow-800";
  } else {
    finalStatus = "Non validé";
    finalColor = "bg-red-100 text-red-800";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!anneeNote) return;

    try {
      const moduleNotes = anneeNote.anneeUniv.semestres.flatMap((s) =>
        s.unites.flatMap((u) =>
          u.modules.map((m) => ({
            moduleId: m.id,
            note: moduleGrades[m.id] || 0,
            credits: calculateCredits(moduleGrades[m.id] || 0, m.credits),
          }))
        )
      );

      const uniteNotes = anneeNote.anneeUniv.semestres.flatMap((s) =>
        s.unites.map((u) => {
          const note = calculateUnitAverage(u);
          return {
            uniteId: u.id,
            note,
            credits: calculateCredits(note, u.credits),
          };
        })
      );

      const semestreNotes = anneeNote.anneeUniv.semestres.map((s) => {
        const note = calculateSemesterAverage(s);
        return {
          semestreId: s.id,
          note,
          credits: calculateCredits(note, s.credits),
        };
      });

      const response = await fetch(`/api/transcripts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleNotes,
          uniteNotes,
          semestreNotes,
          anneeNote: {
            moyenne: yearAverage,
            credits: totalCreditsObtained,
            statut:
              yearAverage >= 10
                ? "PASSED"
                : totalCreditsObtained >= 30
                ? "PASSED_WITH_DEBT"
                : "FAILED",
          },
        }),
      });

      if (!response.ok) throw new Error();
      toast.success("Relevé enregistré avec succès !");
    } catch {
      toast.error("Erreur lors de l'enregistrement !");
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">Erreur : {error}</div>;
  if (!anneeNote) return <div>Aucun relevé trouvé</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Remplir le relevé de notes</h1>
        <div className="flex justify-between mt-2">
          <span>
            <strong>Étudiant:</strong> {anneeNote.etudiant.user.nom}{" "}
            {anneeNote.etudiant.user.prenom}
          </span>
          <span>
            <strong>Matricule:</strong> {anneeNote.etudiant.matricule}
          </span>
          <span>
            <strong>Année:</strong> {anneeNote.annee}
          </span>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-center mb-4">
        {anneeNote.anneeUniv.nom}
      </h2>

      <form onSubmit={handleSubmit}>
        <table className="w-full border-collapse mb-4 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-1">Module</th>
              <th className="border p-1">Coef</th>
              <th className="border p-1">Créd</th>
              <th className="border p-1">Note</th>
              <th className="border p-1">Créd Obtenus</th>
            </tr>
          </thead>
          <tbody>
            {anneeNote.anneeUniv.semestres.map((s) => (
              <React.Fragment key={s.id}>
                <tr className="bg-blue-50 text-blue-800 font-bold">
                  <td colSpan={5} className="border p-1">
                    {s.nom} (Coef: {s.coefficient})
                  </td>
                </tr>
                {s.unites.map((u) => (
                  <React.Fragment key={u.id}>
                    {u.modules.map((m) => {
                      const note = moduleGrades[m.id] || 0;
                      const credits = calculateCredits(note, m.credits);
                      return (
                        <tr key={m.id}>
                          <td className="border p-1">{m.nom}</td>
                          <td className="border p-1">{m.coefficient}</td>
                          <td className="border p-1">{m.credits}</td>
                          <td className="border p-1">
                            <input
                              type="number"
                              min="0"
                              max="20"
                              step="0.01"
                              className="w-16 text-center border rounded"
                              value={note}
                              onChange={(e) =>
                                handleGradeChange(m.id, e.target.value)
                              }
                            />
                          </td>
                          <td className="border p-1">{credits}</td>
                        </tr>
                      );
                    })}
                    <tr className="bg-gray-50 font-semibold text-blue-700">
                      <td className="border p-1">Unité {u.nom}</td>
                      <td className="border p-1">{u.coefficient}</td>
                      <td className="border p-1">{u.credits}</td>
                      <td className="border p-1" colSpan={2}>
                        Moyenne: {calculateUnitAverage(u).toFixed(2)}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-6 mb-4">
          <span>
            <strong>Moyenne annuelle :</strong> {yearAverage.toFixed(2)}
          </span>
          <span>
            <strong>Crédits obtenus :</strong> {totalCreditsObtained}
          </span>
          <span className={`px-2 py-1 rounded ${finalColor}`}>
            {finalStatus}
          </span>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
}
