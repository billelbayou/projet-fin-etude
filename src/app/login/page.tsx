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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Connexion</title>
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connexion
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Connectez-vous pour accéder à votre compte
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6 space-x-4">
            <button
              type="button"
              className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                activeTab === "student"
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("student")}
            >
              Étudiant
            </button>
            <button
              type="button"
              className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                activeTab === "chef"
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("chef")}
            >
              Chef de Département
            </button>
            <button
              type="button"
              className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                activeTab === "admin"
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("admin")}
            >
              Admin
            </button>
          </div>

          {state?.error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
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
                  <p className="text-sm text-red-700">
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
                className="block text-sm font-medium text-gray-700"
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
                  className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
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
                  className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
