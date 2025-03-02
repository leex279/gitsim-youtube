import React from 'react';
import { Repository, FileSystemItem } from '../types';
import { FolderIcon, FileIcon, GitBranchIcon, GitCommitIcon } from 'lucide-react';

interface RepositoryVisualizerProps {
  repository: Repository;
}

const RepositoryVisualizer: React.FC<RepositoryVisualizerProps> = ({ repository }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Repository: {repository.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{repository.description}</p>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r overflow-y-auto p-4">
          <h3 className="font-medium text-gray-700 mb-2">File Explorer</h3>
          <FileTree items={repository.fileSystem} />
        </div>
        
        <div className="w-1/2 overflow-y-auto p-4">
          <h3 className="font-medium text-gray-700 mb-2">Branch Information</h3>
          
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-700 mb-1">
              <GitBranchIcon className="w-4 h-4 mr-1" />
              <span>Current Branch: </span>
              <span className="font-semibold ml-1">{repository.currentBranch}</span>
            </div>
            
            <div className="text-sm text-gray-700">
              <span>All Branches:</span>
              <div className="ml-5 mt-1">
                {repository.branches.map(branch => (
                  <div 
                    key={branch.name} 
                    className={`mb-1 flex items-center ${branch.name === repository.currentBranch ? 'text-blue-600 font-medium' : ''}`}
                  >
                    <GitBranchIcon className="w-4 h-4 mr-1" />
                    {branch.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <h3 className="font-medium text-gray-700 mb-2">Commit History</h3>
          <div className="space-y-2">
            {repository.branches
              .find(branch => branch.name === repository.currentBranch)
              ?.commitHistory.map(commit => (
                <div key={commit.id} className="border rounded p-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <GitCommitIcon className="w-4 h-4 mr-1" />
                    <span className="font-mono">{commit.id}</span>
                  </div>
                  <div className="mt-1 text-gray-600">{commit.message}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {new Date(commit.timestamp).toLocaleString()}
                  </div>
                </div>
              )).reverse()}
          </div>
        </div>
      </div>
    </div>
  );
};

interface FileTreeProps {
  items: FileSystemItem[];
  depth?: number;
}

const FileTree: React.FC<FileTreeProps> = ({ items, depth = 0 }) => {
  return (
    <ul className="space-y-1">
      {items.map(item => (
        <li key={item.name} className="text-sm">
          <div 
            className={`flex items-center py-1 ${
              item.modified ? 'text-yellow-600' : item.staged ? 'text-green-600' : 'text-gray-700'
            }`}
            style={{ paddingLeft: `${depth * 16}px` }}
          >
            {item.type === 'directory' ? (
              <FolderIcon className="w-4 h-4 mr-1" />
            ) : (
              <FileIcon className="w-4 h-4 mr-1" />
            )}
            <span>{item.name}</span>
            {item.modified && <span className="ml-2 text-xs text-yellow-600">(modified)</span>}
            {item.staged && <span className="ml-2 text-xs text-green-600">(staged)</span>}
          </div>
          
          {item.type === 'directory' && item.children && (
            <FileTree items={item.children} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default RepositoryVisualizer;
