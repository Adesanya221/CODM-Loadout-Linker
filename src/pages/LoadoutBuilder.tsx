import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loadout } from '@/types/loadout';
import { LoadoutData } from '@/lib/supabase';
import { LoadoutService } from '@/services/loadoutService';
import LoadoutBuilderComponent from '@/components/LoadoutBuilder';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Particles from '../Backgrounds/Particles';
import '../Backgrounds/Particles.css';
import { GiPistolGun, GiHelicopter } from "react-icons/gi";
import { MdBolt } from "react-icons/md";
import { useAuthContext } from '@/contexts/AuthContext';
import { Weapon } from '@/types/loadout';

// Helper to map Supabase LoadoutRecord to local Loadout type
function mapRecordToLoadout(record: any): Loadout {
  return {
    id: record.id,
    title: record.data.title,
    weapon: {
      ...record.data.weapon,
      category: record.data.weapon.category as Weapon['category'],
    },
    perks: {
      red: record.data.perks.red && {
        ...record.data.perks.red,
        category: 'red',
      },
      green: record.data.perks.green && {
        ...record.data.perks.green,
        category: 'green',
      },
      blue: record.data.perks.blue && {
        ...record.data.perks.blue,
        category: 'blue',
      },
    },
    scorestreaks: (record.data.scorestreaks || []).map((s: any) => ({
      id: s.id,
      name: s.name,
      cost: s.cost,
      icon: s.icon ?? "",
    })),
    createdAt: record.created_at,
  };
}

const LoadoutBuilder: React.FC = () => {
  const [createdLoadouts, setCreatedLoadouts] = useState<Loadout[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/');
    }
  }, [currentUser, loading, navigate]);

  // Fetch user's loadouts on mount or after creation
  const fetchUserLoadouts = async () => {
    if (!currentUser) return;
    try {
      const userLoadoutRecords = await LoadoutService.getUserLoadouts();
      const userLoadouts = userLoadoutRecords.map(mapRecordToLoadout);
      setCreatedLoadouts(userLoadouts);
    } catch (error) {
      console.error('Error fetching user loadouts:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserLoadouts();
    }
  }, [currentUser]);

  const handleLoadoutCreate = async (loadout: Loadout) => {
    setIsCreating(true);
    
    try {
      // Convert Loadout to LoadoutData format
      const loadoutData: LoadoutData = {
        title: loadout.title,
        weapon: {
          id: loadout.weapon.id,
          name: loadout.weapon.name,
          category: loadout.weapon.category,
          attachments: loadout.weapon.attachments
        },
        perks: {
          red: loadout.perks.red ? {
            id: loadout.perks.red.id,
            name: loadout.perks.red.name,
            category: loadout.perks.red.category,
            icon: loadout.perks.red.icon
          } : undefined,
          green: loadout.perks.green ? {
            id: loadout.perks.green.id,
            name: loadout.perks.green.name,
            category: loadout.perks.green.category,
            icon: loadout.perks.green.icon
          } : undefined,
          blue: loadout.perks.blue ? {
            id: loadout.perks.blue.id,
            name: loadout.perks.blue.name,
            category: loadout.perks.blue.category,
            icon: loadout.perks.blue.icon
          } : undefined
        },
        scorestreaks: loadout.scorestreaks.map(ss => ({
          id: ss.id,
          name: ss.name,
          cost: ss.cost,
          icon: (ss as any).icon ?? "",
        }))
      };

      // Save to Supabase
      const loadoutId = await LoadoutService.createLoadout(loadoutData);
      
      // Fetch latest loadouts after creation
      await fetchUserLoadouts();
      
      // Show success message with shareable link
      const shareableUrl = LoadoutService.generateShareableUrl(loadoutId);
      
      toast({
        title: "Loadout Created!",
        description: `Your loadout "${loadout.title}" has been created and saved.`,
      });

      // Navigate to the loadout viewer
      navigate(`/loadout/${loadoutId}`);
      
    } catch (error) {
      console.error('Error creating loadout:', error);
      toast({
        title: "Error Creating Loadout",
        description: "Failed to create loadout. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <LoadoutBuilderComponent onLoadoutCreate={handleLoadoutCreate} />

        {/* Loading State */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="codm-card p-6 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-codm-orange border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-white">Creating your loadout...</p>
            </Card>
          </div>
        )}

        {/* Created Loadouts Section */}
        {createdLoadouts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-codm-orange mb-6 font-orbitron">
              RECENT LOADOUTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdLoadouts.map((loadout, index) => (
                <Card key={index} className="codm-card">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-codm-orange mb-3 flex items-center gap-2">
                      <GiPistolGun className="text-codm-orange text-xl" />
                      {loadout.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p className="flex items-center gap-2"><GiPistolGun className="text-codm-orange" /><strong>Weapon:</strong> {loadout.weapon.name}</p>
                      <p className="flex items-center gap-2"><MdBolt className="text-codm-orange" /><strong>Perks:</strong> {Object.values(loadout.perks).map(p => p?.name).filter(Boolean).join(', ')}</p>
                      <p className="flex items-center gap-2"><GiHelicopter className="text-codm-orange" /><strong>Scorestreaks:</strong> {loadout.scorestreaks.map(s => s.name).join(', ')}</p>
                    </div>
                    <Button className="codm-button mt-4 w-full">
                      VIEW DETAILS
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadoutBuilder; 