"use client";
import { FiLogOut } from "react-icons/fi"; // optional icon
import { seDeconnecter } from "@/lib/auth-actions";
import { useActionState } from "react";

export default function LogoutButton() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch, isPending] = useActionState(seDeconnecter, null);

  return (
    <form action={dispatch}>
      <button
        type="submit"
        className="flex cursor-pointer items-center gap-2 text-sm text-red-400 hover:text-red-600 transition-colors"
      >
        <FiLogOut className="w-4 h-4" />
        <span>{isPending ? "Se déconnecter..." : "Se déconnecter"}</span>
      </button>
    </form>
  );
}
