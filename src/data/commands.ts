import { Command } from '../types';

export const gitCommands: Command[] = [
  {
    name: 'git init',
    description: 'Initialize a new Git repository',
    syntax: 'git init [directory]',
    examples: ['git init', 'git init my-project']
  },
  {
    name: 'git clone',
    description: 'Clone a repository into a new directory',
    syntax: 'git clone <repository> [directory]',
    examples: [
      'git clone https://github.com/stackblitz-labs/bolt.diy',
      'git clone https://github.com/stackblitz-labs/bolt.diy my-bolt-project'
    ]
  },
  {
    name: 'git status',
    description: 'Show the working tree status',
    syntax: 'git status',
    examples: ['git status']
  },
  {
    name: 'git add',
    description: 'Add file contents to the index',
    syntax: 'git add <pathspec>',
    examples: [
      'git add README.md',
      'git add src/main.tsx',
      'git add .',
      'git add src/'
    ]
  },
  {
    name: 'git commit',
    description: 'Record changes to the repository',
    syntax: 'git commit -m "<message>"',
    examples: [
      'git commit -m "Add new feature"',
      'git commit -m "Fix bug in Terminal component"',
      'git commit -m "Update README with installation instructions"'
    ]
  },
  {
    name: 'git branch',
    description: 'List, create, or delete branches',
    syntax: 'git branch [branch-name] [-d | --delete] [--force]',
    examples: [
      'git branch',
      'git branch feature-terminal',
      'git branch -d old-feature',
      'git branch --delete --force broken-feature'
    ]
  },
  {
    name: 'git checkout',
    description: 'Switch branches or restore working tree files',
    syntax: 'git checkout <branch-name> | git checkout -b <new-branch>',
    examples: [
      'git checkout main',
      'git checkout -b feature-tutorial',
      'git checkout -- README.md'
    ]
  },
  {
    name: 'git merge',
    description: 'Join two or more development histories together',
    syntax: 'git merge <branch-name> [--no-ff]',
    examples: [
      'git merge feature-terminal',
      'git merge --no-ff feature-tutorial',
      'git merge origin/main'
    ]
  },
  {
    name: 'git pull',
    description: 'Fetch from and integrate with another repository or a local branch',
    syntax: 'git pull [remote] [branch]',
    examples: [
      'git pull',
      'git pull origin main',
      'git pull origin feature-branch'
    ]
  },
  {
    name: 'git push',
    description: 'Update remote refs along with associated objects',
    syntax: 'git push [remote] [branch] [-u | --set-upstream]',
    examples: [
      'git push',
      'git push origin main',
      'git push -u origin feature-terminal',
      'git push --set-upstream origin main'
    ]
  },
  {
    name: 'git remote',
    description: 'Manage set of tracked repositories',
    syntax: 'git remote [-v | --verbose] [add <name> <url>] [remove <name>]',
    examples: [
      'git remote',
      'git remote -v',
      'git remote add origin https://github.com/stackblitz-labs/bolt.diy.git',
      'git remote remove upstream'
    ]
  },
  {
    name: 'git log',
    description: 'Show commit logs',
    syntax: 'git log [options]',
    examples: [
      'git log',
      'git log --oneline',
      'git log --graph',
      'git log --author="John Doe"',
      'git log --since="2 weeks ago"'
    ]
  },
  {
    name: 'git diff',
    description: 'Show changes between commits, commit and working tree, etc',
    syntax: 'git diff [options] [<commit>] [--] [<path>...]',
    examples: [
      'git diff',
      'git diff --staged',
      'git diff HEAD~1 HEAD',
      'git diff main feature-branch',
      'git diff HEAD src/components/Terminal.tsx'
    ]
  },
  {
    name: 'git reset',
    description: 'Reset current HEAD to the specified state',
    syntax: 'git reset [--soft | --mixed | --hard] [<commit>]',
    examples: [
      'git reset',
      'git reset --hard',
      'git reset --soft HEAD~1',
      'git reset --hard HEAD~1',
      'git reset --hard origin/main'
    ]
  },
  {
    name: 'git stash',
    description: 'Stash the changes in a dirty working directory away',
    syntax: 'git stash [push [-m <message>]] [pop] [apply] [list]',
    examples: [
      'git stash',
      'git stash push -m "Work in progress on Terminal component"',
      'git stash pop',
      'git stash apply',
      'git stash list'
    ]
  },
  {
    name: 'git fetch',
    description: 'Download objects and refs from another repository',
    syntax: 'git fetch [<remote>] [<branch>]',
    examples: [
      'git fetch',
      'git fetch origin',
      'git fetch origin main',
      'git fetch --all'
    ]
  },
  {
    name: 'git rebase',
    description: 'Reapply commits on top of another base tip',
    syntax: 'git rebase <branch> [--interactive]',
    examples: [
      'git rebase main',
      'git rebase -i HEAD~3',
      'git rebase --interactive main',
      'git rebase --continue'
    ]
  },
  {
    name: 'git tag',
    description: 'Create, list, delete or verify a tag object signed with GPG',
    syntax: 'git tag [-a] <tagname> [<commit>] [-m <message>]',
    examples: [
      'git tag',
      'git tag -a v1.0.0 -m "Version 1.0.0 release"',
      'git tag -a v0.1.0 -m "Alpha release"',
      'git tag -d v0.0.1'
    ]
  },
  {
    name: 'git config',
    description: 'Get and set repository or global options',
    syntax: 'git config [--global] <name> [<value>]',
    examples: [
      'git config --global user.name "Your Name"',
      'git config --global user.email "your.email@example.com"',
      'git config --list',
      'git config core.editor "code --wait"'
    ]
  },
  {
    name: 'git blame',
    description: 'Show what revision and author last modified each line of a file',
    syntax: 'git blame <file>',
    examples: [
      'git blame README.md',
      'git blame -L 10,20 src/components/Terminal.tsx',
      'git blame -w src/App.tsx'
    ]
  },
  {
    name: 'git cherry-pick',
    description: 'Apply the changes introduced by some existing commits',
    syntax: 'git cherry-pick <commit>',
    examples: [
      'git cherry-pick abc123',
      'git cherry-pick --no-commit abc123',
      'git cherry-pick abc123..def456'
    ]
  }
];
