import React, { useState } from 'react';
import { Command } from '../types';
import { gitCommands } from '../data/commands';

const CommandReference: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Define categories for commands
  const categories = {
    all: 'All Commands',
    basic: 'Basic Commands',
    branch: 'Branching & Merging',
    remote: 'Remote Operations',
    inspect: 'Inspection & Comparison',
    undo: 'Undoing Changes',
    advanced: 'Advanced Operations'
  };

  // Categorize commands
  const categorizedCommands = {
    basic: ['git init', 'git add', 'git commit', 'git status'],
    branch: ['git branch', 'git checkout', 'git merge', 'git tag'],
    remote: ['git clone', 'git pull', 'git push', 'git fetch', 'git remote'],
    inspect: ['git log', 'git diff', 'git blame'],
    undo: ['git reset', 'git revert', 'git stash', 'git restore'],
    advanced: ['git rebase', 'git cherry-pick', 'git config']
  };

  // Filter commands by search term and category
  const filteredCommands = gitCommands.filter(command => {
    const matchesSearch = command.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || 
      (categorizedCommands[categoryFilter as keyof typeof categorizedCommands]?.includes(command.name));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Git Command Reference</h2>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Search commands..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              className={`px-3 py-1 text-sm rounded-full ${
                categoryFilter === key 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setCategoryFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 border-r overflow-y-auto">
          <ul className="divide-y">
            {filteredCommands.map((command) => (
              <li 
                key={command.name}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${selectedCommand?.name === command.name ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedCommand(command)}
              >
                <div className="font-medium text-gray-800">{command.name}</div>
                <div className="text-sm text-gray-500 truncate">{command.description}</div>
              </li>
            ))}
            {filteredCommands.length === 0 && (
              <li className="px-4 py-6 text-center text-gray-500">
                No commands match your search
              </li>
            )}
          </ul>
        </div>
        
        <div className="w-2/3 p-4 overflow-y-auto">
          {selectedCommand ? (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedCommand.name}</h3>
              <p className="text-gray-700 mb-4">{selectedCommand.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-1">Syntax:</h4>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm">
                  {selectedCommand.syntax}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Examples:</h4>
                <ul className="bg-gray-100 p-2 rounded font-mono text-sm">
                  {selectedCommand.examples.map((example, index) => (
                    <li key={index} className="mb-1 pb-1 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
                      <code>{example}</code>
                    </li>
                  ))}
                </ul>
              </div>
              
              {selectedCommand.name === 'git clone' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
                  <p className="font-semibold text-blue-700">Pro Tip:</p>
                  <p className="text-blue-600">
                    When cloning the bolt.diy repository, you get a complete copy of the project including all branches and commit history.
                  </p>
                </div>
              )}
              
              {selectedCommand.name === 'git push' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
                  <p className="font-semibold text-blue-700">Pro Tip:</p>
                  <p className="text-blue-600">
                    Use <code>--set-upstream</code> (or <code>-u</code>) the first time you push a branch to establish tracking.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a command to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandReference;
