import React from 'react';
import { Tutorial, TutorialStep } from '../types';
import { CheckCircle, Circle } from 'lucide-react';

interface TutorialPanelProps {
  tutorials: Tutorial[];
  currentTutorial: Tutorial | null;
  setCurrentTutorial: React.Dispatch<React.SetStateAction<Tutorial | null>>;
  updateTutorialStep: (tutorialId: string, stepId: string, completed: boolean) => void;
}

const TutorialPanel: React.FC<TutorialPanelProps> = ({
  tutorials,
  currentTutorial,
  setCurrentTutorial,
  updateTutorialStep
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      {!currentTutorial ? (
        // Tutorial selection view
        <>
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Git & GitHub Tutorials</h2>
            <p className="text-sm text-gray-600 mt-1">
              Select a tutorial to get started with Git commands
            </p>
          </div>
          
          <div className="p-4 overflow-y-auto flex-1">
            <div className="grid gap-4">
              {tutorials.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                  onClick={() => setCurrentTutorial(tutorial)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">{tutorial.title}</h3>
                    {tutorial.completed ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {tutorial.steps.filter(step => step.completed).length} / {tutorial.steps.length}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{tutorial.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tutorial.commands.map((command) => (
                      <span key={command} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {command}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        // Tutorial steps view
        <>
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <div>
              <button
                className="text-blue-600 hover:text-blue-800 text-sm mb-1"
                onClick={() => setCurrentTutorial(null)}
              >
                ← Back to tutorials
              </button>
              <h2 className="text-lg font-semibold text-gray-800">{currentTutorial.title}</h2>
            </div>
            <div className="text-sm text-gray-600">
              {currentTutorial.steps.filter(step => step.completed).length} / {currentTutorial.steps.length} steps
            </div>
          </div>
          
          <div className="p-4 overflow-y-auto flex-1">
            <p className="text-gray-700 mb-4">{currentTutorial.description}</p>
            
            <div className="space-y-4">
              {currentTutorial.steps.map((step, index) => (
                <TutorialStepItem
                  key={step.id}
                  step={step}
                  index={index}
                  tutorialId={currentTutorial.id}
                  updateTutorialStep={updateTutorialStep}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

interface TutorialStepItemProps {
  step: TutorialStep;
  index: number;
  tutorialId: string;
  updateTutorialStep: (tutorialId: string, stepId: string, completed: boolean) => void;
}

const TutorialStepItem: React.FC<TutorialStepItemProps> = ({
  step,
  index,
  tutorialId,
  updateTutorialStep
}) => {
  return (
    <div className={`border rounded-lg p-4 ${step.completed ? 'bg-green-50 border-green-200' : ''}`}>
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          {step.completed ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">Step {index + 1}</h3>
          <p className="text-gray-700 mt-1">{step.instruction}</p>
          
          <div className="mt-2 bg-gray-100 p-2 rounded font-mono text-sm">
            <code>{step.expectedCommand}</code>
          </div>
          
          {step.completed && (
            <div className="mt-2 text-green-700 text-sm">
              {step.feedback.success}
            </div>
          )}
          
          {!step.completed && (
            <button
              className="mt-3 text-xs text-blue-600 hover:text-blue-800"
              onClick={() => updateTutorialStep(tutorialId, step.id, true)}
            >
              Mark as completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialPanel;
