import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/auth";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Todo App
      </h1>

      {!!user ? (
        <section className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/todos"
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:w-auto"
          >
            Todos
          </Link>
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:w-auto"
          >
            Logout
          </button>
        </section>
      ) : (
        <section className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:w-auto"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:w-auto"
          >
            Sign Up
          </Link>
        </section>
      )}
    </div>
  );
}
