import type { PageLoad } from './$types';

interface Testimonial {
    text: string;
    author: string;
    time: string;
    avatar: string;
}

export const load: PageLoad = () => {
    const testimonials: Testimonial[] = [
        {
            text: "This platform has completely transformed how we manage our daily operations. The efficiency gains are remarkable!",
            author: "@sarah_educator",
            time: "2 hours ago",
            avatar: "https://raw.githubusercontent.com/huntabyte/shadcn-svelte/main/sites/docs/static/avatars/01.png"
        },
        {
            text: "The student management system is intuitive and has made tracking attendance and progress so much easier.",
            author: "@principal_jones",
            time: "5 hours ago",
            avatar: "https://raw.githubusercontent.com/huntabyte/shadcn-svelte/main/sites/docs/static/avatars/02.png"
        },
        {
            text: "Data analytics features have given us incredible insights into our school's performance metrics.",
            author: "@tech_admin_mike",
            time: "1 day ago",
            avatar: "https://raw.githubusercontent.com/huntabyte/shadcn-svelte/main/sites/docs/static/avatars/03.png"
        },
        {
            text: "Resource planning has never been easier. We've reduced scheduling conflicts by 90%!",
            author: "@ms_thompson",
            time: "2 days ago",
            avatar: "https://raw.githubusercontent.com/huntabyte/shadcn-svelte/main/sites/docs/static/avatars/04.png"
        },
        {
            text: "The all-in-one solution we've been looking for. Highly recommend to all education administrators.",
            author: "@dean_williams",
            time: "3 days ago",
            avatar: "https://raw.githubusercontent.com/huntabyte/shadcn-svelte/main/sites/docs/static/avatars/05.png"
        }
    ];

    return {
        testimonials
    };
}; 