import NavigationHeader from "@/components/navigation-header";
import MobileTabBar from "@/components/mobile-tab-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Route, Target, Clock, CheckCircle } from "lucide-react";

export default function MyPath() {
  // Mock user data - in real app this would come from API
  const user = {
    name: "John Smith",
    xp: 2847,
    level: 12,
    initials: "JS"
  };

  const learningPaths = [
    {
      id: 1,
      name: "Full-Stack Development",
      description: "Complete path from frontend to backend development",
      progress: 65,
      estimatedDuration: 24,
      difficulty: "Intermediate",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      isActive: true
    },
    {
      id: 2,
      name: "Mobile Development",
      description: "Learn to build mobile apps with React Native",
      progress: 0,
      estimatedDuration: 16,
      difficulty: "Beginner",
      skills: ["React Native", "Firebase", "JavaScript"],
      isActive: false
    }
  ];

  const currentMilestones = [
    {
      id: 1,
      title: "Complete Backend API",
      description: "Build RESTful API with authentication",
      dueDate: "2024-01-15",
      xpReward: 300,
      status: "in-progress"
    },
    {
      id: 2,
      title: "Deploy to Production",
      description: "Deploy application using AWS services",
      dueDate: "2024-01-22",
      xpReward: 250,
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning Path</h1>
          <p className="text-gray-600">Customize and track your journey at BEC</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Paths */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Learning Paths</h2>
              <div className="space-y-4">
                {learningPaths.map((path) => (
                  <Card key={path.id} className={path.isActive ? "border-primary" : ""}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <Route className="w-5 h-5 text-primary" />
                          <CardTitle className="text-lg">{path.name}</CardTitle>
                        </div>
                        <Badge variant={path.isActive ? "default" : "outline"}>
                          {path.isActive ? "Active" : "Available"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{path.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{path.estimatedDuration} weeks</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>{path.difficulty}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills you'll learn:</p>
                        <div className="flex flex-wrap gap-2">
                          {path.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {path.isActive && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{path.progress}% Complete</span>
                          </div>
                          <Progress value={path.progress} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Current Milestones */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentMilestones.map((milestone) => (
                    <div key={milestone.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                        {milestone.status === "in-progress" ? (
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                            In Progress
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            Upcoming
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Due: {milestone.dueDate}</span>
                        <span className="text-primary font-medium">+{milestone.xpReward} XP</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Path Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Paths</span>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Completed Milestones</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Skills Acquired</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">XP from Paths</span>
                    <span className="font-semibold">1,850</span>
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
