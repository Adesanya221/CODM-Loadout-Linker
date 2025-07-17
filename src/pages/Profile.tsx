import React from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Profile: React.FC = () => {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="codm-card p-8 text-center">
          <h2 className="text-2xl font-bold text-codm-orange mb-4">Authentication Required</h2>
          <p className="text-gray-300 mb-6">Please log in to view your profile.</p>
          <Button className="codm-button">Login</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="codm-card mb-8">
            <div className="p-8 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-6">
                <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.displayName || "User"} />
                <AvatarFallback className="text-2xl bg-codm-orange text-codm-dark">
                  {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-3xl font-bold text-codm-orange mb-2 font-orbitron">
                {currentUser.displayName || "Player"}
              </h1>
              <p className="text-gray-300 mb-4">{currentUser.email}</p>
              <div className="flex justify-center gap-2">
                <Badge className="bg-codm-orange text-codm-dark">CODM Player</Badge>
                <Badge className="border-codm-orange text-codm-orange">Active</Badge>
              </div>
            </div>
          </Card>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="codm-card text-center">
              <div className="p-6">
                <div className="text-3xl font-bold text-codm-orange mb-2">0</div>
                <div className="text-gray-300">Loadouts Created</div>
              </div>
            </Card>
            <Card className="codm-card text-center">
              <div className="p-6">
                <div className="text-3xl font-bold text-codm-orange mb-2">0</div>
                <div className="text-gray-300">Loadouts Shared</div>
              </div>
            </Card>
            <Card className="codm-card text-center">
              <div className="p-6">
                <div className="text-3xl font-bold text-codm-orange mb-2">0</div>
                <div className="text-gray-300">Days Active</div>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="codm-card">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-codm-orange mb-6 font-orbitron">
                RECENT ACTIVITY
              </h2>
              <div className="text-center text-gray-400 py-8">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-lg">No recent activity</p>
                <p className="text-sm">Start building loadouts to see your activity here</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile; 