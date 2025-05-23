"use client";

import { seDeconnecter } from "@/lib/auth-actions";
import { useActionState } from "react";

export default function LogoutButton() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch, isPending] = useActionState(seDeconnecter, null);
  return (
    <form action={dispatch}>
      <button
        type="submit"
        className="w-full flex cursor-pointer items-center justify-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        disabled={isPending}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            clipRule="evenodd"
          />
        </svg>
        {isPending ? "Se déconnecter..." : "Se déconnecter"}
      </button>
    </form>
  );
}
