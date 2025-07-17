import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LoadoutRecord } from '@/lib/supabase';
import { LoadoutService } from '@/services/loadoutService';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Copy, ArrowLeft, Share2 } from 'lucide-react';
import { GiPistolGun, GiHelicopter } from "react-icons/gi";
import { MdBolt } from "react-icons/md";
import { useAuthContext } from '@/contexts/AuthContext';

const LoadoutViewer = () => {
  const { id } = useParams<{ id: string }>();
  const [loadout, setLoadout] = useState<LoadoutRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuthContext();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/');
    }
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    const fetchLoadout = async () => {
      if (!id) return;
      
      try {
        const loadoutData = await LoadoutService.getLoadout(id);
        setLoadout(loadoutData);
      } catch (error) {
        console.error('Error fetching loadout:', error);
        toast({
          title: "Error",
          description: "Failed to load loadout. Please check the URL and try again.",
          variant: "destructive"
        });
      } finally {
      setLoading(false);
    }
    };

    fetchLoadout();
  }, [id, toast]);

  const copyShareLink = async () => {
    if (!id) return;
    
    try {
      await LoadoutService.copyShareableUrl(id);
    toast({
      title: "Link Copied!",
      description: "Loadout link copied to clipboard",
    });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link to clipboard",
        variant: "destructive"
      });
    }
  };

  const shareLoadout = async () => {
    if (!loadout || !id) return;
    
    const url = LoadoutService.generateShareableUrl(id);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${loadout.data.title} - CoDM Loadout`,
          text: `Check out my Call of Duty: Mobile loadout: ${loadout.data.title}`,
          url: url,
        });
      } catch (error) {
        copyShareLink();
      }
    } else {
      copyShareLink();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-codm-orange border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!loadout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-codm-orange mb-4">Loadout Not Found</h1>
          <p className="text-gray-400 mb-6">The loadout you're looking for doesn't exist or has been removed.</p>
          <Link to="/loadouts">
            <Button className="codm-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Create New Loadout
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto p-6">
        {/* Shareable Link Section */}
        <Card className="codm-card mb-8">
          <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-codm-orange mb-2 font-orbitron">Share this loadout</h2>
              <div className="bg-codm-gray rounded px-3 py-2 text-white text-sm truncate select-all">
                {window.location.href}
              </div>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button onClick={copyShareLink} className="codm-button">
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
              <Button onClick={shareLoadout} className="border border-codm-orange text-codm-orange hover:bg-codm-orange hover:text-codm-dark bg-transparent">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </Card>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-codm-orange mb-2 font-orbitron">
              {loadout.data.title}
            </h1>
            <p className="text-gray-400">
              Created on {new Date(loadout.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Weapon Section */}
        <Card className="codm-card mb-6">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-codm-orange mb-4 font-orbitron flex items-center gap-2">
              <GiPistolGun className="text-codm-orange text-3xl" />
              PRIMARY WEAPON
            </h2>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{loadout.data.weapon.name}</h3>
                <Badge className="bg-codm-orange/20 text-codm-orange mb-4">
                  {loadout.data.weapon.category.toUpperCase()}
                </Badge>
                
                {loadout.data.weapon.attachments.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-white mb-3">
                      Attachments ({loadout.data.weapon.attachments.length}/5)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {loadout.data.weapon.attachments.map((attachment, index) => (
                        <div key={index} className="bg-codm-gray p-3 rounded-lg">
                          <span className="text-white text-sm">{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Perks Section */}
        <Card className="codm-card mb-6">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-codm-orange mb-4 font-orbitron flex items-center gap-2">
              <MdBolt className="text-codm-orange text-3xl" />
              PERKS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { perk: loadout.data.perks.red, color: 'border-red-400', bgColor: 'bg-red-400/10' },
                { perk: loadout.data.perks.green, color: 'border-green-400', bgColor: 'bg-green-400/10' },
                { perk: loadout.data.perks.blue, color: 'border-blue-400', bgColor: 'bg-blue-400/10' }
              ].map(({ perk, color, bgColor }, index) => (
                <div key={index} className={`border-2 ${color} ${bgColor} rounded-lg p-4 text-center`}>
                  <div className="text-3xl mb-2 flex justify-center items-center">
                    {perk?.icon || '❓'}
                  </div>
                  <h4 className="font-semibold text-white">{perk?.name || 'Not selected'}</h4>
                  {perk && (
                    <Badge className={`mt-2 ${bgColor} text-white`}>
                    {perk.category.toUpperCase()}
                  </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Scorestreaks Section */}
        <Card className="codm-card mb-6">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-codm-orange mb-4 font-orbitron flex items-center gap-2">
              <GiHelicopter className="text-codm-orange text-3xl" />
              SCORESTREAKS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loadout.data.scorestreaks.map((scorestreak, index) => (
                <div key={index} className="bg-codm-gray rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-white">{scorestreak.name}</h4>
                    <Badge className="bg-codm-orange/20 text-codm-orange border border-codm-orange/30">
                      {scorestreak.cost}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="text-center">
          <Link to="/loadouts">
            <Button className="codm-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Create New Loadout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoadoutViewer;
