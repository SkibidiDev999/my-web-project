import { useState } from "react";
import NavigationHeader from "@/components/navigation-header";
import MobileTabBar from "@/components/mobile-tab-bar";
import OwlMascot, { OwlMascotWithSpeech } from "@/components/owl-mascot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TreePine, ChevronRight, ChevronDown, Users, Calendar, Award, 
  CheckCircle, Clock, AlertCircle, Zap, Target, Presentation
} from "lucide-react";

interface ProjectNode {
  id: string;
  name: string;
  type: "project" | "branch" | "task";
  status: "todo" | "in_progress" | "completed";
  progress?: number;
  assignee?: string;
  dueDate?: string;
  xpReward?: number;
  children?: ProjectNode[];
  color?: string;
}

export default function Projects() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["tedx", "blead"]));
  const [selectedProject, setSelectedProject] = useState<string>("tedx");

  const user = {
    name: "John Smith",
    xp: 2847,
    level: 12,
    initials: "JS"
  };

  const becProjects: ProjectNode[] = [
    {
      id: "tedx",
      name: "TEDx FTU2 2024",
      type: "project",
      status: "in_progress",
      progress: 65,
      color: "#dc2626",
      xpReward: 1500,
      children: [
        {
          id: "content",
          name: "Content Branch",
          type: "branch",
          status: "in_progress",
          progress: 70,
          color: "#dc2626",
          children: [
            {
              id: "speaker-research",
              name: "Speaker Research & Outreach",
              type: "task",
              status: "completed",
              assignee: "Sarah Chen",
              dueDate: "2024-01-15",
              xpReward: 100
            },
            {
              id: "content-curation",
              name: "Content Curation",
              type: "task",
              status: "in_progress",
              assignee: "Mike Johnson",
              dueDate: "2024-01-25",
              xpReward: 150
            },
            {
              id: "script-writing",
              name: "Script Writing",
              type: "task",
              status: "todo",
              assignee: "Emily Davis",
              dueDate: "2024-02-01",
              xpReward: 120
            }
          ]
        },
        {
          id: "ea",
          name: "Event & Administration Branch",
          type: "branch",
          status: "in_progress",
          progress: 60,
          color: "#dc2626",
          children: [
            {
              id: "venue-booking",
              name: "Venue Booking",
              type: "task",
              status: "completed",
              assignee: "Alex Wang",
              dueDate: "2024-01-10",
              xpReward: 80
            },
            {
              id: "logistics",
              name: "Event Logistics Planning",
              type: "task",
              status: "in_progress",
              assignee: "Lisa Park",
              dueDate: "2024-01-30",
              xpReward: 130
            },
            {
              id: "registration",
              name: "Registration System",
              type: "task",
              status: "todo",
              assignee: "Tom Wilson",
              dueDate: "2024-02-05",
              xpReward: 90
            }
          ]
        },
        {
          id: "marketing",
          name: "Marketing Branch",
          type: "branch",
          status: "todo",
          progress: 30,
          color: "#dc2626",
          children: [
            {
              id: "social-media",
              name: "Social Media Campaign",
              type: "task",
              status: "in_progress",
              assignee: "Jenny Liu",
              dueDate: "2024-01-28",
              xpReward: 110
            },
            {
              id: "poster-design",
              name: "Poster & Banner Design",
              type: "task",
              status: "todo",
              assignee: "David Kim",
              dueDate: "2024-02-03",
              xpReward: 100
            }
          ]
        }
      ]
    },
    {
      id: "blead",
      name: "Blead Program 2024",
      type: "project",
      status: "in_progress",
      progress: 45,
      color: "#7c2d12",
      xpReward: 1200,
      children: [
        {
          id: "curriculum",
          name: "Curriculum Development",
          type: "branch",
          status: "in_progress",
          progress: 50,
          color: "#7c2d12",
          children: [
            {
              id: "business-modules",
              name: "Business Communication Workshops",
              type: "task",
              status: "in_progress",
              assignee: "Rachel Green",
              dueDate: "2024-02-10",
              xpReward: 140
            },
            {
              id: "case-studies",
              name: "English Presentation Skills Training",
              type: "task",
              status: "todo",
              assignee: "Kevin Lee",
              dueDate: "2024-02-15",
              xpReward: 120
            }
          ]
        },
        {
          id: "mentorship",
          name: "Mentorship Program",
          type: "branch",
          status: "todo",
          progress: 20,
          color: "#7c2d12",
          children: [
            {
              id: "mentor-recruitment",
              name: "Business Leader Guest Speakers",
              type: "task",
              status: "todo",
              assignee: "Chris Brown",
              dueDate: "2024-02-20",
              xpReward: 100
            }
          ]
        }
      ]
    }
  ];

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "in_progress":
        return <Clock className="w-4 h-4 text-primary" />;
      case "todo":
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success";
      case "in_progress":
        return "bg-primary/10 text-primary border-primary";
      case "todo":
        return "bg-gray-100 text-gray-600 border-gray-300";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  const renderTreeNode = (node: ProjectNode, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const indentClass = depth > 0 ? `ml-${depth * 6}` : "";

    return (
      <div key={node.id} className="space-y-2">
        <div
          className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
            node.type === "project" ? "bg-white border-velvet/20" : 
            node.type === "branch" ? "bg-velvet-light border-velvet/30" : "bg-gray-50 border-gray-200"
          } ${indentClass}`}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id);
            }
            if (node.type === "project") {
              setSelectedProject(node.id);
            }
          }}
        >
          <div className="flex items-center space-x-2">
            {hasChildren && (
              <button onClick={(e) => { e.stopPropagation(); toggleNode(node.id); }}>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </button>
            )}
            {!hasChildren && <div className="w-4" />}
            
            {node.type === "project" && <TreePine className="w-5 h-5" style={{ color: node.color }} />}
            {node.type === "branch" && <Zap className="w-4 h-4" style={{ color: node.color }} />}
            {node.type === "task" && getStatusIcon(node.status)}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <span className={`font-medium ${
                  node.type === "project" ? "text-lg text-gray-900" : 
                  node.type === "branch" ? "text-base text-gray-800" : "text-sm text-gray-700"
                }`}>
                  {node.name}
                </span>
                {node.assignee && (
                  <div className="text-xs text-gray-500 mt-1">
                    Assigned to: {node.assignee}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {node.progress !== undefined && (
                  <div className="w-20">
                    <Progress value={node.progress} className="h-1" />
                  </div>
                )}
                {node.xpReward && (
                  <Badge variant="outline" className="text-xs">
                    +{node.xpReward} XP
                  </Badge>
                )}
                <Badge variant="outline" className={`text-xs ${getStatusColor(node.status)}`}>
                  {node.status.replace("_", " ")}
                </Badge>
              </div>
            </div>
            
            {node.dueDate && (
              <div className="flex items-center space-x-1 mt-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">Due: {node.dueDate}</span>
              </div>
            )}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-2">
            {node.children!.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const selectedProjectData = becProjects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-velvet to-velvet-dark rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">BEC Project Tree</h1>
                <p className="text-red-100">Manage projects with tree-based KPI tracking</p>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{becProjects.length}</div>
                  <div className="text-sm text-red-100">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {becProjects.reduce((acc, project) => {
                      const countTasks = (node: ProjectNode): number => {
                        let count = node.type === "task" ? 1 : 0;
                        if (node.children) {
                          count += node.children.reduce((sum, child) => sum + countTasks(child), 0);
                        }
                        return count;
                      };
                      return acc + countTasks(project);
                    }, 0)}
                  </div>
                  <div className="text-sm text-red-100">Total Tasks</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Owl Mascot Project Guidance */}
        <div className="mb-8">
          <OwlMascotWithSpeech 
            message="Click on any branch to expand and see detailed tasks! The TEDx project is making great progress at 65%. Your business communication and event management skills are really shining!"
            position="right"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Tree */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TreePine className="w-5 h-5 text-velvet" />
                  <span>Project Tree Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {becProjects.map(project => renderTreeNode(project))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Details Sidebar */}
          <div className="space-y-6">
            {selectedProjectData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-velvet" />
                    <span>{selectedProjectData.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>{selectedProjectData.progress}%</span>
                      </div>
                      <Progress value={selectedProjectData.progress} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-velvet-light rounded-lg">
                        <div className="text-2xl font-bold text-velvet">
                          {selectedProjectData.children?.length || 0}
                        </div>
                        <div className="text-xs text-gray-600">Branches</div>
                      </div>
                      <div className="text-center p-3 bg-velvet-light rounded-lg">
                        <div className="text-2xl font-bold text-velvet">
                          {selectedProjectData.xpReward}
                        </div>
                        <div className="text-xs text-gray-600">Total XP</div>
                      </div>
                    </div>

                    <Button className="w-full bg-velvet hover:bg-velvet-dark">
                      <Presentation className="w-4 h-4 mr-2" />
                      View Full Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Assign Tasks
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Set Deadlines
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="w-4 h-4 mr-2" />
                    Track Progress
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span>Speaker research completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Content curation in progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <span>New task assigned to Emily</span>
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