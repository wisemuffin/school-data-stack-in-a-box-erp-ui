import { Home, School, Users, BookOpen, Building, GraduationCap, ChartBar, LineChart, FileText, Layout } from 'lucide-svelte';

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
        title: "Classes",
        href: "/school-operations/classes",
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
    },
    {
        title: "Demos",
        href: "/demo",
        icon: ChartBar,
    },
    {
        title: "Graphs",
        href: "/demo/graphs",
        icon: LineChart,
    },
    {
        title: "Demo Table",
        href: "/demo/table",
        icon: ChartBar,
    },
    {
        title: "Demo Report",
        href: "/demo/report",
        icon: FileText,
    },
    {
        title: "Demo Landing",
        href: "/demo/landing",
        icon: Layout,
    },
] as const; 