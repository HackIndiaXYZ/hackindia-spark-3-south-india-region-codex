import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Play, CheckCircle2, Copy, Combine, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import chatgptLogo from '../assets/logos/chatgpt.svg';
import claudeLogo from '../assets/logos/claude.svg';
import geminiLogo from '../assets/logos/gemini.svg';
import copilotLogo from '../assets/logos/copilot.svg';
import midjourneyLogo from '../assets/logos/midjourney.svg';
import dalleLogo from '../assets/logos/dalle.svg';
import llamaLogo from '../assets/logos/llama.svg';
import perplexityLogo from '../assets/logos/perplexity.svg';

const agents = [
  // Coding AI
  { id: 'chatgpt', name: 'ChatGPT', logo: chatgptLogo, logo_alt: 'ChatGPT Logo', color: '#10a37f', category: 'Coding', speed: 95, accuracy: 92, rating: 4.9, cost: 'Free/Paid', website: 'https://chat.openai.com' },
  { id: 'copilot', name: 'GitHub Copilot', logo: copilotLogo, logo_alt: 'GitHub Copilot Logo', color: '#3b82f6', category: 'Coding', speed: 94, accuracy: 91, rating: 4.7, cost: 'Free/$10', website: 'https://github.com/features/copilot' },
  { id: 'cursor', name: 'Cursor', logo: chatgptLogo, logo_alt: 'Cursor Logo', color: '#6366f1', category: 'Coding', speed: 93, accuracy: 89, rating: 4.6, cost: '$20/month', website: 'https://cursor.sh' },
  { id: 'codet5', name: 'CodeT5', logo: geminiLogo, logo_alt: 'CodeT5 Logo', color: '#8b5cf6', category: 'Coding', speed: 96, accuracy: 88, rating: 4.5, cost: 'Free/$10', website: 'https://codet5.com' },
  { id: 'replit', name: 'Replit Ghostwriter', logo: claudeLogo, logo_alt: 'Replit Logo', color: '#ff6b35', category: 'Coding', speed: 88, accuracy: 85, rating: 4.4, cost: 'Free/$10', website: 'https://replit.com' },
  { id: 'codewhisperer', name: 'Amazon CodeWhisperer', logo: dalleLogo, logo_alt: 'CodeWhisperer Logo', color: '#ff9900', category: 'Coding', speed: 91, accuracy: 87, rating: 4.3, cost: 'AWS pricing', website: 'https://aws.amazon.com/codewhisperer' },
  { id: 'tabnine', name: 'Tabnine', logo: perplexityLogo, logo_alt: 'Tabnine Logo', color: '#f59e0b', category: 'Coding', speed: 92, accuracy: 86, rating: 4.2, cost: 'Free/$12', website: 'https://www.tabnine.com' },
  { id: 'cody', name: 'Sourcegraph Cody', logo: midjourneyLogo, logo_alt: 'Cody Logo', color: '#6a05ad', category: 'Coding', speed: 90, accuracy: 84, rating: 4.1, cost: 'Free/$12', website: 'https://sourcegraph.com/cody' },

  // Writing AI
  { id: 'claude', name: 'Claude', logo: claudeLogo, logo_alt: 'Claude Logo', color: '#d97757', category: 'Writing', speed: 90, accuracy: 96, rating: 4.8, cost: 'Free/$20', website: 'https://claude.ai' },
  { id: 'jasper', name: 'Jasper', logo: geminiLogo, logo_alt: 'Jasper Logo', color: '#f59e0b', category: 'Writing', speed: 85, accuracy: 89, rating: 4.4, cost: '$29/month', website: 'https://jasper.ai' },
  { id: 'copyai', name: 'Copy.ai', logo: copilotLogo, logo_alt: 'Copy.ai Logo', color: '#8b5cf6', category: 'Writing', speed: 87, accuracy: 91, rating: 4.5, cost: '$35/month', website: 'https://copy.ai' },
  { id: 'rytr', name: 'Rytr', logo: perplexityLogo, logo_alt: 'Rytr Logo', color: '#06b6d4', category: 'Writing', speed: 86, accuracy: 88, rating: 4.3, cost: '$9/month', website: 'https://rytr.me' },
  { id: 'writesonic', name: 'Writesonic', logo: dalleLogo, logo_alt: 'Writesonic Logo', color: '#10b981', category: 'Writing', speed: 89, accuracy: 85, rating: 4.2, cost: '$16/month', website: 'https://writesonic.com' },
  { id: 'grammarlyai', name: 'GrammarlyAI', logo: llamaLogo, logo_alt: 'GrammarlyAI Logo', color: '#3b82f6', category: 'Writing', speed: 88, accuracy: 87, rating: 4.1, cost: '$12/month', website: 'https://grammarly.com' },
  { id: 'hyperwrite', name: 'HyperWrite', logo: midjourneyLogo, logo_alt: 'HyperWrite Logo', color: '#f43f5e', category: 'Writing', speed: 91, accuracy: 86, rating: 4.0, cost: '$19/month', website: 'https://hyperwrite.ai' },
  { id: 'wordtune', name: 'Wordtune', logo: copilotLogo, logo_alt: 'Wordtune Logo', color: '#f59e0b', category: 'Writing', speed: 87, accuracy: 84, rating: 3.9, cost: '$10/month', website: 'https://wordtune.com' },

  // Research AI
  { id: 'perplexity', name: 'Perplexity', logo: perplexityLogo, logo_alt: 'Perplexity Logo', color: '#ff6b35', category: 'Research', speed: 96, accuracy: 89, rating: 4.6, cost: 'Free/$20', website: 'https://www.perplexity.ai' },
  { id: 'gemini', name: 'Gemini', logo: geminiLogo, logo_alt: 'Gemini Logo', color: '#1a73e8', category: 'Research', speed: 98, accuracy: 90, rating: 4.7, cost: 'Free', website: 'https://gemini.google.com' },
  { id: 'elicit', name: 'Elicit', logo: claudeLogo, logo_alt: 'Elicit Logo', color: '#06b6d4', category: 'Research', speed: 85, accuracy: 92, rating: 4.8, cost: 'Free/$5', website: 'https://elicit.org' },
  { id: 'scispace', name: 'Scispace', logo: perplexityLogo, logo_alt: 'Scispace Logo', color: '#10b981', category: 'Research', speed: 87, accuracy: 88, rating: 4.5, cost: '$12/month', website: 'https://scispace.io' },
  { id: 'researchrabbit', name: 'ResearchRabbit', logo: geminiLogo, logo_alt: 'ResearchRabbit Logo', color: '#f59e0b', category: 'Research', speed: 83, accuracy: 85, rating: 4.2, cost: '$15/month', website: 'https://researchrabbit.ai' },
  { id: 'semanticscholar', name: 'Semantic Scholar', logo: copilotLogo, logo_alt: 'Semantic Scholar Logo', color: '#06b6d4', category: 'Research', speed: 89, accuracy: 86, rating: 4.1, cost: 'Free/$10', website: 'https://semanticscholar.org' },
  { id: 'connectedpapers', name: 'Connected Papers', logo: dalleLogo, logo_alt: 'Connected Papers Logo', color: '#8b5cf6', category: 'Research', speed: 86, accuracy: 87, rating: 4.0, cost: '$8/month', website: 'https://connectedpapers.com' },
  { id: 'consensus', name: 'Consensus', logo: llamaLogo, logo_alt: 'Consensus Logo', color: '#2e8b57', category: 'Research', speed: 88, accuracy: 89, rating: 4.3, cost: 'Free/$15', website: 'https://consensus.app' },

  // Design AI
  { id: 'midjourney', name: 'Midjourney', logo: midjourneyLogo, logo_alt: 'Midjourney Logo', color: '#ff69b4', category: 'Design', speed: 88, accuracy: 91, rating: 4.5, cost: '$10/month', website: 'https://www.midjourney.com' },
  { id: 'dalle', name: 'DALL-E 3', logo: dalleLogo, logo_alt: 'DALL-E Logo', color: '#008080', category: 'Design', speed: 85, accuracy: 90, rating: 4.4, cost: 'Pay-per-use', website: 'https://openai.com/dall-e-3' },
  { id: 'figmaai', name: 'Figma AI', logo: copilotLogo, logo_alt: 'Figma AI Logo', color: '#f24e1e', category: 'Design', speed: 92, accuracy: 88, rating: 4.6, cost: 'Free/$12', website: 'https://figma.com/ai' },
  { id: 'canvaai', name: 'Canva AI', logo: perplexityLogo, logo_alt: 'Canva AI Logo', color: '#00d4aa', category: 'Design', speed: 90, accuracy: 85, rating: 4.3, cost: 'Free/$6', website: 'https://canva.com/ai' },
  { id: 'adobefirefly', name: 'Adobe Firefly', logo: claudeLogo, logo_alt: 'Adobe Firefly Logo', color: '#ff0000', category: 'Design', speed: 93, accuracy: 86, rating: 4.2, cost: 'Creative Cloud', website: 'https://firefly.adobe.com' },
  { id: 'stablediffusion', name: 'Stable Diffusion', logo: geminiLogo, logo_alt: 'Stable Diffusion Logo', color: '#8b5cf6', category: 'Design', speed: 84, accuracy: 82, rating: 3.9, cost: 'Free/$10', website: 'https://stability.ai' },
  { id: 'leonardoai', name: 'Leonardo AI', logo: dalleLogo, logo_alt: 'Leonardo AI Logo', color: '#ff69b4', category: 'Design', speed: 89, accuracy: 84, rating: 4.1, cost: '$12/month', website: 'https://leonardo.ai' },
  { id: 'kandinsky', name: 'Kandinsky', logo: midjourneyLogo, logo_alt: 'Kandinsky Logo', color: '#6a05ad', category: 'Design', speed: 87, accuracy: 83, rating: 4.0, cost: 'Free/$5', website: 'https://kandinsky.com' },

  // Data Science AI
  { id: 'juliusai', name: 'Julius AI', logo: copilotLogo, logo_alt: 'Julius AI Logo', color: '#10b981', category: 'Data Science', speed: 91, accuracy: 88, rating: 4.4, cost: '$49/month', website: 'https://julius.ai' },
  { id: 'datarobot', name: 'DataRobot', logo: perplexityLogo, logo_alt: 'DataRobot Logo', color: '#06b6d4', category: 'Data Science', speed: 93, accuracy: 90, rating: 4.7, cost: 'Enterprise', website: 'https://datarobot.com' },
  { id: 'h2oai', name: 'H2O AI', logo: geminiLogo, logo_alt: 'H2O AI Logo', color: '#1a73e8', category: 'Data Science', speed: 94, accuracy: 89, rating: 4.6, cost: '$20/month', website: 'https://h2o.ai' },
  { id: 'alteryx', name: 'Alteryx', logo: llamaLogo, logo_alt: 'Alteryx Logo', color: '#ff6b35', category: 'Data Science', speed: 89, accuracy: 87, rating: 4.3, cost: 'Enterprise', website: 'https://alteryx.com' },
  { id: 'tableauai', name: 'Tableau AI', logo: copilotLogo, logo_alt: 'Tableau AI Logo', color: '#f59e0b', category: 'Data Science', speed: 90, accuracy: 86, rating: 4.2, cost: '$70/user', website: 'https://tableau.com' },
  { id: 'powerbiai', name: 'Power BI AI', logo: perplexityLogo, logo_alt: 'Power BI AI Logo', color: '#f2c811', category: 'Data Science', speed: 92, accuracy: 88, rating: 4.1, cost: 'Microsoft 365', website: 'https://powerbi.microsoft.com' },
  { id: 'dataiku', name: 'Dataiku', logo: geminiLogo, logo_alt: 'Dataiku Logo', color: '#ff9900', category: 'Data Science', speed: 88, accuracy: 85, rating: 3.9, cost: 'Enterprise', website: 'https://dataiku.com' },
  { id: 'rapidminer', name: 'RapidMiner', logo: claudeLogo, logo_alt: 'RapidMiner Logo', color: '#10b981', category: 'Data Science', speed: 87, accuracy: 84, rating: 3.8, cost: '$2500', website: 'https://rapidminer.com' },

  // Business AI
  { id: 'zapierai', name: 'Zapier AI', logo: copilotLogo, logo_alt: 'Zapier AI Logo', color: '#ff4f00', category: 'Business', speed: 95, accuracy: 92, rating: 4.8, cost: 'Free/$20', website: 'https://zapier.com/ai' },
  { id: 'notionai', name: 'Notion AI', logo: perplexityLogo, logo_alt: 'Notion AI Logo', color: '#000000', category: 'Business', speed: 93, accuracy: 89, rating: 4.5, cost: 'Plus plan', website: 'https://notion.so' },
  { id: 'airtableai', name: 'Airtable AI', logo: geminiLogo, logo_alt: 'Airtable AI Logo', color: '#18bfff', category: 'Business', speed: 91, accuracy: 88, rating: 4.4, cost: 'Free/$10', website: 'https://airtable.com/ai' },
  { id: 'mondayai', name: 'Monday.com AI', logo: copilotLogo, logo_alt: 'Monday AI Logo', color: '#ff6b35', category: 'Business', speed: 90, accuracy: 87, rating: 4.3, cost: '$16/user', website: 'https://monday.com' },
  { id: 'asanaai', name: 'Asana AI', logo: perplexityLogo, logo_alt: 'Asana AI Logo', color: '#f06a92', category: 'Business', speed: 89, accuracy: 86, rating: 4.2, cost: 'Premium', website: 'https://asana.com' },
  { id: 'jiraai', name: 'Jira AI', logo: llamaLogo, logo_alt: 'Jira AI Logo', color: '#0052cc', category: 'Business', speed: 88, accuracy: 85, rating: 4.1, cost: 'Premium', website: 'https://atlassian.com' },
  { id: 'slackai', name: 'Slack AI', logo: dalleLogo, logo_alt: 'Slack AI Logo', color: '#4a154b', category: 'Business', speed: 92, accuracy: 87, rating: 4.4, cost: 'Pro plan', website: 'https://slack.com' },
  { id: 'microsoftcopilot', name: 'Microsoft Copilot', logo: copilotLogo, logo_alt: 'Microsoft Copilot Logo', color: '#0078d4', category: 'Business', speed: 94, accuracy: 91, rating: 4.7, cost: 'Microsoft 365', website: 'https://microsoft.com/copilot' },
];

export default function Matchmaker() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [problem, setProblem] = useState(initialQuery);
  const [stage, setStage] = useState<'input' | 'analyzing' | 'recommendations' | 'running' | 'results' | 'merged'>('input');
  const [selectedBest, setSelectedBest] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuery) {
      handleAnalyze();
    }
  }, [initialQuery]);

  const handleAnalyze = () => {
    if (!problem.trim()) return;
    setStage('analyzing');
    setTimeout(() => setStage('recommendations'), 2000);
  };

  const handleRunAI = () => {
    setStage('running');
    setTimeout(() => setStage('results'), 3000);
  };

  const handleCopy = (text: string, buttonElement?: HTMLElement) => {
    navigator.clipboard.writeText(text).then(() => {
      if (buttonElement) {
        const originalHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = '<span class="text-emerald-600">✓ Copied!</span>';
        
        setTimeout(() => {
          buttonElement.innerHTML = originalHTML;
        }, 2000);
      }
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  const handleMerge = () => {
    setStage('merged');
  };

  const handleVisitWebsite = (website: string, userProblem?: string) => {
    let url = website;
    
    if (userProblem?.trim()) {
      const encodedQuery = encodeURIComponent(userProblem);
      
      // Use service-specific URL patterns for better auto-submission
      if (website.includes('chat.openai.com')) {
        // ChatGPT direct chat with message
        url = `https://chat.openai.com/?message=${encodedQuery}`;
      } else if (website.includes('claude.ai')) {
        // Claude new chat with prompt
        url = `https://claude.ai/new?prompt=${encodedQuery}`;
      } else if (website.includes('gemini.google.com')) {
        // Gemini with query for auto-generation
        url = `https://gemini.google.com/app?prompt=${encodedQuery}`;
      }
    }
    
    // Open in new tab with focus
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    
    // Add user instruction tooltip
    if (newWindow) {
      newWindow.blur();
      window.focus();
      
      // Show user instruction
      setTimeout(() => {
        alert(`🤖 Chat opened with your question!\n\nYour question "${userProblem}" has been pre-filled.\n\nJust press Enter or click Send to start the AI response!`);
      }, 500);
    }
  };

  const generateAIResponse = (agentName: string, userProblem: string) => {
    const problem = userProblem || "your problem";
    
    const responses = {
      // Coding AI responses
      chatgpt: {
        idea: `AI-powered solution for: ${problem}`,
        output: `1. Analyze requirements for ${problem}\n2. Develop comprehensive strategy\n3. Implement solution using best practices\n4. Test and optimize performance\n5. Deploy and monitor results`
      },
      copilot: {
        idea: `Code-focused solution for: ${problem}`,
        output: `1. Write clean, efficient code for ${problem}\n2. Implement robust error handling\n3. Add comprehensive tests\n4. Optimize performance\n5. Document and maintain codebase`
      },
      cursor: {
        idea: `IDE-integrated solution for: ${problem}`,
        output: `1. Create integrated development workflow\n2. Generate code with context awareness\n3. Refactor and optimize existing code\n4. Debug with AI assistance\n5. Maintain code quality standards`
      },
      codet5: {
        idea: `Model-based code solution for: ${problem}`,
        output: `1. Generate code using transformer models\n2. Ensure syntax correctness\n3. Optimize for performance\n4. Add type annotations\n5. Validate code structure`
      },
      replit: {
        idea: `Cloud development solution for: ${problem}`,
        output: `1. Set up cloud development environment\n2. Generate collaborative code\n3. Test in real-time\n4. Deploy instantly\n5. Share with team members`
      },
      codewhisperer: {
        idea: `AWS-integrated coding solution for: ${problem}`,
        output: `1. Leverage AWS best practices\n2. Generate cloud-optimized code\n3. Ensure security compliance\n4. Optimize for AWS services\n5. Monitor cloud performance`
      },
      tabnine: {
        idea: `AI completion solution for: ${problem}`,
        output: `1. Provide intelligent code completions\n2. Learn from code patterns\n3. Suggest context-aware solutions\n4. Improve developer productivity\n5. Maintain code consistency`
      },
      cody: {
        idea: `Code search solution for: ${problem}`,
        output: `1. Search relevant code examples\n2. Analyze code patterns\n3. Generate context-aware solutions\n4. Integrate with existing codebase\n5. Provide documentation support`
      },

      // Writing AI responses
      claude: {
        idea: `Strategic approach to solve: ${problem}`,
        output: `1. Deep analysis of ${problem}\n2. Research-based methodology\n3. Step-by-step implementation plan\n4. Quality assurance process\n5. Continuous improvement framework`
      },
      jasper: {
        idea: `Marketing-focused solution for: ${problem}`,
        output: `1. Create compelling marketing content\n2. Develop brand voice consistency\n3. Generate SEO-optimized copy\n4. A/B test messaging variants\n5. Analyze content performance`
      },
      copyai: {
        idea: `Conversion-focused solution for: ${problem}`,
        output: `1. Write persuasive marketing copy\n2. Create engaging headlines\n3. Generate call-to-action content\n4. Optimize for conversions\n5. Test and refine messaging`
      },
      rytr: {
        idea: `Quick content solution for: ${problem}`,
        output: `1. Generate content rapidly\n2. Maintain quality standards\n3. Create multiple content variants\n4. Optimize for target audience\n5. Schedule content delivery`
      },
      writesonic: {
        idea: `SEO-optimized solution for: ${problem}`,
        output: `1. Research relevant keywords\n2. Create SEO-friendly content\n3. Optimize for search rankings\n4. Generate meta descriptions\n5. Track content performance`
      },
      grammarlyai: {
        idea: `Professional writing solution for: ${problem}`,
        output: `1. Ensure grammatical accuracy\n2. Improve writing clarity\n3. Enhance vocabulary usage\n4. Check tone and style\n5. Provide writing suggestions`
      },
      hyperwrite: {
        idea: `AI-enhanced writing solution for: ${problem}`,
        output: `1. Generate intelligent content\n2. Improve writing flow\n3. Enhance readability\n4. Optimize for audience\n5. Maintain brand consistency`
      },
      wordtune: {
        idea: `Refined writing solution for: ${problem}`,
        output: `1. Rephrase content effectively\n2. Improve sentence structure\n3. Enhance clarity and conciseness\n4. Adjust tone appropriately\n5. Provide writing alternatives`
      },

      // Research AI responses
      perplexity: {
        idea: `Research-backed solution for: ${problem}`,
        output: `1. Search latest information on ${problem}\n2. Cite reliable sources\n3. Provide factual analysis\n4. Cross-verify information\n5. Present evidence-based conclusions`
      },
      gemini: {
        idea: `Data-driven solution for: ${problem}`,
        output: `1. Market research on ${problem}\n2. Identify key performance indicators\n3. Create actionable roadmap\n4. Execute with precision\n5. Measure and scale success`
      },
      elicit: {
        idea: `Academic research solution for: ${problem}`,
        output: `1. Review scholarly literature\n2. Extract key findings\n3. Analyze research methods\n4. Identify knowledge gaps\n5. Propose research directions`
      },
      scispace: {
        idea: `Scientific research solution for: ${problem}`,
        output: `1. Conduct literature review\n2. Format academic papers\n3. Generate citations\n4. Analyze research data\n5. Prepare publication materials`
      },
      researchrabbit: {
        idea: `Academic discovery solution for: ${problem}`,
        output: `1. Discover relevant research\n2. Map academic networks\n3. Find citation patterns\n4. Identify key researchers\n5. Track research trends`
      },
      semanticscholar: {
        idea: `Semantic research solution for: ${problem}`,
        output: `1. Analyze academic papers\n2. Extract semantic relationships\n3. Find relevant citations\n4. Identify research connections\n5. Summarize key findings`
      },
      connectedpapers: {
        idea: `Research network solution for: ${problem}`,
        output: `1. Map research connections\n2. Visualize citation networks\n3. Find related papers\n4. Identify research clusters\n5. Track influence patterns`
      },
      consensus: {
        idea: `Evidence-based solution for: ${problem}`,
        output: `1. Review scientific consensus\n2. Analyze research evidence\n3. Identify conflicting findings\n4. Evaluate study quality\n5. Provide evidence grades`
      },

      // Design AI responses
      midjourney: {
        idea: `Creative visual concept for: ${problem}`,
        output: `1. Design stunning visuals for ${problem}\n2. Create artistic compositions\n3. Develop brand aesthetics\n4. Generate multiple concept variations\n5. Refine based on feedback`
      },
      dalle: {
        idea: `AI-generated imagery for: ${problem}`,
        output: `1. Create detailed image prompts for ${problem}\n2. Generate high-quality visuals\n3. Ensure artistic consistency\n4. Optimize for specific use cases\n5. Iterate on creative concepts`
      },
      figmaai: {
        idea: `Design system solution for: ${problem}`,
        output: `1. Create design systems\n2. Generate UI components\n3. Ensure design consistency\n4. Optimize user experience\n5. Maintain brand guidelines`
      },
      canvaai: {
        idea: `Template-based design solution for: ${problem}`,
        output: `1. Select appropriate templates\n2. Customize design elements\n3. Ensure visual hierarchy\n4. Optimize for multiple platforms\n5. Generate design variations`
      },
      adobefirefly: {
        idea: `Professional design solution for: ${problem}`,
        output: `1. Create professional-grade visuals\n2. Ensure brand consistency\n3. Generate creative concepts\n4. Optimize for print/web\n5. Maintain design standards`
      },
      stablediffusion: {
        idea: `Open-source design solution for: ${problem}`,
        output: `1. Generate custom images\n2. Ensure creative freedom\n3. Optimize for performance\n4. Maintain quality standards\n5. Iterate on designs`
      },
      leonardoai: {
        idea: `Artistic design solution for: ${problem}`,
        output: `1. Create artistic visuals\n2. Generate creative concepts\n3. Ensure aesthetic quality\n4. Optimize for specific styles\n5. Refine artistic elements`
      },
      kandinsky: {
        idea: `Abstract design solution for: ${problem}`,
        output: `1. Generate abstract concepts\n2. Create artistic interpretations\n3. Ensure visual impact\n4. Optimize for emotional response\n5. Maintain artistic integrity`
      },

      // Data Science AI responses
      juliusai: {
        idea: `Data analysis solution for: ${problem}`,
        output: `1. Analyze data patterns\n2. Generate insights\n3. Create visualizations\n4. Identify trends\n5. Provide actionable recommendations`
      },
      datarobot: {
        idea: `Enterprise AI solution for: ${problem}`,
        output: `1. Build ML models\n2. Ensure data quality\n3. Optimize model performance\n4. Deploy at scale\n5. Monitor model accuracy`
      },
      h2oai: {
        idea: `Open-source ML solution for: ${problem}`,
        output: `1. Implement ML algorithms\n2. Ensure model transparency\n3. Optimize for accuracy\n4. Scale predictions\n5. Maintain model governance`
      },
      alteryx: {
        idea: `Data workflow solution for: ${problem}`,
        output: `1. Design data workflows\n2. Ensure data quality\n3. Automate data processes\n4. Generate insights\n5. Optimize data pipelines`
      },
      tableauai: {
        idea: `Data visualization solution for: ${problem}`,
        output: `1. Create interactive dashboards\n2. Ensure data clarity\n3. Generate insights\n4. Optimize visual design\n5. Share findings effectively`
      },
      powerbiai: {
        idea: `Business intelligence solution for: ${problem}`,
        output: `1. Analyze business data\n2. Create reports\n3. Generate insights\n4. Optimize decision-making\n5. Share business intelligence`
      },
      dataiku: {
        idea: `Data platform solution for: ${problem}`,
        output: `1. Build data solutions\n2. Ensure data governance\n3. Optimize data workflows\n4. Scale data operations\n5. Maintain data quality`
      },
      rapidminer: {
        idea: `Data mining solution for: ${problem}`,
        output: `1. Mine data patterns\n2. Generate insights\n3. Build predictive models\n4. Ensure data quality\n5. Optimize data processes`
      },

      // Business AI responses
      zapierai: {
        idea: `Automation solution for: ${problem}`,
        output: `1. Automate workflows\n2. Integrate systems\n3. Optimize processes\n4. Ensure reliability\n5. Scale automation`
      },
      notionai: {
        idea: `Productivity solution for: ${problem}`,
        output: `1. Organize information\n2. Streamline workflows\n3. Enhance collaboration\n4. Optimize productivity\n5. Maintain knowledge base`
      },
      airtableai: {
        idea: `Database solution for: ${problem}`,
        output: `1. Design database structures\n2. Automate data entry\n3. Generate insights\n4. Optimize workflows\n5. Scale data operations`
      },
      mondayai: {
        idea: `Project management solution for: ${problem}`,
        output: `1. Plan project timelines\n2. Allocate resources\n3. Track progress\n4. Optimize workflows\n5. Ensure project success`
      },
      asanaai: {
        idea: `Task management solution for: ${problem}`,
        output: `1. Organize tasks\n2. Assign responsibilities\n3. Track deadlines\n4. Optimize team productivity\n5. Ensure goal achievement`
      },
      jiraai: {
        idea: `Issue tracking solution for: ${problem}`,
        output: `1. Track project issues\n2. Prioritize tasks\n3. Monitor progress\n4. Optimize development cycles\n5. Ensure quality delivery`
      },
      slackai: {
        idea: `Communication solution for: ${problem}`,
        output: `1. Streamline communication\n2. Automate responses\n3. Summarize conversations\n4. Optimize team collaboration\n5. Maintain communication records`
      },
      microsoftcopilot: {
        idea: `Enterprise solution for: ${problem}`,
        output: `1. Integrate Microsoft ecosystem\n2. Automate business processes\n3. Generate insights\n4. Optimize productivity\n5. Ensure enterprise security`
      }
    };
    
    return responses[agentName as keyof typeof responses] || responses.chatgpt;
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">AI Matchmaker</h1>
        <p className="text-lg text-slate-600">Analyze your problem and run multiple AI agents simultaneously.</p>
      </div>

      {/* Input Stage */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl p-8 mb-12">
        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
          Your Problem Statement
        </label>
        <div className="relative">
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            disabled={stage !== 'input' && stage !== 'recommendations'}
            className="w-full min-h-[120px] p-6 text-lg bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-y text-slate-800 disabled:opacity-70"
            placeholder="Describe your problem... (e.g., Create a marketing plan for my startup)"
          />
          {(stage === 'input' || stage === 'recommendations') && (
            <button
              onClick={handleAnalyze}
              disabled={!problem.trim()}
              className="absolute bottom-4 right-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Search size={18} />
              Analyze Problem
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Analyzing State */}
        {stage === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full" />
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                <Sparkles size={32} className="animate-pulse" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Problem...</h3>
            <p className="text-slate-500">Matching with the best AI agents in the universe.</p>
          </motion.div>
        )}

        {/* Recommendations State */}
        {stage === 'recommendations' && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Recommended AI Tools</h2>
              <button
                onClick={handleRunAI}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
              >
                <Play size={20} fill="currentColor" />
                Run All AI
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/60 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-lg shadow-slate-200/50 flex flex-col items-center text-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-inner overflow-hidden"
                    style={{ backgroundColor: `${agent.color}15` }}
                  >
                    <img 
                      src={agent.logo} 
                      alt={agent.logo_alt}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span style="color: ${agent.color}; font-size: 1.5rem; font-weight: bold;">${agent.name.substring(0, 2).toUpperCase()}</span>`;
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{agent.name}</h3>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600 mb-4">
                    Best for {agent.category}
                  </span>
                  
                  <div className="w-full space-y-3 mt-auto">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Speed</span>
                      <span className="font-bold text-slate-700">{agent.speed}/100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Accuracy</span>
                      <span className="font-bold text-slate-700">{agent.accuracy}/100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Rating</span>
                      <span className="font-bold text-slate-700">{agent.rating}/5.0</span>
                    </div>
                    <button
                      onClick={() => handleVisitWebsite(agent.website, problem)}
                      className="w-full mt-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={14} />
                      Visit {agent.name}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Running State */}
        {stage === 'running' && (
          <motion.div
            key="running"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {agents.map((agent, i) => (
              <div key={agent.id} className="bg-white/60 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-lg shadow-slate-200/50 flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 size={40} className="animate-spin mb-4" style={{ color: agent.color }} />
                <h3 className="text-lg font-bold text-slate-800">{agent.name} is thinking...</h3>
                <p className="text-sm text-slate-500 mt-2">Generating response</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Results State */}
        {(stage === 'results' || stage === 'merged') && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">AI Responses</h2>
              {stage === 'results' && (
                <button
                  onClick={handleMerge}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2"
                >
                  <Combine size={20} />
                  Merge Best Ideas
                </button>
              )}
            </div>

            {selectedBest && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3 font-medium"
              >
                <CheckCircle2 size={20} className="text-emerald-500" />
                Best AI selected successfully.
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents.map((agent) => (
                <motion.div
                  key={agent.id}
                  className={`bg-white/80 backdrop-blur-xl border-2 rounded-2xl p-6 shadow-xl transition-all ${
                    selectedBest === agent.id
                      ? 'border-emerald-500 shadow-emerald-500/20 ring-4 ring-emerald-500/10'
                      : 'border-slate-200 shadow-slate-200/50 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: `${agent.color}15` }}
                    >
                      <img 
                        src={agent.logo} 
                        alt={agent.logo_alt}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          // Fallback to text if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span style="color: ${agent.color}; font-size: 1rem; font-weight: bold;">${agent.name.substring(0, 2).toUpperCase()}</span>`;
                          }
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{agent.name}</h3>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Generated Idea</span>
                      <p className="text-sm text-slate-700 font-medium">{generateAIResponse(agent.id, problem).idea}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Final Output</span>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-6">
                        {generateAIResponse(agent.id, problem).output.split('\n').map((line, index) => (
                          <span key={index}>
                            {line}
                            {index < generateAIResponse(agent.id, problem).output.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => setSelectedBest(agent.id)}
                      className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                        selectedBest === agent.id
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <CheckCircle2 size={16} />
                      {selectedBest === agent.id ? 'Selected' : 'Choose Best'}
                    </button>
                    <button 
                      onClick={() => handleVisitWebsite(agent.website, problem)}
                      className="p-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
                      title={`Visit ${agent.name} website`}
                    >
                      <ExternalLink size={18} />
                    </button>
                    <button 
                      onClick={(e) => handleCopy(generateAIResponse(agent.id, problem).output, e.currentTarget)}
                      className="p-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
                      title="Copy output to clipboard"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Merged Result */}
            {stage === 'merged' && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-1 border border-slate-700 shadow-2xl shadow-blue-900/20"
              >
                <div className="bg-white/5 backdrop-blur-3xl rounded-[22px] p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg">
                      <Combine size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">Ultimate AI Answer</h2>
                      <p className="text-slate-400">Combined intelligence from all agents</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                        <Sparkles size={18} /> Best Idea
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {problem ? `Optimized solution approach for: ${problem}` : 'Create a viral loop referral program integrated directly into the product onboarding flow to reduce CAC to near zero.'}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                        <Sparkles size={18} /> Best Explanation
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {problem ? `Strategic methodology for solving ${problem} with maximum efficiency and minimal resources.` : 'Focusing on organic content first builds a sustainable moat. Paid acquisition should only be used to pour fuel on already working organic channels.'}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
                        <Sparkles size={18} /> Best Insight
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {problem ? `Key competitive advantage: Most solutions overlook the critical bottleneck in ${problem} - addressing this creates 10x value.` : 'Your competitors are ignoring TikTok/Shorts for B2B. This is an arbitrage opportunity for high-reach, low-cost brand awareness.'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
