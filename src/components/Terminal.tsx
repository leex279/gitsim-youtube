import React, { useState, useRef, useEffect } from 'react';
import { TerminalHistory } from '../types';
import { parseGitCommand } from '../utils/gitCommandParser';
import { Repository } from '../types';
import { gitCommands } from '../data/commands';

interface TerminalProps {
  repository: Repository;
  setRepository: React.Dispatch<React.SetStateAction<Repository>>;
  onCommandExecuted: (command: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ repository, setRepository, onCommandExecuted }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Generate suggestions based on input
    if (input.trim()) {
      const gitCommandNames = gitCommands.map(cmd => cmd.name);
      const commonCommands = [
        'git status',
        'git add .',
        'git commit -m "',
        'git push',
        'git pull',
        'git checkout',
        'git branch',
        'git clone https://github.com/stackblitz-labs/bolt.diy',
        'git init',
        'git log',
        'git remote -v'
      ];
      
      const allCommands = [...gitCommandNames, ...commonCommands];
      
      const filtered = allCommands.filter(cmd => 
        cmd.toLowerCase().startsWith(input.toLowerCase())
      );
      
      setSuggestions(filtered);
      setSelectedSuggestion(-1);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      executeCommand(input);
      setShowSuggestions(false);
    } else if (e.key === 'ArrowUp') {
      if (showSuggestions && suggestions.length > 0) {
        e.preventDefault();
        setSelectedSuggestion(prev => (prev <= 0 ? suggestions.length - 1 : prev - 1));
      } else {
        e.preventDefault();
        navigateHistory(-1);
      }
    } else if (e.key === 'ArrowDown') {
      if (showSuggestions && suggestions.length > 0) {
        e.preventDefault();
        setSelectedSuggestion(prev => (prev >= suggestions.length - 1 ? 0 : prev + 1));
      } else {
        e.preventDefault();
        navigateHistory(1);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (showSuggestions && selectedSuggestion >= 0) {
        setInput(suggestions[selectedSuggestion]);
      } else if (suggestions.length > 0) {
        setInput(suggestions[0]);
      } else {
        handleTabCompletion();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const navigateHistory = (direction: number) => {
    if (commandHistory.length === 0) return;
    
    const newIndex = historyIndex + direction;
    
    if (newIndex >= commandHistory.length) {
      setHistoryIndex(-1);
      setInput('');
    } else if (newIndex >= 0) {
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }
  };

  const handleTabCompletion = () => {
    // Enhanced tab completion for git commands
    if (input === 'git ') {
      setInput('git status');
    } else if (input.startsWith('git c')) {
      setInput('git commit -m "');
    } else if (input.startsWith('git a')) {
      setInput('git add ');
    } else if (input.startsWith('git p')) {
      setInput('git push');
    } else if (input.startsWith('git b')) {
      setInput('git branch');
    } else if (input.startsWith('git ch')) {
      setInput('git checkout ');
    } else if (input.startsWith('git cl')) {
      setInput('git clone https://github.com/stackblitz-labs/bolt.diy');
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    
    // Add command to history
    setHistory(prev => [...prev, { command: trimmedCmd, output: '', isError: false }]);
    
    // Add to command history for up/down navigation
    setCommandHistory(prev => [trimmedCmd, ...prev]);
    setHistoryIndex(-1);
    
    // Process the command
    const result = parseGitCommand(trimmedCmd, repository, setRepository, setHistory);
    
    // Add output to history
    if (result.output) {
      setHistory(prev => [
        ...prev.slice(0, -1),
        { ...prev[prev.length - 1], output: result.output, isError: result.isError }
      ]);
    }
    
    // Notify parent component
    onCommandExecuted(trimmedCmd);
    
    // Clear input
    setInput('');
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="bg-black text-green-400 p-4 rounded-md font-mono text-sm h-full overflow-hidden flex flex-col"
      onClick={focusInput}
    >
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      >
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex">
              <span className="text-blue-400 mr-2">user@github-simulator:~$</span>
              <span>{item.command}</span>
            </div>
            {item.output && (
              <pre className={`mt-1 whitespace-pre-wrap ${item.isError ? 'text-red-400' : ''}`}>
                {item.output}
              </pre>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center border-t border-gray-700 pt-2 relative">
        <span className="text-blue-400 mr-2">user@github-simulator:~$</span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            className="w-full bg-transparent outline-none"
            autoFocus
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div 
              ref={suggestionsRef}
              className="absolute left-0 right-0 bottom-full mb-1 bg-gray-800 border border-gray-700 rounded-md max-h-48 overflow-y-auto z-10"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`px-2 py-1 cursor-pointer hover:bg-gray-700 ${
                    index === selectedSuggestion ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => selectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-700">
        Press Tab for autocomplete, Up/Down for command history
      </div>
    </div>
  );
};

export default Terminal;
