export type TrackzioApp = {
  name: string;
  blurb: string;
  logo: string;
  href: string;
  expert: string;
  features: string[];
};

export const trackzioApps: TrackzioApp[] = [
  {
    name: "Coinzy",
    blurb: "Coins",
    logo: "/apps/coinzy-logo.png",
    href: "https://play.google.com/store/apps/details?id=com.coinzy.trackzio",
    expert: "Coin appraisal",
    features: ["AI identifier", "Expert appraisal", "Global catalogue"],
  },
  {
    name: "Banknote",
    blurb: "Banknotes",
    logo: "/apps/banknotes-logo.png",
    href: "https://play.google.com/store/apps/details?id=com.trackzio.banknote&pcampaignid=web_share",
    expert: "Note evaluation",
    features: ["AI identifier", "Security features", "Global catalogue"],
  },
  {
    name: "Insecto",
    blurb: "Insects",
    logo: "/apps/insecto-logo.png",
    href: "https://trackzio.com/apps/insecto",
    expert: "Species review",
    features: ["AI identifier", "Bite advice", "AI expert"],
  },
  {
    name: "Habiteazy",
    blurb: "Habits",
    logo: "/apps/habiteazy-logo.png",
    href: "https://trackzio.com/apps/habiteazy",
    expert: "Progress review",
    features: ["Habits", "Stats and insights", "Reminders"],
  },
  {
    name: "Rockzy",
    blurb: "Rocks",
    logo: "/apps/rockzy-logo-new.png",
    href: "https://trackzio.com/apps/rockzy",
    expert: "Mineral review",
    features: ["AI identifier", "Mineral catalogue", "Expert review"],
  },
  {
    name: "Plantzy",
    blurb: "Plants",
    logo: "/apps/plantzy-logo.png",
    href: "https://play.google.com/store/apps/details?id=com.trackzio.plants&pcampaignid=web_share",
    expert: "Plant diagnosis",
    features: ["AI plant identification", "Care schedules", "AI expert"],
  },
  {
    name: "Antiqzy",
    blurb: "Antiques",
    logo: "/apps/antiqzy-logo.png",
    href: "https://play.google.com/store/apps/details?id=com.trackzio.antiquevintage&pcampaignid=web_share",
    expert: "Antique appraisal",
    features: ["AI identification", "Object review", "Ask AI"],
  },
  {
    name: "Shroomzy",
    blurb: "Mushrooms",
    logo: "/apps/shroomzy-logo.png",
    href: "https://play.google.com/store/apps/details?id=com.trackzio.mushrooms&pcampaignid=web_share",
    expert: "Fungi review",
    features: ["AI identification", "Toxicity guide", "Ask AI"],
  },
];
