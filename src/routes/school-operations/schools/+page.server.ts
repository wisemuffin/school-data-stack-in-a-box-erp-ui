import { Inspect } from "lucide-svelte";
import type { PageServerLoad } from "./$types";
import { getAllSchools } from "$lib/api/client";
import type { School } from "$lib/api/types/api";

export const load: PageServerLoad = async () => {
    const response = await getAllSchools({ limit: 100000 });
    
    return { 
        schools: response.items 
    };
};