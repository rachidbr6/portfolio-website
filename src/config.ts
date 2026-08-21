export const config = {
    developer: {
        name: "Rachid",
        fullName: "Rachid Bourjila",
        title: "Software Engineering and Industry 4.0",
        description: "Engineering student blending industrial IoT, AI/ML, and full-stack development to turn shop-floor data into performance. Convinced that technology only matters when it concretely improves the process."
    },
    social: {
        github: "rachidbr6",
        email: "rachid.bourjila13@gmail.com",
        location: "Nancy, France"
    },
    about: {
        title: "About Me",
        description: "I started on the technical side and moved toward the human side on purpose.\n\nSoftware engineering at Mines Rabat taught me how things get built. Industrial engineering and innovation management at ENSGSI Nancy taught me why most of what gets built never lands. That's the space I work in now: between the people who make the technology and the people who have to live with it, making sure something actually changes at the end."
    },
    experiences: [
        {
            position: "AI Deployment Project Manager",
            company: "CPAM de Meurthe-et-Moselle",
            period: "Now",
            location: "Meurthe-et-Moselle, France",
            description: "A portfolio of over 100 generative AI use cases, a 620 person organization, and health data rules that decide the architecture before anyone writes a line of code. The interesting problem is not the models. It is getting people to use them.",
            responsibilities: [],
            technologies: ["Generative AI", "Change Management", "Health Data Compliance"]
        },
        {
            position: "Digitalization & Industrial AI Intern",
            company: "OCP Group — Maintenance Department",
            period: "2025",
            location: "Morocco",
            description: "Deployed an end-to-end IoT pipeline (sensors → MQTT → InfluxDB → real-time dashboards) and applied machine learning to detect equipment anomalies before failure.",
            responsibilities: [
                "Deployed an IoT pipeline: temperature, vibration and pressure sensors → MQTT broker → InfluxDB → real-time dashboards",
                "Built Python scripts for automated sensor data processing and anomaly detection with Isolation Forest",
                "Shipped Power BI dashboards for TRS/OEE indicators, cutting analysis time by 40% for maintenance teams",
                "Drove continuous improvement (TPM): 5 Whys and Ishikawa root-cause analysis, technical procedure write-ups"
            ],
            technologies: ["Python", "IoT", "MQTT", "InfluxDB", "Power BI", "Isolation Forest", "TPM"]
        },
        {
            position: "Web Development & Technical Support Intern",
            company: "RAMSA",
            period: "2024",
            location: "Agadir, Morocco",
            description: "Built a full-stack leave management application with a built-in HR chatbot, digitalizing RAMSA's leave request workflow.",
            responsibilities: [
                "Built a leave management web app (PHP, MySQL, Bootstrap, AJAX) with hierarchical approval: department head → division head → HR",
                "Built a chatbot embedded in the employee dashboard answering policy/procedure questions with no external API dependency",
                "Wrote functional documentation and trained end users"
            ],
            technologies: ["PHP", "MySQL", "Bootstrap", "AJAX"]
        },
        {
            position: "Engineering Degree — Systems Engineering & Innovation",
            company: "ENSGSI, INP Nancy",
            period: "2025 - 2027",
            location: "Nancy, France",
            description: "Double-degree engineering program focused on systems engineering, innovation and industrial digitalization.",
            responsibilities: [],
            technologies: ["Systems Engineering", "Innovation", "Digitalization"]
        },
        {
            position: "Engineering Degree — Computer Engineering",
            company: "Mines Rabat",
            period: "2023 - 2025",
            location: "Rabat, Morocco",
            description: "Engineering degree in computer engineering, alongside the double-degree program at ENSGSI Nancy.",
            responsibilities: [],
            technologies: ["Computer Engineering", "Software", "Algorithms"]
        },
        {
            position: "CPGE MPSI / MP — Preparatory Classes",
            company: "Classes Préparatoires",
            period: "2021 - 2023",
            location: "Morocco",
            description: "Intensive preparatory classes in mathematics and physics for competitive entry into engineering schools.",
            responsibilities: [],
            technologies: ["Mathematics", "Physics"]
        }
    ],
    projects: [
        {
            id: 1,
            title: "Industrial AI Assistant",
            category: "AI / IoT",
            technologies: "Python, Isolation Forest, Groq API (Llama 3.3), FastAPI",
            image: "/images/IndustrialAIAssistant.jpg",
            description: "Predictive monitoring system: simulated IoT data, unsupervised anomaly detection, and an LLM agent writing natural-language diagnostics. Exposed through a 3-tab FastAPI dashboard — under 3s latency, ~95% anomaly detection.",
            link: "https://github.com/rachidbr6"
        },
        {
            id: 2,
            title: "Predictive Maintenance — OCP Group",
            category: "Industrial IoT / AI",
            technologies: "MQTT, InfluxDB, Power BI, Isolation Forest, MCP Protocol",
            image: "/images/OCPPredictiveMaintenance.jpg",
            description: "PFE internship at OCP Group: an IoT pipeline (sensors → MQTT → InfluxDB → Power BI) with anomaly detection, plus an MCP server connecting LLMs to vibration-analysis tools (FFT, bearing defects, remaining life estimation).",
            link: ""
        },
        {
            id: 3,
            title: "Visual Defect Detection",
            category: "Computer Vision",
            technologies: "Python, EfficientNetB0, ONNX, TensorRT, OpenCV",
            image: "/images/VisualDefectDetection.jpg",
            description: "Computer vision system classifying conforming vs. defective parts (MVTec AD dataset). Fine-tuned EfficientNetB0, deployed on Jetson Nano via TensorRT with real-time OpenCV line simulation — 96.5% accuracy, 97.1% recall.",
            link: "https://github.com/rachidbr6"
        },
        {
            id: 4,
            title: "RAMSA — Leave Management & Chatbot",
            category: "Full-Stack / Web",
            technologies: "PHP, MySQL, Bootstrap, AJAX",
            image: "/images/RAMSA.jpg",
            description: "Leave management platform with hierarchical approval workflow, plus a built-in chatbot answering HR policy questions with no external API dependency.",
            link: ""
        },
        {
            id: 5,
            title: "Agronov — The Farmer in 2035 with AI",
            category: "Group Project / Foresight",
            technologies: "Power BI, Field Research, Strategic Foresight",
            image: "/images/Agronov.jpg",
            description: "ENSGSI group project for AgrOnov: exploring how AI will reshape farming by 2035 through farmer interviews, prospective scenarios and a strategic roadmap.",
            link: ""
        },
        {
            id: 6,
            title: "Ultron — Personal AI Assistant",
            category: "AI / Voice Assistant",
            technologies: "Python, Speech Recognition, Wake Word Detection, Email API",
            image: "/images/Ultron.jpg",
            description: "A personal voice-activated assistant: wake-word activation, reads and triages emails, runs simple tasks, and controls the laptop hands-free.",
            link: "https://github.com/rachidbr6"
        },
        {
            id: 7,
            title: "Victorian Library",
            category: "Personal Project / Web App",
            technologies: "Catalog, Search, Tags, Reading Log",
            image: "/images/VictorianLibrary.jpg",
            description: "A personal book library app with a Victorian, card-catalog aesthetic — search, tag and track what you've read through a dedicated reading log.",
            link: "https://github.com/rachidbr6"
        }
    ],
    contact: {
        email: "rachid.bourjila13@gmail.com",
        github: "https://github.com/rachidbr6",
        linkedin: "https://www.linkedin.com/in/rachid-b-936085294/"
    },
    skills: [
        {
            title: "BUILD",
            description: "AI and IoT systems",
            details: "IoT pipelines and machine learning models that catch failures before they cost downtime. Raspberry Pi sensor nodes, Isolation Forest, CNN vision models, LLM agents on top.",
            tools: ["Python", "Raspberry Pi", "MQTT", "TensorFlow", "Scikit-learn", "OpenCV", "Isolation Forest", "Groq API", "FastAPI"]
        },
        {
            title: "MEASURE",
            description: "Industrial performance",
            details: "Power BI dashboards, REST APIs and TRS/OEE tracking that give maintenance teams a number they can act on. Lean and TPM method underneath, not just charts.",
            tools: ["Power BI", "SQL", "Excel", "KNIME", "InfluxDB", "Grafana", "TRS/OEE", "Lean", "TPM"]
        },
        {
            title: "DEPLOY",
            description: "AI adoption at scale",
            details: "Taking AI use cases from backlog to daily use across an organization. Scoping, prioritization, workshops and compliance, because a tool nobody adopts is worth nothing.",
            tools: ["HTML", "CSS", "Docker", "Git", "GitHub", "REST APIs", "Agile", "Change Management", "Vercel"]
        }
    ]
};
