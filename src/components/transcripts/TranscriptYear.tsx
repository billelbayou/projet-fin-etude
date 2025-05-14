// components/transcripts/TranscriptYear.tsx
"use client";
import { Module, Unite, Semestre } from "@/types/index.d";

interface TranscriptYearProps {
  year: string;
  semestres: Semestre[];
  onGradeChange: (moduleId: string, note: number) => Promise<void>;
  onComplete: () => void;
}

export default function TranscriptYear({
  year,
  semestres,
  onGradeChange,
  onComplete,
}: TranscriptYearProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Année Universitaire: {year}</h2>

      {semestres.map((semestre) => (
        <div key={semestre.id} className="border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">{semestre.nom}</h3>
          <div className="space-y-6">
            {semestre.unites.map((unite: Unite) => (
              <div key={unite.id} className="border rounded p-4">
                <h4 className="font-medium mb-3">{unite.nom}</h4>
                <div className="space-y-4">
                  {unite.modules.map((module: Module) => (
                    <div
                      key={module.id}
                      className="flex items-center justify-between p-3 border rounded"
                    >
                      <div>
                        <h5 className="font-medium">{module.nom}</h5>
                        <p className="text-sm text-gray-500">
                          Crédits: {module.credits} - Coefficient:{" "}
                          {module.coefficient}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.01"
                          value={module.ModuleNote[0]?.note?.toFixed(2) || ""}
                          onChange={(e) =>
                            onGradeChange(
                              module.id,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-24 p-2 border rounded"
                        />
                        <span>/20</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right font-medium">
                  Moyenne Unité:{" "}
                  {unite.UniteNote[0]?.note?.toFixed(2) || "0.00"}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right text-lg font-bold">
            Moyenne Semestre:{" "}
            {semestre.SemestreNote[0]?.note?.toFixed(2) || "0.00"}
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={onComplete}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Terminer et valider
        </button>
      </div>
    </div>
  );
}
