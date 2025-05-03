"use client";

import { useState } from "react";

interface AcademicYear {
  id: string;
  label: string; // e.g. "2023-2024"
  level: string; // e.g. "L1", "L2"
  semesters: {
    id: string;
    name: string;
    moyenne: number;
    credits: number;
  }[];
  expanded: boolean;
}

export default function ConfigurationDesReleves() {
  const [years, setYears] = useState<AcademicYear[]>([
    {
      id: "1",
      label: `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`,
      level: "L1",
      semesters: [
        { id: "s1", name: "Semestre 1", moyenne: 0, credits: 0 },
        { id: "s2", name: "Semestre 2", moyenne: 0, credits: 0 },
      ],
      expanded: true,
    },
  ]);

  const addNewYear = () => {
    const lastYear = years[years.length - 1];
    const newLevel = lastYear.level.replace(/\d+/, (match) =>
      String(Number(match) + 1)
    );
    const newYear = new Date().getFullYear() + years.length - 1;

    setYears([
      ...years,
      {
        id: String(years.length + 1),
        label: `${newYear}-${newYear + 1}`,
        level: newLevel,
        semesters: [
          {
            id: `s${years.length * 2 + 1}`,
            name: "Semestre 1",
            moyenne: 0,
            credits: 0,
          },
          {
            id: `s${years.length * 2 + 2}`,
            name: "Semestre 2",
            moyenne: 0,
            credits: 0,
          },
        ],
        expanded: false,
      },
    ]);
  };

  const toggleYear = (id: string) => {
    setYears(
      years.map((year) =>
        year.id === id ? { ...year, expanded: !year.expanded } : year
      )
    );
  };

  const updateSemester = (
    yearId: string,
    semesterId: string,
    field: string,
    value: number
  ) => {
    setYears(
      years.map((year) => {
        if (year.id !== yearId) return year;

        return {
          ...year,
          semesters: year.semesters.map((sem) => {
            if (sem.id !== semesterId) return sem;
            return { ...sem, [field]: value };
          }),
        };
      })
    );
  };

  const calculateYearResult = (year: AcademicYear) => {
    const [s1, s2] = year.semesters;
    const moyenneAnnee = (s1.moyenne + s2.moyenne) / 2;
    const totalCredits = s1.credits + s2.credits;

    if (moyenneAnnee >= 10 && s1.moyenne >= 10 && s2.moyenne >= 10) {
      return "Admis";
    } else if (totalCredits >= 30) {
      return "Admis avec dette";
    }
    return "Non admis";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Configuration des Relevés
      </h1>
      <p className="text-gray-600 mb-8">
        Configurez vos relevés de notes par année académique
      </p>

      <div className="space-y-4 mb-6">
        {years.map((year) => (
          <div key={year.id} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleYear(year.id)}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-lg">{year.label}</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {year.level}
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 text-sm ${
                    calculateYearResult(year) === "Admis"
                      ? "text-green-600"
                      : calculateYearResult(year) === "Admis avec dette"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {calculateYearResult(year)}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    year.expanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {year.expanded && (
              <div className="p-4 space-y-4">
                {year.semesters.map((semester) => (
                  <div key={semester.id} className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium mb-3">
                      {semester.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Moyenne {semester.name}
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.01"
                          value={semester.moyenne}
                          onChange={(e) =>
                            updateSemester(
                              year.id,
                              semester.id,
                              "moyenne",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Crédits obtenus
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={semester.credits}
                          onChange={(e) =>
                            updateSemester(
                              year.id,
                              semester.id,
                              "credits",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-3">
                    Résultats {year.label}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Moyenne annuelle
                      </p>
                      <p className="text-xl font-bold">
                        {(
                          (year.semesters[0].moyenne +
                            year.semesters[1].moyenne) /
                          2
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Total crédits
                      </p>
                      <p className="text-xl font-bold">
                        {year.semesters[0].credits + year.semesters[1].credits}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Statut
                      </p>
                      <p
                        className={`text-xl font-bold ${
                          calculateYearResult(year) === "Admis"
                            ? "text-green-600"
                            : calculateYearResult(year) === "Admis avec dette"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {calculateYearResult(year)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addNewYear}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Ajouter une année
      </button>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Légende</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span>Admis - Tous les semestres validés</span>
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
            <span>
              Admis avec dette - Crédits suffisants mais semestre(s) non
              validé(s)
            </span>
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            <span>Non admis - Conditions non remplies</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
