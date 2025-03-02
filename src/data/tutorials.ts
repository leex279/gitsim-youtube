import { Tutorial } from '../types';

export const tutorials: Tutorial[] = [
  {
    id: 'basics-1',
    title: 'Git Basics 1: Local Workflow',
    description: 'Learn the fundamental Git commands to get started with version control',
    commands: ['git init', 'git status', 'git add', 'git commit'],
    steps: [
      {
        id: 'init',
        instruction: 'Initialize a new Git repository in the current directory',
        expectedCommand: 'git init',
        feedback: {
          success: 'Great! You\'ve initialized a new Git repository. This creates a hidden .git folder that tracks all changes to your project.',
          error: 'Try using the "git init" command to initialize a new repository.'
        },
        completed: false
      },
      {
        id: 'status',
        instruction: 'Check the status of your repository to see if there are any changes',
        expectedCommand: 'git status',
        feedback: {
          success: 'Good job! The status command shows you which files are modified, staged, or untracked.',
          error: 'Try using the "git status" command to check the repository status.'
        },
        completed: false
      },
      {
        id: 'add',
        instruction: 'Stage the file "README.md" to be committed',
        expectedCommand: 'git add README.md',
        feedback: {
          success: 'Well done! You\'ve staged README.md for commit. Staging is preparing files for the next commit.',
          error: 'Try using "git add README.md" to stage the file.'
        },
        completed: false
      },
      {
        id: 'commit',
        instruction: 'Commit your staged changes with a message "Initial commit"',
        expectedCommand: 'git commit -m "Initial commit"',
        feedback: {
          success: 'Perfect! You\'ve committed your changes. A commit is a snapshot of your project at a specific point in time.',
          error: 'Try using "git commit -m \\"Initial commit\\"" to commit your changes with a message.'
        },
        completed: false
      }
    ],
    completed: false
  },
  {
    id: 'basics-2',
    title: 'Git Basics 2: Remote Workflow',
    description: 'Learn how to work with remote repositories and manage changes',
    commands: ['git clone', 'git pull', 'git push', 'git reset'],
    steps: [
      {
        id: 'clone',
        instruction: 'Clone a remote repository to your local machine',
        expectedCommand: 'git clone https://github.com/stackblitz-labs/bolt.diy',
        feedback: {
          success: 'Great! You\'ve cloned a remote repository. This downloads the entire project and its history to your local machine.',
          error: 'Try using "git clone https://github.com/stackblitz-labs/bolt.diy" to clone the repository.'
        },
        completed: false
      },
      {
        id: 'remote-check',
        instruction: 'Check the configured remote repositories',
        expectedCommand: 'git remote -v',
        feedback: {
          success: 'Good job! This shows all remote repositories and their URLs. The "origin" remote was automatically added when you cloned.',
          error: 'Try using "git remote -v" to see the remote repositories and their URLs.'
        },
        completed: false
      },
      {
        id: 'pull',
        instruction: 'Pull the latest changes from the remote repository',
        expectedCommand: 'git pull',
        feedback: {
          success: 'Well done! You\'ve pulled the latest changes from the remote repository. This keeps your local copy up to date.',
          error: 'Try using "git pull" to fetch and merge changes from the remote repository.'
        },
        completed: false
      },
      {
        id: 'reset-hard',
        instruction: 'Discard all local changes and reset to the last commit',
        expectedCommand: 'git reset --hard',
        feedback: {
          success: 'Perfect! You\'ve discarded all local changes. This is useful when you want to abandon changes and start fresh.',
          error: 'Try using "git reset --hard" to discard all local changes.'
        },
        completed: false
      },
      {
        id: 'push',
        instruction: 'Push your local commits to the remote repository',
        expectedCommand: 'git push',
        feedback: {
          success: 'Excellent! You\'ve pushed your local commits to the remote repository. Others can now see and pull your changes.',
          error: 'Try using "git push" to send your commits to the remote repository.'
        },
        completed: false
      }
    ],
    completed: false
  },
  {
    id: 'branching',
    title: 'Branching and Merging',
    description: 'Learn how to create branches, switch between them, and merge changes',
    commands: ['git branch', 'git checkout', 'git merge'],
    steps: [
      {
        id: 'branch-list',
        instruction: 'List all branches in your repository',
        expectedCommand: 'git branch',
        feedback: {
          success: 'Great! You can see all branches in your repository. The current branch is marked with an asterisk (*).',
          error: 'Try using the "git branch" command to list all branches.'
        },
        completed: false
      },
      {
        id: 'branch-create',
        instruction: 'Create a new branch called "feature"',
        expectedCommand: 'git branch feature',
        feedback: {
          success: 'Well done! You\'ve created a new branch called "feature". Branches allow you to work on different features or fixes in isolation.',
          error: 'Try using "git branch feature" to create a new branch.'
        },
        completed: false
      },
      {
        id: 'checkout',
        instruction: 'Switch to the "feature" branch',
        expectedCommand: 'git checkout feature',
        feedback: {
          success: 'Perfect! You\'ve switched to the "feature" branch. Any changes you make now will be on this branch.',
          error: 'Try using "git checkout feature" to switch to the feature branch.'
        },
        completed: false
      },
      {
        id: 'checkout-main',
        instruction: 'Switch back to the main branch',
        expectedCommand: 'git checkout main',
        feedback: {
          success: 'Good job! You\'ve switched back to the main branch.',
          error: 'Try using "git checkout main" to switch back to the main branch.'
        },
        completed: false
      },
      {
        id: 'merge',
        instruction: 'Merge the "feature" branch into the current branch',
        expectedCommand: 'git merge feature',
        feedback: {
          success: 'Excellent! You\'ve merged the "feature" branch into the main branch. This brings all the changes from "feature" into "main".',
          error: 'Try using "git merge feature" to merge the feature branch into the current branch.'
        },
        completed: false
      }
    ],
    completed: false
  },
  {
    id: 'remote',
    title: 'Working with Remotes',
    description: 'Learn how to work with remote repositories like GitHub',
    commands: ['git remote', 'git clone', 'git pull', 'git push'],
    steps: [
      {
        id: 'remote-list',
        instruction: 'List all remote repositories',
        expectedCommand: 'git remote',
        feedback: {
          success: 'Great! This shows all remote repositories connected to your local repository.',
          error: 'Try using the "git remote" command to list all remote repositories.'
        },
        completed: false
      },
      {
        id: 'remote-add',
        instruction: 'Add a new remote called "origin" pointing to a GitHub repository',
        expectedCommand: 'git remote add origin https://github.com/username/repo.git',
        feedback: {
          success: 'Well done! You\'ve added a remote repository called "origin". This is typically where you push your code to share with others.',
          error: 'Try using "git remote add origin" followed by a repository URL.'
        },
        completed: false
      },
      {
        id: 'push',
        instruction: 'Push your changes to the remote repository',
        expectedCommand: 'git push --set-upstream origin main',
        feedback: {
          success: 'Perfect! You\'ve pushed your local commits to the remote repository and set up tracking. Others can now see and pull your changes.',
          error: 'Try using "git push --set-upstream origin main" to push your changes and set up tracking.'
        },
        completed: false
      },
      {
        id: 'pull',
        instruction: 'Pull the latest changes from the remote repository',
        expectedCommand: 'git pull',
        feedback: {
          success: 'Excellent! You\'ve pulled the latest changes from the remote repository. This keeps your local repository up to date.',
          error: 'Try using "git pull" to fetch and merge changes from the remote repository.'
        },
        completed: false
      }
    ],
    completed: false
  },
  {
    id: 'bolt-diy',
    title: 'Using bolt.diy: Clone, Install, and Run',
    description: 'Learn how to clone the bolt.diy project, switch branches, and run the application',
    commands: ['git clone', 'git branch', 'git checkout', 'git pull', 'git reset', 'cd', 'pnpm install', 'pnpm run dev'],
    steps: [
      {
        id: 'clone-bolt',
        instruction: 'Clone the bolt.diy repository from GitHub',
        expectedCommand: 'git clone https://github.com/stackblitz-labs/bolt.diy',
        feedback: {
          success: 'Great! You\'ve cloned the bolt.diy repository. This downloads the entire project to your local machine.',
          error: 'Try using "git clone https://github.com/stackblitz-labs/bolt.diy" to clone the repository.'
        },
        completed: false
      },
      {
        id: 'cd-repo',
        instruction: 'Navigate to the cloned repository directory',
        expectedCommand: 'cd bolt.diy',
        feedback: {
          success: 'Good job! You\'ve navigated to the bolt.diy directory where you can work with the project files.',
          error: 'Try using "cd bolt.diy" to navigate to the repository directory.'
        },
        completed: false
      },
      {
        id: 'list-remote-branches',
        instruction: 'List all remote branches to see what versions are available',
        expectedCommand: 'git branch -r',
        feedback: {
          success: 'Perfect! Now you can see all the remote branches available in the bolt.diy repository. You\'ll typically see "origin/main" and "origin/stable" branches.',
          error: 'Try using "git branch -r" to list all remote branches.'
        },
        completed: false
      },
      {
        id: 'checkout-stable',
        instruction: 'Switch to the "stable" branch for the production version',
        expectedCommand: 'git checkout stable',
        feedback: {
          success: 'Well done! You\'ve switched to the stable branch. This branch contains the stable, production-ready version of bolt.diy.',
          error: 'Try using "git checkout stable" to switch to the stable branch.'
        },
        completed: false
      },
      {
        id: 'view-log',
        instruction: 'View the commit history to see recent changes',
        expectedCommand: 'git log',
        feedback: {
          success: 'Great! You can see the commit history for the stable branch, showing you what changes have been made recently.',
          error: 'Try using "git log" to view the commit history.'
        },
        completed: false
      },
      {
        id: 'check-status',
        instruction: 'Check the status of your working directory',
        expectedCommand: 'git status',
        feedback: {
          success: 'Good job! The status command shows you if your working directory is clean or if there are any changes.',
          error: 'Try using "git status" to check the repository status.'
        },
        completed: false
      },
      {
        id: 'checkout-main',
        instruction: 'Switch to the "main" branch for the latest development version',
        expectedCommand: 'git checkout main',
        feedback: {
          success: 'Perfect! You\'ve switched to the main branch. This branch contains the latest development version with newest features.',
          error: 'Try using "git checkout main" to switch to the main branch.'
        },
        completed: false
      },
      {
        id: 'pull-updates',
        instruction: 'Pull the latest changes from the remote repository',
        expectedCommand: 'git pull',
        feedback: {
          success: 'Excellent! You\'ve pulled the latest changes from the remote repository. This ensures you have the most recent code.',
          error: 'Try using "git pull" to fetch and merge changes from the remote repository.'
        },
        completed: false
      },
      {
        id: 'reset-hard',
        instruction: 'Discard any local changes and reset to the remote version (useful if you made unwanted changes)',
        expectedCommand: 'git reset --hard origin/main',
        feedback: {
          success: 'Perfect! You\'ve reset your local branch to match the remote version exactly. This is useful if you made unwanted changes and want to start fresh.',
          error: 'Try using "git reset --hard origin/main" to reset your local branch to match the remote version.'
        },
        completed: false
      },
      {
        id: 'install-dependencies',
        instruction: 'Install the project dependencies using pnpm',
        expectedCommand: 'pnpm install',
        feedback: {
          success: 'Great! You\'ve installed all the dependencies required for the project. This downloads and sets up all the necessary packages.',
          error: 'Try using "pnpm install" to install the project dependencies.'
        },
        completed: false
      },
      {
        id: 'run-dev',
        instruction: 'Start the development server to run the application',
        expectedCommand: 'pnpm run dev',
        feedback: {
          success: 'Excellent! You\'ve started the development server. The application is now running and you can access it in your browser.',
          error: 'Try using "pnpm run dev" to start the development server.'
        },
        completed: false
      }
    ],
    completed: false
  }
];
