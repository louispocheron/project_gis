"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { useState } from "react"

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`
            }
        })
        router.refresh();
    }

    const handleSignIn = async () => {
        await supabase.auth.signInWithPassword({
            email,
            password
        })
        router.refresh();
    }

    return (
        <div>
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
            />
            <button onClick={handleSignIn}>
                Login
            </button>
            <button onClick={handleSignUp}>sign Up</button>
        </div>
    )
}

export default LoginPage; 