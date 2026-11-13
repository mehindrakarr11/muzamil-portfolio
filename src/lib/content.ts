// All professional claims originate in the supplied résumé. The project title
// was clarified by the owner. Null links are intentional publishing placeholders.
export const profile = {
  name: "Mohammad Muzamil A",
  role: "Full Stack & Data Analytics Developer",
  location: "Bengaluru, India",
  email: "mohammadmuzamila403@gmail.com",
  phone: "+91 8310774178",
  phoneHref: "+918310774178",
  resume: "/Mohammad-Muzamil-A-Resume.pdf",
  linkedin: null as string | null,
  github: null as string | null,
};

export const project = {
  title: "Supply Chain Intelligence",
  category: "Full-stack development / Predictive analytics",
  summary: "A connected view of supply-chain data. A MERN web interface meets a Python machine-learning backend to turn simulated product demand into actionable forecasts.",
  technologies: ["React", "Node.js", "Express", "MongoDB", "Python", "Scikit-learn"],
  repository: null as string | null,
  demo: null as string | null,
  screenshot: null as string | null,
  details: [
    { title: "One connected system", text: "A MERN-based web interface integrated with a Python machine-learning backend, bringing application development and predictive analytics into one platform." },
    { title: "From data to demand", text: "Demand-forecasting models built with Scikit-learn and evaluated across simulated product categories. The résumé reports improved forecasting accuracy; no numerical benchmark was supplied." },
    { title: "Built around the data", text: "MongoDB schema design and optimized REST API endpoints support the flow of real-time analytics data between the application and its backend." },
  ],
};

export const skillGroups = [
  {
    id: "full-stack", label: "Full stack", number: "01",
    title: "From the first pixel\nto the final endpoint.",
    description: "Building the layers that connect people to useful software, from responsive interfaces to APIs and databases.",
    skills: ["React.js", "JavaScript (ES6+)", "Node.js", "Express.js", "HTML5", "CSS3", "Tailwind CSS", "RESTful APIs"],
    note: "INTERFACES / APPLICATION LOGIC / APIs",
  },
  {
    id: "data", label: "Data & intelligence", number: "02",
    title: "Finding the signal\ninside the data.",
    description: "Working with Python, predictive models, and thoughtfully structured databases to make complex information useful.",
    skills: ["Python", "Scikit-learn", "SQL", "MySQL", "MongoDB", "Database design", "Query optimization"],
    note: "ANALYSIS / PREDICTION / DATA SYSTEMS",
  },
  {
    id: "foundations", label: "Foundations", number: "03",
    title: "Good work starts\nwith solid foundations.",
    description: "A growing engineering toolkit grounded in computer science, practical development tools, and continuous learning.",
    skills: ["C++", "Git", "GitHub", "VS Code", "Data structures & algorithms", "OOP", "DBMS", "AI-assisted development"],
    note: "PROBLEM SOLVING / VERSION CONTROL / LEARNING",
  },
];

export const education = [
  { dates: "2025 — 2028", status: "IN PROGRESS", title: "Computer Science & Business Systems", degree: "Bachelor of Engineering", school: "Dr Ambedkar Institution of Technology", location: "Bengaluru, Karnataka" },
  { dates: "2022 — 2025", status: "COMPLETED", title: "Electronics & Communication Engineering", degree: "Diploma", school: "PES Polytechnic", location: "Bengaluru, Karnataka" },
];

export const certifications = [
  { title: "Full Stack Development", detail: "Web Communications Layer", provider: "Infosys Springboard", type: "Certification" },
  { title: "Data Analysis & Forensic Technology", detail: "Virtual internship · learning experience", provider: "Deloitte", type: "Virtual experience" },
  { title: "Data Analytics with Python", detail: "Python-based data analytics", provider: "CodeWithHarry", type: "Certification" },
  { title: "Python Programming", detail: "Programming fundamentals", provider: "CodeWithHarry", type: "Certification" },
  { title: "GTTC Automation Program", detail: "Government up skill India", provider: "GTTC", type: "Training" },
  { title: "AI Tools Workshop", detail: "Exploring AI-assisted workflows", provider: "be10x", type: "Workshop" },
];
