import SignoutButton from "@/components/ui/SignoutButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <SignoutButton />
      ) : (
        <Link href="/login">Se connecter</Link>
      )}
      {user ? <p>Logged in as {JSON.stringify(user)}</p> : <p>Not logged in</p>}
    </main>
  );
}
