import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const useGetUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function handleGetUser() {
            const supabase = createClientComponentClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
        handleGetUser();
    }, []);

    return user;

};

export default useGetUser;

