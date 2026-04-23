export interface CardData {
  id: string;
  type: 'warm-up' | 'stretch' | 'brave';
  front: {
    hook: string;
    tag: string;
    microExplanation: string;
  };
  back: {
    strategy: string;
    lookFor: string[];
    remember: string;
  };
  isTopPick?: boolean;
}

export const CARDS: CardData[] = [
  {
    id: 'warm-up-1',
    type: 'warm-up',
    isTopPick: true,
    front: {
      hook: "Did you attend that last talk?",
      tag: "🟢 Warm-up",
      microExplanation: "Easy way to start without overthinking."
    },
    back: {
      strategy: "This won’t feel random to them",
      lookFor: [
        "→ If they engage → ask what they thought",
        "→ If not → keep it brief or step away"
      ],
      remember: "You’re just continuing what’s already happening"
    }
  },
  {
    id: 'warm-up-2',
    type: 'warm-up',
    front: {
      hook: "Hey, I just got here and don’t know many people mind if I join?",
      tag: "🟢 Warm-up",
      microExplanation: "Honest and low-pressure entry."
    },
    back: {
      strategy: "People respond well to honesty",
      lookFor: [
        "→ If they welcome you → relax and listen",
        "→ If hesitant → don’t push"
      ],
      remember: "Respect makes entry easier"
    }
  },
  {
    id: 'stretch-1',
    type: 'stretch',
    front: {
      hook: "Am I interrupting something important, or can I join?",
      tag: "🟠 Stretch",
      microExplanation: "It makes your entry feel easy and non-intrusive"
    },
    back: {
      strategy: "It makes your entry feel easy and non-intrusive",
      lookFor: [
        "→ If they smile → step in",
        "→ If not → exit smoothly"
      ],
      remember: "Keep it light, not perfect"
    }
  },
  {
    id: 'stretch-2',
    type: 'stretch',
    front: {
      hook: "What did you think about that speaker?",
      tag: "🟠 Stretch",
      microExplanation: "Easy way to open a real conversation"
    },
    back: {
      strategy: "Easy way to open a real conversation",
      lookFor: [
        "→ Look for shared interests",
        "→ Ask follow up questions"
      ],
      remember: "Curiosity is contagious"
    }
  },
  {
    id: 'brave-1',
    type: 'brave',
    front: {
      hook: "Nice talking to you, I’ll let you mingle.",
      tag: "🔮 Brave",
      microExplanation: "Light tone reduces awkwardness."
    },
    back: {
      strategy: "Light tone reduces awkwardness.",
      lookFor: [
        "→ Exit with a smile",
        "→ Don't linger if they are busy"
      ],
      remember: "Knowing when to leave is a skill"
    }
  }
];
