import { Inspect } from "lucide-svelte";
import type { PageServerLoad } from "./$types";
import type {Payment} from "./columns"

// type Payment = {
//     id: string;
//     amount: number;
//     status: "pending" | "processing" | "success" | "failed";
//     email: string;
// };

export const data: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
    // ...
];


export const load: PageServerLoad =  (event) => {
    // logic to fetch payments data here


    const payments = data;
    return {
        payments,
    };
}