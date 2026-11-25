export type Field =
  | { type: "text" | "textarea"; name: string; label: string }
  | { type: "image"; name: string; label: string }
  | { type: "lines"; name: string; label: string; hint?: string }
  | { type: "select"; name: string; label: string; options: string[] }
  | { type: "list"; name: string; label: string; itemLabel: string; fields: Field[] };

export type AdminSection = {
  key: string;
  label: string;
  hint: string;
  fields: Field[];
};

const slideFields: Field[] = [
  { type: "image", name: "src", label: "Photo" },
  { type: "text", name: "alt", label: "Photo description" },
];

export const adminSections: AdminSection[] = [
  {
    key: "brand",
    label: "Site details",
    hint: "The name, email, and phone shown in the footer and on the contact page.",
    fields: [
      { type: "text", name: "name", label: "Short name" },
      { type: "text", name: "legal", label: "Full name" },
      { type: "text", name: "email", label: "Email" },
      { type: "text", name: "phone", label: "Phone" },
      { type: "text", name: "address", label: "Address" },
    ],
  },
  {
    key: "hero",
    label: "Hero",
    hint: "Reads as Bringing / the / Future Forward. Future is italic. The other words are upright.",
    fields: [
      { type: "text", name: "line1", label: "Line 1" },
      { type: "text", name: "line2", label: "Line 2, italic" },
      { type: "text", name: "line3", label: "Line 3, italic" },
      { type: "text", name: "accent", label: "Last line" },
      { type: "list", name: "slides", label: "Photos", itemLabel: "Slide", fields: slideFields },
    ],
  },
  {
    key: "intro",
    label: "Introduction",
    hint: "The green heading under the hero.",
    fields: [
      { type: "textarea", name: "heading", label: "Heading" },
      { type: "textarea", name: "body", label: "Paragraph" },
    ],
  },
  {
    key: "stats",
    label: "Numbers",
    hint: "Four cards. Tone can be green, yellow, or a photo.",
    fields: [
      { type: "text", name: "title", label: "Heading" },
      {
        type: "list",
        name: "items",
        label: "Cards",
        itemLabel: "Card",
        fields: [
          { type: "text", name: "value", label: "Number" },
          { type: "text", name: "label", label: "Label" },
          { type: "select", name: "tone", label: "Colour", options: ["maroon", "gold", "photo"] },
          { type: "textarea", name: "back", label: "Note on the back" },
          { type: "image", name: "image", label: "Photo" },
          { type: "text", name: "imageAlt", label: "Photo description" },
        ],
      },
    ],
  },
  {
    key: "schools",
    label: "Schools",
    hint: "These records power the homepage slider, the four branches, and each school page.",
    fields: [
      { type: "text", name: "title", label: "Homepage heading" },
      { type: "textarea", name: "text", label: "Homepage text" },
      { type: "text", name: "pageKicker", label: "Schools page label" },
      { type: "text", name: "pageTitle", label: "Schools page heading" },
      { type: "textarea", name: "pageText", label: "Schools page text" },
      {
        type: "list",
        name: "items",
        label: "Branches",
        itemLabel: "School",
        fields: [
          { type: "text", name: "name", label: "Name" },
          { type: "text", name: "board", label: "Board" },
          { type: "text", name: "slug", label: "Page address" },
          { type: "text", name: "city", label: "City" },
          { type: "text", name: "state", label: "State" },
          { type: "text", name: "grades", label: "Grades" },
          { type: "text", name: "students", label: "Students" },
          { type: "textarea", name: "blurb", label: "Short description" },
          { type: "image", name: "image", label: "Photo" },
          { type: "text", name: "imageAlt", label: "Photo description" },
          { type: "lines", name: "facilities", label: "Facilities", hint: "One item on each line." },
        ],
      },
    ],
  },
  {
    key: "benefits",
    label: "What schools share",
    hint: "The six cards on the green panel.",
    fields: [
      { type: "text", name: "kicker", label: "Small label" },
      { type: "textarea", name: "title", label: "Heading" },
      {
        type: "list",
        name: "items",
        label: "Cards",
        itemLabel: "Card",
        fields: [
          { type: "text", name: "title", label: "Title" },
          { type: "textarea", name: "body", label: "Text" },
        ],
      },
    ],
  },
  {
    key: "network",
    label: "Four branches",
    hint: "Only the heading and sentence are stored here. Each circle uses that school’s photo, so upload it under Schools. One photo then updates this row, the homepage slider, and the school page.",
    fields: [
      { type: "text", name: "title", label: "Heading" },
      { type: "textarea", name: "text", label: "Text" },
    ],
  },
  {
    key: "edge",
    label: "Network effect",
    hint: "The Saujiyan Edge page.",
    fields: [
      { type: "text", name: "kicker", label: "Small label" },
      { type: "text", name: "title", label: "Heading" },
      { type: "textarea", name: "text", label: "Text" },
      {
        type: "list",
        name: "items",
        label: "Blocks",
        itemLabel: "Block",
        fields: [
          { type: "text", name: "title", label: "Title" },
          { type: "textarea", name: "body", label: "Text" },
        ],
      },
    ],
  },
  {
    key: "collaborations",
    label: "Collaborations",
    hint: "Partner names on the homepage and the collaborations page.",
    fields: [
      { type: "text", name: "title", label: "Homepage heading" },
      { type: "textarea", name: "text", label: "Homepage text" },
      { type: "text", name: "kicker", label: "Page label" },
      { type: "text", name: "pageTitle", label: "Page heading" },
      { type: "textarea", name: "pageText", label: "Page text" },
      {
        type: "list",
        name: "items",
        label: "Partners",
        itemLabel: "Partner",
        fields: [
          { type: "text", name: "name", label: "Name" },
          { type: "textarea", name: "note", label: "Note" },
        ],
      },
    ],
  },
  {
    key: "team",
    label: "Team",
    hint: "The homepage team block. Leadership profiles are a separate section.",
    fields: [
      { type: "text", name: "title", label: "Heading" },
      { type: "textarea", name: "body", label: "Text" },
      { type: "image", name: "photo1", label: "Left photo" },
      { type: "text", name: "alt1", label: "Left photo description" },
      { type: "image", name: "photo2", label: "Right photo" },
      { type: "text", name: "alt2", label: "Right photo description" },
    ],
  },
  {
    key: "join",
    label: "Join banner",
    hint: "The green invitation above the news.",
    fields: [
      { type: "text", name: "title", label: "Heading" },
      { type: "textarea", name: "body", label: "Text" },
    ],
  },
  {
    key: "insights",
    label: "News",
    hint: "Homepage news and the insight articles. Separate paragraphs with a blank line.",
    fields: [
      { type: "text", name: "homeLead", label: "Homepage words before the name" },
      { type: "text", name: "homeAccent", label: "Homepage name, shown in green" },
      { type: "text", name: "kicker", label: "Page label" },
      { type: "text", name: "title", label: "Page heading" },
      { type: "textarea", name: "text", label: "Page text" },
      {
        type: "list",
        name: "items",
        label: "Stories",
        itemLabel: "Story",
        fields: [
          { type: "text", name: "title", label: "Title" },
          { type: "text", name: "slug", label: "Page address" },
          { type: "text", name: "date", label: "Date" },
          { type: "text", name: "campus", label: "Campus" },
          { type: "textarea", name: "excerpt", label: "Short summary" },
          { type: "image", name: "image", label: "Photo" },
          { type: "text", name: "imageAlt", label: "Photo description" },
          { type: "lines", name: "body", label: "Article", hint: "One paragraph on each line." },
        ],
      },
    ],
  },
  {
    key: "leaders",
    label: "Leadership",
    hint: "Profiles on the leadership page.",
    fields: [
      { type: "text", name: "kicker", label: "Small label" },
      { type: "text", name: "title", label: "Heading" },
      { type: "textarea", name: "text", label: "Text" },
      {
        type: "list",
        name: "items",
        label: "People",
        itemLabel: "Person",
        fields: [
          { type: "text", name: "name", label: "Name" },
          { type: "text", name: "role", label: "Role" },
          { type: "textarea", name: "note", label: "Note" },
        ],
      },
    ],
  },
  {
    key: "jobs",
    label: "Careers",
    hint: "Roles on the careers page.",
    fields: [
      { type: "text", name: "kicker", label: "Small label" },
      { type: "text", name: "title", label: "Heading" },
      { type: "textarea", name: "text", label: "Text" },
      {
        type: "list",
        name: "items",
        label: "Roles",
        itemLabel: "Role",
        fields: [
          { type: "text", name: "title", label: "Title" },
          { type: "text", name: "campus", label: "Campus" },
          { type: "text", name: "type", label: "Type" },
          { type: "textarea", name: "summary", label: "Summary" },
        ],
      },
    ],
  },
  {
    key: "contact",
    label: "Contact page",
    hint: "The words around the enquiry form. Email and phone come from Site details.",
    fields: [
      { type: "text", name: "kicker", label: "Small label" },
      { type: "text", name: "title", label: "Heading" },
      { type: "textarea", name: "text", label: "Text" },
      { type: "text", name: "asideTitle", label: "Side panel heading" },
      { type: "textarea", name: "asideText", label: "Side panel text" },
    ],
  },
];

export function findSection(key: string) {
  return adminSections.find((section) => section.key === key);
}
