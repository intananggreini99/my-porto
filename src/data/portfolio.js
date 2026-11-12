/* ==========================================================================
   Portfolio content — Intan Dwi Anggreini
   Edit this file to add or change projects, skills, achievements and
   activities. Images live in public/assets/img/projects and
   public/assets/img/activities (each image has a "-thumb" version for
   cards; see README). Icon ids come from src/assets/sprite.svg.
   ========================================================================== */

const portfolio = {
  /* ---------- Core tools (icon ids come from the sprite) ---------- */
  tools: [
    { name: "Python", icon: "b-python", color: "#3776AB", note: "Language" },
    { name: "SQL", icon: "i-database", color: "#2F9E8F", note: "Language" },
    { name: "R", icon: "b-r", color: "#276DC3", note: "Language" },
    { name: "Rust", icon: "b-rust", color: "#DEA584", note: "Language" },
    { name: "scikit-learn", icon: "b-scikitlearn", color: "#F7931E", note: "Machine learning" },
    { name: "MLflow", icon: "b-mlflow", color: "#0194E2", note: "MLOps" },
    { name: "Apache Airflow", icon: "b-apacheairflow", color: "#017CEE", note: "Orchestration" },
    { name: "Apache Spark", icon: "b-apachespark", color: "#E25A1C", note: "Big data" },
    { name: "PostgreSQL", icon: "b-postgresql", color: "#4169E1", note: "Database" },
    { name: "Docker", icon: "b-docker", color: "#2496ED", note: "Containers" },
    { name: "FastAPI", icon: "b-fastapi", color: "#009688", note: "API" },
    { name: "React", icon: "b-react", color: "#61DAFB", note: "Front end" },
    { name: "Power BI", icon: "b-powerbi", color: "#F2C811", note: "BI dashboard" },
    { name: "Tableau", icon: "b-tableau", color: "#E97627", note: "BI dashboard" },
    { name: "Grafana", icon: "b-grafana", color: "#F46800", note: "Monitoring" },
    { name: "Linux", icon: "b-linux", color: "#FCC624", note: "System admin" }
  ],

  /* ---------- Full toolbox (level shown when known) ---------- */
  toolbox: [
    { title: "Programming languages", level: "Advanced", items: ["Python", "R", "Rust", "SQL"] },
    { title: "AI", level: "Basic to intermediate", items: ["Machine Learning", "Deep Learning", "Computer Vision"] },
    { title: "Web and mobile", level: "Intermediate", items: ["PHP", "React", "JavaScript", "Flask", "FastAPI", "REST API", "Kotlin"] },
    { title: "Tools and platforms", level: "Intermediate", items: ["Git", "Docker", "Docker Compose", "MLflow", "DVC"] },
    { title: "Data architecture", items: ["Apache Airflow", "Apache Spark", "HDFS", "Apache Hive", "Apache Kafka", "Debezium", "Pentaho Data Integration"] },
    { title: "Data visualization", items: ["Power BI", "Tableau", "Grafana", "Looker Studio (Google Data Studio)", "D3.js", "Kibana"] },
    { title: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
    { title: "System administration and networking", items: ["Debian", "Ubuntu", "Red Hat", "MikroTik", "Cisco", "Wired and wireless networks"] },
    { title: "WebGIS", items: ["Leaflet.js"] },
    { title: "Soft skills", items: ["Problem solving", "Critical thinking", "Communication", "Teamwork"] }
  ],

  /* ---------- Project filters ---------- */
  filters: [
    { id: "all", label: "All" },
    { id: "ml", label: "Machine learning" },
    { id: "data-eng", label: "Data engineering" },
    { id: "dashboard", label: "Dashboards" },
    { id: "web", label: "Web apps" }
  ],

  /* ---------- Projects ---------- */
  projects: [
    {
      id: "riskfinder",
      title: "RiskFinder",
      coverPosition: "center 62%",
      subtitle: "Machine learning credit risk analysis platform",
      categories: ["ml", "web"],
      type: "Team project",
      role: "Team lead, full-stack developer and ML engineer",
      stack: ["Python", "FastAPI", "React", "PostgreSQL", "MLflow", "DVC", "Docker", "JWT"],
      summary: "Predicts borrower default risk quickly and objectively so banks, P2P lending platforms and fintech companies can make better lending decisions.",
      description: [
        "RiskFinder is a machine learning credit risk analysis system that predicts borrower default risk quickly and objectively, helping banks, P2P lending platforms and fintech companies improve lending decisions and reduce potential credit losses.",
        "The training pipeline covers cleaning, train and test splitting, KNN imputation, outlier capping, feature extraction, encoding, feature selection and scaling, followed by imbalance handling, model comparison and hyperparameter tuning on the Default of Credit Card Clients dataset. Experiments, metrics and artifacts are tracked in MLflow, while data and artifacts are versioned with DVC on a Google Drive remote.",
        "A FastAPI web app with JWT login serves two roles. Data scientists trigger model builds, manage model and preprocessing pairs and choose the active pair for deployment. Credit analysts enter applicant data and receive a prediction, flagged positive when the score reaches 0.7. The monitoring view shows ROC-AUC learning curves, the classification report, the confusion matrix, the train versus test gap, prediction history and the average prediction score."
      ],
      highlights: [
        { value: "5", label: "stages: data, training, model, deployment, monitoring" },
        { value: "2", label: "user roles with JWT login" },
        { value: "0.7", label: "score threshold for a positive prediction" }
      ],
      links: [
        { label: "GitHub", url: "https://github.com/intananggreini99/riskfinder-project", icon: "b-github" },
        { label: "Demo video", url: "https://drive.google.com/file/d/1Ro_Z3uT824TopEb5A0fPgjrdxBMpOIW6/view?usp=sharing", icon: "i-play" }
      ],
      images: [
        { src: "riskfinder-architecture", caption: "End-to-end architecture: data and users, training and model build, monitoring" },
        { src: "riskfinder-login", caption: "Login page: pick a role (Data Scientist or Credit Analysis) and sign in" },
        { src: "riskfinder-ds-menu", caption: "Data scientist menu: build a model with MLflow or monitor the deployed model" },
        { src: "riskfinder-artifacts", caption: "Model and preprocessing artifact management, with the active pipeline pair" },
        { src: "riskfinder-monitoring", caption: "Deployment monitoring: average prediction score and positive and negative predictions" },
        { src: "riskfinder-entry", caption: "Credit analyst entry form: borrower profile, credit limit and six-month payment history" },
        { src: "riskfinder-results", caption: "Analysis results: prediction score per borrower and the saved summary table" }
      ]
    },
    {
      id: "credit-segmentation",
      title: "Credit Risk Segmentation and Anomaly Detection",
      subtitle: "UMAP and HDBSCAN on a star-schema data warehouse",
      categories: ["ml", "data-eng", "dashboard"],
      type: "Personal project",
      role: "Full-stack developer and ML engineer",
      stack: ["Python", "PostgreSQL", "Pentaho Data Integration", "scikit-learn", "UMAP", "HDBSCAN", "D3.js", "PHP"],
      summary: "An end-to-end analytics pipeline that uncovers hidden risk profiles and anomalous loan applications that supervised credit scoring tends to miss.",
      description: [
        "Assessing credit risk before funds are disbursed is a critical step for lenders, yet conventional supervised credit scoring often misses hidden risk patterns and anomalous applications. This project builds an end-to-end analytics pipeline: ETL from an operational data store into a star-schema data warehouse, followed by unsupervised data mining to form layered risk-profile segments.",
        "Data on 1,000 loan applications from two ODS tables was transformed into eight dimension tables and two fact tables with Pentaho Data Integration and SQL scripts. Ten financial features were reduced with UMAP and clustered with HDBSCAN, and the combination was compared with seven other algorithms using seven prioritized metrics.",
        "UMAP with HDBSCAN ranked first, with a Silhouette score of 0.781 and a Davies-Bouldin index of 0.34, and isolated 37.9% of applications as anomalies. Seven tiered risk segments emerged, including a Hidden Prime segment suitable for automatic approval. The findings are presented in an interactive web dashboard showing a 25% default rate, 43% average ROI and IDR 83.78 billion in total profit to support stakeholder decisions."
      ],
      highlights: [
        { value: "0.781", label: "Silhouette score" },
        { value: "0.34", label: "Davies-Bouldin index" },
        { value: "37.9%", label: "applications isolated as anomalies" },
        { value: "7", label: "tiered risk segments" }
      ],
      links: [
        { label: "GitHub", url: "https://github.com/intananggreini99/UMAP-HDBSCAN_RiskSegmentation_and_CreditAnomalyDetection", icon: "b-github" }
      ],
      images: [
        { src: "umap-dashboard", caption: "Bank credit risk dashboard built with PHP and D3.js" },
        { src: "umap-architecture", caption: "System architecture: sources, integration and quality, warehouse, credit analytics, dashboard" },
        { src: "umap-workflow", caption: "From data to decisions: build the warehouse, shape features, find risk patterns, compare models, publish" },
        { src: "umap-warehouse-schema", caption: "dw_bankcredit star schema in PostgreSQL" }
      ]
    },
    {
      id: "airflow-weather",
      title: "Airflow Weather Data Pipeline",
      subtitle: "Observability and alerting for a Surabaya weather pipeline",
      categories: ["data-eng"],
      type: "Team project",
      stack: ["Apache Airflow 3", "Python", "PostgreSQL", "Redis", "Celery", "Docker Compose", "SMTP", "Open-Meteo API"],
      summary: "A weather pipeline for Surabaya on Apache Airflow, built around one question: how do we know a pipeline is failing before its data users do?",
      description: [
        "This project builds a weather data pipeline for Surabaya on Apache Airflow, growing from a simple ETL DAG into a complete observability system: centralized logging to PostgreSQL, automatic email alerting and a custom UI for handling failed tasks.",
        "The focus is not just a pipeline that runs, but a more important data engineering question: how do we know a pipeline is failing, and how does the system tell us before the people who use the data find out first?",
        "To answer it, the project implements four layers of defense (retry, centralized logging, email alerting and an interactive UI) across 9 DAGs with different orchestration patterns. Data comes from the Open-Meteo Forecast API for Surabaya (latitude -7.25, longitude 112.75, Asia/Jakarta time zone), which needs no API key."
      ],
      highlights: [
        { value: "9", label: "DAGs with different orchestration patterns" },
        { value: "4", label: "layers of failure defense" },
        { value: "3 h", label: "master collection schedule" }
      ],
      links: [
        { label: "GitHub", url: "https://github.com/mudrik696/airflow-project", icon: "b-github" },
        { label: "Demo video", url: "https://youtu.be/l4KGIZ6zo3w", icon: "b-youtube" }
      ],
      images: [
        { src: "airflow-architecture", caption: "System architecture: data source, control plane, state and broker, execution, data layer" },
        { src: "airflow-workflow", caption: "Pipeline workflow: process data, then monitor results" },
        { src: "airflow-dag-intro-etl", caption: "DAG stage 1: introductory ETL" },
        { src: "airflow-dag-advanced-etl", caption: "DAG stage 2: advanced ETL with parallel extraction and quality branching" },
        { src: "airflow-orchestration", caption: "Orchestration across DAGs" },
        { src: "airflow-monitoring", caption: "Monitoring and error handling in four layers" },
        { src: "airflow-alerting-sequence", caption: "Logging and alerting sequence" }
      ]
    },
    {
      id: "apple-leaf",
      title: "Apple Leaf Disease Classification",
      subtitle: "Distributed feature extraction and model benchmarking on Spark, HDFS and Hive",
      categories: ["ml", "data-eng"],
      type: "Big data project",
      stack: ["Apache Spark (PySpark, MLlib)", "HDFS", "Apache Hive", "PostgreSQL", "scikit-learn", "scikit-image", "Docker Compose"],
      summary: "One Docker environment for images, features and experiments: leaf images go into HDFS, Spark extracts features in parallel, and Spark MLlib is benchmarked against scikit-learn.",
      description: [
        "Apple leaf images, split into train, validation and test sets, are ingested into HDFS. Features are extracted in a distributed way with Spark UDFs and scikit-image, then stored as Parquet with a Hive catalog and in a PostgreSQL feature table.",
        "The same features feed two engines, Spark MLlib and scikit-learn. Each is trained, validated and tested so that training duration and evaluation metrics can be compared side by side. The duration of every stage is logged to PostgreSQL, and Spark event logs are available in the History Server.",
        "The stack runs on Docker Compose as 9 containers with 4 persistent volumes: a Spark standalone cluster (master, worker and history server), an HDFS namenode and datanode, the Hive metastore and HiveServer2, and PostgreSQL."
      ],
      highlights: [
        { value: "9", label: "containers on Docker Compose" },
        { value: "4", label: "persistent volumes" },
        { value: "2", label: "ML engines benchmarked" }
      ],
      links: [
        { label: "GitHub", url: "https://github.com/intananggreini99/AppleDiseaseClassification", icon: "b-github" }
      ],
      images: [
        { src: "apple-architecture", caption: "System architecture: Spark, HDFS, Hive and PostgreSQL in one Docker Compose network" },
        { src: "apple-workflow", caption: "Workflow: images, feature extraction, feature storage, training and evaluation, results" }
      ]
    },
    {
      id: "covid-dashboard",
      title: "COVID-19 Distribution Dashboard",
      subtitle: "Interactive map and charts for 34 Indonesian provinces",
      categories: ["dashboard", "web", "ml"],
      type: "Web dashboard",
      stack: ["Python", "K-Means", "MySQL", "PHP", "D3.js", "Leaflet", "Tailwind CSS"],
      summary: "An interactive web dashboard that tracks COVID-19 cases across 34 provinces and segments regional risk with K-Means clustering.",
      description: [
        "An interactive web dashboard for monitoring the spread of COVID-19 across 34 Indonesian provinces, built with PHP, MySQL, D3.js and Leaflet and enriched with regional risk segmentation using K-Means clustering.",
        "Data preparation in Python cleans and aggregates 3,493 rows and 37 columns (1 March to 30 June 2020) and clusters the provinces into four risk levels. The results are imported into MySQL and served to the browser through six PHP endpoints that return JSON.",
        "The front end renders six visuals: a choropleth map, total cases, recovered versus deaths, a cluster treemap, cases per province and the daily case trend, with hover tooltips, map popups and Excel export."
      ],
      highlights: [
        { value: "34", label: "provinces covered" },
        { value: "3,493", label: "rows of case data" },
        { value: "4", label: "risk clusters" },
        { value: "6", label: "JSON endpoints" }
      ],
      links: [
        { label: "GitHub", url: "https://github.com/intananggreini99/Dasboard_Covid19_PHP-D3JS", icon: "b-github" }
      ],
      images: [
        { src: "covid-dashboard", caption: "Distribution of COVID-19 cases in Indonesia" },
        { src: "covid-architecture", caption: "Architecture: data preparation, database, backend API, browser dashboard" },
        { src: "covid-workflow", caption: "Workflow: prepare data, display the dashboard, explore" }
      ]
    },
    {
      id: "mis-tkj",
      title: "MIS Web for TKJ, SMKN 1 Kediri",
      subtitle: "School management information system with role-based access",
      categories: ["web"],
      type: "Personal project",
      role: "Full-stack developer",
      stack: ["PHP 8.2", "Apache 2.4", "MySQL 8.0", "phpMyAdmin", "Bootstrap 5", "JavaScript", "Docker Compose"],
      summary: "A centralized web app for the Computer and Network Engineering department: controlled access, centralized data and persistent storage.",
      description: [
        "A dynamic management information system for the Computer and Network Engineering (TKJ) department at SMKN 1 Kediri. Admins manage the data through create, read, update and delete pages, while teachers and students get read access after logging in.",
        "School modules cover users, students, teachers, subjects and the agenda, with photo uploads for teacher profiles and agenda documentation. Data is stored in MySQL 8 across six tables.",
        "The application runs on Docker Engine and Compose as three containers (Apache with PHP, MySQL and phpMyAdmin) with persistent volumes."
      ],
      highlights: [
        { value: "3", label: "user roles: admin, teacher, student" },
        { value: "5", label: "school modules" },
        { value: "3", label: "Docker containers" }
      ],
      links: [
        { label: "GitHub", url: "https://github.com/intananggreini99/MIS_WebDinamis_TKJSMEKSA", icon: "b-github" }
      ],
      images: [
        { src: "mis-architecture", caption: "System architecture: users and web, application, school data" },
        { src: "mis-guest-home", caption: "Public home page for guests" },
        { src: "mis-admin-dashboard", caption: "Admin dashboard with navigation for users and school data" },
        { src: "mis-subjects", caption: "Admin subject list with teachers and teaching hours, with edit and delete actions" },
        { src: "mis-add-teacher", caption: "Add teacher form with photo upload" },
        { src: "mis-agenda", caption: "Annual agenda list with documentation photos" },
        { src: "mis-guest-subjects", caption: "Public subject and schedule page" }
      ]
    },
    {
      id: "phimart-powerbi",
      title: "Phi Minimart Sales Dashboard",
      subtitle: "Power BI",
      categories: ["dashboard"],
      type: "Dashboard",
      stack: ["Power BI"],
      summary: "A sales overview for a minimarket chain: branch map, key figures, sales per city, monthly purchases and top products.",
      description: [
        "A Power BI dashboard that summarizes a minimarket chain: a map of branches across Indonesia, key figures for employees (30), branch cities (95) and product types (41), total sales per city, monthly product purchases and the five best-selling products."
      ],
      links: [
        { label: "Open in Power BI", url: "https://app.powerbi.com/Redirect?action=OpenReport&appId=26c7d70d-511e-444e-9073-391f544919a1&reportObjectId=2bad3ee6-d929-42c2-b205-a285a61577f0&ctid=51d790d5-befb-484e-86c6-d17b64727624&reportPage=59cef2a137caa7d6827a&pbi_source=appShareLink&portalSessionId=6b5cce41-9e14-4b57-83a9-2b9e9089ac90", icon: "b-powerbi" }
      ],
      images: [
        { src: "phimart-powerbi", caption: "Phi Minimart dashboard in Power BI" }
      ]
    },
    {
      id: "kediri-tableau",
      title: "Schools, Universities and MSMEs in Kediri City",
      subtitle: "Tableau Public",
      categories: ["dashboard"],
      type: "Dashboard",
      stack: ["Tableau"],
      summary: "A map-based view of where senior high schools, universities and MSMEs are located across the sub-districts of Kediri City.",
      description: [
        "A Tableau Public dashboard that maps the distribution of senior high schools (SMA), universities and micro, small and medium enterprises (UMKM) across the sub-districts of Kediri City, with totals, top-10 rankings for each category, development per sub-district and a clustering view per sub-district."
      ],
      links: [
        { label: "View on Tableau Public", url: "https://public.tableau.com/app/profile/intan.dwi.anggreini/viz/Sebaran_SMA_PT_UKM_KotaKediri/Dashboard1", icon: "b-tableau" }
      ],
      images: [
        { src: "kediri-tableau", caption: "Distribution of senior high schools, universities and MSMEs in Kediri City" }
      ]
    },
    {
      id: "tokokita-looker",
      title: "Toko Kita Sales Report",
      subtitle: "Looker Studio (Google Data Studio)",
      categories: ["dashboard"],
      type: "Dashboard",
      stack: ["Looker Studio"],
      summary: "A retail report covering profit, sales and purchases, a sales territory map and the top-performing cities, categories and products.",
      description: [
        "A Looker Studio report with scorecards for profit (200.4M), sales (978.4M) and purchases (804.6M), a sales territory map, the top three cities and product categories by profit, the top five products and the trend of purchases against profit."
      ],
      links: [
        { label: "Open the report", url: "https://datastudio.google.com/reporting/e8fb4994-7a8c-46a9-9504-290878480b96/page/6FeeF", icon: "i-external-link" }
      ],
      images: [
        { src: "tokokita-looker", caption: "Toko Kita dashboard report in Looker Studio" }
      ]
    },
    {
      id: "grafana-dashboards",
      title: "Grafana Dashboards",
      subtitle: "COVID-19 distribution and Phi-Mart sales",
      categories: ["dashboard"],
      type: "Dashboard",
      stack: ["Grafana"],
      summary: "Two dashboards built in Grafana: COVID-19 case distribution in Indonesia and sales for the Phi-Mart chain.",
      description: [
        "COVID-19 distribution: total cases (112,100), recovered versus deaths, province clusters with average cases, deaths and recoveries, new cases by date and total new cases by province.",
        "Phi-Mart: total sales by city branch over time, weekly sales profit, key figures for employees, branch cities and product types, and total profit by branch."
      ],
      links: [
        { label: "GitHub", url: "https://github.com/intananggreini99/grafanaDashboard", icon: "b-github" }
      ],
      images: [
        { src: "grafana-covid", caption: "COVID-19 distribution dashboard in Grafana" },
        { src: "grafana-phimart", caption: "Phi-Mart sales dashboard in Grafana" }
      ]
    }
  ],

  /* ---------- Achievements ---------- */
  achievements: [
    {
      tag: "Certification", year: "2024", icon: "i-award", tone: "blue",
      title: "MikroTik Certified Network Associate (MTCNA)", org: "MikroTik",
      text: "Industry certification for MikroTik RouterOS, covering network configuration, routing, bridging, wireless and firewall fundamentals."
    },
    {
      tag: "Academic", year: "2024 to now", icon: "i-graduation-cap", tone: "gold",
      title: "GPA 3.58 out of 4.00", org: "Applied Data Science, PENS",
      text: "Current grade point average in the Bachelor of Applied Data Science program at Politeknik Elektronika Negeri Surabaya."
    }
  ],

  /* ---------- Activities (photo galleries) ---------- */
  activities: [
    {
      id: "ieee",
      category: "Organization",
      period: "2026 to now",
      title: "Human Capital staff at IEEE Student Branch PENS",
      text: "Supporting member development and welfare in the Human Capital division, including presenting the division's role to members and taking part in Gathering with IEEE.",
      cover: "ieee-human-capital-1",
      images: [
        { src: "ieee-human-capital-1", caption: "Presenting the role of the Human Capital division" },
        { src: "ieee-gathering-1", caption: "Gathering with IEEE" },
        { src: "ieee-gathering-2", caption: "Gathering with IEEE, group photo" }
      ]
    },
    {
      id: "lkmm",
      category: "Leadership",
      period: "2025 to now",
      title: "Guide for LKMM PENS 2025",
      text: "Facilitating Student Management Skills Training (LKMM) for first-year students: delivering material, leading class sessions and collecting participant feedback.",
      cover: "lkmm-3",
      images: [
        { src: "lkmm-1", caption: "Delivering LKMM material" },
        { src: "lkmm-2", caption: "Delivering LKMM material" },
        { src: "lkmm-3", caption: "LKMM class session" },
        { src: "lkmm-4", caption: "LKMM class session" },
        { src: "lkmm-5", caption: "LKMM class session" },
        { src: "lkmm-6", caption: "LKMM class session" },
        { src: "lkmm-7", caption: "LKMM class session" },
        { src: "lkmm-8", caption: "LKMM class session" },
        { src: "lkmm-9", caption: "LKMM class session" },
        { src: "lkmm-10", caption: "On stage at PENS" }
      ]
    },
    {
      id: "pkl",
      category: "Internship",
      period: "Jun to Nov 2023",
      title: "Field work practice at POLINEMA PSDKU Kediri",
      text: "A six-month vocational internship at Politeknik Negeri Malang, Kediri campus, as staff in the computer center (Puskom) and personnel (Kepegawaian) divisions.",
      cover: "pkl-polinema-2",
      images: [
        { src: "pkl-polinema-1", caption: "Field work practice at Politeknik Negeri Malang, Kediri campus" },
        { src: "pkl-polinema-2", caption: "With campus staff" },
        { src: "pkl-polinema-3", caption: "With campus staff" }
      ]
    }
  ]
};

export default portfolio;
