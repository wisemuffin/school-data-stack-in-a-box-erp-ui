import type { PageServerLoad } from "./$types";
import { getAllStudents } from "$lib/api/client";
import type { Student } from "$lib/api/types/api";

export const load: PageServerLoad = async () => {
    const response = await getAllStudents({ limit: 100000 });
    
    return { 
        students: response.items 
    };
};