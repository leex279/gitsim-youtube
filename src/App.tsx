import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import CommandReference from './components/CommandReference';
import TutorialPanel from './components/TutorialPanel';
import RepositoryVisualizer from './components/RepositoryVisualizer';
import ProgressTracker from './components/ProgressTracker';
import YouTubePromotion from './components/YouTubePromotion';
import { Repository, Tutorial } from './types';
import { initialRepository } from './data/initialRepository';
import { tutorials as initialTutorials } from './data/tutorials';
import { GitBranchIcon, BookOpenIcon, CommandIcon, TerminalIcon, GithubIcon } from 'lucide-react';

const App: React.FC = () => {
  const [repository, setRepository] = useState<Repository>(initialRepository);
  const [tutorials, setTutorials] = useState<Tutorial[]>(initialTutorials);
  const [currentTutorial, setCurrentTutorial] = useState<Tutorial | null>(null);
  const [activeTab, setActiveTab] = useState<'terminal' | 'reference' | 'tutorial' | 'repository'>('terminal');

  // Check if a command matches a tutorial step
  const checkTutorialProgress = (command: string) => {
    if (!currentTutorial) return;
    
    const updatedTutorials = [...tutorials];
    const tutorialIndex = updatedTutorials.findIndex(t => t.id === currentTutorial.id);
    
    if (tutorialIndex === -1) return;
    
    const tutorial = updatedTutorials[tutorialIndex];
    let tutorialUpdated = false;
    
    // Check each incomplete step
    tutorial.steps.forEach((step, stepIndex) => {
      if (!step.completed && command.startsWith(step.expectedCommand)) {
        tutorial.steps[stepIndex].completed = true;
        tutorialUpdated = true;
      }
    });
    
    // Check if all steps are completed
    if (tutorialUpdated) {
      const allStepsCompleted = tutorial.steps.every(step => step.completed);
      if (allStepsCompleted) {
        tutorial.completed = true;
      }
      
      setTutorials(updatedTutorials);
      setCurrentTutorial(tutorial);
    }
  };

  const updateTutorialStep = (tutorialId: string, stepId: string, completed: boolean) => {
    const updatedTutorials = [...tutorials];
    const tutorialIndex = updatedTutorials.findIndex(t => t.id === tutorialId);
    
    if (tutorialIndex === -1) return;
    
    const tutorial = updatedTutorials[tutorialIndex];
    const stepIndex = tutorial.steps.findIndex(s => s.id === stepId);
    
    if (stepIndex === -1) return;
    
    tutorial.steps[stepIndex].completed = completed;
    
    // Check if all steps are completed
    const allStepsCompleted = tutorial.steps.every(step => step.completed);
    if (allStepsCompleted) {
      tutorial.completed = true;
    }
    
    setTutorials(updatedTutorials);
    setCurrentTutorial(tutorial);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GithubIcon className="w-8 h-8" />
            <h1 className="text-xl font-bold">GitHub Terminal Simulator</h1>
          </div>
          <div className="text-sm">
            Learn Git commands interactively
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex border-b">
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'terminal' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('terminal')}
                >
                  <div className="flex items-center">
                    <TerminalIcon className="w-4 h-4 mr-2" />
                    Terminal
                  </div>
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'reference' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('reference')}
                >
                  <div className="flex items-center">
                    <CommandIcon className="w-4 h-4 mr-2" />
                    Command Reference
                  </div>
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'repository' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('repository')}
                >
                  <div className="flex items-center">
                    <GitBranchIcon className="w-4 h-4 mr-2" />
                    Repository
                  </div>
                </button>
              </div>
              
              <div className="mt-4 h-96">
                {activeTab === 'terminal' && (
                  <Terminal 
                    repository={repository} 
                    setRepository={setRepository} 
                    onCommandExecuted={checkTutorialProgress}
                  />
                )}
                {activeTab === 'reference' && <CommandReference />}
                {activeTab === 'repository' && <RepositoryVisualizer repository={repository} />}
              </div>
            </div>
            
            {/* YouTube Promotion directly below terminal */}
            <div className="mt-4">
              <YouTubePromotion 
                channelId="DIYSmartCode" 
                videoIds={["rNhptI0V8J4", "f4VrAiu_AGY", "CyIsupMHvew"]} 
              />
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex border-b">
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'tutorial' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('tutorial')}
                >
                  <div className="flex items-center">
                    <BookOpenIcon className="w-4 h-4 mr-2" />
                    Tutorials
                  </div>
                </button>
              </div>
              
              <div className="mt-4 h-96">
                <TutorialPanel 
                  tutorials={tutorials}
                  currentTutorial={currentTutorial}
                  setCurrentTutorial={setCurrentTutorial}
                  updateTutorialStep={updateTutorialStep}
                />
              </div>
            </div>
            
            <ProgressTracker tutorials={tutorials} />
          </div>
        </div>
        
        {/* Tips & Tricks full width */}
        <div className="mt-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Tips & Tricks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="border rounded-lg p-3">
                <h3 className="font-medium text-gray-700 mb-1">Navigation</h3>
                <p className="text-gray-600">Use the up and down arrow keys to navigate through your command history.</p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-medium text-gray-700 mb-1">Tab Completion</h3>
                <p className="text-gray-600">Press Tab to autocomplete commands (basic implementation in this simulator).</p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-medium text-gray-700 mb-1">Clear Terminal</h3>
                <p className="text-gray-600">Type 'clear' to clear the terminal screen and start fresh.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        <div className="container mx-auto">
          GitHub Terminal Simulator - An educational tool for learning Git commands
        </div>
      </footer>
    </div>
  );
};

export default App;
