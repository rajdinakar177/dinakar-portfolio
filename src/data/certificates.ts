export type Certificate = {
    title: string;
    issuer: string;
    date: string;
    type: "Certification" | "Appreciation" | "Achievement";
    description?: string;
    image: string;
    credentialUrl?: string;
    link?: string;
};

export const certificates: Certificate[] = [
    {
        title: "Full Stack Web Development",
        issuer: "Mayura Consultancy Services",
        date: "2024",
        type: "Certification",
        description:
            "Certificate recognizing my experience and contribution as a Full Stack Developer.",
        image: "/certificates/certificate_of_ap.webp",
    },
    {
        title: "Diploma in Software Engineering",
        issuer: "Skill Konnect",
        date: "2023",
        type: "Certification",
        description:
            "Diploma in Software Engineering covering fundamental software development concepts and practical programming skills.",
        image: "/certificates/diploma_certificate.webp",
    },
];