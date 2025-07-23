import NavigationHeader from "@/components/navigation-header";
import MobileTabBar from "@/components/mobile-tab-bar";
import OwlMascot, { OwlMascotWithSpeech } from "@/components/owl-mascot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, Users, Presentation, Award } from "lucide-react";

export default function Recruitment() {
  // Mock user data - in real app this would come from API
  const user = {
    name: "John Smith",
    xp: 2847,
    level: 12,
    initials: "JS"
  };

  const recruitmentStages = [
    {
      id: 1,
      name: "Application",
      description: "Submit your application form and initial documents",
      status: "completed",
      xpReward: 100,
      resources: [
        "Application form template",
        "Personal statement in English",
        "Business-focused CV requirements"
      ],
      completedAt: "2024-01-10",
      position: 1
    },
    {
      id: 2,
      name: "Case Study & Pitching",
      description: "Solve business case and present your solution",
      status: "in_progress",
      xpReward: 300,
      resources: [
        "Business case study framework", 
        "English presentation template",
        "Market analysis guidelines",
        "Professional pitching in English"
      ],
      position: 2,
      currentScore: 75
    },
    {
      id: 3,
      name: "Interview",
      description: "Final interview with BEC leadership team",
      status: "pending",
      xpReward: 200,
      resources: [
        "English interview preparation",
        "Business leadership questions",
        "BEC values and club culture"
      ],
      position: 3
    }
  ];

  const becInfo = {
    founded: "2005",
    members: "200+",
    projects: ["TEDx FTU2", "Blead Program", "Business Forums", "English Workshops"],
    achievements: "18 years of excellence in business and English education"
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-primary" />;
      case "pending":
        return <FileText className="w-5 h-5 text-gray-400" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success";
      case "in_progress":
        return "bg-primary/10 text-primary border-primary";
      case "pending":
        return "bg-gray-100 text-gray-600 border-gray-300";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-velvet to-velvet-dark rounded-xl p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">BEC Recruitment Journey</h1>
                <p className="text-red-100">Business and English Club - Established {becInfo.founded}</p>
                <p className="text-red-100 mt-1">{becInfo.achievements}</p>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-2xl font-bold mb-1">{becInfo.members}</div>
                <div className="text-sm text-red-100">Active Members</div>
              </div>
            </div>
          </div>
        </div>

        {/* Owl Mascot Guidance */}
        <div className="mb-8">
          <OwlMascotWithSpeech 
            message="Excellent work completing Round 1! For your business case study presentation, focus on clear analysis, practical solutions, and confident English delivery. Show your leadership potential!"
            position="left"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recruitment Stages */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recruitment Process</h2>
              <div className="space-y-4">
                {recruitmentStages.map((stage, index) => (
                  <Card key={stage.id} className={`${stage.status === 'in_progress' ? 'border-primary ring-1 ring-primary/20' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(stage.status)}
                            <span className="font-semibold text-lg">Round {stage.position}</span>
                          </div>
                          <CardTitle className="text-lg">{stage.name}</CardTitle>
                        </div>
                        <Badge variant="outline" className={getStatusColor(stage.status)}>
                          {stage.status === 'completed' ? 'Completed' : 
                           stage.status === 'in_progress' ? 'In Progress' : 'Pending'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{stage.description}</p>
                      
                      {stage.status === 'in_progress' && stage.currentScore && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Current Score</span>
                            <span>{stage.currentScore}/100</span>
                          </div>
                          <Progress value={stage.currentScore} className="h-2" />
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Available Resources & Frameworks:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {stage.resources.map((resource, idx) => (
                            <div key={idx} className="flex items-center space-x-2 p-2 bg-velvet-light rounded-lg">
                              <FileText className="w-4 h-4 text-velvet" />
                              <span className="text-sm text-gray-700">{resource}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-warning" />
                          <span className="text-sm font-medium text-gray-700">+{stage.xpReward} XP Reward</span>
                        </div>
                        {stage.status === 'in_progress' && (
                          <Button className="bg-velvet hover:bg-velvet-dark">
                            Continue
                          </Button>
                        )}
                        {stage.status === 'pending' && (
                          <Button variant="outline" disabled>
                            Locked
                          </Button>
                        )}
                        {stage.completedAt && (
                          <span className="text-sm text-success font-medium">
                            Completed {stage.completedAt}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About BEC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-velvet" />
                    <div>
                      <div className="font-medium">Established {becInfo.founded}</div>
                      <div className="text-sm text-gray-600">At FTU2 University</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-velvet" />
                    <div>
                      <div className="font-medium">{becInfo.members} Members</div>
                      <div className="text-sm text-gray-600">Active community</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Major Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {becInfo.projects.map((project, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-velvet rounded-full" />
                      <span className="text-sm font-medium text-gray-700">{project}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-900">Current Focus</div>
                    <div className="text-sm text-blue-700">Complete your case study presentation</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Deadline</div>
                    <div className="text-sm text-gray-600">Submit by January 25, 2024</div>
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