import { Home, School, Users, BookOpen, Building, GraduationCap, ChartBar } from 'lucide-svelte';

export const mainNav = [
    {
        title: "Home",
        href: "/",
        icon: Home
    },
    {
        title: "School Operations",
        href: "/school-operations",
        icon: School
    },
    {
        title: "Schools",
        href: "/school-operations/schools",
        icon: Building
    },
    {
        title: "Students",
        href: "/school-operations/students",
        icon: Users
    },
    {
        title: "Courses",
        href: "/school-operations/courses",
        icon: BookOpen
    },
    {
        title: "Analytics",
        href: "/analytics",
        icon: GraduationCap,
    },
    {
        title: "Enrollments",
        href: "/analytics/enrollments",
        icon: ChartBar,
    }
] as const; 