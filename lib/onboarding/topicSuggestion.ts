const NICHE_SUGGESTIONS: Record<string, string> = {
  fitness: "5 reasons most people quit the gym after 2 weeks",
  travel: "How I planned a 2-week Europe trip for under £1000",
  saas: "The feature we almost didn't build that 3x our retention",
  tech: "The feature we almost didn't build that 3x our retention",
  food: "3 mistakes beginners make when cooking pasta",
};

export function getTopicSuggestion(niche: string): string {
  const key = niche.trim().toLowerCase();
  return NICHE_SUGGESTIONS[key] ?? `3 common mistakes beginners make in ${key}`;
}
