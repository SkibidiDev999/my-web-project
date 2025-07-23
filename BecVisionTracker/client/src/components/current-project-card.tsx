import { Check, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CurrentProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    status: string;
    currentStage: number;
    totalStages: number;
  };
  stages: Array<{
    id: number;
    stageNumber: number;
    name: string;
    xpReward: number;
    isCompleted: boolean;
  }>;
}

export default function CurrentProjectCard({ project, stages }: CurrentProjectCardProps) {
  const progressPercent = (project.currentStage / project.totalStages) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Current Project</CardTitle>
          <Badge variant="outline" className="bg-success/10 text-success border-success">
            In Progress
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">{project.name}</h4>
          <p className="text-gray-600 text-sm">{project.description}</p>
        </div>
        
        <div className="space-y-3">
          {stages.map((stage) => (
            <div key={stage.id} className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                stage.isCompleted 
                  ? "bg-success"
                  : stage.stageNumber === project.currentStage
                  ? "bg-primary"
                  : "bg-gray-200"
              }`}>
                {stage.isCompleted ? (
                  <Check className="text-white w-3 h-3" />
                ) : stage.stageNumber === project.currentStage ? (
                  <Code className="text-white w-3 h-3" />
                ) : (
                  <span className="text-gray-400 text-xs">{stage.stageNumber}</span>
                )}
              </div>
              <span className={`${
                stage.isCompleted 
                  ? "text-gray-700"
                  : stage.stageNumber === project.currentStage
                  ? "text-gray-900 font-medium"
                  : "text-gray-400"
              }`}>
                {stage.name}
              </span>
              {stage.isCompleted ? (
                <span className="text-success text-sm font-medium">+{stage.xpReward} XP</span>
              ) : stage.stageNumber === project.currentStage ? (
                <span className="text-gray-500 text-sm">In Progress</span>
              ) : (
                <span className="text-gray-400 text-sm">Upcoming</span>
              )}
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Overall Progress</span>
            <span>{Math.round(progressPercent)}% Complete</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
