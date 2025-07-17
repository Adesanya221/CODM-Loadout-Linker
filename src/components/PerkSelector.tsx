
import { Perk } from '@/types/loadout';
import { perks } from '@/data/perks';

interface PerkSelectorProps {
  selectedPerks: { red?: Perk; green?: Perk; blue?: Perk };
  onPerkSelect: (perk: Perk) => void;
}

const PerkSelector = ({ selectedPerks, onPerkSelect }: PerkSelectorProps) => {
  const getPerksByCategory = (category: 'red' | 'green' | 'blue') => {
    return perks.filter(perk => perk.category === category);
  };

  const categories = [
    { id: 'red', name: 'Red Perks', color: 'text-red-400' },
    { id: 'green', name: 'Green Perks', color: 'text-green-400' },
    { id: 'blue', name: 'Blue Perks', color: 'text-blue-400' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-codm-orange mb-4 font-orbitron">SELECT PERKS</h3>
      
      {categories.map(category => (
        <div key={category.id}>
          <h4 className={`text-lg font-semibold mb-3 ${category.color}`}>
            {category.name}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {getPerksByCategory(category.id as 'red' | 'green' | 'blue').map(perk => (
              <div
                key={perk.id}
                onClick={() => onPerkSelect(perk)}
                className={`perk-icon ${
                  selectedPerks[category.id as keyof typeof selectedPerks]?.id === perk.id ? 'selected' : ''
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{perk.icon}</div>
                  <div className="text-xs font-medium text-white">{perk.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerkSelector;
