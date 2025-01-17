import { Inspect } from "lucide-svelte";
import type { PageServerLoad } from "./$types.ts";
import type {Student} from "./columns.ts"


export const load: PageServerLoad = async ( {fetch}) => {
    // logic to fetch payments data here

    const res = await fetch("http://127.0.0.1:8000/students/?limit=100000")
    const data = (await res.json()) as {
        items: Student[]
    }
    console.log(data)

    return {students: data.items};
}