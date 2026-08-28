type RawModule = {
  id: string;
  number: string;
  title: string;
  duration: string;
  content: string;
};

const rawModules = import.meta.glob<string>('../../../workshop-step-*.md', {
  eager: true,
  import: 'default',
  query: '?raw'
});

const imageAssets = import.meta.glob<string>('../../../images/*', {
  eager: true,
  import: 'default',
  query: '?url'
});

const moduleId = (path: string): string => path.match(/workshop-step-(\d+)-(.+)\.md$/)?.[2] ?? path;

const number = (path: string): string => path.match(/workshop-step-(\d+)-/)?.[1].padStart(2, '0') ?? '00';

const title = (content: string): string => content.match(/^#\s+(?:Workshop Step \d+:\s*)?(.+)$/m)?.[1] ?? 'Workshop step';

const duration = (content: string): string => content.match(/\*\*Time:\*\*\s*([^\n]+)/)?.[1] ?? 'Pre-work';

export const workshopModules: RawModule[] = Object.entries(rawModules)
  .map(([path, content]) => ({ id: moduleId(path), number: number(path), title: title(content), duration: duration(content), content }))
  .sort((left, right) => left.number.localeCompare(right.number));

export const getTaskCount = (content: string): number => (content.match(/^\s*[-*+] \[[ xX]\] /gm) ?? []).length;

export const resolveImageAsset = (source: string | undefined): string | undefined => {
  if (!source) return undefined;
  const filename = source.split('/').pop();
  const assetPath = Object.keys(imageAssets).find((path) => path.endsWith(`/${filename}`));
  return assetPath ? imageAssets[assetPath] : source;
};