import { useState } from 'react';
import { Brain, Award, Sparkles, BookOpen, Flame, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import Lesson1 from './lessons/Lesson1.tsx';
import Lesson2 from './lessons/Lesson2.tsx';
import Lesson3 from './lessons/Lesson3.tsx';
import Lesson4 from './lessons/Lesson4.tsx';

export default function App() {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'learn' | 'explore' | 'profile'>('learn');
  const [currentLesson, setCurrentLesson] = useState<1 | 2 | 3 | 4>(1);

  const handleLessonComplete = (rewardXp: number, lessonNum: number) => {
    setXp(prev => prev + rewardXp);
    let badgeName = 'AI Explorer';
    if (lessonNum === 2) badgeName = 'History Buff';
    if (lessonNum === 3) badgeName = 'AI Classifier';
    if (lessonNum === 4) badgeName = 'ML Explorer';
    
    if (!badges.includes(badgeName)) {
      setBadges(prev => [...prev, badgeName]);
    }
  };

  const level = Math.floor(xp / 500) + 1;
  const xpInCurrentLevel = xp % 500;
  const progressPercent = (xpInCurrentLevel / 500) * 100;

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#c5c6c7] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#1f2833]/40 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">AI Academy</h1>
              <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Learn by Doing</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('learn')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'learn' 
                  ? 'bg-cyan-400/10 text-cyan-400 border-l-4 border-l-cyan-400' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <BookOpen className="w-5 h-5" /> Learn
            </button>
            <button 
              onClick={() => setActiveTab('explore')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'explore' 
                  ? 'bg-cyan-400/10 text-cyan-400 border-l-4 border-l-cyan-400' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Compass className="w-5 h-5" /> Roadmap
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'profile' 
                  ? 'bg-cyan-400/10 text-cyan-400 border-l-4 border-l-cyan-400' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Award className="w-5 h-5" /> Profile & Badges
            </button>
          </nav>
        </div>

        {/* User Stats Card in Sidebar */}
        <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Level {level}</span>
            <span className="text-cyan-400 font-bold">{xpInCurrentLevel} / 500 XP</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              style={{ width: `${progressPercent}%` }}
              className="bg-cyan-400 h-full rounded-full transition-all duration-500"
            />
          </div>
          <div className="flex gap-4 text-xs font-semibold text-white">
            <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-amber-500" /> 1 Day Streak</span>
            <span className="flex items-center gap-1"><Award className="w-4 h-4 text-purple-400" /> {badges.length} Badges</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="p-6 border-b border-slate-800/60 bg-[#0b0c10]/80 backdrop-blur-md flex justify-between items-center z-20">
          <div className="flex items-center gap-4">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Current Rank: <span className="text-cyan-400">AI Novice</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {activeTab === 'learn' && (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
                <button
                  disabled={currentLesson === 1}
                  onClick={() => setCurrentLesson((prev) => (prev - 1) as 1 | 2 | 3 | 4)}
                  className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <span className="text-xs text-white px-2 font-semibold">Lesson {currentLesson} of 4</span>
                <button
                  disabled={currentLesson === 4}
                  onClick={() => setCurrentLesson((prev) => (prev + 1) as 1 | 2 | 3 | 4)}
                  className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
            <div className="px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-bold flex items-center gap-1.5">
              <span>{xp} XP</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'learn' && (
            currentLesson === 1 ? (
              <Lesson1 onComplete={(reward) => handleLessonComplete(reward, 1)} />
            ) : currentLesson === 2 ? (
              <Lesson2 onComplete={(reward) => handleLessonComplete(reward, 2)} />
            ) : currentLesson === 3 ? (
              <Lesson3 onComplete={(reward) => handleLessonComplete(reward, 3)} />
            ) : (
              <Lesson4 onComplete={(reward) => handleLessonComplete(reward, 4)} />
            )
          )}

          {activeTab === 'explore' && (
            <div className="max-w-2xl mx-auto space-y-6 py-12 text-center">
              <Compass className="w-16 h-16 text-cyan-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Full Learning Path</h2>
              <p className="text-slate-400 text-sm">
                Unlock higher levels by completing active lessons. We have 27 lessons mapped out for you!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {[
                  { id: 1, title: "1. What is AI?", active: true, desc: "Intro to probabilities & logic" },
                  { id: 2, title: "2. History of AI", active: true, desc: "From Turing to transformers" },
                  { id: 3, title: "3. Types of AI", active: true, desc: "Narrow AI vs AGI" },
                  { id: 4, title: "4. Machine Learning", active: true, desc: "Linear regression & patterns" }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => {
                      if (item.active) {
                        setCurrentLesson(item.id as 1 | 2 | 3 | 4);
                        setActiveTab('learn');
                      }
                    }}
                    className={`p-4 rounded-xl border transition-all ${
                      item.active 
                        ? 'bg-cyan-500/5 border-cyan-500/30 text-white cursor-pointer hover:border-cyan-400/60' 
                        : 'bg-slate-900/30 border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-2xl mx-auto space-y-8 py-12 text-center">
              <Award className="w-16 h-16 text-cyan-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Your Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-2xl border text-center transition-all ${
                  badges.includes('AI Explorer') 
                    ? 'bg-cyan-400/5 border-cyan-400/30 text-white' 
                    : 'bg-slate-900/20 border-slate-800/40 text-slate-500'
                }`}>
                  <Award className="w-6 h-6 mx-auto mb-1.5 text-cyan-400" />
                  <h4 className="font-semibold text-xs">AI Explorer</h4>
                  <p className="text-[10px] mt-0.5 text-slate-400">Completed Lesson 1</p>
                </div>
                <div className={`p-4 rounded-2xl border text-center transition-all ${
                  badges.includes('History Buff') 
                    ? 'bg-purple-400/5 border-purple-400/30 text-white' 
                    : 'bg-slate-900/20 border-slate-800/40 text-slate-500'
                }`}>
                  <Award className="w-6 h-6 mx-auto mb-1.5 text-purple-400" />
                  <h4 className="font-semibold text-xs">History Buff</h4>
                  <p className="text-[10px] mt-0.5 text-slate-400">Completed Lesson 2</p>
                </div>
                <div className={`p-4 rounded-2xl border text-center transition-all ${
                  badges.includes('AI Classifier') 
                    ? 'bg-amber-400/5 border-amber-400/30 text-white' 
                    : 'bg-slate-900/20 border-slate-800/40 text-slate-500'
                }`}>
                  <Award className="w-6 h-6 mx-auto mb-1.5 text-amber-400" />
                  <h4 className="font-semibold text-xs">AI Classifier</h4>
                  <p className="text-[10px] mt-0.5 text-slate-400">Completed Lesson 3</p>
                </div>
                <div className={`p-4 rounded-2xl border text-center transition-all ${
                  badges.includes('ML Explorer') 
                    ? 'bg-emerald-400/5 border-emerald-400/30 text-white' 
                    : 'bg-slate-900/20 border-slate-800/40 text-slate-500'
                }`}>
                  <Award className="w-6 h-6 mx-auto mb-1.5 text-emerald-400" />
                  <h4 className="font-semibold text-xs">ML Explorer</h4>
                  <p className="text-[10px] mt-0.5 text-slate-400">Completed Lesson 4</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
