export interface TechItem {
    name: string;
    icon: string;
    description: string;
}

export const techData: TechItem[] = [
    {
        name: "Next.js",
        icon: "⚡️",
        description: "Server-side rendering so fast it feels like time travel.",
    },
    {
        name: "TypeScript",
        icon: "🛡️",
        description: "JavaScript, but with a safety belt and a helmet.",
    },
    {
        name: "React",
        icon: "⚛️",
        description: "Turning coffee into reusable components.",
    },
    {
        name: "Tailwind CSS",
        icon: "🎨",
        description: "Styled components without the PhD in naming things.",
    },
    {
        name: "Framer Motion",
        icon: "🎬",
        description: "Making divs dance smoother than I ever could.",
    },
    {
        name: "Node.js",
        icon: "🟢",
        description: "JavaScript outside the browser? What a time to be alive.",
    },
    {
        name: "Python",
        icon: "🐍",
        description: "For when I need to speak to data without a translator.",
    },
    {
        name: "PostgreSQL",
        icon: "🐘",
        description: "Because forgetting data is not an option.",
    },
];
