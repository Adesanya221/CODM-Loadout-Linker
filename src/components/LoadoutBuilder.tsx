
import { useState } from 'react';
import { Loadout, Weapon, Perk, Scorestreak } from '@/types/loadout';
import WeaponSelector from './WeaponSelector';
import PerkSelector from './PerkSelector';
import ScorestreakSelector from './ScorestreakSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { GiPistolGun, GiHelicopter } from "react-icons/gi";
import { MdBolt } from "react-icons/md";

interface LoadoutBuilderProps {
  onLoadoutCreate: (loadout: Loadout) => void;
}

const LoadoutBuilder = ({ onLoadoutCreate }: LoadoutBuilderProps) => {
  const [title, setTitle] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [selectedPerks, setSelectedPerks] = useState<{ red?: Perk; green?: Perk; blue?: Perk }>({});
  const [selectedScorestreaks, setSelectedScorestreaks] = useState<Scorestreak[]>([]);
  const [activeTab, setActiveTab] = useState<'weapon' | 'perks' | 'scorestreaks'>('weapon');
  
  const { toast } = useToast();

  const handlePerkSelect = (perk: Perk) => {
    setSelectedPerks(prev => ({
      ...prev,
      [perk.category]: perk
    }));
  };

  const handleScorestreakToggle = (scorestreak: Scorestreak) => {
    setSelectedScorestreaks(prev => {
      const isSelected = prev.some(s => s.id === scorestreak.id);
      if (isSelected) {
        return prev.filter(s => s.id !== scorestreak.id);
      } else if (prev.length < 3) {
        return [...prev, scorestreak];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Missing Title",
        description: "Please enter a title for your loadout",
        variant: "destructive"
      });
      return;
    }

    if (!selectedWeapon) {
      toast({
        title: "Missing Weapon",
        description: "Please select a weapon",
        variant: "destructive"
      });
      return;
    }

    if (!selectedPerks.red || !selectedPerks.green || !selectedPerks.blue) {
      toast({
        title: "Missing Perks",
        description: "Please select one perk from each category",
        variant: "destructive"
      });
      return;
    }

    if (selectedScorestreaks.length === 0) {
      toast({
        title: "Missing Scorestreaks",
        description: "Please select at least one scorestreak",
        variant: "destructive"
      });
      return;
    }

    const loadout: Loadout = {
      title: title.trim(),
      weapon: selectedWeapon,
      perks: {
        red: selectedPerks.red,
        green: selectedPerks.green,
        blue: selectedPerks.blue
      },
      scorestreaks: selectedScorestreaks
    };

    onLoadoutCreate(loadout);
  };

  const tabs = [
    { id: 'weapon', name: 'Weapon', icon: <GiPistolGun className="text-codm-orange text-lg inline" /> },
    { id: 'perks', name: 'Perks', icon: <MdBolt className="text-codm-orange text-lg inline" /> },
    { id: 'scorestreaks', name: 'Scorestreaks', icon: <GiHelicopter className="text-codm-orange text-lg inline" /> }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-codm-orange mb-4 font-orbitron">
          LOADOUT BUILDER
        </h1>
        <p className="text-sm sm:text-base text-gray-400">Create your ultimate Call of Duty: Mobile loadout</p>
      </div>

      {/* Title Input */}
      <Card className="codm-card mb-4 sm:mb-6">
        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-codm-orange mb-4">LOADOUT NAME</h2>
          <Input
            placeholder="Enter loadout name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="codm-input text-base sm:text-lg"
            maxLength={50}
          />
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
              activeTab === tab.id
                ? 'bg-codm-orange text-codm-dark'
                : 'bg-codm-gray text-white hover:bg-codm-gray-light'
            }`}
          >
            <span className="mr-1 sm:mr-2">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.name}</span>
            <span className="sm:hidden">{tab.name.charAt(0)}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <Card className="codm-card mb-4 sm:mb-6">
        <div className="p-4 sm:p-6">
          {activeTab === 'weapon' && (
            <WeaponSelector
              selectedWeapon={selectedWeapon}
              onWeaponSelect={setSelectedWeapon}
            />
          )}
          
          {activeTab === 'perks' && (
            <PerkSelector
              selectedPerks={selectedPerks}
              onPerkSelect={handlePerkSelect}
            />
          )}
          
          {activeTab === 'scorestreaks' && (
            <ScorestreakSelector
              selectedScorestreaks={selectedScorestreaks}
              onScorestreakToggle={handleScorestreakToggle}
            />
          )}
        </div>
      </Card>

      {/* Summary & Create Button */}
      <Card className="codm-card">
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-codm-orange mb-4">LOADOUT SUMMARY</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <h4 className="font-semibold text-white mb-2 text-sm sm:text-base flex items-center gap-2"><GiPistolGun className="text-codm-orange" /> Weapon</h4>
              <p className="text-gray-300 text-sm sm:text-base">
                {selectedWeapon ? `${selectedWeapon.name} (${selectedWeapon.attachments.length} attachments)` : 'Not selected'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 text-sm sm:text-base flex items-center gap-2"><MdBolt className="text-codm-orange" /> Perks</h4>
              <p className="text-gray-300 text-sm sm:text-base">
                {Object.values(selectedPerks).length}/3 selected
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 text-sm sm:text-base flex items-center gap-2"><GiHelicopter className="text-codm-orange" /> Scorestreaks</h4>
              <p className="text-gray-300 text-sm sm:text-base">
                {selectedScorestreaks.length}/3 selected
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleSubmit}
            className="codm-button w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
            disabled={!selectedWeapon || Object.values(selectedPerks).length < 3 || selectedScorestreaks.length === 0 || !title.trim()}
          >
            CREATE LOADOUT
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoadoutBuilder;
