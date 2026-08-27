import { ArrowRight, Bot, Brain, Check, ChevronLeft, ChevronRight, Clipboard, ExternalLink, Github, MonitorCog, ShieldCheck, Terminal, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

type Track = 'vscode' | 'cli';

type Step = {
  id: string;
  number: string;
  title: string;
  duration: string;
  concept: string;
  action: string;
  prompt?: string;
  result: string;
  recovery: string;
};

const steps: Step[] = [
  { id: 'overview', number: '00', title: 'Overview', duration: '5 min', concept: 'The objective is a repeatable engineering loop, not a clever one-off prompt.', action: 'Complete the preflight and choose a guided track.', result: 'Your local workspace and MCP servers are ready.', recovery: 'Use .github/PREFLIGHT.md before continuing.' },
  { id: 'setup', number: '01', title: 'Setup and Verify', duration: 'Pre-work', concept: 'A reliable agentic workflow starts with a verified account, client, local runtime, and understood tool permissions.', action: 'Activate a Copilot Student, Free, or paid plan; choose VS Code Insiders or Copilot CLI; install Git and Node.js 22+; then run the MCP project validation. Optionally install GitHub Copilot App for independent exploration after the lab.', prompt: 'From samples/developer-workbench-mcp, run npm ci, npm test, npm run typecheck, and npm run lint. Report the actual output and stop if any command fails.', result: 'Your Copilot account, guided client track, local Node runtime, and MCP project are ready.', recovery: 'Use workshop-step-0-setup-and-prerequisites.md and .github/PREFLIGHT.md.' },
  { id: 'weak-request', number: '02', title: 'Start Incomplete', duration: '10 min', concept: 'Vague requirements invite unexamined agent assumptions.', action: 'Ask for the bookmark MCP server without extra detail. Do not approve edits.', prompt: 'Build an MCP server that saves categorized developer-learning links to a browser-importable bookmarks file.', result: 'You can identify assumptions about source trust, output location, safety, and tests.', recovery: 'Use normal Copilot Chat if Agent mode is unavailable.' },
  { id: 'grounding', number: '03', title: 'Ground and Clarify', duration: '15 min', concept: 'Ground sources and explicit constraints turn a request into a workable engineering problem.', action: 'Use Microsoft Learn for Microsoft topics, Context7 for current API details, then ask questions before edits.', prompt: 'Ask me 5 questions to ensure your knowledge of the problem is complete and you are not making assumptions. Then ask one question that challenges my central solution assumption. Do not edit files.', result: 'A reviewed plan names files, schemas, security boundaries, tests, and commands.', recovery: 'Use the matching fallback prompt if Skill invocation is unavailable.' },
  { id: 'plan-review', number: '04', title: 'Review the Plan', duration: '10 min', concept: 'A plan needs adversarial review before implementation.', action: 'Run /rubber-duck, or use the Free fallback prompt, then revise the plan.', result: 'The plan covers fixed output, HTTPS, escaping, duplicates, atomic writes, and stdio.', recovery: 'Read .github/skills/rubber-duck/SKILL.md and apply the same rubric manually.' },
  { id: 'implement', number: '05', title: 'Implement and Test', duration: '15 min', concept: 'Make a small cut, validate it immediately, then let the result guide the next change.', action: 'Implement the two MCP tools and run the focused validation suite.', prompt: 'Implement the approved first cut in samples/developer-workbench-mcp only. Follow the repository instructions. After the first substantive change, run the focused test command and report its actual output.', result: 'The local server writes only the safe bookmark export.', recovery: 'Pass exact failures back to Copilot and request the smallest repair.' },
  { id: 'curate', number: '06', title: 'Curate and Review', duration: '15 min', concept: 'MCP tools are capabilities to inspect and approve, not background automation.', action: 'Use learning-curator to propose links, review them, approve the local write, and run /code-quality-review.', result: 'The exported HTML imports manually through Chrome or Edge.', recovery: 'Use the code-quality fallback prompt if Skills are unavailable.' },
  { id: 'reflect', number: '07', title: 'Continue the Practice', duration: '5 min', concept: 'Instructions, agents, Skills, and MCP each solve a different context problem.', action: 'Choose one repeated workflow to formalize in your own repository.', result: 'You have a reusable agentic-development loop.', recovery: 'Return to any step through this navigation.' }
];

const getInitialStep = (): number => {
  const id = new URLSearchParams(window.location.search).get('step');
  return Math.max(0, steps.findIndex((step) => step.id === id));
};

export function App() {
  const [currentIndex, setCurrentIndex] = useState(getInitialStep);
  const [track, setTrack] = useState<Track>(() => localStorage.getItem('workshop-track') === 'cli' ? 'cli' : 'vscode');
  const [complete, setComplete] = useState<Set<string>>(() => new Set(JSON.parse(localStorage.getItem('workshop-complete') ?? '[]') as string[]));
  const [copied, setCopied] = useState(false);
  const step = steps[currentIndex];

  useEffect(() => {
    localStorage.setItem('workshop-track', track);
  }, [track]);

  useEffect(() => {
    localStorage.setItem('workshop-complete', JSON.stringify([...complete]));
  }, [complete]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('step', step.id);
    window.history.replaceState({}, '', url);
  }, [step]);

  const changeStep = (index: number) => setCurrentIndex(Math.min(Math.max(index, 0), steps.length - 1));
  const toggleComplete = () => setComplete((current) => {
    const next = new Set(current);
    if (next.has(step.id)) {
      next.delete(step.id);
    } else {
      next.add(step.id);
    }
    return next;
  });
  const copyPrompt = async () => {
    if (!step.prompt) return;
    await navigator.clipboard.writeText(step.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const parts = steps.filter((item) => item.id !== 'overview');

  return <main className="shell">
    <header className="topbar">
      <div><span className="eyebrow">MICROSOFT STUDENT ACCELERATOR</span><h1>Agentic Development Workshop</h1></div>
      <div className="track" aria-label="Guided client track">
        <button className={track === 'vscode' ? 'selected' : ''} onClick={() => setTrack('vscode')}><MonitorCog size={16} /> VS Code Insiders</button>
        <button className={track === 'cli' ? 'selected' : ''} onClick={() => setTrack('cli')}><Terminal size={16} /> Copilot CLI</button>
      </div>
    </header>
    {step.id === 'overview' ? <Overview onStart={() => changeStep(1)} onSelectStep={changeStep} parts={parts} /> : <div className="workspace">
      <aside className="rail" aria-label="Workshop steps">
        <div className="progress"><span>{complete.size} / {steps.length}</span><progress value={complete.size} max={steps.length} /></div>
        <nav>{steps.map((item, index) => <button key={item.id} className={index === currentIndex ? 'active' : ''} onClick={() => changeStep(index)}><span>{complete.has(item.id) ? <Check size={14} /> : item.number}</span>{item.title}</button>)}</nav>
        <p className="app-note">Optional: students confident in both core tracks may independently try GitHub Copilot App. This workshop contains no App instructions.</p>
      </aside>
      <section className="lesson" aria-live="polite">
        <div className="lesson-meta"><span>STEP {step.number}</span><span>{step.duration}</span></div>
        <h2>{step.title}</h2>
        <div className="band"><h3>Concept</h3><p>{step.concept}</p></div>
        <div className="content-block"><h3>Your action</h3><p>{step.action}</p>{track === 'vscode' ? <p className="track-detail">Open Copilot Chat and select Agent mode in the trusted workspace.</p> : <p className="track-detail">Start Copilot CLI from this repository and keep the session scoped to the current task.</p>}</div>
        {step.prompt && <div className="prompt"><div><h3>Prompt</h3><pre>{step.prompt}</pre></div><button className="icon-button" onClick={copyPrompt} aria-label="Copy prompt" title="Copy prompt"><Clipboard size={18} /></button>{copied && <span className="copied">Copied</span>}</div>}
        <div className="expected"><h3>Expected result</h3><p>{step.result}</p></div>
        <p className="recovery"><strong>Recovery:</strong> {step.recovery}</p>
        <div className="lesson-footer"><button className="complete" onClick={toggleComplete}><Check size={17} /> {complete.has(step.id) ? 'Complete' : 'Mark complete'}</button><div><button className="nav-button" disabled={currentIndex === 0} onClick={() => changeStep(currentIndex - 1)} aria-label="Previous step" title="Previous step"><ChevronLeft size={19} /></button><button className="nav-button" disabled={currentIndex === steps.length - 1} onClick={() => changeStep(currentIndex + 1)} aria-label="Next step" title="Next step"><ChevronRight size={19} /></button></div></div>
      </section>
    </div>}
    <footer><a href="https://docs.github.com/en/copilot" target="_blank" rel="noreferrer">GitHub Copilot documentation <ExternalLink size={14} /></a><a href="https://learn.microsoft.com/en-us/training/paths/accelerate-app-development-using-github-copilot/" target="_blank" rel="noreferrer">Microsoft Learn <ExternalLink size={14} /></a><a href="https://github.com/PlagueHO/github-copilot-for-msa" target="_blank" rel="noreferrer">Workshop repository <Github size={14} /></a></footer>
  </main>;
}

type OverviewProps = {
  onStart: () => void;
  onSelectStep: (index: number) => void;
  parts: Step[];
};

function Overview({ onStart, onSelectStep, parts }: OverviewProps) {
  const outcomes = [
    { icon: Brain, title: 'Context Engineering', description: 'Ground an agent with sources, constraints, and the repository context it needs.' },
    { icon: Bot, title: 'Agentic Workflow', description: 'Move from clarification through challenged assumptions and a reviewed plan.' },
    { icon: Wrench, title: 'MCP Tool Building', description: 'Build a local TypeScript MCP server with an explicit write boundary.' },
    { icon: ShieldCheck, title: 'Quality and Trust', description: 'Approve tool actions deliberately, review generated code, and validate every change.' }
  ];

  return <div className="landing">
    <section className="hero">
      <p className="hero-kicker">MICROSOFT STUDENT ACCELERATOR</p>
      <h2>Build a useful MCP server with GitHub Copilot.</h2>
      <p className="hero-copy">Turn a vague request into a safe, tested developer-learning bookmark tool. Practice the engineering loop that makes agents dependable collaborators.</p>
      <div className="hero-actions"><button className="primary-action" onClick={onStart}>Start workshop <ArrowRight size={18} /></button><a className="secondary-action" href="https://github.com/PlagueHO/github-copilot-for-msa" target="_blank" rel="noreferrer"><Github size={18} /> Workshop repository</a></div>
      <div className="stats"><span><strong>~60 min</strong>Hands-on lab</span><span><strong>7 parts</strong>Guided sequence</span><span><strong>2 tracks</strong>VS Code or CLI</span></div>
    </section>
    <section className="overview-section">
      <div className="section-heading"><span>01</span><div><h2>What you will learn</h2><p>Use each agentic-development primitive for the job it is actually good at.</p></div></div>
      <div className="outcome-grid">{outcomes.map(({ icon: Icon, title, description }) => <article key={title} className="outcome"><Icon size={23} /><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>
    <section className="overview-section">
      <div className="section-heading"><span>02</span><div><h2>Workshop parts</h2><p>Complete the setup first, then work through the development loop one decision at a time.</p></div></div>
      <div className="part-grid">{parts.map((item, index) => <button key={item.id} className="part" onClick={() => onSelectStep(index + 1)}><span className="part-number">{item.number}</span><span><strong>{item.title}</strong><small>{item.concept}</small></span><span className="part-time">{item.duration}</span><ArrowRight size={18} /></button>)}</div>
    </section>
    <section className="prerequisites">
      <div><span className="section-label">Before you begin</span><h2>Bring a ready local environment.</h2><p>Use a GitHub Copilot Student, Free, or paid account; Git; Node.js 22 or later; and either VS Code Insiders or Copilot CLI.</p></div>
      <button className="secondary-action dark-action" onClick={onStart}>View setup checklist <ArrowRight size={18} /></button>
    </section>
  </div>;
}
