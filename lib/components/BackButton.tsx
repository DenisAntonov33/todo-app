import Link from "next/link";

interface BackButtonProps {
  href: string;
}

export function BackButton({ href }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
    >
      ← Back
    </Link>
  );
}
