import { Inspect } from "lucide-svelte";
import type { PageServerLoad } from "./$types";
import type {School} from "./columns.ts"


export const load: PageServerLoad = async ( {fetch}) => {
    // logic to fetch payments data here

    const res = await fetch("http://127.0.0.1:8000/schools")
    const data = (await res.json()) as {
        items: School[]
    }
    console.log(data)

    return {schools: data.items};
}