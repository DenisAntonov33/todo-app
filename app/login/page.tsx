"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth/login";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async () => {
      return await login({ email, password });
    },
    onSuccess: () => {
      // Invalidate auth query to refresh user state
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      // Redirect to todos page after successful login
      router.push("/todos");
      router.refresh();
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      return;
    }

    loginMutation.mutate();
  };

  const isSubmitting = loginMutation.isPending;
  const errorMessage = loginMutation.error?.message || null;

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex w-full flex-col items-center gap-2">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Sign In
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Enter your credentials to access your account
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-black"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-black dark:text-zinc-50"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              disabled={isSubmitting}
              className="rounded-md border border-black/[.08] bg-white px-4 py-2 text-black transition-colors focus:border-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black dark:text-zinc-50"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              disabled={isSubmitting}
              className="rounded-md border border-black/[.08] bg-white px-4 py-2 text-black transition-colors focus:border-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          {errorMessage && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer mt-2 flex h-12 w-full items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-[#ccc]"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <span>Don&#39;t have an account?</span>
        <Link
          href="/signup"
          className="font-medium text-black underline hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
