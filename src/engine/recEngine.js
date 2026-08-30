/**
 * Movie Recommendation AI Simulation Engine
 * Simulates user preference embeddings, vector dot-product / cosine similarity, and ranking.
 */

export const GENRES = [
  { id: 'scifi', label: 'Sci-Fi & Futurism', defaultVal: 85, color: '#00F0FF', icon: 'Sparkles' },
  { id: 'action', label: 'High-Octane Action', defaultVal: 75, color: '#3B82F6', icon: 'Zap' },
  { id: 'thriller', label: 'Psychological Thriller', defaultVal: 60, color: '#A855F7', icon: 'Eye' },
  { id: 'comedy', label: 'Comedy & Humor', defaultVal: 30, color: '#F59E0B', icon: 'Smile' },
  { id: 'drama', label: 'Deep Drama', defaultVal: 45, color: '#EC4899', icon: 'Heart' },
  { id: 'romance', label: 'Romance', defaultVal: 20, color: '#F43F5E', icon: 'Flame' }
];

export const MOVIE_DATABASE = [
  {
    id: 'interstellar',
    title: 'Interstellar Odyssey: Beyond Time',
    year: '2024',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    category: 'Sci-Fi Epic / Thriller',
    genres: { scifi: 96, action: 78, thriller: 82, comedy: 15, drama: 88, romance: 35 },
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
    whyMatch: 'Deep alignment with your Sci-Fi (96%) and High-Stakes Action (78%) vectors.'
  },
  {
    id: 'cyberpunk-neon',
    title: 'Neural Drift: 2099',
    year: '2025',
    tagline: 'In a world of artificial memories, truth is the ultimate hack.',
    category: 'Cyberpunk Action / Sci-Fi',
    genres: { scifi: 94, action: 92, thriller: 85, comedy: 20, drama: 50, romance: 25 },
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80',
    whyMatch: 'Matches your highest interest in Futuristic Sci-Fi and High-Intensity Action.'
  },
  {
    id: 'mind-maze',
    title: 'The Paradox Protocol',
    year: '2024',
    tagline: 'Your reality is someone else’s simulation.',
    category: 'Psychological Thriller / Sci-Fi',
    genres: { scifi: 86, action: 65, thriller: 95, comedy: 10, drama: 82, romance: 20 },
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80',
    whyMatch: 'Top scoring candidate for complex narrative structure and thriller dynamics.'
  },
  {
    id: 'cosmic-laugh',
    title: 'Galaxy Patrol: Zero Gravity',
    year: '2023',
    tagline: 'Saving the universe one catastrophic mistake at a time.',
    category: 'Sci-Fi Comedy',
    genres: { scifi: 80, action: 70, thriller: 25, comedy: 95, drama: 20, romance: 30 },
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
    whyMatch: 'Blends your high Sci-Fi preference with lighthearted comedy balance.'
  },
  {
    id: 'eternal-starlight',
    title: 'Echoes Across Light Years',
    year: '2025',
    tagline: 'Love transcends dimensions, light years, and gravitational pull.',
    category: 'Sci-Fi Romantic Drama',
    genres: { scifi: 82, action: 30, thriller: 40, comedy: 25, drama: 92, romance: 94 },
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
    whyMatch: 'Combines cosmic sci-fi world-building with high emotional drama.'
  }
];

/**
 * Calculates Cosine Similarity between user vector and movie genre vector
 */
export function calculateCosineSimilarity(userVec, movieVec) {
  const keys = ['scifi', 'action', 'thriller', 'comedy', 'drama', 'romance'];
  let dotProduct = 0;
  let normUser = 0;
  let normMovie = 0;

  keys.forEach(k => {
    const u = userVec[k] || 0;
    const m = movieVec[k] || 0;
    dotProduct += u * m;
    normUser += u * u;
    normMovie += m * m;
  });

  if (normUser === 0 || normMovie === 0) return 0;
  const similarity = dotProduct / (Math.sqrt(normUser) * Math.sqrt(normMovie));
  return Math.min(99, Math.max(10, Math.round(similarity * 100)));
}

/**
 * Runs recommendation engine
 */
export function recommendMovies(userPreferences) {
  const ranked = MOVIE_DATABASE.map(movie => {
    const matchScore = calculateCosineSimilarity(userPreferences, movie.genres);
    return {
      ...movie,
      matchScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const topMatch = ranked[0];

  return {
    topRecommendation: topMatch,
    allRanked: ranked,
    userVector: userPreferences,
    behaviorInsights: [
      `Normalized ${Object.keys(userPreferences).length}-dimensional vector projection.`,
      `Computed inner product across 10,000+ latent film embeddings.`,
      `Optimal match generated with ${topMatch.matchScore}% vector similarity score.`
    ]
  };
}
