import { ChevronLeft, ChevronRight, ExternalLink, GitCompareArrows, Github, MonitorCog, Terminal } from 'lucide-react';
import { useEffect, useState, type ComponentProps, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getTaskCount, resolveImageAsset, workshopModules } from './workshop-content';

type Track = 'vscode' | 'cli';
type ListItemProps = ComponentProps<'li'> & { node?: { position?: { start?: { line?: number } }; properties?: { className?: string[] } } };
const repositoryUrl = 'https://github.com/PlagueHO/github-copilot-for-msa';

const filterClientSections = (content: string, track: Track, showComparison: boolean): string => {
  if (showComparison) return content;

  const headingTracks: Record<string, Track> = {
    '### VS Code Insiders': 'vscode',
    '### Copilot CLI': 'cli'
  };
  let visible = true;

  return content.split('\n').filter((line) => {
    const headingTrack = headingTracks[line];
    if (headingTrack) {
      visible = headingTrack === track;
      return visible;
    }

    if (/^#{1,3}\s/.test(line)) visible = true;
    return visible;
  }).join('\n');
};

const getInitialModule = (): number => {
  const id = new URLSearchParams(window.location.search).get('step');
  return Math.max(0, workshopModules.findIndex((module) => module.id === id));
};

export function App() {
  const [currentIndex, setCurrentIndex] = useState(getInitialModule);
  const [track, setTrack] = useState<Track>(() => localStorage.getItem('workshop-track') === 'cli' ? 'cli' : 'vscode');
  const [showComparison, setShowComparison] = useState(false);
  const [completeTasks, setCompleteTasks] = useState<Set<string>>(() => new Set(JSON.parse(localStorage.getItem('workshop-tasks') ?? '[]') as string[]));
  const module = workshopModules[currentIndex];
  const moduleContent = filterClientSections(module.content, track, showComparison);
  const taskCount = workshopModules.reduce((total, item) => total + getTaskCount(item.content), 0);

  useEffect(() => {
    localStorage.setItem('workshop-track', track);
  }, [track]);

  useEffect(() => {
    localStorage.setItem('workshop-tasks', JSON.stringify([...completeTasks]));
  }, [completeTasks]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('step', module.id);
    window.history.replaceState({}, '', url);
  }, [module]);

  const changeModule = (index: number) => setCurrentIndex(Math.min(Math.max(index, 0), workshopModules.length - 1));
  const toggleTask = (taskId: string) => setCompleteTasks((current) => {
    const next = new Set(current);
    if (next.has(taskId)) next.delete(taskId);
    else next.add(taskId);
    return next;
  });

  const renderListItem = ({ children, node, ...props }: ListItemProps): ReactNode => {
    const isTask = node?.properties?.className?.includes('task-list-item');
    if (!isTask) return <li {...props}>{children}</li>;
    const line = node?.position?.start?.line ?? 0;
    const taskId = `${module.id}:${line}`;
    return <li {...props} className="task-item">
      <input type="checkbox" checked={completeTasks.has(taskId)} onChange={() => toggleTask(taskId)} aria-label={`Complete task at line ${line}`} />
      <span>{children}</span>
    </li>;
  };

  const renderLink = ({ href, children, ...props }: ComponentProps<'a'>): ReactNode => {
    const target = workshopModules.findIndex((item) => href?.includes(`workshop-step-${Number(item.number)}-`));
    if (target >= 0) return <button className="document-link" onClick={() => changeModule(target)}>{children}</button>;
    const destination = href && !href.startsWith('http') && !href.startsWith('#') ? `${repositoryUrl}/blob/main/${href.replace(/^\.\//, '')}` : href;
    const external = destination?.startsWith('http');
    return <a href={destination} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} {...props}>{children}</a>;
  };

  const renderImage = ({ src, alt, ...props }: ComponentProps<'img'>): ReactNode => <img src={resolveImageAsset(src)} alt={alt ?? ''} {...props} />;

  return <main className="shell">
    <header className="topbar">
      <button className="brand" onClick={() => changeModule(0)}><span className="eyebrow">MICROSOFT STUDENT ACCELERATOR</span><span>Agentic Development Workshop</span></button>
      <div className="track" aria-label="Primary workshop client">
        <button className={track === 'vscode' ? 'selected' : ''} onClick={() => setTrack('vscode')}><MonitorCog size={16} /> VS Code Insiders</button>
        <button className={track === 'cli' ? 'selected' : ''} onClick={() => setTrack('cli')}><Terminal size={16} /> Copilot CLI</button>
      </div>
    </header>
    <div className="workspace">
      <aside className="rail" aria-label="Workshop modules">
        <div className="progress"><span>{completeTasks.size} / {taskCount}</span><progress value={completeTasks.size} max={taskCount} /></div>
        <nav>{workshopModules.map((item, index) => <button key={item.id} className={index === currentIndex ? 'active' : ''} onClick={() => changeModule(index)}><span>{item.number}</span>{item.title}</button>)}</nav>
        <p className="app-note">Install both clients, then use one primary client for the lab. GitHub Copilot App is optional self-directed exploration.</p>
      </aside>
      <section className="lesson" aria-live="polite">
        <div className="lesson-meta"><span>STEP {module.number}</span><span>{module.duration}</span></div>
        <div className="lesson-track-controls">
          <div className="track-detail">{track === 'vscode' ? 'Primary client: VS Code Insiders agent session.' : 'Primary client: interactive Copilot CLI session.'}</div>
          <button className={showComparison ? 'compare-button selected' : 'compare-button'} onClick={() => setShowComparison((current) => !current)} aria-pressed={showComparison}>
            <GitCompareArrows size={16} /> {showComparison ? 'Show primary track' : 'Compare tracks'}
          </button>
        </div>
        {showComparison && <p className="comparison-note">Both client paths are shown. Your primary track remains {track === 'vscode' ? 'VS Code Insiders' : 'Copilot CLI'}.</p>}
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ li: renderListItem, a: renderLink, img: renderImage }}>{moduleContent}</ReactMarkdown>
        <div className="lesson-footer"><span>{getTaskCount(module.content)} tasks in this module</span><div><button className="nav-button" disabled={currentIndex === 0} onClick={() => changeModule(currentIndex - 1)} aria-label="Previous step" title="Previous step"><ChevronLeft size={19} /></button><button className="nav-button" disabled={currentIndex === workshopModules.length - 1} onClick={() => changeModule(currentIndex + 1)} aria-label="Next step" title="Next step"><ChevronRight size={19} /></button></div></div>
      </section>
    </div>
    <footer><a href="https://docs.github.com/en/copilot" target="_blank" rel="noreferrer">GitHub Copilot documentation <ExternalLink size={14} /></a><a href="https://learn.microsoft.com/en-us/training/paths/accelerate-app-development-using-github-copilot/" target="_blank" rel="noreferrer">Microsoft Learn <ExternalLink size={14} /></a><a href="https://github.com/PlagueHO/github-copilot-for-msa" target="_blank" rel="noreferrer">Workshop repository <Github size={14} /></a></footer>
  </main>;
}
