export const brand = {
  name: "Dr. Kiran Saujiya",
  legal: "Adarsh Rashtriya Group of Institutions",
  email: "drk3samainpuri@gmail.com",
  phone: "+91 94584 73347, +91 83958 82403",
  address: "Ashok Nagar, Kurawali Road, Mainpuri, Uttar Pradesh 205001",
};

export function photo(id: string, width = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;
}

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  {
    label: "Schools",
    href: "/#schools",
    children: [
      { label: "All schools", href: "/#schools" },
      { label: "CBSE, Mainpuri", href: "/schools/cbse-mainpuri" },
      { label: "ICSE, Mainpuri", href: "/schools/icse-mainpuri" },
      { label: "UP Board, Mainpuri", href: "/schools/adarsh-rashtriya-aavasiya-vidyalay" },
      { label: "CBSE, Agra", href: "/schools/cbse-agra" },
    ],
  },
  { label: "Academics", href: "/#academics" },
  { label: "Leadership", href: "/#leadership" },
  { label: "Admissions", href: "/#admissions" },
  { label: "Contact", href: "/#contact" },
];

export const enquiryTypes = ["Admissions", "Campus visit", "Careers", "General"] as const;

export const heroSlides = [
  {
    src: photo("photo-1580582932707-520aed937b7b"),
    alt: "Empty classroom with wooden desks and a green board",
  },
  {
    src: photo("photo-1562774053-701939374585"),
    alt: "White school building with a wide lawn",
  },
  {
    src: photo("photo-1509062522246-3755977927d7"),
    alt: "Teacher standing beside a classroom display",
  },
  {
    src: photo("photo-1521587760476-6c12a4b040da"),
    alt: "Library shelves filled with books",
  },
  {
    src: photo("photo-1577896851231-70ef18881754"),
    alt: "A teacher working with a class",
  },
];

export type Stat = {
  value: string;
  label: string;
  tone: "maroon" | "gold" | "photo";
  back: string;
  image?: string;
  imageAlt?: string;
};

export const stats: Stat[] = [
  {
    value: "PG–XII",
    label: "Classes",
    tone: "maroon",
    back: "The CBSE academy teaches from PG to Class 12.",
    image: photo("photo-1580582932707-520aed937b7b", 900),
    imageAlt: "A classroom",
  },
  {
    value: "3",
    label: "Curricula",
    tone: "gold",
    back: "CBSE, ICSE, and the Uttar Pradesh Board. A student follows the syllabus of the school they join.",
  },
  {
    value: "2,200+",
    label: "Students",
    tone: "photo",
    back: "Learners enrolled at the CBSE senior secondary school in Mainpuri.",
    image: photo("photo-1577896851231-70ef18881754", 900),
    imageAlt: "A teacher with a class",
  },
  {
    value: "2014",
    label: "ICSE since",
    tone: "maroon",
    back: "ICSE Dr. Kiran Saujiya School was established in 2014. Its CISCE affiliation number is UP-513.",
    image: photo("photo-1521587760476-6c12a4b040da", 900),
    imageAlt: "Library shelves",
  },
];

export type School = {
  slug: string;
  name: string;
  board: string;
  city: string;
  state: string;
  grades: string;
  students: string;
  blurb: string;
  image: string;
  imageAlt: string;
  facilities: string[];
};

export const schools: School[] = [
  {
    slug: "cbse-mainpuri",
    name: "Dr. Kiran Saujiya Sr. Sec. Edu. Academy",
    board: "CBSE",
    city: "Mainpuri",
    state: "Uttar Pradesh",
    grades: "PG to Class 12",
    students: "2,200+",
    blurb:
      "Senior secondary education from PG to Class 12, affiliated to CBSE, New Delhi, affiliation 2131714. The school is at Ashok Nagar, Kurawali Road, Mainpuri. Desk: +91 94584 73347 and +91 83958 82403.",
    image: photo("photo-1580582932707-520aed937b7b"),
    imageAlt: "Classroom photograph standing in for the CBSE campus in Mainpuri",
    facilities: ["Science labs", "Computer lab", "Auditorium", "Library", "Sports", "Transport"],
  },
  {
    slug: "icse-mainpuri",
    name: "ICSE Dr. Kiran Saujiya School",
    board: "ICSE",
    city: "Mainpuri",
    state: "Uttar Pradesh",
    grades: "Nursery to Class 12",
    students: "Enquire",
    blurb:
      "Co-educational school affiliated to CISCE, New Delhi, affiliation UP-513. Established in 2014 at Ashok Nagar, Kurawali Road, Mainpuri, with entry from Gate No. 6. Labs, smart classrooms, a library, sports, hostel, and GPS buses are on campus. Desk: +91 74172 21513.",
    image: photo("photo-1562774053-701939374585"),
    imageAlt: "School building photograph standing in for the ICSE campus in Mainpuri",
    facilities: ["Science and computer labs", "Smart classrooms", "Library and auditorium", "Sports", "Hostel", "GPS transport"],
  },
  {
    slug: "adarsh-rashtriya-aavasiya-vidyalay",
    name: "Adarsh Rashtriya Aavasiya Vidyalay",
    board: "UP Board",
    city: "Mainpuri",
    state: "Uttar Pradesh",
    grades: "UP Board",
    students: "Enquire",
    blurb:
      "Residential school for the UP Board curriculum, at Ashok Nagar, Kurawali Road, Mainpuri, beside the CBSE and ICSE wings. Admission desk: +91 94584 73347 and +91 83958 82403.",
    image: photo("photo-1509062522246-3755977927d7"),
    imageAlt: "Classroom photograph standing in for Adarsh Rashtriya Aavasiya Vidyalay",
    facilities: ["UP Board curriculum", "Residential school", "With the CBSE and ICSE wings"],
  },
  {
    slug: "cbse-agra",
    name: "Dr. Kiran Saujiya Sr. Sec. School",
    board: "CBSE",
    city: "Agra",
    state: "Uttar Pradesh",
    grades: "CBSE",
    students: "Enquire",
    blurb:
      "CBSE senior secondary teaching in Agra. Students follow the CBSE syllabus. The street address and admission phone will be added when the office shares them.",
    image: photo("photo-1521587760476-6c12a4b040da"),
    imageAlt: "Library photograph standing in for the CBSE campus in Agra",
    facilities: ["CBSE curriculum", "Co-educational"],
  },
];

export const benefits = [
  {
    title: "Strong academics",
    body: "Reading, number work, and the sciences are taught in order, so each class prepares the student for the next.",
  },
  {
    title: "Learning by doing",
    body: "Activity, play, and projects sit inside the lesson, with time for the individual child.",
  },
  {
    title: "Discipline",
    body: "Punctuality, regular attendance, and respect for the classroom are part of the school day.",
  },
  {
    title: "Labs and books",
    body: "Science laboratories, computer rooms, and the library are used in the timetable, not only on a visit day.",
  },
  {
    title: "Beyond the textbook",
    body: "Sport, art, debate, and house activities give practice in confidence, speech, and teamwork.",
  },
  {
    title: "Values",
    body: "Self-esteem, responsibility, and hard work are taught beside the syllabus.",
  },
];

export const partners = [
  "Horizon Labs",
  "Aaroh Music",
  "Nexa Sports",
  "Open Library Trust",
  "Fieldnote Design",
  "Harbour Health",
];

export const leaders = [
  {
    name: "Dr. Ashok Kumar",
    role: "Chairman",
    note: "Chairs Adarsh Rashtriya Group of Institutions and is named as head of the CBSE school in Mainpuri.",
  },
  {
    name: "Dr. Kiran Saujiya",
    role: "Vice President",
    note: "Vice President. The schools are named for her, and she watches over the standard of teaching.",
  },
  {
    name: "Mr. Vidyanshu Saujiya",
    role: "Managing Director",
    note: "Managing Director. Holds the schools to academic results and to the wider life of the child.",
  },
];

export type Insight = {
  slug: string;
  title: string;
  date: string;
  campus: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string[];
};

export const insights: Insight[] = [
  {
    slug: "icse-inauguration",
    title: "ICSE campus inauguration",
    date: "5 February 2026",
    campus: "Mainpuri",
    excerpt: "The ICSE school marked its grand inauguration with the chief guest from CISCE, New Delhi.",
    image: photo("photo-1562774053-701939374585"),
    imageAlt: "A school building in daylight",
    body: [
      "ICSE Dr. Kiran Saujiya School held its grand inauguration on 5 February 2026.",
      "Dr. Joseph Emmanuel, Chief Executive and Secretary of CISCE, New Delhi, was the chief guest.",
      "The school is affiliated to CISCE as UP-513 and stands at Ashok Nagar, Kurawali Road, Mainpuri.",
    ],
  },
  {
    slug: "cbse-class-10-results",
    title: "CBSE Class 10 results, 2025–26",
    date: "2026",
    campus: "Mainpuri",
    excerpt: "Pragati Yadav scored 96% in the Class 10 board examination at the Mainpuri CBSE school.",
    image: photo("photo-1497633762265-9d179a990aa6"),
    imageAlt: "Books on a desk",
    body: [
      "The Mainpuri CBSE school published its Class 10 toppers for 2025–26.",
      "Pragati Yadav scored 96%. Several other students crossed 90%.",
      "The full list is kept at the campus and on drk3s.com.",
    ],
  },
  {
    slug: "cbse-class-12-results",
    title: "CBSE Class 12 results, 2025–26",
    date: "2026",
    campus: "Mainpuri",
    excerpt: "Prashant Yadav scored 96.6% in the Class 12 board examination.",
    image: photo("photo-1521587760476-6c12a4b040da"),
    imageAlt: "Library shelves",
    body: [
      "The Mainpuri CBSE school published its Class 12 toppers for 2025–26.",
      "Prashant Yadav scored 96.6%.",
      "Families can ask the school office for the subject-wise list.",
    ],
  },
  {
    slug: "admissions-2026-27",
    title: "Admissions open for 2026–27",
    date: "2026",
    campus: "Mainpuri and Agra",
    excerpt: "Ask the campus for a seat. The Mainpuri desks are open for CBSE and ICSE.",
    image: photo("photo-1509062522246-3755977927d7"),
    imageAlt: "A teacher with a class",
    body: [
      "Admissions for the 2026–27 session are open.",
      "Mainpuri CBSE: +91 94584 73347, +91 83958 82403, drk3samainpuri@gmail.com.",
      "Mainpuri ICSE: +91 74172 21513, drksaicsemainpuri23@gmail.com. For the UP Board college and the Agra CBSE school, use the same form and name the campus.",
    ],
  },
];

export const jobs = [
  {
    title: "Teacher",
    campus: "Mainpuri and Agra",
    type: "Enquiry",
    summary: "Write with the subject and the classes you can teach. The school office will reply when a post is open.",
  },
];

export const programmes = [
  {
    title: "The right syllabus",
    body: "A student follows CBSE, ICSE, or the Uttar Pradesh Board. The examination is the one that board conducts.",
  },
  {
    title: "The early years",
    body: "Nursery and primary classes build the habits of reading, number work, and staying with a task.",
  },
  {
    title: "Senior school",
    body: "Classes 9 to 12 prepare students for the board examination and for the course they choose next.",
  },
];
