import { motion } from 'motion/react';
import { Scale, Check, X, Star } from 'lucide-react';

const comparisonData = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    logo: '🤖',
    color: '#10a37f',
    speed: 4,
    accuracy: 5,
    cost: 'Medium',
    bestUse: 'Writing & Coding',
    features: {
      multimodal: true,
      internet: true,
      codeExecution: true,
      longContext: false,
    },
  },
  {
    id: 'claude',
    name: 'Claude',
    logo: '🧠',
    color: '#d97757',
    speed: 4,
    accuracy: 5,
    cost: 'Medium',
    bestUse: 'Analysis & Long Docs',
    features: {
      multimodal: true,
      internet: false,
      codeExecution: false,
      longContext: true,
    },
  },
  {
    id: 'gemini',
    name: 'Gemini',
    logo: '✨',
    color: '#1a73e8',
    speed: 5,
    accuracy: 4,
    cost: 'Free/Low',
    bestUse: 'Research & Integration',
    features: {
      multimodal: true,
      internet: true,
      codeExecution: true,
      longContext: true,
    },
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    logo: '💻',
    color: '#3b82f6',
    speed: 5,
    accuracy: 4,
    cost: 'Medium',
    bestUse: 'Code Development',
    features: {
      multimodal: false,
      internet: false,
      codeExecution: true,
      longContext: false,
    },
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    logo: '🔍',
    color: '#ff6b35',
    speed: 5,
    accuracy: 4,
    cost: 'Free/Medium',
    bestUse: 'Research & Search',
    features: {
      multimodal: true,
      internet: true,
      codeExecution: false,
      longContext: true,
    },
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    logo: '🎨',
    color: '#ff69b4',
    speed: 3,
    accuracy: 5,
    cost: 'Medium',
    bestUse: 'Image Generation',
    features: {
      multimodal: true,
      internet: false,
      codeExecution: false,
      longContext: false,
    },
  },
  {
    id: 'dalle',
    name: 'DALL-E 3',
    logo: '🖼️',
    color: '#008080',
    speed: 3,
    accuracy: 4,
    cost: 'Pay-per-use',
    bestUse: 'Image Creation',
    features: {
      multimodal: true,
      internet: false,
      codeExecution: false,
      longContext: false,
    },
  },
  {
    id: 'llama',
    name: 'Llama 3',
    logo: '🦙',
    color: '#8b5cf6',
    speed: 4,
    accuracy: 4,
    cost: 'Free',
    bestUse: 'Open Source',
    features: {
      multimodal: true,
      internet: false,
      codeExecution: false,
      longContext: true,
    },
  },
  {
    id: 'notionai',
    name: 'Notion AI',
    logo: '📝',
    color: '#000000',
    speed: 4,
    accuracy: 4,
    cost: 'Medium',
    bestUse: 'Productivity',
    features: {
      multimodal: false,
      internet: false,
      codeExecution: false,
      longContext: true,
    },
  },
  {
    id: 'jasper',
    name: 'Jasper',
    logo: '✍️',
    color: '#f59e0b',
    speed: 4,
    accuracy: 4,
    cost: 'High',
    bestUse: 'Marketing Content',
    features: {
      multimodal: false,
      internet: false,
      codeExecution: false,
      longContext: false,
    },
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    logo: '🤗',
    color: '#ffd700',
    speed: 3,
    accuracy: 4,
    cost: 'Variable',
    bestUse: 'ML Models',
    features: {
      multimodal: true,
      internet: true,
      codeExecution: true,
      longContext: true,
    },
  },
  {
    id: 'zapierai',
    name: 'Zapier AI',
    logo: '⚡',
    color: '#ff4f00',
    speed: 5,
    accuracy: 4,
    cost: 'Medium',
    bestUse: 'Automation',
    features: {
      multimodal: false,
      internet: true,
      codeExecution: false,
      longContext: false,
    },
  },
];

const renderStars = (count: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      size={16}
      className={i < count ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
    />
  ));
};

export default function Compare() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg mb-6">
          <Scale size={32} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">AI Compare</h1>
        <p className="text-lg text-slate-600">Side-by-side comparison of the top AI models.</p>
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
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm">AI Agent</th>
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm">Speed</th>
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm">Accuracy</th>
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm">Cost</th>
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm">Best Use</th>
                <th className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm text-center">Compare</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonData.map((ai) => (
                <tr key={ai.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-white/50"
                        style={{ backgroundColor: `${ai.color}15`, color: ai.color }}
                      >
                        {ai.logo}
                      </div>
                      <span className="font-bold text-lg text-slate-800">{ai.name}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-1">{renderStars(ai.speed)}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-1">{renderStars(ai.accuracy)}</div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-sm border border-slate-200">
                      {ai.cost}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="font-medium text-slate-600">{ai.bestUse}</span>
                  </td>
                  <td className="p-6 text-center">
                    <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg transition-colors border border-blue-200">
                      Compare AI
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feature Matrix */}
        <div className="bg-slate-900 p-8 border-t border-slate-800">
          <h3 className="text-xl font-bold text-white mb-6">Feature Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-4">
              <div className="h-12"></div>
              {Object.keys(comparisonData[0].features).map((feature) => (
                <div key={feature} className="h-10 flex items-center text-slate-400 font-medium capitalize">
                  {feature.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              ))}
            </div>
            {comparisonData.map((ai) => (
              <div key={ai.id} className="space-y-4 text-center">
                <div className="h-12 flex items-center justify-center font-bold text-white gap-2">
                  <span>{ai.logo}</span> {ai.name}
                </div>
                {Object.values(ai.features).map((hasFeature, i) => (
                  <div key={i} className="h-10 flex items-center justify-center">
                    {hasFeature ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Check size={18} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                        <X size={18} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
