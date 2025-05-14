"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SemesterData = {
  name: string;
  units: Array<{
    name: string;
    modules: Array<{ name: string; credits: number; coefficient: number }>;
  }>;
};

export default function CanvasCreationPage() {
  const router = useRouter();
  const [step, setStep] = useState<
    "level" | "semester1" | "semester2" | "preview"
  >("level");
  const [level, setLevel] = useState<"L1" | "L2" | "L3">("L1");
  const [semester1, setSemester1] = useState<SemesterData>({
    name: "S1",
    units: [{ name: "", modules: [] }],
  });
  const [semester2, setSemester2] = useState<SemesterData>({
    name: "S2",
    units: [{ name: "", modules: [] }],
  });
  const [currentSemester, setCurrentSemester] = useState<
    "semester1" | "semester2"
  >("semester1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdSemesters, setCreatedSemesters] = useState<SemesterData[]>([]);

  const handleLevelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("semester1");
  };

  const handleAddUnit = () => {
    if (currentSemester === "semester1") {
      setSemester1((prev) => ({
        ...prev,
        units: [...prev.units, { name: "", modules: [] }],
      }));
    } else {
      setSemester2((prev) => ({
        ...prev,
        units: [...prev.units, { name: "", modules: [] }],
      }));
    }
  };

  const handleUnitChange = (index: number, name: string) => {
    if (currentSemester === "semester1") {
      const newUnits = [...semester1.units];
      newUnits[index].name = name;
      setSemester1((prev) => ({ ...prev, units: newUnits }));
    } else {
      const newUnits = [...semester2.units];
      newUnits[index].name = name;
      setSemester2((prev) => ({ ...prev, units: newUnits }));
    }
  };

  const handleRemoveUnit = (index: number) => {
    if (currentSemester === "semester1") {
      const newUnits = [...semester1.units];
      newUnits.splice(index, 1);
      setSemester1((prev) => ({ ...prev, units: newUnits }));
    } else {
      const newUnits = [...semester2.units];
      newUnits.splice(index, 1);
      setSemester2((prev) => ({ ...prev, units: newUnits }));
    }
  };

  const handleAddModule = (unitIndex: number) => {
    if (currentSemester === "semester1") {
      const newUnits = [...semester1.units];
      newUnits[unitIndex].modules.push({
        name: "",
        credits: 0,
        coefficient: 1,
      });
      setSemester1((prev) => ({ ...prev, units: newUnits }));
    } else {
      const newUnits = [...semester2.units];
      newUnits[unitIndex].modules.push({
        name: "",
        credits: 0,
        coefficient: 1,
      });
      setSemester2((prev) => ({ ...prev, units: newUnits }));
    }
  };

  const handleModuleChange = (
    unitIndex: number,
    moduleIndex: number,
    field: string,
    value: string | number
  ) => {
    if (currentSemester === "semester1") {
      const newUnits = [...semester1.units];
      if (field === "name") {
        newUnits[unitIndex].modules[moduleIndex].name = value as string;
      } else if (field === "credits") {
        newUnits[unitIndex].modules[moduleIndex].credits = Number(value);
      } else if (field === "coefficient") {
        newUnits[unitIndex].modules[moduleIndex].coefficient = Number(value);
      }
      setSemester1((prev) => ({ ...prev, units: newUnits }));
    } else {
      const newUnits = [...semester2.units];
      if (field === "name") {
        newUnits[unitIndex].modules[moduleIndex].name = value as string;
      } else if (field === "credits") {
        newUnits[unitIndex].modules[moduleIndex].credits = Number(value);
      } else if (field === "coefficient") {
        newUnits[unitIndex].modules[moduleIndex].coefficient = Number(value);
      }
      setSemester2((prev) => ({ ...prev, units: newUnits }));
    }
  };

  const handleRemoveModule = (unitIndex: number, moduleIndex: number) => {
    if (currentSemester === "semester1") {
      const newUnits = [...semester1.units];
      newUnits[unitIndex].modules.splice(moduleIndex, 1);
      setSemester1((prev) => ({ ...prev, units: newUnits }));
    } else {
      const newUnits = [...semester2.units];
      newUnits[unitIndex].modules.splice(moduleIndex, 1);
      setSemester2((prev) => ({ ...prev, units: newUnits }));
    }
  };

  const handleSemester1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentSemester("semester2");
    setStep("semester2");
  };

  const handleSemester2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("preview");
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create academic year
      const yearResponse = await fetch("/api/academic-years", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!yearResponse.ok) throw new Error("Failed to create academic year");
      const yearData = await yearResponse.json();

      // Process both semesters
      const semestersToCreate = [
        { ...semester1, name: `${level} ${semester1.name}` },
        { ...semester2, name: `${level} ${semester2.name}` },
      ];

      const createdSemestersData = [];

      for (const semester of semestersToCreate) {
        const semesterResponse = await fetch("/api/semesters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: semester.name,
            order: semester.name.includes("S1") ? 1 : 2,
            academicYearId: yearData.id,
          }),
        });

        if (!semesterResponse.ok) throw new Error("Failed to create semester");
        const semesterData = await semesterResponse.json();

        const semesterWithUnits = {
          name: semester.name,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          units: [] as any[],
        };

        for (const unit of semester.units) {
          const unitResponse = await fetch("/api/units", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: unit.name,
              semesterId: semesterData.id,
            }),
          });

          if (!unitResponse.ok) throw new Error("Failed to create unit");
          const unitData = await unitResponse.json();

          const unitWithModules = {
            name: unit.name,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            modules: [] as any[],
          };

          // eslint-disable-next-line @next/next/no-assign-module-variable
          for (const module of unit.modules) {
            const moduleResponse = await fetch("/api/modules", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: module.name,
                credits: module.credits,
                coefficient: module.coefficient,
                unitId: unitData.id,
              }),
            });

            if (!moduleResponse.ok) throw new Error("Failed to create module");
            unitWithModules.modules.push(module);
          }

          semesterWithUnits.units.push(unitWithModules);
        }

        createdSemestersData.push(semesterWithUnits);
      }

      setCreatedSemesters(createdSemestersData);
      router.push("/admin/canevas-releves/success");
    } catch (error) {
      console.error("Error creating canvas:", error);
      alert("An error occurred while creating the canvas");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSemesterData =
    currentSemester === "semester1" ? semester1 : semester2;
  const semesterTitle =
    currentSemester === "semester1" ? "Semestre 1" : "Semestre 2";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Création de Canevas de Relevés
      </h1>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`flex items-center ${
              step === "level" ? "font-bold text-purple-600" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                step === "level" ? "bg-purple-600 text-white" : "bg-gray-200"
              }`}
            >
              1
            </div>
            <span>Niveau</span>
          </div>
          <div
            className={`flex items-center ${
              step === "semester1" ? "font-bold text-purple-600" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                step === "semester1"
                  ? "bg-purple-600 text-white"
                  : step === "level"
                  ? "bg-gray-200"
                  : "bg-gray-200"
              }`}
            >
              2
            </div>
            <span>Semestre 1</span>
          </div>
          <div
            className={`flex items-center ${
              step === "semester2" ? "font-bold text-purple-600" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                step === "semester2"
                  ? "bg-purple-600 text-white"
                  : step === "level" || step === "semester1"
                  ? "bg-gray-200"
                  : "bg-gray-200"
              }`}
            >
              3
            </div>
            <span>Semestre 2</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-purple-600 h-2.5 rounded-full"
            style={{
              width:
                step === "level"
                  ? "33%"
                  : step === "semester1"
                  ? "66%"
                  : "100%",
            }}
          ></div>
        </div>
      </div>

      {step === "level" && (
        <form
          onSubmit={handleLevelSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">
            1. Sélectionner le Niveau
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="level">
              Niveau
            </label>
            <select
              id="level"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
              value={level}
              onChange={(e) => setLevel(e.target.value as "L1" | "L2" | "L3")}
            >
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Suivant
            </button>
          </div>
        </form>
      )}

      {(step === "semester1" || step === "semester2") && (
        <form
          onSubmit={
            currentSemester === "semester1"
              ? handleSemester1Submit
              : handleSemester2Submit
          }
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">2. {semesterTitle}</h2>
          <p className="text-gray-600 mb-4">
            Configurez les unités et modules pour le{" "}
            {semesterTitle.toLowerCase()}.
          </p>

          {currentSemesterData.units.map((unit, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Unité {index + 1}</h3>
                {currentSemesterData.units.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveUnit(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                )}
              </div>
              <div className="mb-2">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor={`unit-name-${index}`}
                >
                  Nom de l&apos;unité
                </label>
                <input
                  type="text"
                  id={`unit-name-${index}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                  value={unit.name}
                  onChange={(e) => handleUnitChange(index, e.target.value)}
                />
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Modules</h4>
                {unit.modules.length === 0 && (
                  <p className="text-gray-500 mb-2">Aucun module ajouté</p>
                )}
                {unit.modules.map((module, moduleIndex) => (
                  <div
                    key={moduleIndex}
                    className="mb-3 p-3 bg-gray-50 rounded-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">
                        Module {moduleIndex + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveModule(index, moduleIndex)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-gray-700 text-sm mb-1">
                          Nom
                        </label>
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          required
                          value={module.name}
                          onChange={(e) =>
                            handleModuleChange(
                              index,
                              moduleIndex,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1">
                          Crédits
                        </label>
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          min="1"
                          required
                          value={module.credits}
                          onChange={(e) =>
                            handleModuleChange(
                              index,
                              moduleIndex,
                              "credits",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1">
                          Coefficient
                        </label>
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                          min="0.1"
                          step="0.1"
                          required
                          value={module.coefficient}
                          onChange={(e) =>
                            handleModuleChange(
                              index,
                              moduleIndex,
                              "coefficient",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddModule(index)}
                  className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
                >
                  + Ajouter module
                </button>
              </div>
            </div>
          ))}

          <div className="mb-6">
            <button
              type="button"
              onClick={handleAddUnit}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              + Ajouter une autre unité
            </button>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                if (currentSemester === "semester1") {
                  setStep("level");
                } else {
                  setCurrentSemester("semester1");
                  setStep("semester1");
                }
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Retour
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              disabled={
                currentSemesterData.units.some((unit) => !unit.name) ||
                currentSemesterData.units.some(
                  (unit) => unit.modules.length === 0
                )
              }
            >
              {currentSemester === "semester1"
                ? "Passer à Semestre 2"
                : "Vérifier le canevas"}
            </button>
          </div>
        </form>
      )}

      {step === "preview" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Prévisualisation du Canevas
          </h2>
          <p className="text-gray-600 mb-6">
            Vérifiez les informations avant de créer le canevas pour {level}.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">{level} Semestre 1</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                {semester1.units.map((unit, unitIndex) => (
                  <div key={unitIndex} className="mb-4 last:mb-0">
                    <h4 className="font-medium mb-2">Unité: {unit.name}</h4>
                    <ul className="ml-4 space-y-2">
                      {unit.modules.map((module, moduleIndex) => (
                        <li key={moduleIndex} className="text-sm">
                          {module.name} (Crédits: {module.credits}, Coeff:{" "}
                          {module.coefficient})
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">{level} Semestre 2</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                {semester2.units.map((unit, unitIndex) => (
                  <div key={unitIndex} className="mb-4 last:mb-0">
                    <h4 className="font-medium mb-2">Unité: {unit.name}</h4>
                    <ul className="ml-4 space-y-2">
                      {unit.modules.map((module, moduleIndex) => (
                        <li key={moduleIndex} className="text-sm">
                          {module.name} (Crédits: {module.credits}, Coeff:{" "}
                          {module.coefficient})
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => {
                setCurrentSemester("semester2");
                setStep("semester2");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Modifier
            </button>
            <button
              onClick={handleFinalSubmit}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Création en cours..." : "Confirmer et créer"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
