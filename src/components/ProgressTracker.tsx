import React from 'react';
import { Tutorial } from '../types';
import { CheckCircle, Circle } from 'lucide-react';

interface ProgressTrackerProps {
  tutorials: Tutorial[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ tutorials }) => {
  const totalSteps = tutorials.reduce((acc, tutorial) => acc + tutorial.steps.length, 0);
  const completedSteps = tutorials.reduce(
    (acc, tutorial) => acc + tutorial.steps.filter(step => step.completed).length,
    0
  );
  
  const completionPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Progress</h2>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{completedSteps} of {totalSteps} steps completed</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-2">
        {tutorials.map(tutorial => {
          const tutorialCompletedSteps = tutorial.steps.filter(step => step.completed).length;
          const tutorialTotalSteps = tutorial.steps.length;
          const tutorialPercentage = Math.round((tutorialCompletedSteps / tutorialTotalSteps) * 100);
          
          return (
            <div key={tutorial.id} className="flex items-center">
              {tutorial.completed ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 mr-2" />
              )}
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{tutorial.title}</span>
                  <span className="text-gray-500">{tutorialPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className={`h-1.5 rounded-full ${tutorial.completed ? 'bg-green-600' : 'bg-blue-600'}`}
                    style={{ width: `${tutorialPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
