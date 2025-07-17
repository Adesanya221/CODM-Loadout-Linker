import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export function UserProfile() {
  const { currentUser, logout, updateUserProfile } = useAuthContext();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!currentUser) {
    return null;
  }

  async function handleUpdateProfile() {
    if (!displayName.trim()) {
      toast.error("Display name cannot be empty");
      return;
    }

    try {
      setIsLoading(true);
      await updateUserProfile(displayName);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.displayName || "User"} />
            <AvatarFallback>
              {currentUser.displayName ? getInitials(currentUser.displayName) : "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={currentUser.email || ""} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name</Label>
          {isEditing ? (
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={isLoading}
            />
          ) : (
            <Input id="displayName" value={currentUser.displayName || ""} disabled />
          )}
        </div>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button onClick={handleUpdateProfile} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={handleLogout} className="ml-auto">
          Log out
        </Button>
      </CardFooter>
    </Card>
  );
} 