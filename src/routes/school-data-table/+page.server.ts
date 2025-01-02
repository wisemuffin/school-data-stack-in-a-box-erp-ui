import { Inspect } from "lucide-svelte";
import type { PageServerLoad } from "./$types";
import type {School} from "./columns"

// type Payment = {
//     id: string;
//     amount: number;
//     status: "pending" | "processing" | "success" | "failed";
//     email: string;
// };

// const data: School[] = [
//     {
//         id: "728ed52f",
//         amount: 100,
//         status: "pending",
//         email: "m@example.com",
//     },
//     {
//         id: "489e1d42",
//         amount: 125,
//         status: "processing",
//         email: "example@gmail.com",
//     },
//     // ...
// ];


export const load: PageServerLoad = async ( {fetch}) => {
    // logic to fetch payments data here

    const res = await fetch("http://127.0.0.1:8000/schools")
    const data = (await res.json()) as {
        items: School[]
    }
    console.log(data)

    return {schools: data.items};
}