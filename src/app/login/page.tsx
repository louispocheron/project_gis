"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@mdi/react";
import { mdiGoogle } from "@mdi/js";
import { Separator } from "@/components/ui/separator"

// import useGetUser from "@/hooks/useGetUser";

const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Ce champs est requis" })
        .email("L'adresse email n'est pas valide"),
    password: z.string().min(6, ({ message: "Le mot de passe doit contenir au moins 6 caractères" })),
})


const LoginPage = () => {
    // const user = useGetUser();
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const router = useRouter();
    const supabase = createClientComponentClient();

    const signInGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })
        router.refresh();
        // router.push("/");
    }

    const signInDiscord = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "discord"
        });

        console.log(data);
        // router.refresh();
        // router.push("/");
    }



    // const handleSignUp = async () => {
    //     await supabase.auth.signUp({
    //         email,
    //         password,
    //         options: {
    //             emailRedirectTo: `${location.origin}/auth/callback`
    //         }
    //     })
    //     router.refresh();
    // }
    const handleLogin = async (values: z.infer<typeof loginFormSchema>) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password
        });

        if (error) {
            console.log(error);
        }
        router.refresh();
        // router.push("/");
    }
    // const handleSignIn = async () => {
    //     await supabase.auth.signInWithPassword({
    //         email,
    //         password
    //     })
    //     router.refresh();
    // }

    return (
        <section className="h-dvh w-dvw flex justify-center items-center bg-background">
            <Card className="w-5/6 p-6 md:w-1/3 md:min-w-96">
                <CardHeader className="text-center">
                    <CardTitle>Connexion</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6 flex flex-col">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Adresse Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="mail" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mot de passe</FormLabel>
                                        <FormControl>
                                            <Input placeholder="mot de passe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-1/2 self-center">Submit</Button>
                            <div className="w-full flex flex-row justify-center items-center m-0">
                                <Separator className="w-1/3 mr-2" />
                                <p>Ou se connecter avec</p>
                                <Separator className="w-1/3 ml-2" />
                            </div>
                            <Button onClick={signInGoogle} variant={"secondary"} className="w-1/2 self-center">
                                <Icon path={mdiGoogle} size={1} />
                                Google
                            </Button>
                            <Button onClick={signInDiscord} variant={"secondary"} className="w-1/2 self-center">
                                Discord
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    )
}

export default LoginPage; 