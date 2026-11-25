import {
  benefits,
  brand,
  heroSlides,
  insights,
  jobs,
  leaders,
  photo,
  programmes,
  schools,
  stats,
} from "./data";

export const defaultSite = {
  brand,
  hero: {
    line1: "Bringing",
    line2: "the",
    line3: "Future",
    accent: "Forward",
    slides: heroSlides,
  },
  intro: {
    heading: "Learning with discipline and care.",
    body: "Students study with qualified teachers. Lessons join the syllabus with activity, play, and attention for each child, and with the habits of discipline and hard work. The aim is a student who can think clearly, take responsibility, and step into the next class with confidence.",
  },
  stats: {
    title: "A school day, in four figures",
    items: stats,
  },
  schools: {
    title: "Where students study",
    text: "Open a school to see its classes, its board, and how to ask about admission.",
    pageKicker: "Admissions",
    pageTitle: "Find a classroom",
    pageText: "Choose the school, then read the classes, the laboratories, and the phone number for admission.",
    items: schools,
  },
  benefits: {
    kicker: "In class",
    title: "How children are taught",
    items: benefits,
  },
  network: {
    title: "A school for every stage",
    text: "From the early years to the board examination. Open a card to read the classes and the board.",
  },
  edge: {
    kicker: "Academics",
    title: "A clear path through school",
    text: "The syllabus follows the board. The school day adds reading, practice, discipline, and guidance for the class that comes next.",
    items: programmes,
  },
  collaborations: {
    title: "Boards of study",
    text: "A student is prepared for the examination of the board the school teaches.",
    kicker: "Curriculum",
    pageTitle: "CBSE, ICSE, and the UP Board",
    pageText: "Each school teaches the syllabus of its board, from the early years or from Class 9 through to the board examination.",
    items: [
      { name: "CBSE", note: "Students prepare for the CBSE examination, from the early years through Class 12." },
      { name: "CISCE", note: "Students prepare for the ICSE and ISC examinations. Affiliation UP-513." },
      { name: "UP Board", note: "Adarsh Rashtriya Aavasiya Vidyalay prepares students for the Uttar Pradesh Board. It is a residential school." },
    ],
  },
  team: {
    title: "Who guides the teaching",
    body: "Dr. Ashok Kumar is Chairman. Dr. Kiran Saujiya is Vice President. Mr. Vidyanshu Saujiya is Managing Director. They watch over academics, discipline, and the daily life of the school. The photographs are of classrooms, not portraits.",
    photo1: photo("photo-1577896851231-70ef18881754"),
    alt1: "A teacher with a class",
    photo2: photo("photo-1509062522246-3755977927d7"),
    alt2: "A teacher beside a classroom display",
  },
  join: {
    title: "Admissions for 2026–27",
    body: "Ask about a class for the next session. Mainpuri: +91 94584 73347 or +91 83958 82403. ICSE desk: +91 74172 21513. Please name the class and the school.",
  },
  insights: {
    homeLead: "News from",
    homeAccent: "the classroom",
    kicker: "News",
    title: "Results and school news",
    text: "Board results, the inauguration, and the admission session. The full lists are with the school office.",
    items: insights,
  },
  leaders: {
    kicker: "Leadership",
    title: "Who guides the teaching",
    text: "The Chairman, the Vice President, and the Managing Director look after academics and the conduct of the school.",
    items: leaders,
  },
  jobs: {
    kicker: "Careers",
    title: "Teach with us",
    text: "Teaching posts are announced by the school. Write with the subject and the class you can take.",
    items: jobs,
  },
  contact: {
    kicker: "Contact",
    title: "Ask about a class",
    text: "Admission, a visit, or a teaching post. The note is kept for the office and can also open an email.",
    asideTitle: "Mainpuri office",
    asideText: "Ashok Nagar, Kurawali Road, Mainpuri, Uttar Pradesh 205001. ICSE desk: +91 74172 21513, drksaicsemainpuri23@gmail.com.",
  },
};

export type SiteContent = typeof defaultSite;
export type SectionKey = keyof SiteContent;
