import { useState } from "react";
import { Edit, Settings, Star, Package, ShoppingCart, Clock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";

const UserDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Passionate about technology and finding great deals. Selling quality items at fair prices.",
    avatar: "",
    memberSince: "2022-03-15",
    rating: 4.8,
    reviewCount: 24,
  });

  const stats = [
    { label: "Active Listings", value: 5, icon: Package, color: "text-blue-600" },
    { label: "Items Sold", value: 18, icon: ShoppingCart, color: "text-green-600" },
    { label: "Total Purchases", value: 12, icon: ShoppingBag, color: "text-purple-600" },
    { label: "Member Since", value: "2022", icon: Clock, color: "text-orange-600" },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 gradient-hero rounded-full flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-primary">My Profile</h1>
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : <><Edit className="h-4 w-4 mr-2" />Edit</>}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card className="marketplace-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="text-2xl gradient-hero text-white">
                    {userProfile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{userProfile.rating} ({userProfile.reviewCount} reviews)</span>
                  </div>
                  <Badge variant="outline" className="mt-1">
                    Member since {new Date(userProfile.memberSince).getFullYear()}
                  </Badge>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={userProfile.location}
                          onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={userProfile.bio}
                        onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                      />
                    </div>
                    <Button 
                      onClick={handleSaveProfile}
                      className="gradient-primary text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-foreground">{userProfile.name}</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>{userProfile.email}</p>
                      <p>{userProfile.phone}</p>
                      <p>{userProfile.location}</p>
                    </div>
                    <p className="text-foreground leading-relaxed">{userProfile.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="marketplace-card">
              <CardContent className="p-4 text-center">
                <div className={`mx-auto mb-2 h-8 w-8 ${stat.color}`}>
                  <stat.icon className="h-full w-full" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="marketplace-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Package className="h-4 w-4 mr-2" />
              Notification Preferences
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
              Account Deactivation
            </Button>
          </CardContent>
        </Card>
      </main>

      <Navigation />
    </div>
  );
};

export default UserDashboard;