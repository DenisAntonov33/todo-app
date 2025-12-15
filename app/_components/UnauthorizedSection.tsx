import Link from "next/link";

export function UnauthorizedSection() {
  return (
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
  );
}
