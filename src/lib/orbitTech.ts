export interface OrbitTechItem {
    id: string;
    name: string;
    category: "frontend" | "backend" | "ml" | "embedded" | "cloud" | "tool";
    description: string;
    color: string;
}

export const orbitTechData: OrbitTechItem[] = [
    // --- FRONTEND ---
    {
        id: "react",
        name: "React",
        category: "frontend",
        description: "The library that convinced me functions are better than classes. Hooks are my love language.",
        color: "#61dafb",
    },
    {
        id: "nextjs",
        name: "Next.js",
        category: "frontend",
        description: "React, but with a backend, and a router, and... wait, is this a framework or an operating system?",
        color: "#ffffff",
    },
    {
        id: "tailwind",
        name: "Tailwind CSS",
        category: "frontend",
        description: "Writing CSS like it's 1999, but inline and somehow infinitely better.",
        color: "#38bdf8",
    },
    {
        id: "framer",
        name: "Framer Motion",
        category: "frontend",
        description: "Making things move so smoothly you'd think physics was optional.",
        color: "#0055ff",
    },
    {
        id: "flutter",
        name: "Flutter",
        category: "frontend",
        description: "One codebase to rule them all. Widgets all the way down.",
        color: "#02569b",
    },

    // --- BACKEND ---
    {
        id: "fastapi",
        name: "FastAPI",
        category: "backend",
        description: "Python capabilities at Go speeds. Finally, async Python feels right.",
        color: "#009688",
    },
    {
        id: "flask",
        name: "Flask",
        category: "backend",
        description: "For when you need an API in 5 lines of code and 30 seconds.",
        color: "#ffffff",
    },
    {
        id: "rest",
        name: "REST APIs",
        category: "backend",
        description: "The standard bread and butter. GET, POST, PUT, DELETE, REPEAT.",
        color: "#FF5733", // Generic Orange
    },
    {
        id: "firebase",
        name: "Firebase",
        category: "backend",
        description: "Backend-as-a-Service, or as I call it, 'I don't want to manage servers today'.",
        color: "#ffca28",
    },
    {
        id: "sockets",
        name: "WebSockets",
        category: "backend",
        description: "Real-time Magic. Because refreshing the page is so 2010.",
        color: "#ffffff",
    },
    {
        id: "mongodb",
        name: "MongoDB",
        category: "backend",
        description: "Schemaless freedom until you realize you actually needed a schema.",
        color: "#4db33d",
    },
    {
        id: "sqlite",
        name: "SQLite",
        category: "backend",
        description: "The little database that could. It's strictly typed... mostly.",
        color: "#003b57",
    },
    {
        id: "gcp",
        name: "Google Cloud",
        category: "cloud",
        description: "Where my containers live and my credit card fears to tread.",
        color: "#4285f4",
    },

    // --- ML / PYTHON ---
    {
        id: "python",
        name: "Python",
        category: "ml",
        description: "Executable pseudocode. If you can imagine it, there's a library for it.",
        color: "#3776ab",
    },
    {
        id: "sklearn",
        name: "Scikit-Learn",
        category: "ml",
        description: "Machine Learning for mere mortals. fit() -> predict() -> profit?",
        color: "#f7931e",
    },
    {
        id: "pandas",
        name: "Pandas/NumPy",
        category: "ml",
        description: "Data wrestling champions. I speak fluent DataFrame.",
        color: "#150458",
    },


    // --- EMBEDDED ---
    {
        id: "esp32",
        name: "ESP32",
        category: "embedded",
        description: "Wi-Fi, Bluetooth, and dual cores for the price of a coffee.",
        color: "#e60023",
    },
    {
        id: "msp430",
        name: "MSP430",
        category: "embedded",
        description: "Ultra-low power. Runs on a potato battery (probably).",
        color: "#ff0000", // TI Red
    },
    {
        id: "raspberrypi",
        name: "Raspberry Pi",
        category: "embedded",
        description: "The tiny computer that runs my home automation and dust collection service.",
        color: "#c51a4a",
    },
    {
        id: "rfid",
        name: "RFID Systems",
        category: "embedded",
        description: "Beep. Boop. Access Granted. Magic waves.",
        color: "#39ff14", // Neon Green
    },

    // --- PROJECT STACK ---
    {
        id: "threejs",
        name: "Three.js / R3F",
        category: "frontend",
        description: "Bringing the 3rd dimension to the flat web. Spining cubes are life.",
        color: "#ffffff",
    },
    {
        id: "zustand",
        name: "Zustand",
        category: "tool",
        description: "Redux without the headache. Global state made simple.",
        color: "#493828", // Bear color
    },
    // --- CORE LANGUAGES ---
    {
        id: "javascript",
        name: "JavaScript",
        category: "frontend",
        description: "The language that runs the world. I promise I know the difference between == and ===.",
        color: "#f7df1e",
    },
    {
        id: "typescript",
        name: "TypeScript",
        category: "frontend",
        description: "JavaScript that went to finishing school. I can't live without types anymore.",
        color: "#3178c6",
    },
    {
        id: "java",
        name: "Java",
        category: "backend",
        description: "Write once, debug everywhere. The enterprise juggernaut.",
        color: "#5382a1",
    },
    {
        id: "c_embedded",
        name: "C / Embedded C",
        category: "embedded",
        description: "Pointers, memory management, and segfaults. The original hardcore mode.",
        color: "#555555",
    },
    {
        id: "dart",
        name: "Dart",
        category: "frontend",
        description: "Google's answer to 'why is JS like that?'. Great for Flutter.",
        color: "#0175c2",
    },

    // --- FRONTEND EXTRAS ---
    {
        id: "html5",
        name: "HTML5",
        category: "frontend",
        description: "The skeleton of the web. Semantic tags are cool.",
        color: "#e34f26",
    },
    {
        id: "css3",
        name: "CSS3",
        category: "frontend",
        description: "Making the skeleton look pretty. Flexbox and Grid represent.",
        color: "#1572b6",
    },

    // --- BACKEND / CLOUD EXTRAS ---
    {
        id: "node",
        name: "Node.js",
        category: "backend",
        description: "JavaScript on the server. Because why learn a second language?",
        color: "#339933",
    },
    {
        id: "firebase_functions",
        name: "Cloud Functions",
        category: "backend",
        description: "Serverless code that runs only when you need it.",
        color: "#ffca28",
    },

    // --- DATA & ML EXTRAS ---
    {
        id: "firestore",
        name: "Firestore",
        category: "backend",
        description: "Scalable NoSQL database in the cloud. Real-time goodness.",
        color: "#ffca28",
    },
    {
        id: "numpy",
        name: "NumPy",
        category: "ml",
        description: "High-performance arrays. If loops are too slow, vectorizing is the way.",
        color: "#013243",
    },
    {
        id: "matplotlib",
        name: "Matplotlib",
        category: "ml",
        description: "Plotting graphs like it's 2003, but it gets the job done.",
        color: "#11557c",
    },

    // --- EMBEDDED EXTRAS ---
    {
        id: "esp8266",
        name: "ESP8266",
        category: "embedded",
        description: "The OG cheap Wi-Fi chip. Started the revolution.",
        color: "#607d8b", // Updated to match GPIO/Timers color
    },
    {
        id: "sensors",
        name: "Sensors & Actuators",
        category: "embedded",
        description: "Giving the code eyes, ears, and hands.",
        color: "#4caf50",
    },
    {
        id: "gsap",
        name: "GSAP",
        category: "frontend",
        description: "Animating the web like a movie director.",
        color: "#88ce02",
    },
];
