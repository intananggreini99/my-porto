/* ==========================================================================
   Personal details, about-me text, timeline and contact links.
   Projects, skills, credentials and activities live in portfolio.js.
   ========================================================================== */

const profile = {
  name: "Intan Dwi Anggreini",
  shortName: "Intan",
  intro: "Applied Data Science student at PENS, building data pipelines, machine learning models and dashboards.",
  photo: { src: "assets/img/profile.webp", alt: "Portrait of Intan Dwi Anggreini", width: 720, height: 900 },
  cv: "files/CV_IntanDwiAnggreini_ATS.pdf",
  location: "Surabaya, East Java, Indonesia",
  footerPlace: "Surabaya, East Java",

  email: "d.intananggreini99@gmail.com",
  whatsapp: { number: "6285749461049", label: "+62 857-4946-1049" },

  socials: {
    linkedin: { label: "LinkedIn", url: "https://www.linkedin.com/in/intan-dwi-anggreini-4040402b1/", icon: "b-linkedin", handle: "intan-dwi-anggreini" },
    github: { label: "GitHub", url: "https://github.com/intananggreini99", icon: "b-github", handle: "intananggreini99" },
    instagram: { label: "Instagram", url: "https://www.instagram.com/me.iiintan/", icon: "b-instagram" },
    whatsapp: { label: "WhatsApp", url: "https://wa.me/6285749461049", icon: "b-whatsapp" },
    tableau: { label: "Tableau Public", url: "https://public.tableau.com/app/profile/intan.dwi.anggreini", icon: "b-tableau" },
  },

  bio: [
    "I'm a fifth-semester Applied Data Science student at Politeknik Elektronika Negeri Surabaya (PENS) with a GPA of 3.57 out of 4.00. My path started in computer networking at SMK Negeri 1 Kediri, where I installed wired and wireless networks, administered Debian, Ubuntu and Red Hat systems, and earned my MTCNA certification.",
    "Today I work across the data lifecycle: building ETL pipelines and star-schema warehouses, orchestrating workflows with Apache Airflow, training and tracking models with MLflow, and turning the results into dashboards that people can act on.",
  ],

  focus: [
    { icon: "i-workflow", title: "Data engineering", text: "ETL with Pentaho and SQL, star-schema warehouses in PostgreSQL, and Apache Airflow pipelines with logging and alerting." },
    { icon: "i-brain-circuit", title: "Machine learning and MLOps", text: "Training and tuning with scikit-learn and Spark MLlib, experiment tracking with MLflow, data versioning with DVC and serving with FastAPI." },
    { icon: "i-chart-pie", title: "Data visualization", text: "Dashboards in Power BI, Tableau, Grafana, Looker Studio and D3.js that turn analysis into decisions." },
    { icon: "i-server", title: "Systems and networking", text: "Linux administration, Docker deployments, and MikroTik and Cisco networks: the infrastructure underneath the data." },
  ],

  experience: [
    { when: "2026 to present", title: "Staff, Human Capital division", where: "IEEE Student Branch PENS" },
    { when: "2025 to present", title: "Guide (Pemandu), LKMM PENS 2025", where: "Student Management Skills Training, PENS" },
    { when: "June to November 2023", title: "Staff, Computer Center (Puskom) and Personnel (Kepegawaian) divisions", where: "Field work practice, Politeknik Negeri Malang, PSDKU Kediri" },
  ],

  education: [
    { when: "2024 to present", title: "Bachelor of Applied Data Science (D4)", where: "Politeknik Elektronika Negeri Surabaya (PENS)", note: "GPA 3.57 out of 4.00, fifth semester." },
    { when: "2021 to 2024", title: "Computer Network and Telecommunication Engineering", where: "SMK Negeri 1 Kediri", note: "Average report grade 89 out of 100; one of the top five students in the major." },
  ],

  languages: ["Indonesian", "English"],
};

export default profile;
