"use client";

import { AnneeNote } from "@/types";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../../../public/Logo-umbb-crsic_1.png";

export default function Pdf() {
  const { id } = useParams();
  const [transcript, setTranscript] = useState<AnneeNote | null>(null);
  const [loading, setLoading] = useState(true);

  // Call the fetch function when the component mounts
  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const response = await fetch(`/api/transcripts/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTranscript(data.data);
      } catch (error) {
        console.error("Error fetching transcript:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTranscript();
  }, [id]);
  console.log(transcript?.semestreNotes);

  // Function to render table rows dynamically
  const renderTableRows = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={16} className="text-center p-4">
            Loading transcript data...
          </td>
        </tr>
      );
    }

    if (!transcript) {
      return (
        <tr>
          <td colSpan={16} className="text-center p-4">
            No transcript data available
          </td>
        </tr>
      );
    }

    const rows: JSX.Element[] = [];

    // Process each semestre note from the transcript
    transcript.semestreNotes.forEach((semestreNote, semestreIndex) => {
      const semestre = semestreNote.semestre;
      const totalRowsInSemestre = semestreNote.uniteNotes.reduce(
        (sum, uniteNote) => sum + uniteNote.moduleNotes.length,
        0
      );

      let rowIndexInSemestre = 0;

      semestreNote.uniteNotes.forEach((uniteNote, uniteIndex) => {
        const unite = uniteNote.unite;
        uniteNote.moduleNotes.forEach((moduleNote, matiereIndex) => {
          const Module = moduleNote.module;
          const row = [];

          // Semester column (only for first row of semester)
          if (rowIndexInSemestre === 0) {
            row.push(
              <td
                key={`sem-${semestreIndex}`}
                className="border border-gray-300 p-3 text-center font-semibold"
                rowSpan={totalRowsInSemestre}
              >
                {semestre.nom}
              </td>
            );
          }

          // UE columns (only for first row of each UE)
          if (matiereIndex === 0) {
            row.push(
              <td
                key={`nature-${semestreIndex}-${uniteIndex}`}
                className="border border-gray-300 p-2 text-center"
                rowSpan={uniteNote.moduleNotes.length}
              >
                {unite.nom.includes("uef")
                  ? "Fondamentale"
                  : unite.nom.includes("Transversale")
                  ? "Transversale"
                  : "Découverte"}
              </td>
            );
            row.push(
              <td
                key={`code-${semestreIndex}-${uniteIndex}`}
                className="border border-gray-300 p-2 text-center font-mono"
                rowSpan={uniteNote.moduleNotes.length}
              >
                {unite.nom.split(" ")[0]} {semestre.ordre}.{uniteIndex + 1}
              </td>
            );
            row.push(
              <td
                key={`credits-ue-${semestreIndex}-${uniteIndex}`}
                className="border border-gray-300 p-2 text-center"
                rowSpan={uniteNote.moduleNotes.length}
              >
                {unite.credits}
              </td>
            );
            row.push(
              <td
                key={`coef-ue-${semestreIndex}-${uniteIndex}`}
                className="border border-gray-300 p-2 text-center"
                rowSpan={uniteNote.moduleNotes.length}
              >
                {unite.coefficient}
              </td>
            );
          }

          // Matiere columns
          row.push(
            <td
              key={`matiere-${semestreIndex}-${uniteIndex}-${matiereIndex}`}
              className="border border-gray-300 p-2 whitespace-nowrap min-w-[200px]"
            >
              {Module.nom}
            </td>
          );
          row.push(
            <td
              key={`credits-mat-${semestreIndex}-${uniteIndex}-${matiereIndex}`}
              className="border border-gray-300 p-2 text-center"
            >
              {Module.credits}
            </td>
          );
          row.push(
            <td
              key={`coef-mat-${semestreIndex}-${uniteIndex}-${matiereIndex}`}
              className="border border-gray-300 p-2 text-center"
            >
              {Module.coefficient}
            </td>
          );

          // Notes Matiere
          row.push(
            <td
              key={`note-mat-${semestreIndex}-${uniteIndex}-${matiereIndex}`}
              className="border border-gray-300 p-2 text-center"
            >
              {moduleNote.note.toFixed(2)}
            </td>
          );
          row.push(
            <td
              key={`credits-note-mat-${semestreIndex}-${uniteIndex}-${matiereIndex}`}
              className="border border-gray-300 p-2 text-center"
            >
              {moduleNote.credits}
            </td>
          );
          row.push(
            <td
              key={`session-mat-${semestreIndex}-${uniteIndex}-${matiereIndex}`}
              className="border border-gray-300 p-2 text-center text-xs"
            >
              {`S${semestre.ordre} ${transcript.annee.slice(2, 4)}${(
                parseInt(transcript.annee.slice(2, 4)) + 1
              )
                .toString()
                .slice(-2)}`}
            </td>
          );

          // Notes UE (only for first row of each UE)
          if (matiereIndex === 0) {
            row.push(
              <td
                key={`note-ue-${semestreIndex}-${uniteIndex}`}
                className="border border-gray-300 p-2 text-center"
                rowSpan={uniteNote.moduleNotes.length}
              >
                {uniteNote.note.toFixed(2)}
              </td>
            );
            row.push(
              <td
                key={`credits-note-ue-${semestreIndex}-${uniteIndex}`}
                className="border border-gray-300 p-2 text-center"
                rowSpan={uniteNote.moduleNotes.length}
              >
                {uniteNote.credits}
              </td>
            );
            row.push(
              <td
                key={`session-ue-${semestreIndex}-${uniteIndex}`}
                className="border border-gray-300 p-2 text-center text-xs"
                rowSpan={uniteNote.moduleNotes.length}
              >
                {`S${semestre.ordre} ${transcript.annee.slice(2, 4)}${(
                  parseInt(transcript.annee.slice(2, 4)) + 1
                )
                  .toString()
                  .slice(-2)}`}
              </td>
            );
          }

          // Notes Semestre (only for first row of semester)
          if (rowIndexInSemestre === 0) {
            row.push(
              <td
                key={`note-sem-${semestreIndex}`}
                className="border border-gray-300 p-2 text-center font-bold"
                rowSpan={totalRowsInSemestre}
              >
                {semestreNote.note.toFixed(2)}
              </td>
            );
            row.push(
              <td
                key={`credits-note-sem-${semestreIndex}`}
                className="border border-gray-300 p-2 text-center"
                rowSpan={totalRowsInSemestre}
              >
                {semestreNote.credits}
              </td>
            );
            row.push(
              <td
                key={`session-sem-${semestreIndex}`}
                className="border border-gray-300 p-2 text-center text-xs"
                rowSpan={totalRowsInSemestre}
              >
                {`S${semestre.ordre} ${transcript.annee.slice(2, 4)}${(
                  parseInt(transcript.annee.slice(2, 4)) + 1
                )
                  .toString()
                  .slice(-2)}`}
              </td>
            );
          }

          rows.push(
            <tr
              key={`row-${semestreIndex}-${uniteIndex}-${matiereIndex}`}
              className={
                rowIndexInSemestre === 0 && semestreIndex > 0
                  ? "border-t-2 border-gray-400"
                  : ""
              }
            >
              {row}
            </tr>
          );

          rowIndexInSemestre++;
        });
      });
    });

    return rows;
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-full overflow-x-auto rounded-lg shadow-lg p-5">
        <div className="flex items-center mb-4">
          <Image src={logo} alt="UMBB" width={50} height={50} />
          <div className="ml-4">
            <h2>University Mhamed Bougerra</h2>
            <h2>Faculté des Sciences et de la Technologie</h2>
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold mb-4">Relevé de notes</h2>
        <h2 className="mb-4">Année universitaire : {transcript?.annee}</h2>
        <div className="flex w-full justify-between ">
          <h2 className="mb-4">Nom : {transcript?.etudiant.user.nom}</h2>
          <h2 className="mb-4">Prenom : {transcript?.etudiant.user.prenom}</h2>
          <h2 className="mb-4">
            Date et lieu de naissance:{" "}
            {transcript?.etudiant.dateNaissance
              ? new Date(transcript.etudiant.dateNaissance).toLocaleDateString()
              : ""}{" "}
            á {transcript?.etudiant.lieuNaissance}
          </h2>
        </div>
        <h2 className="mb-4">Matricule : {transcript?.etudiant.matricule}</h2>
        <div className="flex w-full justify-between ">
          <h2 className="mb-4">Domaine : {transcript?.etudiant.domaine}</h2>
          <h2 className="mb-4">Filière : {transcript?.etudiant.filiere}</h2>
          <h2 className="mb-4">
            Spécialité : {transcript?.etudiant.specialite}
          </h2>
        </div>
        <h2 className="mb-2">
          Diplôme Préparé : {transcript?.etudiant.typeDiplome}
        </h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th
                className="border border-gray-300 p-3 text-center font-semibold"
                rowSpan={3}
              >
                Semestre
              </th>
              <th
                className="border border-gray-300 p-3 text-center font-semibold"
                colSpan={4}
                rowSpan={2}
              >
                Unité d&apos;enseignement (UE)
              </th>
              <th
                className="border border-gray-300 p-3 text-center font-semibold"
                colSpan={3}
                rowSpan={2}
              >
                Matière constitutive (s) d&apos;unité d&apos;enseignement
              </th>
              <th
                className="border border-gray-300 p-3 text-center font-semibold"
                colSpan={9}
                rowSpan={1}
              >
                Résultats obtenus
              </th>
            </tr>
            <tr>
              <th
                className="border border-gray-300 p-2 text-center font-semibold"
                colSpan={3}
                rowSpan={1}
              >
                Matière
              </th>
              <th
                className="border border-gray-300 p-2 text-center font-semibold"
                colSpan={3}
                rowSpan={1}
              >
                UE
              </th>
              <th
                className="border border-gray-300 p-2 text-center font-semibold"
                colSpan={3}
                rowSpan={1}
              >
                Semestre
              </th>
            </tr>
            <tr className="text-xs">
              <th className="border border-gray-300 p-2 text-center font-medium">
                Nature
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Code et intitulé
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Crédits requis
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Coef
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium min-w-[200px]">
                Intitulés
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Crédits requis
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Coef
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Note
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Crédits
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Session/Année
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Note
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Crédits
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Session/Année
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Note
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Crédits
              </th>
              <th className="border border-gray-300 p-2 text-center font-medium">
                Session/Année
              </th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        <div className="mt-4 flex justify-between">
          <h2>Moyenne Anuelle : {transcript?.moyenne?.toFixed(2)}</h2>
          <h2>
            Total des crédits cumulés pour l&apos;année (S1+S2) :{" "}
            {transcript?.credits}
          </h2>
          <h2>
            Total des crédits cumulés dans le cursus : {transcript?.credits}
          </h2>
        </div>
        <h1>Décision : {transcript?.statut}</h1>
      </div>
    </div>
  );
}
