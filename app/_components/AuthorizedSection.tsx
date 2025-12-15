"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";

export function AuthorizedSection() {
  const { logout, isLoggingOut } = useAuth();
  const [isLoggingOutLocal, setIsLoggingOutLocal] = useState(false);

  const handleLogout = () => {
    setIsLoggingOutLocal(true);
    logout();
  };

  const showLoggingOut = isLoggingOut || isLoggingOutLocal;

  return (
    <section className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <Link
        href="/todos"
        className="w-36 flex h-12 32 items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Todos
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        disabled={showLoggingOut}
        className="w-36 cursor-pointer flex h-12 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
      >
        {showLoggingOut ? "Logging out" : "Logout"}
      </button>
    </section>
  );
}
