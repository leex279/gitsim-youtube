export interface Command {
  name: string;
  description: string;
  syntax: string;
  examples: string[];
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  commands: string[];
  steps: TutorialStep[];
  completed: boolean;
}

export interface TutorialStep {
  id: string;
  instruction: string;
  expectedCommand: string;
  feedback: {
    success: string;
    error: string;
  };
  completed: boolean;
}

export interface FileSystemItem {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileSystemItem[];
  modified?: boolean;
  staged?: boolean;
}

export interface Repository {
  name: string;
  description: string;
  fileSystem: FileSystemItem[];
  branches: Branch[];
  currentBranch: string;
  remotes: Remote[];
}

export interface Branch {
  name: string;
  commitHistory: Commit[];
  head: string;
}

export interface Commit {
  id: string;
  message: string;
  timestamp: number;
  changes: FileChange[];
}

export interface FileChange {
  path: string;
  type: 'add' | 'modify' | 'delete';
  content?: string;
}

export interface Remote {
  name: string;
  url: string;
}

export interface TerminalHistory {
  command: string;
  output: string;
  isError: boolean;
}
