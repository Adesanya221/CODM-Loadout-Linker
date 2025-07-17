import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="codm-card p-8 text-center max-w-md mx-4">
        <div className="text-6xl mb-6">🎯</div>
        <h1 className="text-4xl font-bold text-codm-orange mb-4 font-orbitron">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-300 mb-6">
          The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="codm-button">
        Go Home
            </Button>
          </Link>
          <Link to="/loadouts">
            <Button className="border border-codm-orange text-codm-orange hover:bg-codm-orange hover:text-codm-dark bg-transparent">
              Build Loadout
            </Button>
      </Link>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
