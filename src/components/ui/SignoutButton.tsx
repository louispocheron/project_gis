"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";



const SignoutButton = () => {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    )
}

export default SignoutButton;