import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Gestion des Relevés de Notes - Ministère</title>
        <meta
          name="description"
          content="Application de gestion et d'édition des relevés de notes selon le format ministériel"
        />
      </Head>

      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h1 className="text-xl font-bold">Gestion des Relevés</h1>
          </div>
          <nav className="flex space-x-6">
            <Link
              href="/login"
              className="px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="bg-white text-blue-800 px-4 py-2 rounded font-medium hover:bg-gray-100 transition duration-300"
            >
              Inscription
            </Link>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-gray-50">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Application de Gestion des Relevés de Notes
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Solution complète pour la création, l&apos;édition et la gestion des
              relevés de notes conformément au modèle ministériel.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/connexion"
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
              >
                Commencer
              </Link>
              <Link
                href="/apropos"
                className="border border-blue-700 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition duration-300"
              >
                En savoir plus
              </Link>
            </div>
          </div>

          <div className="mt-24 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Format Ministériel</h3>
              <p className="text-gray-600">
                Générez automatiquement des relevés de notes conformes aux
                dernières normes du ministère.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Processus Rapide</h3>
              <p className="text-gray-600">
                Réduisez le temps de traitement et accélérez l&apos;authentification
                des documents.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Gestion Centralisée
              </h3>
              <p className="text-gray-600">
                Conservez et organisez tous les relevés de notes dans une base
                de données sécurisée.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">
                © 2025 Ministère - Tous droits réservés
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/confidentialite"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Confidentialité
              </Link>
              <Link
                href="/conditions"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Conditions d&apos;utilisation
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
