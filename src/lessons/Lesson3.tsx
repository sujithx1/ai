import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, CheckCircle2, ChevronRight, RotateCcw, ShieldAlert, Cpu
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export default function Lesson3({ onComplete }: { onComplete: (xp: number) => void }) {
  // Playground State: Classify Apps
  const [currentPlaygroundIndex, setCurrentPlaygroundIndex] = useState<number>(0);
  const [playgroundResult, setPlaygroundResult] = useState<string | null>(null);

  const playgroundApps = [
    { name: "Siri", correctType: "ANI", desc: "Voice assistant that answers queries, sets alarms, but can't compose original symphonies." },
    { name: "HAL 9000 (Sci-Fi)", correctType: "AGI", desc: "Can perform any intellectual task a human can, including spaceship operation and conversational strategy." },
    { name: "Skynet (Terminator)", correctType: "ASI", desc: "A superintelligent network that surpasses all human intelligence combined." },
    { name: "Google Translate", correctType: "ANI", desc: "Instantly translates text between 100+ languages, but cannot write its own compiler." }
  ];

  // Mini Project State: AI Type Identifier
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [identifierResult, setIdentifierResult] = useState<{ type: string; desc: string; badge: string } | null>(null);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const runIdentifier = () => {
    if (selectedFeatures.includes('world_domination') || selectedFeatures.includes('transcends_humanity')) {
      setIdentifierResult({
        type: "Artificial Super Intelligence (ASI) 🌌",
        desc: "Exceeds the collective cognitive performance of all humanity across every single field.",
        badge: "God Mode"
      });
    } else if (selectedFeatures.includes('human_reasoning') && selectedFeatures.includes('adaptability')) {
      setIdentifierResult({
        type: "Artificial General Intelligence (AGI) 🧠",
        desc: "Equal to human-level intelligence. Can understand, learn, and apply knowledge across multiple domains.",
        badge: "Human Equal"
      });
    } else if (selectedFeatures.length > 0) {
      setIdentifierResult({
        type: "Artificial Narrow Intelligence (ANI) 🤖",
        desc: "A specialist. Good at specific tasks (like chess, text synthesis, or driving) but completely lacks general reasoning.",
        badge: "Task Specialist"
      });
    } else {
      setIdentifierResult(null);
    }
  };

  // Mini Challenge State (20 Apps)
  const challengeApps = [
    "Gmail Spam Filter", "Tesla Autopilot", "ChatGPT", "Midjourney", "AlphaGo",
    "Netflix Recommendation Engine", "Spotify DJ", "Google Maps", "Stock Trading Bot", "Siri",
    "Adobe Photoshop AI fill", "GitHub Copilot", "IBM Watson", "Snapchat MyAI", "Duolingo AI tutor",
    "Character.ai", "Claude.ai", "Perplexity", "FaceID Unlock", "YouTube Shorts Feed"
  ];
  const [challengeDone, setChallengeDone] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Completion state
  const [lessonFinished, setLessonFinished] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which type of AI represents all existing AI systems in the real world today?",
      options: ["Artificial General Intelligence (AGI)", "Artificial Super Intelligence (ASI)", "Artificial Narrow Intelligence (ANI)", "Self-Aware AI"],
      answer: 2,
      explanation: "Every AI system in production today, from ChatGPT to Tesla's autopilot, is classified as Narrow AI (ANI) because they are designed for specific tasks."
    },
    {
      id: 2,
      question: "How does General AI (AGI) differ from Narrow AI (ANI)?",
      options: [
        "AGI can learn and adapt to any intellectual task a human can, whereas ANI is bound to specific tasks.",
        "AGI runs faster on hardware.",
        "AGI uses rules, while ANI uses data.",
        "AGI does not exist in movies, while ANI does."
      ],
      answer: 0,
      explanation: "AGI represents human-level intelligence that can generalize learning across completely unrelated domains without retraining."
    },
    {
      id: 3,
      question: "Is Artificial Super Intelligence (ASI) real today?",
      options: [
        "Yes, OpenAI hosts ASI on its servers.",
        "No, ASI is purely theoretical and does not exist yet.",
        "Yes, supercomputers in military bases have reached ASI.",
        "Yes, Google Maps is an ASI."
      ],
      answer: 1,
      explanation: "ASI is a hypothetical future where AI surpasses human intelligence across all fields. It does not exist today."
    },
    {
      id: 4,
      question: "Which of the following is a key characteristic of a 'Reactive Machine'?",
      options: [
        "It remembers previous conversations to learn.",
        "It has no memory and acts only on immediate observations.",
        "It understands human emotions.",
        "It is self-aware."
      ],
      answer: 1,
      explanation: "Reactive Machines (like IBM's Deep Blue) do not store history or past experiences; they react to current inputs dynamically."
    },
    {
      id: 5,
      question: "Self-driving cars are an example of which type of AI classification?",
      options: ["Reactive Machine", "Limited Memory AI", "Theory of Mind AI", "Self-Aware AI"],
      answer: 1,
      explanation: "Self-driving cars use Limited Memory AI because they store past data (like speed limits, lane markers, and nearby vehicle positions) over short periods to navigate."
    },
    {
      id: 6,
      question: "In our Naruto analogy, what represents 'Narrow AI'?",
      options: ["Chakra training", "Shadow Clones performing specific separate chores", "Nine-tails seal", "Sage Mode"],
      answer: 1,
      explanation: "Naruto's Shadow Clones doing specific, discrete tasks represent Narrow AI models designed for individual workloads."
    },
    {
      id: 7,
      question: "What is 'Theory of Mind' AI?",
      options: [
        "An AI that knows how to write psychiatric research papers.",
        "AI that can understand human emotions, beliefs, and expectations to interact socially.",
        "A system that stores infinite database records.",
        "AI that operates completely without any electricity."
      ],
      answer: 1,
      explanation: "Theory of Mind AI is a future level of AI that understands that humans have minds, feelings, and beliefs, adjusting its behavior accordingly."
    },
    {
      id: 8,
      question: "Which of these is NOT a limitation of Narrow AI?",
      options: [
        "It cannot perform tasks outside of its specific training.",
        "It lacks common sense reasoning.",
        "It is too expensive to run on modern computers.",
        "It cannot transfer its learned skills to unrelated areas."
      ],
      answer: 2,
      explanation: "Narrow AI runs very efficiently on modern consumer hardware; its limitations are generalization, common sense, and adaptability, not hardware cost."
    },
    {
      id: 9,
      question: "In the Iron Man analogy, JARVIS represents what transition?",
      options: [
        "An advance in computer cooling systems.",
        "The bridge between highly advanced Narrow AI and General AI (AGI).",
        "A simple spreadsheet calculator.",
        "An analog radio transmitter."
      ],
      answer: 1,
      explanation: "JARVIS acts as a transition because it performs thousands of narrow tasks seamlessly, mimicking general reasoning."
    },
    {
      id: 10,
      question: "What is a common beginner mistake regarding ChatGPT?",
      options: [
        "Believing it is an AGI just because it is good at writing text.",
        "Thinking it uses Python.",
        "Knowing it has a context window.",
        "Using it to generate code."
      ],
      answer: 0,
      explanation: "Many beginners mistake ChatGPT's text fluidity for general human understanding. It is still a Narrow AI model predicting word distributions."
    },
    {
      id: 11,
      question: "Which type of AI would be able to feel pain, happiness, or fear?",
      options: ["Reactive Machines", "Limited Memory", "Theory of Mind", "Self-Aware AI"],
      answer: 3,
      explanation: "Self-Aware AI is the ultimate theoretical stage where the AI has its own consciousness, internal states, and emotions."
    },
    {
      id: 12,
      question: "Why can't Google Search drive a car?",
      options: [
        "It doesn't have a driver's license.",
        "It is a Narrow AI trained only to index and retrieve web documents.",
        "It lacks internet connection.",
        "The steering wheel is too small for its code."
      ],
      answer: 1,
      explanation: "ANI cannot generalize. A tool built for search query indexing cannot drive a vehicle without entirely new training, models, and sensory hardware."
    },
    {
      id: 13,
      question: "What is the primary challenge in building AGI?",
      options: [
        "We do not have enough electricity.",
        "We don't know how to code general reasoning, common sense, and zero-shot adaptivity.",
        "The internet is not big enough.",
        "Computers cannot read text."
      ],
      answer: 1,
      explanation: "Building AGI is hard because we lack algorithms that simulate true common-sense understanding, causal reasoning, and cross-domain adaptation."
    },
    {
      id: 14,
      question: "In the Pokémon analogy, what represents 'Different AI types'?",
      options: [
        "Different Pokémon (e.g. water type squirts water, fire type burns things).",
        "The gym leaders.",
        "The Pokéballs.",
        "The Pokémon evolution stones."
      ],
      answer: 0,
      explanation: "Different Pokémon types possess specific capabilities (water type squirts water, electric type sparks electricity). They are specialized, just like different Narrow AI models."
    },
    {
      id: 15,
      question: "What badge is unlocked at the completion of Lesson 3?",
      options: ["AI Explorer", "AI Classifier", "History Buff", "Ninja Code"],
      answer: 1,
      explanation: "Completing Lesson 3 unlocks the 'AI Classifier' badge and awards you +300 XP!"
    }
  ];

  const handlePlaygroundSubmit = (choice: string) => {
    const app = playgroundApps[currentPlaygroundIndex];
    if (choice === app.correctType) {
      setPlaygroundResult("Correct! 🎉 " + app.desc);
    } else {
      setPlaygroundResult("Incorrect. 😢 Try again! Remember, " + app.name + " is " + app.correctType + ".");
    }
  };

  const handleNextPlayground = () => {
    setPlaygroundResult(null);
    setCurrentPlaygroundIndex(prev => (prev + 1) % playgroundApps.length);
  };

  const handleQuizAnswer = (qId: number, optionIdx: number) => {
    if (showQuizResults) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const submitQuiz = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.answer) {
        score++;
      }
    });
    setQuizScore(score);
    setShowQuizResults(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setShowQuizResults(false);
    setQuizScore(0);
  };

  const claimXP = () => {
    setLessonFinished(true);
    onComplete(300);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Hero Header */}
      <div className="relative p-8 rounded-3xl overflow-hidden glass-panel">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" /> Architecture • Lesson 3
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            🤖 The Types of Artificial Intelligence (AI)
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl font-light">
            Can ChatGPT drive a Tesla? Can Siri write a movie script? Let's break down the categories of AI, from simple algorithms to sci-fi superintelligences.
          </p>
        </div>
      </div>

      {/* Hook */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          🎬 The Hook
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Can ChatGPT drive a car? Can it think like a human? Or is it just a wizard at one specific game? Let's discover how scientists classify these digital brains.
        </p>
      </div>

      {/* Learning Objectives */}
      <div className="p-6 rounded-2xl glass-panel space-y-3">
        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
          🎯 Learning Objectives
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-300">
          <li className="flex items-center gap-2">🤖 Master ANI (Narrow AI) properties</li>
          <li className="flex items-center gap-2">🧠 Understand the roadmap to AGI (General AI)</li>
          <li className="flex items-center gap-2">🌌 Learn about ASI (Super AI) theories</li>
          <li className="flex items-center gap-2">⚙️ Differentiate Reactive, Limited Memory, and Theory of Mind AI</li>
        </ul>
      </div>

      {/* What Are Types of AI? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🤖 What Are Types of AI?
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Not all AI is created equal. A chess computer and an autopilot systems are both called "AI," but they operate on completely different rules. We categorize AI by **capability** (what they can do) and **functionality** (how they behave).
        </p>
      </section>

      {/* Type 1: Narrow AI */}
      <section className="space-y-4">
        <div className="p-6 rounded-2xl glass-panel border-l-4 border-l-cyan-400 space-y-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            🧠 1. Artificial Narrow Intelligence (ANI)
          </h3>
          <p className="text-xs text-cyan-400 uppercase tracking-widest font-mono font-bold">The Specialists</p>
          <p className="text-sm text-slate-300">
            Narrow AI is designed and trained for **one specific task**. It cannot generalize. If you ask a chest-playing AI to paint a cat, it will crash.
          </p>
          <div className="bg-slate-950/40 p-4 rounded-xl space-y-2 text-xs">
            <p>🌟 <strong>Examples:</strong> ChatGPT, Google Search, Siri, Alexa, Netflix Recommendations.</p>
            <p>👍 <strong>Advantages:</strong> Superhuman speed and accuracy at their targeted task.</p>
            <p>👎 <strong>Limitations:</strong> Zero common sense. Cannot adapt to new workloads without retraining.</p>
          </div>
        </div>
      </section>

      {/* Type 2: General AI */}
      <section className="space-y-4">
        <div className="p-6 rounded-2xl glass-panel border-l-4 border-l-purple-500 space-y-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            🧠 2. Artificial General Intelligence (AGI)
          </h3>
          <p className="text-xs text-purple-400 uppercase tracking-widest font-mono font-bold">The Humans</p>
          <p className="text-sm text-slate-300">
            AGI represents a machine with **human-level intelligence**. It can learn, understand, adapt, and apply knowledge across multiple completely unrelated fields.
          </p>
          <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex gap-3 text-rose-300 text-xs">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <div>
              <strong>Does AGI exist today?</strong> No. It remains a theoretical goal. Modern LLMs look smart, but they still lack general reasoning, common sense, and causal understanding.
            </div>
          </div>
        </div>
      </section>

      {/* Type 3: Super AI */}
      <section className="space-y-4">
        <div className="p-6 rounded-2xl glass-panel border-l-4 border-l-amber-500 space-y-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            🧠 3. Artificial Super Intelligence (ASI)
          </h3>
          <p className="text-xs text-amber-400 uppercase tracking-widest font-mono font-bold">The Gods</p>
          <p className="text-sm text-slate-300">
            ASI is a hypothetical stage where AI **surpasses all human intelligence combined**. It would be better than us at science, creativity, social skills, and general problem solving.
          </p>
          <p className="text-xs text-slate-400">
            ⚠️ <em>Important: This is currently science fiction and does not exist.</em>
          </p>
        </div>
      </section>

      {/* Behavior-based Classification */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">⚙️ Another Way to Classify AI (Behavior)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-white font-bold text-sm">1. Reactive Machines</h4>
            <p className="text-xs text-slate-400">Has no memory. Reacts strictly to current inputs.</p>
            <p className="text-xs text-slate-300 italic">Example: IBM Deep Blue Chess Computer.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-white font-bold text-sm">2. Limited Memory AI</h4>
            <p className="text-xs text-slate-400">Stores observations briefly to make decisions.</p>
            <p className="text-xs text-slate-300 italic">Example: Self-Driving Cars monitoring adjacent vehicles.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-white font-bold text-sm">3. Theory of Mind AI</h4>
            <p className="text-xs text-slate-400">Understands human emotions, beliefs, and thoughts.</p>
            <p className="text-xs text-slate-300 italic">Example: Future interactive social robots (not yet real).</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-white font-bold text-sm">4. Self-Aware AI</h4>
            <p className="text-xs text-slate-400">Has consciousness, desires, and self-awareness.</p>
            <p className="text-xs text-slate-300 italic">Example: Sci-fi robots like WALL-E (pure theory).</p>
          </div>
        </div>
      </section>

      {/* Visual Comparison Table */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📊 Visual Comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-850">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold border-b border-slate-800">
                <th className="p-3">Attribute</th>
                <th className="p-3">ANI (Narrow)</th>
                <th className="p-3">AGI (General)</th>
                <th className="p-3">ASI (Super)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 bg-slate-950/20">
              <tr>
                <td className="p-3 font-semibold text-white">Learning Ability</td>
                <td className="p-3">Strictly one domain</td>
                <td className="p-3">Cross-domain learning</td>
                <td className="p-3">Instant self-evolution</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Memory</td>
                <td className="p-3">Task-based datasets</td>
                <td className="p-3">General experiences</td>
                <td className="p-3">Infinite global synthesis</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Intelligence</td>
                <td className="p-3">Specialist tool</td>
                <td className="p-3">Equal to a human</td>
                <td className="p-3">Beyond all humanity</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Exists Today?</td>
                <td className="p-3 text-emerald-400 font-bold">Yes ✅</td>
                <td className="p-3 text-rose-400 font-semibold">No ❌</td>
                <td className="p-3 text-rose-400 font-semibold">No ❌</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Anime Analogies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🎌 Anime & Movie Analogies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍥</span>
              <div>
                <h4 className="text-white font-semibold">Naruto: Shadow Clones</h4>
                <p className="text-xs text-slate-400">Narrow AI vs Integrated AGI</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              When Naruto summons a clone to peel potatoes, it is excellent at peeling potatoes. If a ninja attacks, the clone pop-poofs away. This is **Narrow AI**. An **AGI** is the real Naruto—capable of learning Rasengan, eating ramen, studying strategy, and adapting to any battle.
            </p>
          </div>
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              <div>
                <h4 className="text-white font-semibold">Wall-E: Self-Awareness</h4>
                <p className="text-xs text-slate-400">Classifying Behavior</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              WALL-E was built to compress trash (Narrow/Reactive task). But over 700 years, he developed curiosity, romance, fear, and a personality. He transitioned from a simple Limited Memory machine into a fully **Self-Aware AI**.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Playground: Classify Apps */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🎮 Playground: Classify the Apps
          </h2>
          <span className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 font-mono">
            Sandbox Widget
          </span>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-4 text-center">
          <div className="text-xs text-slate-400 uppercase tracking-widest">Question {currentPlaygroundIndex + 1} of {playgroundApps.length}</div>
          <h3 className="text-2xl font-extrabold text-white">Is "{playgroundApps[currentPlaygroundIndex].name}" ANI, AGI, or ASI?</h3>

          <div className="flex justify-center gap-4 py-4">
            {["ANI", "AGI", "ASI"].map((type) => (
              <button
                key={type}
                onClick={() => handlePlaygroundSubmit(type)}
                className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 rounded-xl font-bold text-sm transition-all"
              >
                {type}
              </button>
            ))}
          </div>

          {playgroundResult && (
            <div className="text-xs font-semibold p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-slate-300 max-w-md mx-auto">
              {playgroundResult}
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleNextPlayground}
              className="text-xs text-slate-400 hover:text-white underline flex items-center gap-1 mx-auto"
            >
              Next App <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Code Sandbox Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          💻 React + TypeScript Code Example
        </h2>
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <p className="text-sm text-slate-300">
            Here is a React component demonstrating how we can structure data models representing different types of AI capabilities in type-safe TypeScript:
          </p>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117]">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-400">AiTypeCard.tsx</span>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20 font-semibold uppercase">
                Typescript Types
              </span>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`import React from 'react';

// Define the type classification options
type AiCategory = 'Narrow (ANI)' | 'General (AGI)' | 'Super (ASI)';

interface AiModelProps {
  name: string;
  category: AiCategory;
  description: string;
  isReal: boolean;
}

// Beginner-friendly Card Component
export const AiTypeCard: React.FC<AiModelProps> = ({ name, category, description, isReal }) => {
  return (
    <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60">
      <h4 className="text-base font-bold text-white">{name}</h4>
      <span className="text-[10px] text-cyan-400 font-mono block mt-1">{category}</span>
      <p className="text-xs text-slate-300 mt-2">{description}</p>
      <div className="mt-4 flex items-center gap-1.5 text-[10px]">
        <span>Status:</span>
        <span className={isReal ? 'text-emerald-400' : 'text-rose-400'}>
          {isReal ? 'Available Today' : 'Theoretical'}
        </span>
      </div>
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Mini Project: AI Type Identifier */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🚀 Mini Project: Build an AI Type Identifier
          </h2>
          <span className="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 font-mono">
            App Demo
          </span>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <p className="text-sm text-slate-300">
            Select the features you want your theoretical AI application to have, and let the system classify what level of Artificial Intelligence you are proposing:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: "voice", label: "Voice Recognition" },
              { id: "translate", label: "Text Translation" },
              { id: "chess", label: "Board Games" },
              { id: "human_reasoning", label: "Human reasoning" },
              { id: "adaptability", label: "Cross-domain learning" },
              { id: "world_domination", label: "World optimization" },
              { id: "transcends_humanity", label: "Transcend humanity" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => toggleFeature(f.id)}
                className={`p-3 rounded-lg border text-xs font-semibold transition-all ${
                  selectedFeatures.includes(f.id)
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                    : 'bg-slate-950/40 border-slate-850 hover:bg-slate-900 text-slate-400'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={runIdentifier}
            className="w-full py-2.5 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg text-sm transition-all"
          >
            Identify AI Type Class
          </button>

          {identifierResult && (
            <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 text-purple-300">
              <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {identifierResult.badge}
              </span>
              <div className="text-base font-bold mt-2">{identifierResult.type}</div>
              <p className="text-xs mt-1 text-slate-400">{identifierResult.desc}</p>
            </div>
          )}
        </div>
      </section>

      {/* Mini Challenge */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🏆 Mini Challenge: Categorize 20 Popular Apps
          </h2>
          <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 font-mono">
            Checklist Challenge
          </span>
        </div>
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <p className="text-sm text-slate-300">
            For this challenge, identify whether each of these 20 applications runs on **Narrow AI (ANI)**, or represents a hypothetical **AGI** / **ASI**:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto p-3 bg-slate-950/60 rounded-xl border border-slate-805">
            {challengeApps.map((app, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800/80 text-[10px] text-slate-300 font-semibold flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center font-mono text-[9px]">
                  {idx + 1}
                </span>
                {app}
              </div>
            ))}
          </div>
          <button
            onClick={() => setChallengeDone(true)}
            disabled={challengeDone}
            className="w-full py-2 bg-gradient-to-r from-amber-400 to-amber-550 hover:from-amber-300 hover:to-amber-450 text-slate-950 font-bold rounded-lg text-xs transition-all disabled:opacity-50"
          >
            {challengeDone ? "Challenge Complete! 🎉" : "Confirm I've Classifed All 20 Apps"}
          </button>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          ⚠️ Common Mistakes
        </h2>
        <div className="space-y-3">
          {[
            {
              title: "Believing LLMs are AGI",
              desc: "ChatGPT speaks fluidly, but it does not have general reasoning or agency. It is still a highly advanced Narrow AI (ANI)."
            },
            {
              title: "Thinking Narrow AI is 'Simple'",
              desc: "Narrow AI is incredibly complex! Self-driving cars and protein folding simulators are Narrow, but they represent our peak technological achievements."
            },
            {
              title: "Confusing consciousness with ability",
              desc: "An AI does not need to feel emotions or have self-awareness to beat the world chess champion."
            },
            {
              title: "Assuming AGI is right around the corner",
              desc: "Scientists have been predicting AGI is '20 years away' since the 1950s. We still lack the algorithms for true reasoning."
            },
            {
              title: "Fearing Skynet today",
              desc: "Since ASI is theoretical and AGI doesn't exist, we don't need to fear independent machine world domination yet."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex gap-3">
              <span className="text-rose-500 font-bold">{idx + 1}.</span>
              <div>
                <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                <p className="text-xs text-slate-300 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          📝 Check Your Understanding (Quiz)
        </h2>

        <div className="p-6 rounded-2xl glass-panel space-y-6">
          {quizQuestions.map((q) => (
            <div key={q.id} className="space-y-3">
              <div className="text-sm font-semibold text-white">
                {q.id}. {q.question}
              </div>
              <div className="grid grid-cols-1 gap-2">
                {q.options.map((option, idx) => {
                  const isSelected = quizAnswers[q.id] === idx;
                  const isCorrect = q.answer === idx;
                  
                  let optionClass = "bg-slate-950/40 hover:bg-slate-900 border-slate-800 text-slate-300";
                  if (isSelected) {
                    optionClass = "bg-cyan-500/20 border-cyan-500/50 text-cyan-200";
                  }
                  if (showQuizResults) {
                    if (isCorrect) {
                      optionClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300";
                    } else if (isSelected) {
                      optionClass = "bg-rose-500/20 border-rose-500/50 text-rose-300";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(q.id, idx)}
                      disabled={showQuizResults}
                      className={`w-full p-3 rounded-lg border text-left text-xs transition-all ${optionClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {showQuizResults && (
                <div className="text-xs text-slate-400 mt-1 bg-slate-950/30 p-2.5 rounded-lg">
                  💡 <span className="font-semibold text-slate-300">Explanation:</span> {q.explanation}
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-4">
            {!showQuizResults ? (
              <button
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                Submit Quiz
              </button>
            ) : (
              <div className="flex gap-4 items-center w-full justify-between">
                <div className="text-sm font-semibold text-white">
                  Score: <span className="text-cyan-400 font-bold text-lg">{quizScore} / {quizQuestions.length}</span>
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-sm transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Retake
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lesson Summary */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📝 Summary: 15 Key Takeaways</h2>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
            <li>AI is broadly classified into Narrow (ANI), General (AGI), and Super (ASI) classes.</li>
            <li>All AI systems existing today are Narrow AI (ANI).</li>
            <li>Narrow AI specializes in a single specific workload (like translation or pathing).</li>
            <li>General AI (AGI) is machine intelligence equivalent to a human mind.</li>
            <li>AGI remains a theoretical target and does not exist yet.</li>
            <li>Super AI (ASI) is theoretical intelligence surpassing all human capability.</li>
            <li>Reactive Machines (like early chess systems) operate without storage memory.</li>
            <li>Limited Memory AI stores short term observations to make decisions (e.g. Autopilot).</li>
            <li>Theory of Mind AI aims to understand human emotions and belief states.</li>
            <li>Self-Aware AI represents the theoretical stage of conscious machines.</li>
            <li>Netflix suggestions, Siri, and ChatGPT are all ANI systems.</li>
            <li>Cross-domain learning is the key attribute separating AGI from ANI.</li>
            <li>Naruto's separate clones represent discrete ANI models.</li>
            <li>WALL-E is an example of a machine achieving consciousness (Self-Aware AI).</li>
            <li>AI capabilities do not require self-awareness or emotions to perform tasks.</li>
          </ul>
        </div>
      </section>

      {/* XP Reward & Next Lesson */}
      <div className="p-8 rounded-3xl glass-panel text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/5 to-purple-500/5 pointer-events-none" />
        
        {!lessonFinished ? (
          <div className="space-y-4">
            <Award className="w-16 h-16 text-cyan-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-white">Lesson 3 Completed!</h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto">
              You have mastered the classifications of AI. Ready to claim your experience points?
            </p>
            <button
              onClick={claimXP}
              className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Claim +300 XP & Unlock Badge
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">🏆 Badge Unlocked: AI Classifier</h3>
            <p className="text-emerald-400 font-semibold">+300 XP Awarded</p>
            <div className="pt-4 max-w-xs mx-auto">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Next up:</div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center text-left">
                <div>
                  <h4 className="text-sm font-semibold text-white">Lesson 4: Machine Learning</h4>
                  <p className="text-xs text-slate-400">How computers learn patterns from data</p>
                </div>
                <ChevronRight className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
