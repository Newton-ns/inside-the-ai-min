/**
 * Spam Detection AI Simulation Engine
 * Simulates tokenization, feature extraction, urgency weights, neural activations, and probability calculation.
 */

export const SPAM_PATTERNS = [
  {
    category: 'Financial & Prize Triggers',
    color: '#EF4444',
    weight: 28,
    keywords: ['free', 'won', 'win', 'winner', 'prize', 'gift', 'lottery', 'cash', 'dollars', 'bonus', 'reward', '$', 'million', 'bitcoin', 'crypto', 'investment', 'profit', '100% free']
  },
  {
    category: 'Urgency & Pressure Tactics',
    color: '#F59E0B',
    weight: 24,
    keywords: ['click now', 'act now', 'immediate', 'urgent', 'urgently', 'expire', 'expires', 'hurry', 'limited time', "don't wait", 'last chance', 'instant', 'now']
  },
  {
    category: 'Suspicious Call-to-Action',
    color: '#EC4899',
    weight: 26,
    keywords: ['click here', 'claim now', 'claim', 'verify account', 'account suspended', 'wire transfer', 'bank details', 'password reset', 'unauthorized access', 'click', 'link below', 'confirm identity']
  },
  {
    category: 'Promotional & Flattery Language',
    color: '#A855F7',
    weight: 20,
    keywords: ['congratulations', 'congrats', 'selected', 'exclusive deal', 'exclusive', 'offer', 'guarantee', 'risk-free', 'special promotion', 'valuable customer', 'dear friend']
  }
];

export const LEGIT_PATTERNS = [
  'meeting', 'lunch', 'schedule', 'project', 'attached', 'presentation', 'hello', 'hi', 'hey', 
  'thanks', 'thank you', 'sincerely', 'regards', 'team', 'colleague', 'quarterly', 'report', 
  'update', 'catch up', 'review', 'agenda', 'call', 'tomorrow', 'notes', 'feedback', 'sync'
];

export const PRESET_SPAM_EXAMPLES = [
  {
    label: 'Prize Lottery (High Spam)',
    text: 'Congratulations! You won a free iPhone. Click here now to claim your prize!',
    category: 'High Spam'
  },
  {
    label: 'Urgent Bank Alert (Phishing)',
    text: 'URGENT: Your bank account is suspended. Click here immediately to verify your identity and avoid permanent closure.',
    category: 'Phishing / Spam'
  },
  {
    label: 'Crypto Investment Offer (Promo)',
    text: 'Exclusive offer: Double your Bitcoin in 24 hours with zero risk. Guaranteed 300% profit. Claim your spot now!',
    category: 'Promotional Spam'
  },
  {
    label: 'Team Meeting Sync (Legitimate)',
    text: 'Hi team, attached is the agenda for tomorrow’s quarterly sync. Let me know if you have any questions before the meeting.',
    category: 'Legitimate Email'
  },
  {
    label: 'Casual Lunch Catch-up (Legitimate)',
    text: 'Hey Alex, are we still meeting for lunch at 12:30 today? Let me know if that time still works for you!',
    category: 'Legitimate Email'
  }
];

/**
 * Tokenizes text into word tokens while preserving punctuation/positions
 */
export function tokenizeText(text) {
  if (!text || typeof text !== 'string') return [];
  const words = text.trim().split(/\s+/);
  return words.map((rawWord, index) => {
    const cleanWord = rawWord.toLowerCase().replace(/[^a-z0-9$]/g, '');
    return {
      id: `tok-${index}-${rawWord}`,
      raw: rawWord,
      clean: cleanWord,
      index
    };
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^\${}()|[\]\\]/g, '\\/**
 * Evaluates text and extracts features, confidence, reasons, and node activation states
 */');
}

function countMatches(text, keyword) {
  const pattern = new RegExp(`\\\\b${escapeRegExp(keyword)}\\\\b`, 'gi');
  return (text.match(pattern) || []).length;
}

/**
 * Evaluates text and extracts features, confidence, reasons, and node activation states
 */
export function analyzeSpam(text) {
  if (!text || !text.trim()) {
    return {
      tokens: [],
      detectedFeatures: [],
      spamScore: 10,
      hamScore: 90,
      prediction: 'LEGITIMATE',
      confidence: 90,
      riskLevel: 'Safe',
      reasons: ['No suspicious content detected'],
      rawText: '',
      layerActivations: [10, 8, 12, 10, 15]
    };
  }

  const lowerText = text.toLowerCase();
  const tokens = tokenizeText(text);
  const detectedFeatures = [];
  let totalSpamWeight = 0;
  let legitBonus = 0;

  // Multi-word phrase & single keyword detection
  SPAM_PATTERNS.forEach(group => {
    group.keywords.forEach(kw => {
      const kwLower = kw.toLowerCase();
      const count = countMatches(lowerText, kwLower);
      if (count > 0) {
        detectedFeatures.push({
          id: `feat-${group.category}-${kwLower}`,
          keyword: kw.toUpperCase(),
          category: group.category,
          color: group.color,
          weight: group.weight,
          count,
          description: `${group.category} (+${group.weight * count}pts)`
        });
        totalSpamWeight += group.weight * count;
      }
    });
  });

  // Check legitimate keywords
  LEGIT_PATTERNS.forEach(kw => {
    if (lowerText.includes(kw)) {
      legitBonus += 15;
    }
  });

  // Caps lock ratio analysis
  const letters = text.replace(/[^a-zA-Z]/g, '');
  const uppercaseLetters = text.replace(/[^A-Z]/g, '');
  const capsRatio = letters.length > 0 ? (uppercaseLetters.length / letters.length) : 0;
  if (capsRatio > 0.4 && letters.length > 8) {
    detectedFeatures.push({
      id: 'feat-caps',
      keyword: 'EXCESSIVE CAPS',
      category: 'Urgency & Pressure Tactics',
      color: '#F59E0B',
      weight: 18,
      count: 1,
      description: 'High uppercase character frequency (+18pts)'
    });
    totalSpamWeight += 18;
  }

  // Exclamation marks
  const exclamationCount = (text.match(/!/g) || []).length;
  if (exclamationCount >= 2) {
    detectedFeatures.push({
      id: 'feat-excl',
      keyword: 'MULTIPLE EXCLAMATIONS (!!!)',
      category: 'Urgency & Pressure Tactics',
      color: '#F59E0B',
      weight: 12,
      count: exclamationCount,
      description: `Excessive exclamation points (+12pts)`
    });
    totalSpamWeight += 12;
  }

  // Heuristic probability calculation
  let rawSpamScore = Math.min(98, Math.max(4, Math.round(15 + totalSpamWeight - (legitBonus * 0.7))));
  if (detectedFeatures.length === 0) {
    rawSpamScore = Math.max(5, Math.min(18, 12 - legitBonus));
  }

  const spamScore = rawSpamScore;
  const hamScore = 100 - spamScore;

  let prediction = 'LEGITIMATE';
  let confidence = hamScore;
  let riskLevel = 'Safe';

  if (spamScore >= 65) {
    prediction = 'SPAM';
    confidence = spamScore;
    riskLevel = 'High Risk';
  } else if (spamScore >= 40) {
    prediction = 'SUSPICIOUS';
    confidence = spamScore;
    riskLevel = 'Moderate Risk';
  } else {
    prediction = 'LEGITIMATE';
    confidence = hamScore;
    riskLevel = 'Safe';
  }

  // Generate explanation reasons
  const reasons = [];
  if (detectedFeatures.length > 0) {
    const categoriesSeen = new Set();
    detectedFeatures.forEach(f => {
      if (!categoriesSeen.has(f.category)) {
        categoriesSeen.add(f.category);
        reasons.push(`${f.category}: Trigger words like "${f.keyword}" strongly shift probability.`);
      }
    });
  } else {
    reasons.push('No known promotional, financial, or urgency patterns found.');
    reasons.push('Tone matches natural conversational communication.');
  }

  // Simulated neural activations for each layer
  const layerActivations = [
    Math.min(100, 20 + detectedFeatures.length * 15),
    Math.min(100, 30 + totalSpamWeight * 0.8),
    Math.min(100, 25 + spamScore * 0.75),
    Math.min(100, confidence)
  ];

  return {
    tokens,
    detectedFeatures,
    spamScore,
    hamScore,
    prediction,
    confidence,
    riskLevel,
    reasons,
    rawText: text,
    layerActivations
  };
}
