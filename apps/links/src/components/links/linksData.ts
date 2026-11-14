import { LinkItem } from "@/types/types";

export const websiteLinks: LinkItem[] = [
  {
    title: "SCEE AOT Main Website",
    url: "https://www.sceeaot.vercel.app",
    description: "Our central platform featuring chapter initiatives, team members, achievements, and events.",
    badge: "MAIN HUB",
    handle: "sceeaot.vercel.app",
  },
  {
    title: "IoTRICITY Season 3 Guide",
    url: "https://iotricitys3.notion.site/IoTRICITY-Season-3-Hackers-Guide-3dfb2a0148308038b7bacbba80dd2fff",
    description: "Official hacker's handbook, rules, problem statements, and live updates for Season 3.",
    badge: "FLAGSHIP EVENT",
    handle: "iotricitys3.notion.site",
  },
  {
    title: "Chapter Photo Gallery",
    url: "https://drive.google.com/drive/folders/1RawkgELoOl6BvUNoYWbLbEe-VXSc-NbU",
    description: "High-resolution archives, workshop moments, and community event memories.",
    badge: "ARCHIVE",
    handle: "drive.google.com",
  },
  {
    title: "Write To Us",
    url: "mailto:sceeaot@gmail.com",
    description: "Direct email for partnerships, collaborations, inquiries, and student memberships.",
    badge: "CONTACT",
    handle: "sceeaot@gmail.com",
  },
];

export const socialMediaLinks: LinkItem[] = [
  {
    title: "Instagram",
    url: "https://instagram.com/sceeaot",
    iconImage: "/icons/instagram.svg",
    description: "Behind-the-scenes stories, event teasers, and visual highlights.",
    handle: "@sceeaot",
    badge: "COMMUNITY",
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/company/iei-students-chapter-of-ee-academy-of-technology",
    iconImage: "/icons/linkedin.svg",
    description: "Professional networking, alumni milestones, and academic updates.",
    handle: "IEI Students' Chapter of EE",
    badge: "CAREERS",
  },
  {
    title: "Discord",
    url: "https://discord.gg/yYmhfC3Qdq",
    iconImage: "/icons/discord.svg",
    description: "Real-time discussions, project collaboration, and developer chats.",
    handle: "discord.gg/yYmhfC3Qdq",
    badge: "DISCUSSIONS",
  },
  {
    title: "WhatsApp Community",
    url: "https://chat.whatsapp.com/DuI1NQ4y1hpGp33mL0lWp8?mode=ac_t",
    iconImage: "/icons/whatsapp.svg",
    description: "Fast announcements, event reminders, and broadcast updates.",
    handle: "SCEE Broadcast",
    badge: "UPDATES",
  },
  {
    title: "X (Twitter)",
    url: "https://x.com/sceeaot",
    iconImage: "/icons/twitter.svg",
    description: "Engineering news, tech threads, and live event announcements.",
    handle: "@sceeaot",
    badge: "BROADCAST",
  },
  {
    title: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61552070552351",
    iconImage: "/icons/facebook.svg",
    description: "Campus community updates, photo albums, and public notices.",
    handle: "IEI Students Chapter AOT",
    badge: "NETWORK",
  },
  {
    title: "YouTube",
    url: "https://www.youtube.com/@sceeaot",
    iconImage: "/icons/youtube.svg",
    description: "Recorded tech talks, workshop walkthroughs, and event recaps.",
    handle: "@sceeaot",
    badge: "VIDEOS",
  },
];

export const linksData: LinkItem[] = [...websiteLinks, ...socialMediaLinks];
