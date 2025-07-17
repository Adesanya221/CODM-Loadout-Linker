
import { useState } from 'react';
import { Scorestreak } from '@/types/loadout';
import { scorestreaks } from '@/data/scorestreaks';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ScorestreakSelectorProps {
  selectedScorestreaks: Scorestreak[];
  onScorestreakToggle: (scorestreak: Scorestreak) => void;
}

const ScorestreakSelector = ({ selectedScorestreaks, onScorestreakToggle }: ScorestreakSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-codm-orange mb-4 font-orbitron">
        SELECT SCORESTREAKS ({selectedScorestreaks.length}/3)
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scorestreaks.map(scorestreak => {
          const isSelected = selectedScorestreaks.some(s => s.id === scorestreak.id);
          const canSelect = selectedScorestreaks.length < 3 || isSelected;
          
          return (
            <Card
              key={scorestreak.id}
              className={`cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'border-codm-orange bg-codm-orange/10' 
                  : canSelect 
                    ? 'border-codm-orange/20 hover:border-codm-orange/50 hover:bg-codm-gray-light' 
                    : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={() => canSelect && onScorestreakToggle(scorestreak)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{scorestreak.name}</h4>
                  <Badge variant="outline" className="bg-codm-orange/20 text-codm-orange border-codm-orange/30">
                    {scorestreak.cost}
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ScorestreakSelector;
