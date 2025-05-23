import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">
          Canevas créé avec succès!
        </h2>
        <p className="text-gray-600 mb-6">
          Le canevas de relevés a été créé avec succès. Vous pouvez maintenant
          le visualiser dans la liste des canevas.
        </p>
        <div className="flex justify-center">
          <Link
            href="/admin/canevas-releves"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Retour à la liste des canevas
          </Link>
        </div>
      </div>
    </div>
  );
}
