import { Inspect } from "lucide-svelte";
import type { PageServerLoad } from "./$types.ts";
import type {School} from "./columns.ts"
import * as api from "$lib/api/client.ts"


export const load: PageServerLoad = async ( {fetch}) => {
    // logic to fetch payments data here

    const data = await api.get("schools") as {
            items: School[]
        }
    console.log(data)

    return {schools: data.items};
}