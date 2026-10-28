export const portfolio = {
  name: "Pranay Bhalchandra Ugale",
  degree: "Bachelor of Technology in Civil Engineering",
  college: "Sharad Institute of Technology, College of Engineering",
  currentYear: "Third Year",
  graduationYear: "2028",
  city: "Ichalkaranji",
  email: "pranayugale7722@gmail.com",
  // Add your verified Formspree endpoint here to enable the contact form.
  contactFormEndpoint: "",

  linkedin: "",
  github: "",

  // This matches the actual file at public/resume.pdf.
  resume: "/resume.pdf",
  portrait: "/assets/optimized/pranay-portrait.webp",
  portraitWidth: 1254,
  portraitHeight: 1254,

  bio: "I am a passionate Civil Engineering student interested in designing, planning, and developing sustainable infrastructure. I enjoy learning about construction techniques, structural systems, and modern engineering practices. I aim to apply my technical knowledge and problem-solving skills to practical engineering challenges.",

  interests: [
    "Construction Management",
    "Site Supervision",
    "Project Planning",
    "Structural Engineering",
    "Sustainable Construction",
    "Civil Engineering Consultancy",
    "Building Design",
    "Earthquake-Resistant Structures",
  ],

  // This index selects the practical experience to feature in the focus section.
  // Change it to another fieldwork entry, or use null to hide the experience highlight.
  featuredExperienceIndex: 0,

  skills: [
    {
      category: "Design & Drafting",
      items: [
        "AutoCAD",
        "Blueprint Reading",
        "Technical Drawing",
        "Basic Building Layout Interpretation",
      ],
    },
    {
      category: "Construction",
      items: [
        "Basic Construction Planning",
        "Site Supervision",
        "Construction Management",
        "Project Planning",
        "Construction Safety Awareness",
        "Building Materials Knowledge",
      ],
    },
    {
      category: "Office Tools",
      items: [
        "MS Excel",
        "Microsoft PowerPoint",
        "Microsoft Word",
        "Technical Documentation",
      ],
    },
    {
      category: "Core Skills",
      items: [
        "Teamwork & Collaboration",
        "Leadership",
        "Communication",
        "Problem Solving",
        "Work Ethics",
        "Time Management",
        "Willingness to Learn",
      ],
    },
  ],

  // Curriculum topics from civil engineering coursework and labs; not proficiency ratings.
  courseworkAreas: [
    { category: "Applied mathematics", favorite: true, items: ["Differential calculus and optimization", "Complex numbers, matrices and eigenvalues", "Curve tracing, multiple integrals and differential equations"] },
    { category: "Structures & construction materials", items: ["Building components and foundations", "Material selection: strength, durability and economy", "Strength of materials and steel design"] },
    { category: "Surveying & spatial methods", items: ["Chain, tape and compass measurements", "Ranging, offsets, leveling and traversing", "Theodolite, total station, GPS and GIS"] },
    { category: "Drawing & CAD", items: ["Dimensioning and drawing conventions", "Orthographic and isometric projections", "Civil drawings and CAD drafting"] },
    { category: "Construction practice", items: ["Building planning and construction activities", "Site measurement and setting out", "Masonry, leveling and plumbing components"] },
    { category: "Hydraulics", items: ["Fluid statics and flow fundamentals", "Pipe flow and head losses", "Open-channel flow and flow measurement"] },
    { category: "Concrete technology", items: ["Cement and aggregate characterization", "Workability and concrete mix design", "Strength and non-destructive testing"] },
    { category: "Transportation", items: ["Highway alignment and geometric design", "Traffic studies and control", "Aggregate and bitumen testing"] },
    { category: "Environmental engineering", items: ["Water quality and treatment", "Wastewater characteristics and treatment", "Water, wastewater and air-quality laboratory tests"] },
  ],

  education: [
    {
      degree: "Bachelor of Technology in Civil Engineering",
      institution: "Sharad Institute of Technology, College of Engineering",
      location: "Ichalkaranji, Maharashtra",
      start: "2024",
      end: "2028",
      result: "8.99 CGPA (till second year)",
      courseworkLabel: "SELECTED COURSEWORK",
      coursework: [
        "Applied Mathematics I & II",
        "Engineering Mathematics III",
        "Basic Civil Engineering",
        "Building Construction and Materials",
        "Engineering Drawing",
        "Strength of Materials",
        "Surveying I & II",
        "Hydraulics",
        "Concrete Technology",
        "Environmental Engineering",
        "Design of Steel Structures",
        "Transportation Engineering",
      ],
      labwork: [
        "Basic Civil Engineering Laboratory",
        "Civil Engineering Workshop",
        "Engineering Drawing Laboratory",
        "Engineering Mechanics Laboratory",
        "Applied Chemistry Laboratory",
        "Strength of Materials Laboratory",
        "Surveying I Laboratory",
        "Hydraulics Laboratory",
        "Concrete Technology Laboratory",
        "Environmental Engineering Laboratory",
        "Transportation Engineering Laboratory",
      ],
    },
    {
      degree: "Higher Secondary Certificate (12th)",
      institution: "Maharashtra State Board",
      location: "Maharashtra, India",
      start: "2023",
      end: "2024",
      result: "72.33%",
      coursework: ["Physics", "Chemistry", "Mathematics"],
    },
    {
      degree: "Secondary School Certificate (10th)",
      institution: "CBSE",
      location: "India",
      start: "2021",
      end: "2022",
      result: "82.20%",
      coursework: ["Mathematics", "Science", "English"],
    },
  ],

  certifications: [],

  fieldwork: [
    {
      title: "Site Trainee — Deepak Patil Contractors and Associates",
      date: "June 2026 – July 2026",
      type: "Internship",
      description:
        "Assisted engineers with daily site supervision and construction activities. Observed ongoing construction work, site execution processes, construction techniques, and safety practices. Gained practical exposure to the responsibilities of civil engineering professionals on construction sites.",
      image: "/assets/optimized/work-gallery-02.webp",
      imageWidth: 1280,
      imageHeight: 960,
      alt: "Civil engineering construction site training",
    },
  ],

  // Add only genuine drawings, project images, models, and work in progress here.
  // Copy an item shape from the commented example and put image files in public/assets/images/.
  gallery: [
    {
      title: "Solar Manufacturing Facility Visit",
      category: "FIELD VISIT / FUNDAMENTALS OF MECHANICS",
      date: "",
      image: "/assets/optimized/work-gallery-01.webp",
      width: 900,
      height: 1600,
      orientation: "rotate-90",
      alt: "Student group visiting a solar manufacturing facility",
      description:
        "This educational visit to a solar manufacturing facility was part of Fundamentals of Mechanics. The image documents the group in an industrial production environment and offer a view of how classroom study sits alongside real manufacturing settings.",
      link: "",
    },
    {
      title: "Construction Site Internship",
      category: "INTERNSHIP / SITE TRAINEE",
      date: "",
      image: "/assets/optimized/work-gallery-02.webp",
      width: 1280,
      height: 960,
      alt: "Site trainee at an active reinforced-concrete construction site",
      description:
        "This image documents the setting of my internship as a site trainee at an active building project. It records the visible construction stage and reinforcement work, and adds a visual account of the site environment to the internship experience described in the portfolio.",
      link: "",
    },
    {
      title: "Surveying Instrument Setup",
      category: "VALUE ADDITION PROGRAM / SURVEYING",
      date: "",
      image: "/assets/optimized/work-gallery-03.webp",
      width: 1600,
      height: 1200,
      alt: "Students gathered around a total station during a surveying session",
      description:
        "Part of the Value Addition Program in surveying, this session brought students together around a total station for practical instruction. The photograph records the group setting and the instrument at the center of the field learning activity.",
      link: "",
    },
    {
      title: "Field Instrument Demonstration",
      category: "VALUE ADDITION PROGRAM / SURVEYING",
      date: "",
      image: "/assets/optimized/work-gallery-04.webp",
      width: 1600,
      height: 1200,
      alt: "Surveying students observing a total-station demonstration on campus",
      description:
        "This photograph records a surveying demonstration on the college grounds during the Value Addition Program. Students are gathered around the total station as it is introduced in a field setting, connecting instrument-based learning with outdoor surveying practice.",
      link: "",
    },
    {
      title: "Collaborative Survey Practice",
      category: "VALUE ADDITION PROGRAM / SURVEYING",
      date: "",
      image: "/assets/optimized/work-gallery-05.webp",
      width: 1600,
      height: 1200,
      alt: "Surveying program participants working together around a total station",
      description:
        "This image captures a collaborative moment from the surveying Value Addition Program. Participants gather around the instrument during practical instruction, showing the group-based format of the activity and the role of shared observation in learning field equipment.",
      link: "",
    },
    {
      title: "Total Station Observation",
      category: "VALUE ADDITION PROGRAM / SURVEYING",
      date: "",
      image: "/assets/optimized/work-gallery-06.webp",
      width: 1200,
      height: 1600,
      alt: "Close view of a student looking through a total station during field practice",
      description:
        "A closer record of a participant looking through the total station during the surveying Value Addition Program. The image highlights direct interaction with the instrument and documents the hands-on field session without suggesting a particular measurement result.",
      link: "",
    },
    {
      title: "Construction Site Visit",
      category: "SITE VISIT / BASIC CIVIL ENGINEERING",
      date: "",
      image: "/assets/optimized/work-gallery-07.webp",
      width: 1600,
      height: 1200,
      alt: "Civil engineering students at a construction site near their college",
      description:
        "This class visit near the college was conducted as part of Basic Civil Engineering. The photograph documents the student group at an active building site and preserves the visit as an opportunity to observe construction in its real site context.",
      link: "",
    },
  ],

  // Academic project summaries below are based on the supplied reports/presentation.
  // Local project visuals are linked below; replace them if you add original drawings or photographs.
  projects: [
    {
      number: "01",
      title: "Smart Roads for Rainwater Management",
      category: "Sustainable Infrastructure",
      kind: "Group Academic Mini Project",
      image: "/assets/optimized/srrwh.webp",
      imageWidth: 735,
      imageHeight: 930,
      imageType: "",
      alt: "Illustrative roadway cross-section showing runoff passing through filter layers toward the ground",
      description:
        "A conceptual study of permeable roads and footpaths that can reduce surface runoff and waterlogging while supporting groundwater recharge and non-potable rainwater reuse.",
      objective:
        "Explore road and footpath surfaces that allow rainwater to pass through layered materials into the ground, helping reduce flooding and replenish groundwater.",
      tools: [],
      contribution: "",
      methodology:
        "The report reviews permeable blocks, gravel, sand, and filter layers, alongside literature on rainwater harvesting, stormwater treatment, groundwater recharge, and selected urban road, highway, municipal, and flyover applications.",
      results:
        "The supplied report describes a proposed system and case-study contexts. It does not provide documented prototype testing or measured field results, so no performance figures are presented here.",
      date: "Academic year 2026–27",
      report: "",
      link: "",
    },
    {
      number: "02",
      title: "Net Zero Energy Building",
      category: "Sustainable Building",
      kind: "Group Academic Mini Project",
      image: "/assets/optimized/nzeb.webp",
      imageWidth: 736,
      imageHeight: 1307,
      imageType: "",
      alt: "Illustrative energy-efficient building with rooftop solar and system callouts",
      description:
        "A residential building study exploring household energy demand, efficiency measures, renewable energy options, and a comparison between a conventional building and a proposed net-zero approach.",
      objective:
        "Analyze a residential household's energy use, explore renewable energy options, and develop practical recommendations for a net-zero energy building.",
      tools: [],
      contribution: "",
      methodology:
        "The report outlines data collection, an estimate of household energy demand, review of efficiency measures and renewable alternatives such as solar PV, a conventional-versus-proposed comparison, and a cost review.",
      results:
        "The report presents an estimated household energy profile and an indicative cost comparison. It does not document measured operating performance of a completed net-zero building.",
      date: "Academic year 2025–26",
      report: "",
      link: "",
    },
    {
      number: "03",
      title: "Earthquake-Resistant Building Design",
      category: "Structural Engineering",
      kind: "Group Academic Study",
      image: "/assets/optimized/erb.webp",
      imageWidth: 736,
      imageHeight: 1472,
      imageType: "",
      alt: "Illustrative high-rise building accompanying an earthquake-resistant design study",
      description:
        "A presentation-based study of design principles, materials, and case studies used to improve building response to earthquake forces.",
      objective:
        "Understand how structural design and construction approaches can help buildings resist seismic forces and protect occupants.",
      tools: [],
      contribution: "",
      methodology:
        "The presentation reviews flexibility and ductility, strength and stability, symmetry, reinforced concrete, shear walls, base isolation, viscous dampers, and selected building case studies.",
      results:
        "The presentation summarizes seismic design concepts and precedents. It does not report original structural calculations, testing, or a completed building design.",
      date: "Academic year 2024–25",
      report: "",
      link: "",
    },
  ],
};