import React from "react";

// Icons
import {
    SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiGreensock,
    SiFastapi, SiFlask, SiFirebase, SiMongodb, SiSqlite, SiGooglecloud,
    SiScikitlearn, SiPandas, SiEspressif, SiRaspberrypi, SiFlutter, SiThreedotjs,
    SiJavascript, SiC, SiDart, SiHtml5, SiCss3, SiNumpy, SiDiscord
} from "react-icons/si";
import {
    FaReact, FaNodeJs, FaPython, FaWifi, FaChartLine, FaMicrochip,
    FaFileCsv, FaChartPie, FaBrain, FaLock, FaBolt, FaDatabase, FaCalculator, FaJava
} from "react-icons/fa";
import { GiBearFace } from "react-icons/gi";

export const iconMap: Record<string, React.ElementType> = {
    // Frontend
    react: FaReact,
    nextjs: SiNextdotjs,
    tailwind: SiTailwindcss,
    framer: SiFramer,
    flutter: SiFlutter,
    javascript: SiJavascript,
    typescript: SiTypescript,
    html5: SiHtml5,
    css3: SiCss3,

    // Backend
    fastapi: SiFastapi,
    flask: SiFlask,
    rest: FaWifi,
    firebase: SiFirebase,
    firebase_functions: FaBolt,
    firestore: FaDatabase,
    sockets: FaWifi,
    mongodb: SiMongodb,
    sqlite: SiSqlite,
    gcp: SiGooglecloud,
    node: FaNodeJs,
    java: FaJava,

    // ML
    python: FaPython,
    sklearn: SiScikitlearn,
    pandas: SiPandas,
    numpy: SiNumpy,
    matplotlib: FaChartPie,

    // Embedded
    esp32: SiEspressif,
    esp8266: SiEspressif,
    msp430: FaMicrochip,
    raspberrypi: SiRaspberrypi,
    rfid: FaWifi,
    c_embedded: SiC,
    sensors: FaMicrochip, // Generic chip for hardware

    // Project
    threejs: SiThreedotjs,
    zustand: GiBearFace,
    gsap: SiGreensock,
    dart: SiDart,
};
