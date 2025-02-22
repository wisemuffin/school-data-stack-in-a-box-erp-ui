import { Inspect } from "lucide-svelte";
import type { PageServerLoad } from "./$types";
import { getAllSchools } from "$lib/api/erp/erp_client";
import type { School } from "$lib/api/erp/types/erp_api";

export const load: PageServerLoad = async () => {
    const response = await getAllSchools({ limit: 100000 });
    
    return { 
        schools: response.items 
    };
};