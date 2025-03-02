import { Repository } from '../types';

export const initialRepository: Repository = {
  name: 'my-project',
  description: 'A sample project for learning Git',
  fileSystem: [
    {
      name: 'README.md',
      type: 'file',
      content: '# My Project\n\nThis is a sample project for learning Git commands.',
      modified: false,
      staged: false
    },
    {
      name: 'index.html',
      type: 'file',
      content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello, Git!</h1>\n</body>\n</html>',
      modified: false,
      staged: false
    },
    {
      name: 'styles.css',
      type: 'file',
      content: 'body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n}\n\nh1 {\n  color: navy;\n}',
      modified: false,
      staged: false
    },
    {
      name: 'src',
      type: 'directory',
      children: [
        {
          name: 'app.js',
          type: 'file',
          content: 'console.log("Hello from the app!");\n\nfunction init() {\n  console.log("App initialized");\n}\n\ninit();',
          modified: false,
          staged: false
        }
      ]
    }
  ],
  branches: [
    {
      name: 'main',
      commitHistory: [
        {
          id: 'a1b2c3d',
          message: 'Initial commit',
          timestamp: Date.now() - 86400000, // 1 day ago
          changes: [
            {
              path: 'README.md',
              type: 'add',
              content: '# My Project\n\nThis is a sample project for learning Git commands.'
            },
            {
              path: 'index.html',
              type: 'add',
              content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello, Git!</h1>\n</body>\n</html>'
            }
          ]
        }
      ],
      head: 'a1b2c3d'
    }
  ],
  currentBranch: 'main',
  remotes: []
};
