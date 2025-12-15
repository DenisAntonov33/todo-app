import { getCurrentUser } from "@/lib/auth/auth";
import { AuthorizedSection } from "@/app/_components/AuthorizedSection";
import { UnauthorizedSection } from "@/app/_components/UnauthorizedSection";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Todo App
      </h1>

      {!!user ? <AuthorizedSection /> : <UnauthorizedSection />}
    </div>
  );
}
