"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthResponse } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signInFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Ce champs est requis" })
        .email("L'adresse email n'est pas valide"),
    displayName: z.string().min(1, { message: "Ce champs est requis" }),
    password: z.string().min(6, ({ message: "Le mot de passe doit contenir au moins 6 caractères" })),
    confirmPassword: z.string().min(4),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne sont pas identiques",
    path: ["confirmPassword"],
});

const signInPage = () => {
    const [customError, setCustomError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClientComponentClient();

    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            displayName: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleSignUp = async (values: z.infer<typeof signInFormSchema>) => {
        const { data: { user: userCreated }, error }: AuthResponse = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
                data: {
                    display_name: values.displayName
                },
                emailRedirectTo: `${location.origin}/auth/callback`
            }
        })

        if (error) {
            error.status === 400 ? setCustomError("un utilisateur utilise deja cette adresse email") : setCustomError("une erreur est survenue");
            return;
        }
        router.refresh();
        router.push('/');
    }

    return (
        <section className="h-dvh w-dvw flex justify-center items-center bg-background">
            <Card className="w-5/6 p-6 md:w-1/3 md:min-w-96">
                <CardHeader className="text-center">
                    <CardTitle>Connexion</CardTitle>
                </CardHeader>
                <CardContent>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-6 flex flex-col">
                            {customError && <FormMessage>{customError}</FormMessage>}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Adresse Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="mail" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom d'utilisateur</FormLabel>
                                        <FormControl>
                                            <Input placeholder="nom d'utilisateur" {...field} />
                                        </FormControl>
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
                                            <Input placeholder="mot de passe" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Comfirmez le mot de passe</FormLabel>
                                        <FormControl>
                                            <Input placeholder="comfirmez" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-1/2 self-center">S'inscrire</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    )

};

export default signInPage