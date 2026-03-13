import { motion } from 'motion/react';
import { Trophy, Medal, Star, ArrowUp, ArrowDown, Minus } from 'lucide-react';

const leaderboardData = [
  { id: 'chatgpt', name: 'ChatGPT', logo: '🤖', score: 95, rating: 4.9, speed: 95, accuracy: 92, trend: 'up' },
  { id: 'claude', name: 'Claude', logo: '🧠', score: 92, rating: 4.8, speed: 90, accuracy: 96, trend: 'up' },
  { id: 'gemini', name: 'Gemini', logo: '✨', score: 90, rating: 4.7, speed: 98, accuracy: 90, trend: 'same' },
  { id: 'perplexity', name: 'Perplexity', logo: '🔍', score: 88, rating: 4.6, speed: 92, accuracy: 85, trend: 'down' },
  { id: 'midjourney', name: 'Midjourney', logo: '🎨', score: 85, rating: 4.5, speed: 70, accuracy: 95, trend: 'up' },
];

export default function Leaderboard() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg mb-6">
          <Trophy size={32} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">AI Leaderboard</h1>
        <p className="text-lg text-slate-600">The top-performing AI agents ranked by overall score.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm w-24 text-center">Rank</th>
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm">AI Agent</th>
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm text-center">Score</th>
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm text-center">Rating</th>
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm text-center">Speed</th>
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm text-center">Accuracy</th>
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm text-center">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaderboardData.map((ai, index) => {
                const rank = index + 1;
                let badgeColor = 'bg-slate-100 text-slate-600';
                let BadgeIcon = null;

                if (rank === 1) {
                  badgeColor = 'bg-amber-100 text-amber-600 border-amber-200';
                  BadgeIcon = <Medal size={20} className="text-amber-500" />;
                } else if (rank === 2) {
                  badgeColor = 'bg-slate-200 text-slate-700 border-slate-300';
                  BadgeIcon = <Medal size={20} className="text-slate-500" />;
                } else if (rank === 3) {
                  badgeColor = 'bg-orange-100 text-orange-700 border-orange-200';
                  BadgeIcon = <Medal size={20} className="text-orange-600" />;
                }

                return (
                  <tr key={ai.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-6 text-center">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold border ${badgeColor}`}>
                        {BadgeIcon ? BadgeIcon : rank}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shadow-sm border border-slate-200">
                          {ai.logo}
                        </div>
                        <span className="font-bold text-lg text-slate-800">{ai.name}</span>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                        {ai.score}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                      <div className="flex items-center justify-center gap-1 text-slate-700 font-bold">
                        <Star size={16} className="fill-amber-400 text-amber-400" />
                        {ai.rating}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <span className="font-semibold text-slate-600">{ai.speed}</span>
                    </td>
                    <td className="p-6 text-center">
                      <span className="font-semibold text-slate-600">{ai.accuracy}</span>
                    </td>
                    <td className="p-6 text-center">
                      <div className="flex justify-center">
                        {ai.trend === 'up' && <ArrowUp size={20} className="text-emerald-500" />}
                        {ai.trend === 'down' && <ArrowDown size={20} className="text-rose-500" />}
                        {ai.trend === 'same' && <Minus size={20} className="text-slate-400" />}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
