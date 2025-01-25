import type { PageServerLoad } from "./$types";
import { getAllClasses } from "$lib/api/client";

export const load: PageServerLoad = async () => {
    const response = await getAllClasses({ limit: 100000 });
    
    return { 
        courses: response.items 
    };
}; 