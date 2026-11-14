export const homeAssets = {
  hero: "/images/background.png",
  logo: "/scee_logo.png",
  team: [
    "https://www.figma.com/api/mcp/asset/7f30f13a-beb4-43d3-9298-08ffd8c12a94.png",
    "https://www.figma.com/api/mcp/asset/50b75aac-3ff4-4d87-8e04-546488ea902f.png",
    "https://www.figma.com/api/mcp/asset/861d6bcb-3c5b-43f4-a6dc-e95391e9fa7c.png",
  ],
  events: [
    "https://www.figma.com/api/mcp/asset/b8c88247-53e8-4f9c-9ca1-1214ae19e638.png",
    "https://www.figma.com/api/mcp/asset/c383d8eb-fb82-4aeb-8e1a-f79e1a0660f2.png",
  ],
} as const;

export const teamYears = ["2025-26", "2024-25", "2023-24"] as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: readonly FaqItem[] = [
  {
    question: "What is the IEI Students' Chapter?",
    answer:
      "The IEI Students' Chapter is a student community that aims to provide a platform for students to explore engineering topics through workshops, competitions, and networking opportunities.",
  },
  {
    question: "How can I join the IEI Students' Chapter?",
    answer:
      "You can join by signing up at any of our events or by contacting one of our members. Visit the 'Contact Us' section for more information.",
  },
  {
    question: "What type of events does the chapter organize?",
    answer:
      "We organize a range of events including hands-on workshops, ideathons, competitions, and brainstorming sessions focused on both core and non-core topics.",
  },
  {
    question: "How many events does SCEE conduct in a year?",
    answer:
      "The SCEE conducts approximately 3-4 events each year, including workshops, seminars, and competitions.",
  },
  {
    question: "Do events have any registration fee?",
    answer:
      "Yes, there is a registration fee for participating in the events. Please check the specific event details for more information.",
  },
  {
    question: "Is there any criteria for participating in an event?",
    answer:
      "No, there are no specific criteria for participating in the events. All students are welcome to join and participate.",
  },
  {
    question: "Are certificates provided for the events?",
    answer:
      "Yes, participants will receive certificates for attending and completing the events.",
  },
  {
    question: "Are the certificates eligible for acquiring MAR points?",
    answer:
      "Yes, the certificates provided by the SCEE are eligible for acquiring MAR points.",
  },
] as const;
