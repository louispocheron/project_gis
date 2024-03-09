import SignoutButton from "@/components/ui/SignoutButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: { user } } = await supabase.auth.getUser();
  console.log(user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignoutButton />
      {user ? <p>Logged in as {user.email}</p> : <p>Not logged in</p>}
    </main>
  );
}
