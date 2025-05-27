"use client";

import Head from "next/head";
import { useActionState, useState } from "react";
import {
  handleStudentSignIn,
  handleAdminSignIn,
  handleChefDepartementSignIn, // make sure this is correctly exported from your lib
} from "@/lib/auth-actions";

export default function ConnexionForm() {
  const [activeTab, setActiveTab] = useState<"student" | "admin" | "chef">(
    "student"
  );

  const [studentState, studentDispatch, isStudentPending] = useActionState(
    handleStudentSignIn,
    null
  );
  const [adminState, adminDispatch, isAdminPending] = useActionState(
    handleAdminSignIn,
    null
  );
  const [chefState, chefDispatch, isChefPending] = useActionState(
    handleChefDepartementSignIn,
    null
  );

  const state =
    activeTab === "student"
      ? studentState
      : activeTab === "admin"
      ? adminState
      : chefState;

  const isPending =
    activeTab === "student"
      ? isStudentPending
      : activeTab === "admin"
      ? isAdminPending
      : isChefPending;

  const dispatch =
    activeTab === "student"
      ? studentDispatch
      : activeTab === "admin"
      ? adminDispatch
      : chefDispatch;

  return (
    <div
      className="min-h-screen text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
          #0c0d2e
        `,
      }}
    >
      <Head>
        <title>Connexion</title>
      </Head>

      {/* خلفية دوائر متحركة */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl top-32 right-10 animate-pulse" />
        <div className="absolute w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-2xl bottom-10 left-32 animate-pulse-slow" />
        <div className="absolute w-64 h-64 bg-cyan-500 opacity-15 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Connexion
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Connectez-vous pour accéder à votre compte
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 hover:bg-white/15 transition-all duration-300">
          {/* Tabs */}
          <div className="flex border-b border-white/20 mb-6 space-x-4">
            <button
              type="button"
              className={`py-2 px-4 font-medium text-sm focus:outline-none transition-all duration-300 ${
                activeTab === "student"
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("student")}
            >
              Étudiant
            </button>
            <button
              type="button"
              className={`py-2 px-4 font-medium text-sm focus:outline-none transition-all duration-300 ${
                activeTab === "chef"
                  ? "border-b-2 border-purple-500 text-purple-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("chef")}
            >
              Chef de Département
            </button>
            <button
              type="button"
              className={`py-2 px-4 font-medium text-sm focus:outline-none transition-all duration-300 ${
                activeTab === "admin"
                  ? "border-b-2 border-pink-500 text-pink-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("admin")}
            >
              Admin
            </button>
          </div>

          {state?.error && (
            <div className="mb-4 bg-red-500/20 border border-red-500/30 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-300">
                    {state.error.split(".")[0]}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" action={dispatch}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={
                    activeTab === "student"
                      ? "exemple@etudiant.com"
                      : activeTab === "admin"
                      ? "exemple@admin.com"
                      : "exemple@chef.com"
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Votre mot de passe"
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:shadow-blue-500/50 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? "Connexion..." : "Se connecter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
