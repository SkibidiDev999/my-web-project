import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigation-header";
import MobileTabBar from "@/components/mobile-tab-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Calendar, Award, Clock, Users, Zap, BarChart3 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Analytics() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/users/1/dashboard"],
  });

  const { data: activitiesData } = useQuery({
    queryKey: ["/api/users/1/activities"],
  });

  // Mock user data - in real app this would come from API
  const user = {
    name: dashboardData?.user?.name || "John Smith",
    xp: dashboardData?.user?.xp || 2847,
    level: dashboardData?.user?.level || 12,
    initials: dashboardData?.user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || "JS"
  };

  // Mock analytics data
  const performanceMetrics = [
    { label: "Weekly XP Growth", value: "+15%", trend: "up", icon: TrendingUp },
    { label: "Skill Improvement", value: "+8%", trend: "up", icon: Target },
    { label: "Project Completion", value: "92%", trend: "neutral", icon: Award },
    { label: "Learning Consistency", value: "7 days", trend: "up", icon: Calendar }
  ];

  const weeklyData = [
    { day: "Mon", xp: 320, hours: 4.5 },
    { day: "Tue", xp: 280, hours: 3.8 },
    { day: "Wed", xp: 450, hours: 6.2 },
    { day: "Thu", xp: 380, hours: 5.1 },
    { day: "Fri", xp: 520, hours: 7.3 },
    { day: "Sat", xp: 290, hours: 3.9 },
    { day: "Sun", xp: 180, hours: 2.1 }
  ];

  const skillCategories = [
    { name: "Frontend Development", progress: 85, color: "bg-blue-500" },
    { name: "Backend Development", progress: 65, color: "bg-green-500" },
    { name: "UI/UX Design", progress: 70, color: "bg-purple-500" },
    { name: "Project Management", progress: 35, color: "bg-orange-500" },
    { name: "DevOps", progress: 25, color: "bg-red-500" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-16 bg-white border-b" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-20 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <Skeleton className="h-96" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your learning progress and performance metrics</p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      metric.trend === "up" ? "bg-success/10" : "bg-gray-100"
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        metric.trend === "up" ? "text-success" : "text-gray-500"
                      }`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
            <TabsTrigger value="projects">Project Progress</TabsTrigger>
            <TabsTrigger value="time">Time Tracking</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly XP Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Weekly XP Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyData.map((day, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="w-8 text-sm font-medium text-gray-600">{day.day}</span>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{day.xp} XP</span>
                            <span className="text-gray-500">{day.hours}h</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(day.xp / 600) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Summary Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Performance Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg">
                      <div className="text-3xl font-bold mb-1">{user.xp.toLocaleString()}</div>
                      <div className="text-sm opacity-90">Total XP Earned</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">{user.level}</div>
                        <div className="text-sm text-gray-600">Current Level</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-warning">{dashboardData?.user?.streak || 7}</div>
                        <div className="text-sm text-gray-600">Day Streak</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Projects Completed</span>
                        <span className="font-medium">{dashboardData?.stats?.projectsCompleted || 12}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Skills Mastered</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Achievements</span>
                        <span className="font-medium">24</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Proficiency Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillCategories.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className="text-sm text-gray-600">{skill.progress}%</span>
                      </div>
                      <Progress value={skill.progress} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-success rounded-full" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">E-commerce Platform</p>
                        <p className="text-sm text-gray-600">Completed - Dec 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Mobile App</p>
                        <p className="text-sm text-gray-600">In Progress - 65% complete</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-3 h-3 bg-gray-400 rounded-full" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Data Analytics Tool</p>
                        <p className="text-sm text-gray-600">Planned - Q2 2024</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Projects</span>
                      <span className="text-2xl font-bold">{dashboardData?.stats?.totalProjects || 3}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="text-2xl font-bold text-success">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average XP per Project</span>
                      <span className="text-2xl font-bold text-primary">850</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="time" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Time Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">This Week</span>
                      <span className="font-semibold">{dashboardData?.stats?.hoursThisWeek || 28.5}h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Daily Average</span>
                      <span className="font-semibold">4.1h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Peak Day</span>
                      <span className="font-semibold">Friday (7.3h)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Learning Streak</span>
                      <span className="font-semibold">{dashboardData?.user?.streak || 7} days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Collaboration Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Team Projects</span>
                      <span className="font-semibold">{dashboardData?.stats?.collaborations || 8}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pair Programming</span>
                      <span className="font-semibold">12 sessions</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Code Reviews</span>
                      <span className="font-semibold">24 reviews</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Mentoring Hours</span>
                      <span className="font-semibold">6.5h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <MobileTabBar />
    </div>
  );
}
