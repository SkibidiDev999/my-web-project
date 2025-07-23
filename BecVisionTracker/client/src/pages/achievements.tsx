import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigation-header";
import MobileTabBar from "@/components/mobile-tab-bar";
import OwlMascot, { OwlMascotWithSpeech } from "@/components/owl-mascot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Star, Users, Target, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Achievements() {
  const { data: achievementsData, isLoading } = useQuery({
    queryKey: ["/api/users/1/achievements"],
  });

  const { data: userData } = useQuery({
    queryKey: ["/api/users/1"],
  });

  // Mock user data - in real app this would come from API
  const user = {
    name: userData?.name || "John Smith",
    xp: userData?.xp || 2847,
    level: userData?.level || 12,
    initials: userData?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || "JS"
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "fas fa-trophy":
        return Trophy;
      case "fas fa-medal":
        return Medal;
      case "fas fa-star":
        return Star;
      default:
        return Trophy;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "skill":
        return Target;
      case "collaboration":
        return Users;
      case "milestone":
        return Star;
      case "streak":
        return Zap;
      default:
        return Trophy;
    }
  };

  const getIconColor = (category: string) => {
    switch (category) {
      case "skill":
        return "bg-warning text-white";
      case "collaboration":
        return "bg-success text-white";
      case "milestone":
        return "bg-secondary text-white";
      case "streak":
        return "bg-primary text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return `${Math.floor(diffInHours / 168)}w ago`;
    }
  };

  // Mock upcoming achievements
  const upcomingAchievements = [
    {
      id: 1,
      name: "Level Up Legend",
      description: "Reach Level 15",
      progress: 80,
      category: "milestone",
      xpReward: 500
    },
    {
      id: 2,
      name: "Collaboration King",
      description: "Work with 10 different team members",
      progress: 60,
      category: "collaboration",
      xpReward: 300
    },
    {
      id: 3,
      name: "Communication Master",
      description: "Excel in 5 different business communication areas",
      progress: 40,
      category: "skill",
      xpReward: 400
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-16 bg-white border-b" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-20 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-96" />
            </div>
            <div>
              <Skeleton className="h-64" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
          <p className="text-gray-600">Track your progress and celebrate your milestones</p>
        </div>

        {/* Owl Mascot Encouragement */}
        <div className="mb-8">
          <OwlMascotWithSpeech 
            message="Outstanding achievements in business and English development! You're 80% toward Level 15. Your leadership and communication skills are growing stronger every day!"
            position="left"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="unlocked" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="unlocked">Unlocked ({achievementsData?.length || 0})</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="all">All Categories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="unlocked" className="space-y-4">
                {achievementsData?.map((userAchievement: any) => {
                  if (!userAchievement.achievement) return null;
                  
                  const IconComponent = getIcon(userAchievement.achievement.icon);
                  return (
                    <Card key={userAchievement.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getIconColor(userAchievement.achievement.category)}`}>
                            <IconComponent className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{userAchievement.achievement.name}</h3>
                                <p className="text-gray-600">{userAchievement.achievement.description}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Badge variant="outline" className="capitalize">
                                    {userAchievement.achievement.category}
                                  </Badge>
                                  <span className="text-sm text-primary font-medium">
                                    +{userAchievement.achievement.xpReward} XP
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Unlocked</p>
                                <p className="text-sm font-medium">{formatTimeAgo(userAchievement.unlockedAt)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingAchievements.map((achievement) => {
                  const IconComponent = getCategoryIcon(achievement.category);
                  return (
                    <Card key={achievement.id} className="hover:shadow-md transition-shadow opacity-75">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getIconColor(achievement.category)} opacity-60`}>
                            <IconComponent className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{achievement.name}</h3>
                            <p className="text-gray-600">{achievement.description}</p>
                            <div className="flex items-center space-x-2 mt-2 mb-3">
                              <Badge variant="outline" className="capitalize">
                                {achievement.category}
                              </Badge>
                              <span className="text-sm text-primary font-medium">
                                +{achievement.xpReward} XP
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${achievement.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="all">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["skill", "collaboration", "milestone", "streak"].map((category) => (
                    <Card key={category} className="text-center p-4">
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${getIconColor(category)}`}>
                        {(() => {
                          const IconComponent = getCategoryIcon(category);
                          return <IconComponent className="w-6 h-6" />;
                        })()}
                      </div>
                      <h4 className="font-medium capitalize">{category}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {achievementsData?.filter((a: any) => a.achievement?.category === category).length || 0} unlocked
                      </p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievement Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Unlocked</span>
                    <span className="font-semibold text-2xl">{achievementsData?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">XP from Achievements</span>
                    <span className="font-semibold">
                      {achievementsData?.reduce((total: number, a: any) => 
                        total + (a.achievement?.xpReward || 0), 0
                      ) || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-semibold">75%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span>Unlocked "Code Master"</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>80% progress on "Level Up Legend"</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <span>Gained 150 XP from skills</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MobileTabBar />
    </div>
  );
}
