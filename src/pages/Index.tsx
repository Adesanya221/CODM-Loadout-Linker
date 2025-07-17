import { useState } from 'react';
import LoadoutBuilder from '@/components/LoadoutBuilder';
import SignInButton from '@/components/SignInButton';
import { Loadout } from '@/types/loadout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Linkedin, Github, Twitter } from 'lucide-react';
import Layout from "@/components/layout/Layout";

const Index = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [loadoutId, setLoadoutId] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const generateLoadoutId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleLoadoutCreate = async (loadout: Loadout) => {
    setIsCreating(true);
    
    try {
      // Simulate API call - in real app, this would save to backend
      const loadoutId = generateLoadoutId();
      const loadoutWithId = {
        ...loadout,
        id: loadoutId,
        createdAt: new Date().toISOString()
      };

      // Store in localStorage for demo purposes
      localStorage.setItem(`loadout_${loadoutId}`, JSON.stringify(loadoutWithId));
      
      toast({
        title: "Loadout Created!",
        description: `Your loadout "${loadout.title}" is ready to share`,
      });

      // Navigate to the loadout viewer
      setTimeout(() => {
        navigate(`/loadout/${loadoutId}`);
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create loadout. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleCheckOutLoadout = () => {
    if (!loadoutId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a loadout ID",
        variant: "destructive"
      });
      return;
    }

    // Check if loadout exists in localStorage
    const storedLoadout = localStorage.getItem(`loadout_${loadoutId.toUpperCase()}`);
    if (!storedLoadout) {
      toast({
        title: "Loadout Not Found",
        description: "The loadout ID you entered doesn't exist",
        variant: "destructive"
      });
      return;
    }

    navigate(`/loadout/${loadoutId.toUpperCase()}`);
  };

  if (isCreating) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 sm:w-16 sm:h-16 border-4 border-codm-orange border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-lg sm:text-xl font-semibold text-codm-orange">Creating your loadout...</h2>
          <p className="text-sm sm:text-base text-gray-400">Preparing your shareable link</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <div className="hidden sm:block flex-1"></div>
              <div className="flex-1 text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">
                  CoDM LOADOUT LINKER
                </h1>
              <p className="text-sm sm:text-base text-muted-foreground">Create and share your Call of Duty: Mobile loadouts</p>
              </div>
              <div className="flex-1 flex justify-center sm:justify-end">
                <SignInButton />
              </div>
            </div>
          </div>

          {/* Check Out Loadout Section */}
          <Card className="codm-card mb-6 sm:mb-8">
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-codm-orange mb-4 font-orbitron text-center">
                CHECK OUT LOADOUT
              </h2>
              <p className="text-sm sm:text-base text-gray-400 text-center mb-4">
                Have a loadout ID? Enter it below to view the shared loadout
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  placeholder="Enter loadout ID (e.g., ABC123)"
                  value={loadoutId}
                  onChange={(e) => setLoadoutId(e.target.value)}
                  className="codm-input flex-1 text-sm sm:text-base"
                  onKeyPress={(e) => e.key === 'Enter' && handleCheckOutLoadout()}
                />
                <Button onClick={handleCheckOutLoadout} className="codm-button whitespace-nowrap">
                  <Search className="mr-2 h-4 w-4" />
                  View
                </Button>
              </div>
            </div>
          </Card>

          {/* Loadout Builder */}
          <LoadoutBuilder onLoadoutCreate={handleLoadoutCreate} />
        </div>
    </Layout>
  );
};

export default Index;
