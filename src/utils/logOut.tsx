"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/", // a dónde ir después del logout
        })
      }
      className="btn btn-error"
    >
      Logout
    </button>
  );
}
