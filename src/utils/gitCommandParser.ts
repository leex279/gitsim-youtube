import { Repository, TerminalHistory } from '../types';

export const parseGitCommand = (
  input: string, 
  repository: Repository,
  setRepository: React.Dispatch<React.SetStateAction<Repository>>,
  setHistory: React.Dispatch<React.SetStateAction<TerminalHistory[]>>
): { output: string; isError: boolean } => {
  const args = input.trim().split(' ');
  
  // Handle non-git commands
  if (args[0] !== 'git') {
    if (args[0] === 'clear') {
      setHistory([]);
      return { output: '', isError: false };
    }
    if (args[0] === 'ls') {
      const items = repository.fileSystem.map(item => item.name).join('  ');
      return { output: items, isError: false };
    }
    if (args[0] === 'cd') {
      if (args[1] === 'bolt.diy') {
        return { output: 'Changed directory to bolt.diy', isError: false };
      }
      return { output: 'Directory navigation is simplified in this simulator.', isError: false };
    }
    if (args[0] === 'pnpm') {
      if (args[1] === 'install') {
        return { 
          output: 'Packages: +1500\nDependencies: 250 (prod), 1250 (dev)\nDone in 5.2s', 
          isError: false 
        };
      }
      if (args[1] === 'run' && args[2] === 'dev') {
        return { 
          output: '> bolt.diy@0.1.0 dev\n> vite\n\n  VITE v4.3.9  ready in 300 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose\n  ➜  press h to show help', 
          isError: false 
        };
      }
      return { output: `Unknown pnpm command: ${args.slice(1).join(' ')}`, isError: true };
    }
    return { output: `Command not found: ${args[0]}`, isError: true };
  }

  // Handle git commands
  if (args.length < 2) {
    return { output: 'Usage: git <command> [<args>]', isError: true };
  }

  const command = args[1];

  switch (command) {
    case 'init':
      return handleInit(repository, setRepository);
    case 'status':
      return handleStatus(repository);
    case 'add':
      return handleAdd(args.slice(2), repository, setRepository);
    case 'commit':
      return handleCommit(args.slice(2), repository, setRepository);
    case 'branch':
      return handleBranch(args.slice(2), repository, setRepository);
    case 'checkout':
      return handleCheckout(args.slice(2), repository, setRepository);
    case 'merge':
      return handleMerge(args.slice(2), repository, setRepository);
    case 'remote':
      return handleRemote(args.slice(2), repository, setRepository);
    case 'push':
      return handlePush(args.slice(2), repository, setRepository);
    case 'pull':
      return handlePull(args.slice(2), repository, setRepository);
    case 'clone':
      return handleClone(args.slice(2), repository, setRepository);
    case 'log':
      return handleLog(repository);
    case 'reset':
      return handleReset(args.slice(2), repository, setRepository);
    default:
      return { output: `git: '${command}' is not a git command. See 'git --help'.`, isError: true };
  }
};

const handleInit = (
  repository: Repository,
  setRepository: React.Dispatch<React.SetStateAction<Repository>>
): { output: string; isError: boolean } => {
  // In a real implementation, we would check if .git already exists
  return { 
    output: 'Initialized empty Git repository in .git/', 
    isError: false 
  };
};

const handleStatus = (repository: Repository): { output: string; isError: boolean } => {
  let output = `On branch ${repository.currentBranch}\n`;
  
  const modifiedFiles = repository.fileSystem.filter(file => file.type === 'file' && file.modified);
  const stagedFiles = repository.fileSystem.filter(file => file.type === 'file' && file.staged);
  
  if (modifiedFiles.length === 0 && stagedFiles.length === 0) {
    output += 'nothing to commit, working tree clean';
  } else {
    if (stagedFiles.length > 0) {
      output += '\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n';
      stagedFiles.forEach(file => {
        output += `\t modified: ${file.name}\n`;
      });
    }
    
    if (modifiedFiles.length > 0) {
      output += '\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n';
      modifiedFiles.forEach(file => {
        output += `\t modified: ${file.name}\n`;
      });
    }
  }
  
  return { output, isError: false };
};

const handleAdd = (
  args: string[],
  repository: Repository,
  setRepository: React.Dispatch<React.SetStateAction<Repository>>
): { output: string; isError: boolean } => {
  if (args.length === 0) {
    return { output: 'Nothing specified, nothing added.', isError: true };
  }

  const path = args[0];
  
  // Simple implementation for the simulator
  if (path === '.') {
    // Stage all modified files
    const updatedFileSystem = repository.fileSystem.map(item => {
      if (item.type === 'file' && item.modified) {
        return { ...item, staged: true };
      }
      return item;
    });
    
    setRepository({
      ...repository,
      fileSystem: updatedFileSystem
    });
    
    return { output: '', isError: false };
  } else {
    // Stage specific file
    const fileExists = repository.fileSystem.some(item => item.name === path);
    
    if (!fileExists) {
      return { output: `pathspec '${path}' did not match any files`, isError: true };
    }
    
    const updatedFileSystem = repository.fileSystem.map(item => {
      if (item.name === path) {
        return { ...item, staged: true };
      }
      return item;
    });
    
    setRepository({
      ...repository,
      fileSystem: updatedFileSystem
    });
    
    return { output: '', isError: false };
  }
};

const handleCommit = (
  args: string[],
  repository: Repository,
  setRepository: React.Dispatch<React.SetStateAction<Repository>>
): { output: string; isError: boolean } => {
  if (args.length < 2 || args[0] !== '-m') {
    return { output: 'Error: Missing commit message. Use -m "your message"', isError: true };
  }
  
  // Extract the message, handling quotes properly
  let message = '';
  if (args[1].startsWith('"') && args[1].endsWith('"')) {
    message = args[1].slice(1, -1);
  } else if (args[1].startsWith('"')) {
    // Find the closing quote in subsequent args
    const messageStart = args[1].slice(1);
    const closingQuoteIndex = args.findIndex((arg, i) => i > 1 && arg.endsWith('"'));
    
    if (closingQuoteIndex === -1) {
      return { output: 'Error: Unclosed quote in commit message', isError: true };
    }
    
    const messageEnd = args[closingQuoteIndex].slice(0, -1);
    const middleParts = args.slice(2, closingQuoteIndex);
    
    message = [messageStart, ...middleParts, messageEnd].join(' ');
  } else {
    message = args[1];
  }
  
  const stagedFiles = repository.fileSystem.filter(file => file.type === 'file' && file.staged);
  
  if (stagedFiles.length === 0) {
    return { output: 'nothing to commit, working tree clean', isError: false };
  }
  
  // Create a new commit
  const newCommitId = Math.random().toString(36).substring(2, 10);
  const changes = stagedFiles.map(file => ({
    path: file.name,
    type: 'modify' as const,
    content: file.content
  }));
  
  // Update the branch with the new commit
  const updatedBranches = repository.branches.map(branch => {
    if (branch.name === repository.currentBranch) {
      return {
        ...branch,
        commitHistory: [
          ...branch.commitHistory,
          {
            id: newCommitId,
            message,
            timestamp: Date.now(),
            changes
          }
        ],
        head: newCommitId
      };
    }
    return branch;
  });
  
  // Reset staged and modified flags
  const updatedFileSystem = repository.fileSystem.map(item => {
    if (item.type === 'file' && item.staged) {
      return { ...item, staged: false, modified: false };
    }
    return item;
  });
  
  setRepository({
    ...repository,
    branches: updatedBranches,
    fileSystem: updatedFileSystem
  });
  
  return { 
    output: `[${repository.currentBranch} ${newCommitId}] ${message}\n ${stagedFiles.length} files changed`, 
    isError: false 
  };
};

const handleBranch = (
  args: string[],
  repository: Repository,
  setRepository: React.Dispatch<React.SetStateAction<Repository>>
): { output: string; isError: boolean } => {
  // List branches
  if (args.length === 0) {
    let output = '';
    repository.branches.forEach(branch => {
      output += `${branch.name === repository.currentBranch ? '* ' : '  '}${branch.name}\n`;
    });
    return { output, isError: false };
  }
  
  // List remote branches
  if (args[0] === '-r') {
    if (repository.remotes.length === 0) {
      return { output: 'No remote branches found', isError: false };
    }
    
    // Simulate remote branches
    let output = '';
    output += '  origin/main\n';
    output += '  origin/stable\n';
    output += '  origin/feature/new-component\n';
    output += '  origin/bugfix/login-issue\n';
    
    return { output, isError: false };
  }
  
  // Create a new branch
  const branchName = args[0];
  
  // Check if branch already exists
  if (repository.branches.some(branch => branch.name === branchName)) {
    return { output: `fatal: A branch named '${branchName}' already exists.`, isError: true };
  }
  
  // Find current branch to copy its state
  const currentBranch = repository.branches.find(branch => branch.name === repository.currentBranch);
  
  if (!currentBranch) {
    return { output: 'Error: Current branch not found', isError: true };
  }
  
  // Create new branch at the same commit
  const newBranch = {
    name: branchName,
    commitHistory: [...currentBranch.commitHistory],
    head: currentBranch.head
  };
  
  setRepository({
    ...repository,
    branches: [...repository.branches, newBranch]
  });
  
  return { output: '', isError: false };
};

const handleCheckout = (
  args: string[],
  repository: Repository,
  setRepository: React.Dispatch<React.SetStateAction<Repository>>
): { output: string; isError: boolean } => {
  if (args.length === 0) {
    return { output: 'Error: You must specify which branch to checkout', isError: true };
  }
  
  // Handle checkout -b (create and checkout)
  if (args[0] === '-b' && args.length > 1) {
    const branchName = args[1];
    
    // Check if branch already exists
    if (repository.branches.some(branch => branch.name === branchName)) {
      return { output: `fatal: A branch named '${branchName}' already exists.`, isError: true };
    }
    
    // Find current branch to copy its state
    const currentBranch = repository.branches.find(branch => branch.name === repository.currentBranch);
    
    if (!currentBranch) {
      return { output: 'Error: Current branch not found', isError: true };
    }
    
    // Create new branch at the same commit
    const newBranch = {
      name: branchName,
      commitHistory: [...currentBranch.commitHistory],
      head: currentBranch.head
    };
    
    setRepository({
      ...repository,
      branches: [...repository.branches, newBranch],
      currentBranch: branchName
    });
    
    return { output: `Switched to a new branch '${branchName}'`, isError: false };
  }
  
  // Regular checkout
  const branchName = args[0];
  
  // Special handling for stable branch in bolt.diy tutorial
  if (branchName === 'stable' && !repository.branches.some(branch => branch.name === 'stable')) {
    // Create stable branch if it doesn't exist
    const mainBranch = repository.branches.find(branch => branch.name === 'main');
    
    if (mainBranch) {
      const stableBranch = {
        name: 'stable',
        commitHistory: [...mainBranch.commitHistory],
        head: mainBranch.head
      };
      
      setRepository({
        ...repository,
        branches: [...repository.branches, stableBranch],
        currentBranch: 'stable'
      });
      
      return { output: `Switched to branch 'stable'`, isError: false };
    }
  }
  
  // Check if branch exists
  const targetBranch = repository.branches.find(branch => branch.name === branchName);
  
  if (!targetBranch) {
    // For feature branches in bolt.diy tutorial
    if (branchName === 'feature/new-component') {
      const mainBranch = repository.branches.find(branch => branch.name === 'main');
      
      if (mainBranch) {
        const featureBranch = {
          name: 'feature/new-component',
          commitHistory: [
            ...mainBranch.commitHistory,
            {
              id: 'f1e2a3t4',
              message: 'Add new component',
              timestamp: Date.now() - 43200000, // 12 hours ago
              changes: []
            }
          ],
          head: 'f1e2a3t4'
        };
        
        setRepository({
          ...repository,
          branches: [...repository.branches, featureBranch],
          currentBranch: 'feature/new-component'
        });
        
        return { output: `Switched to branch 'feature/new-component'`, isError: false };
      }
    }
    
    return { output: `error: pathspec '${branchName}' did not match any file(s) known to git`, isError: true };
  }
  
  setRepository({
    ...repository,
    currentBranch: branchName
  });
  
  return { output: `Switched to branch '${branchName}'`, isError: false };
};

const handleMerge = (
  args: string[],
  repository: Repository,
  setRepository: React.Dispatch<React.SetStateAction<Repository>>
): { output: string; isError: boolean } => {
  if (args.length === 0) {
    return { output: 'Error: You must specify which branch to merge', isError: true };
  }
  
  const sourceBranchName = args[0];
  
  // Check if source branch exists
  const sourceBranch = repository.branches.find(branch => branch.name === sourceBranchName);
  
  if (!sourceBranch) {
    return { output: `error: branch '${sourceBranchName}' not found.`, isError: true };
  }
  
  // Find current branch
  const currentBranch = repository.branches.find(branch => branch.name === repository.currentBranch);
  
  if (!currentBranch) {
    return { output: 'Error: Current branch not found', isError: true };
  }
  
  // Simple merge implementation for the simulator
  // In a real implementation, we would need to handle conflicts
  const mergeCommitId = Math.random().toString(36).substring(2, 10);
  
  const updatedBranches = repository.branches.map(branch => {
    if (branch.name === repository.currentBranch) {
      return {
        ...branch,
        commitHistory: [
          ...branch.commitHistory,
          {
            id: mergeCommitId,
            message: `Merge branch '${sourceBranchName}' into ${repository.currentBranch}`,
            timestamp: Date.now(),
            changes: []
          }
        ],
        head: mergeCommitId
      };
    }
    return branch;
  });
  
  setRepository({
    ...repository,
    branches: updatedBranches
  });
  
  return { output: `Merge made by the 'recursive' strategy.`, isError: false };
};

const handleRemote = (
  args: string[],
  repository: Repository,
  setRepository: React.Dispatch<React.SetStateAction<Repository>>
): { output: string; isError: boolean } => {
  // List remotes
  if (args.length === 0) {
    if (repository.remotes.length === 0) {
      return { output: '', isError: false };
    }
    
    let output = '';
    repository.remotes.forEach(remote => {
      output += `${remote.name}\n`;
    });
    return { output, isError: false };
  }
  
  // Verbose listing
  if (args[0] === '-v' || args[0] === '--verbose') {
    if (repository.remotes.length === 0) {
      return { output: '', isError: false };
    }
    
    let output = '';
    repository.remotes.forEach(remote => {
      output += `${remote.name}\t${remote.url} (fetch)\n`;
      output += `${remote.name}\t${remote.url} (push)\n`;
    });
    return { output, isError: false };
  }
  
  // Add remote
  if (args[0] === 'add' && args.length >= 3) {
    const remoteName = args[1];
    const remoteUrl = args[2];
    
    // Check if remote already exists
    if (repository.remotes.some(remote => remote.name === remoteName)) {
      return { output: `error: remote ${remoteName} already exists.`, isError: true };
    }
    
    setRepository({
      ...repository,
      remotes: [...repository.remotes, { name: remoteName, url: remoteUrl }]
    });
    
    return { output: '', isError: false };
  }
  
  return { output: 'Error: Invalid remote command', isError: true };
};

const handlePush = (
  args: string[],
  repository: Repository,
  setRepository: React.Dispatch<React.SetStateAction<Repository>>
): { output: string; isError: boolean } => {
  // Check for --set-upstream or -u flag
  const setUpstreamIndex = args.findIndex(arg => arg === '--set-upstream' || arg === '-u');
  const isSetUpstream = setUpstreamIndex !== -1;
  
  // If --set-upstream is used, remove it from args for further processing
  const cleanedArgs = isSetUpstream 
    ? [...args.slice(0, setUpstreamIndex), ...args.slice(setUpstreamIndex + 1)]
    : args;
  
  // Simple implementation for the simulator
  if (repository.remotes.length === 0) {
    return { 
      output: 'fatal: No configured push destination.\nfatal: The current branch has no upstream branch.\nTo push the current branch and set the remote as upstream, use\n\n    git push --set-upstream origin main', 
      isError: true 
    };
  }
  
  // Default remote is origin
  const remoteName = cleanedArgs.length > 0 ? cleanedArgs[0] : 'origin';
  
  // Check if remote exists
  const remote = repository.remotes.find(r => r.name === remoteName);
  
  if (!remote) {
    return { output: `fatal: '${remoteName}' does not appear to be a git repository`, isError: true };
  }
  
  // Default branch is current branch
  const branchName = cleanedArgs.length > 1 ? cleanedArgs[1] : repository.currentBranch;
  const currentBranch = repository.branches.find(b => b.name === repository.currentBranch);
  
  if (!currentBranch || currentBranch.commitHistory.length === 0) {
    return { output: `error: src refspec ${branchName} does not match any`, isError: true };
  }
  
  const latestCommitId = currentBranch.head.substring(0, 7);
  const previousCommitId = currentBranch.commitHistory.length > 1 
    ? currentBranch.commitHistory[currentBranch.commitHistory.length - 2].id.substring(0, 7) 
    : '0000000';
  
  return { 
    output: `Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (3/3), done.\nWriting objects: 100% (3/3), 294 bytes | 294.00 KiB/s, done.\nTotal 3 (delta 2), reused 0 (delta 0), pack-reused 0\nremote: Resolving deltas: 100% (2/2), completed with 2 local objects.\nTo ${remote.url}\n   ${previousCommitId}..${latestCommitId} ${branchName} -> ${branchName}`, 
    isError: false 
  };
};

const handlePull = (
  args: string[],
  repository: Repository,
  setRepository: React.Dispatch<React.SetStateAction<Repository>>
): { output: string; isError: boolean } => {
  // Simple implementation for the simulator
  if (repository.remotes.length === 0) {
    return { output: 'fatal: No configured pull destination.', isError: true };
  }
  
  // Default remote is origin
  const remoteName = args.length > 0 ? args[0] : 'origin';
  
  // Check if remote exists
  const remote = repository.remotes.find(r => r.name === remoteName);
  
  if (!remote) {
    return { output: `fatal: '${remoteName}' does not appear to be a git repository`, isError: true };
  }
  
  // Check for modified files that might cause conflicts
  const modifiedFiles = repository.fileSystem.filter(file => file.type === 'file' && (file.modified || file.staged));
  
  if (modifiedFiles.length > 0 && !args.includes('--force')) {
    return { 
      output: 'error: Your local changes to the following files would be overwritten by merge:\n' + 
              modifiedFiles.map(file => `\t${file.name}`).join('\n') + 
              '\nPlease commit your changes or stash them before you merge.\nAborting', 
      isError: true 
    };
  }
  
  // Simulate fetching and merging changes
  // For the simulator, we'll create a fake commit to represent remote changes
  const remoteCommitId = Math.random().toString(36).substring(2, 10);
  
  // Add a simulated file change from the remote
  const updatedFileSystem = [...repository.fileSystem];
  const readmeIndex = updatedFileSystem.findIndex(file => file.name === 'README.md');
  
  if (readmeIndex !== -1) {
    updatedFileSystem[readmeIndex] = {
      ...updatedFileSystem[readmeIndex],
      content: (updatedFileSystem[readmeIndex].content || '') + '\n\nUpdated from remote repository.'
    };
  }
  
  // Update the branch with the new "remote" commit
  const updatedBranches = repository.branches.map(branch => {
    if (branch.name === repository.currentBranch) {
      return {
        ...branch,
        commitHistory: [
          ...branch.commitHistory,
          {
            id: remoteCommitId,
            message: 'Update from remote repository',
            timestamp: Date.now(),
            changes: [
              {
                path: 'README.md',
                type: 'modify',
                content: updatedFileSystem[readmeIndex].content
              }
            ]
          }
        ],
        head: remoteCommitId
      };
    }
    return branch;
  });
  
  setRepository({
    ...repository,
    branches: updatedBranches,
    fileSystem: updatedFileSystem
  });
  
  return { 
    output: `remote: Enumerating objects: 5, done.\nremote: Counting objects: 100% (5/5), done.\nremote: Compressing objects: 100% (2/2), done.\nremote: Total 3 (delta 1), reused 0 (delta 0), pack-reused 0\nUnpacking objects: 100% (3/3), 285 bytes | 285.00 KiB/s, done.\nFrom ${remote.url}\n   a1b2c3d..${remoteCommitId.substring(0, 7)}  main     -> origin/main\nUpdating a1b2c3d..${remoteCommitId.substring(0, 7)}\nFast-forward\n README.md | 2 ++\n 1 file changed, 2 insertions(+)`, 
    isError: false 
  };
};

const handleClone = (
  args: string[],
  repository: Repository,
  setRepository: React.Dispatch<React.SetStateAction<Repository>>
): { output: string; isError: boolean } => {
  if (args.length === 0) {
    return { output: 'Error: You must specify a repository to clone', isError: true };
  }
  
  const repoUrl = args[0];
  
  // Extract repo name from URL
  let repoName = '';
  if (repoUrl.endsWith('.git')) {
    repoName = repoUrl.split('/').pop()?.replace('.git', '') || 'repo';
  } else {
    repoName = repoUrl.split('/').pop() || 'repo';
  }
  
  // Add a remote for the cloned repository
  const newRemote = { name: 'origin', url: repoUrl };
  
  // Create a simulated file system for the cloned repo
  const clonedFileSystem = [
    {
      name: 'README.md',
      type: 'file' as const,
      content: `# ${repoName}\n\nThis is the README for the ${repoName} project.`,
      modified: false,
      staged: false
    },
    {
      name: 'package.json',
      type: 'file' as const,
      content: `{\n  "name": "${repoName}",\n  "version": "1.0.0",\n  "description": "A sample project",\n  "main": "index.js",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "test": "vitest run"\n  },\n  "keywords": [],\n  "author": "",\n  "license": "MIT"\n}`,
      modified: false,
      staged: false
    },
    {
      name: 'src',
      type: 'directory' as const,
      children: [
        {
          name: 'index.js',
          type: 'file' as const,
          content: 'console.log("Hello from cloned repository!");',
          modified: false,
          staged: false
        }
      ]
    }
  ];
  
  // Create initial commit for the cloned repo
  const initialCommitId = Math.random().toString(36).substring(2, 10);
  
  setRepository({
    ...repository,
    name: repoName,
    description: `Cloned from ${repoUrl}`,
    fileSystem: clonedFileSystem,
    remotes: [newRemote],
    branches: [
      {
        name: 'main',
        commitHistory: [
          {
            id: initialCommitId,
            message: 'Initial commit',
            timestamp: Date.now() - 86400000, // 1 day ago
            changes: [
              {
                path: 'README.md',
                type: 'add',
                content: `# ${repoName}\n\nThis is the README for the ${repoName} project.`
              },
              {
                path: 'package.json',
                type: 'add',
                content: `{\n  "name": "${repoName}",\n  "version": "1.0.0",\n  "description": "A sample project",\n  "main": "index.js",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "test": "vitest run"\n  },\n  "keywords": [],\n  "author": "",\n  "license": "MIT"\n}`
              },
              {
                path: 'src/index.js',
                type: 'add',
                content: 'console.log("Hello from cloned repository!");'
              }
            ]
          }
        ],
        head: initialCommitId
      }
    ],
    currentBranch: 'main'
  });
  
  return { 
    output: `Cloning into '${repoName}'...\nremote: Enumerating objects: 73, done.\nremote: Counting objects: 100% (73/73), done.\nremote: Compressing objects: 100% (49/49), done.\nremote: Total 73 (delta 27), reused 62 (delta 16), pack-reused 0\nReceiving objects: 100% (73/73), 14.52 KiB | 2.90 MiB/s, done.\nResolving deltas: 100% (27/27), done.`, 
    isError: false 
  };
};

const handleLog = (repository: Repository): { output: string; isError: boolean } => {
  const currentBranch = repository.branches.find(branch => branch.name === repository.currentBranch);
  
  if (!currentBranch) {
    return { output: 'Error: Current branch not found', isError: true };
  }
  
  if (currentBranch.commitHistory.length === 0) {
    return { output: 'No commits yet', isError: false };
  }
  
  let output = '';
  
  // Display commits in reverse chronological order
  [...currentBranch.commitHistory].reverse().forEach(commit => {
    output += `commit ${commit.id}\n`;
    output += `Date: ${new Date(commit.timestamp).toISOString()}\n\n`;
    output += `    ${commit.message}\n\n`;
  });
  
  return { output, isError: false };
};

const handleReset = (
  args: string[],
  repository: Repository,
  setRepository: React.Dispatch<React.SetStateAction<Repository>>
): { output: string; isError: boolean } => {
  // Handle different reset modes
  const isHard = args.includes('--hard');
  
  // Reset to specific remote branch
  if (isHard && args.length > 1 && args[1].startsWith('origin/')) {
    const remoteBranch = args[1].split('/')[1];
    
    // Simulate resetting to remote branch state
    const updatedFileSystem = repository.fileSystem.map(item => {
      if (item.type === 'file' && (item.modified || item.staged)) {
        return { ...item, modified: false, staged: false };
      }
      return item;
    });
    
    // Add a simulated commit to represent the reset
    const resetCommitId = Math.random().toString(36).substring(2, 10);
    
    const updatedBranches = repository.branches.map(branch => {
      if (branch.name === repository.currentBranch) {
        return {
          ...branch,
          commitHistory: [
            ...branch.commitHistory,
            {
              id: resetCommitId,
              message: `Reset to origin/${remoteBranch}`,
              timestamp: Date.now(),
              changes: []
            }
          ],
          head: resetCommitId
        };
      }
      return branch;
    });
    
    setRepository({
      ...repository,
      fileSystem: updatedFileSystem,
      branches: updatedBranches
    });
    
    return { 
      output: `HEAD is now at ${resetCommitId.substring(0, 7)} Reset to origin/${remoteBranch}`, 
      isError: false 
    };
  }
  
  // Reset all modified and staged files
  if (isHard) {
    const updatedFileSystem = repository.fileSystem.map(item => {
      if (item.type === 'file' && (item.modified || item.staged)) {
        return { ...item, modified: false, staged: false };
      }
      return item;
    });
    
    setRepository({
      ...repository,
      fileSystem: updatedFileSystem
    });
    
    return { output: 'HEAD is now at ' + repository.branches.find(b => b.name === repository.currentBranch)?.head.substring(0, 7) + ' ' + 
      (repository.branches.find(b => b.name === repository.currentBranch)?.commitHistory.slice(-1)[0]?.message || 'Initial commit'), 
      isError: false 
    };
  }
  
  // Soft reset (unstage files)
  const updatedFileSystem = repository.fileSystem.map(item => {
    if (item.type === 'file' && item.staged) {
      return { ...item, staged: false };
    }
    return item;
  });
  
  setRepository({
    ...repository,
    fileSystem: updatedFileSystem
  });
  
  return { output: 'Unstaged changes after reset:\nM\tREADME.md', isError: false };
};
