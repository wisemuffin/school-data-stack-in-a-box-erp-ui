import { Inspect } from "lucide-svelte";
import type { PageServerLoad } from "./$types.ts";
import type {School} from "./schools/data-table-components/data-table-columns.ts"
import type {Student} from "./students/data-table-components/data-table-columns.ts"


export const load: PageServerLoad = async ( {fetch}) => {
    // logic to fetch payments data here

    const res = await fetch("http://127.0.0.1:8000/schools")
    const schools = (await res.json()) as {
        items: School[]
    }
    console.log(schools)

    const res_students = await fetch("http://127.0.0.1:8000/students?limit=1000000")
    const students = (await res_students.json()) as {
        items: Student[]
    }
    console.log(students)

    return {schools: schools.items.length, students: students.items.length};
}

