// app/student/transcripts/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Transcript {
  id: string;
  year: string;
  level: string;
  moyenne: number;
  credits: number;
}

export default function TranscriptsPage() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const response = await fetch("/api/transcripts");
        const data = await response.json();
        if (data.success) {
          setTranscripts(data.data);
        } else {
          setError(data.error || "Failed to load transcripts");
        }
      } catch (err) {
        setError("Failed to load transcripts");
      } finally {
        setLoading(false);
      }
    };

    fetchTranscripts();
  }, []);

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
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Transcripts</h1>

      {transcripts.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded">
          <p>No transcripts configured yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transcripts.map((transcript) => (
            <div
              key={transcript.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">
                    {transcript.level} - {transcript.year}
                  </h2>
                  <p className="text-gray-600">
                    Average: {transcript.moyenne.toFixed(2)} | Credits:{" "}
                    {transcript.credits}
                  </p>
                </div>
                <button
                  onClick={() =>
                    router.push(
                      `/etudiant/remplir-releves/releve/${transcript.id}`
                    )
                  }
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Fill Transcript
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
