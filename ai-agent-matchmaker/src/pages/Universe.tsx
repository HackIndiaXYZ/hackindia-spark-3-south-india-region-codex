import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, X, Play, Code, PenTool, Search, Palette, BarChart3, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const nodes = [
  { id: 'coding', label: 'Coding AI', x: 20, y: 30, color: '#3b82f6', icon: Code, agents: ['GitHub Copilot', 'Cursor', 'ChatGPT', 'CodeT5', 'Replit Ghostwriter', 'Amazon CodeWhisperer', 'Tabnine', 'Sourcegraph Cody'] },
  { id: 'writing', label: 'Writing AI', x: 70, y: 20, color: '#8b5cf6', icon: PenTool, agents: ['Jasper', 'Copy.ai', 'Claude', 'Rytr', 'Writesonic', 'GrammarlyAI', 'HyperWrite', 'Wordtune'] },
  { id: 'research', label: 'Research AI', x: 50, y: 60, color: '#06b6d4', icon: Search, agents: ['Perplexity', 'Gemini', 'Elicit', 'Scispace', 'ResearchRabbit', 'Semantic Scholar', 'Connected Papers', 'Consensus'] },
  { id: 'design', label: 'Design AI', x: 80, y: 70, color: '#f43f5e', icon: Palette, agents: ['Midjourney', 'DALL-E 3', 'Figma AI', 'Canva AI', 'Adobe Firefly', 'Stable Diffusion', 'Leonardo AI', 'Kandinsky'] },
  { id: 'data', label: 'Data Science AI', x: 30, y: 80, color: '#10b981', icon: BarChart3, agents: ['Julius AI', 'DataRobot', 'H2O AI', 'Alteryx', 'Tableau AI', 'Power BI AI', 'Dataiku', 'RapidMiner'] },
  { id: 'business', label: 'Business AI', x: 85, y: 45, color: '#f59e0b', icon: Briefcase, agents: ['Zapier AI', 'Notion AI', 'Airtable AI', 'Monday.com AI', 'Asana AI', 'Jira AI', 'Slack AI', 'Microsoft Copilot'] },
];

const lines = [
  { from: 'coding', to: 'research' },
  { from: 'writing', to: 'research' },
  { from: 'writing', to: 'design' },
  { from: 'coding', to: 'data' },
  { from: 'research', to: 'data' },
  { from: 'data', to: 'business' },
  { from: 'design', to: 'business' },
  { from: 'writing', to: 'business' },
  { from: 'research', to: 'business' },
];

export default function Universe() {
  const [selectedCluster, setSelectedCluster] = useState<typeof nodes[0] | null>(null);

  return (
    <div className="max-w-6xl mx-auto py-8 relative min-h-[800px]">
      <div className="text-center mb-12 relative z-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg mb-6">
          <Network size={32} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">AI Universe Map</h1>
        <p className="text-lg text-slate-600">Discover AI agents grouped by their specialized capabilities.</p>
      </div>

      <div className="relative w-full h-[600px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIi8+PC9zdmc+')] opacity-50" />

        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {lines.map((line, i) => {
            const fromNode = nodes.find((n) => n.id === line.from);
            const toNode = nodes.find((n) => n.id === line.to);
            if (!fromNode || !toNode) return null;

            return (
              <motion.line
                key={i}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.button
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setSelectedCluster(node)}
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute inset-0 rounded-full blur-xl"
                style={{ backgroundColor: node.color }}
              />
              <div
                className="w-20 h-20 rounded-full border-2 border-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold shadow-2xl relative z-10 transition-colors group-hover:border-white/50"
                style={{ backgroundColor: `${node.color}80` }}
              >
                <div className="text-center">
                  <node.icon size={28} />
                </div>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap">
                <span className="bg-slate-800/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-slate-700">
                  {node.label}
                </span>
              </div>
            </div>
          </motion.button>
        ))}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedCluster && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-inner"
                    style={{ backgroundColor: selectedCluster.color }}
                  >
                    <selectedCluster.icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedCluster.label}</h3>
                </div>
                <button
                  onClick={() => setSelectedCluster(null)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <p className="text-slate-300 text-sm mb-6">
                Explore the top AI agents specialized in {selectedCluster.label.toLowerCase()} tasks.
              </p>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {selectedCluster.agents.map((agent, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl p-3 border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-white font-medium text-sm">{agent}</span>
                    <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded-md whitespace-nowrap">Top Rated</span>
                  </div>
                ))}
              </div>

              <Link
                to="/matchmaker"
                className="w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all shadow-lg hover:shadow-xl"
                style={{ backgroundColor: selectedCluster.color }}
              >
                <Play size={16} fill="currentColor" />
                Find Best {selectedCluster.label}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
