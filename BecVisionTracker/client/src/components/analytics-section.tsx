import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target } from "lucide-react";

interface AnalyticsSectionProps {
  user: {
    xp: number;
    level: number;
  };
  stats: {
    projectsCompleted: number;
    collaborations: number;
  };
  achievementCount: number;
  streak: number;
}

export default function AnalyticsSection({ user, stats, achievementCount, streak }: AnalyticsSectionProps) {
  const summaryStats = [
    {
      value: user.xp.toLocaleString(),
      label: "Total XP",
      color: "text-primary"
    },
    {
      value: user.level.toString(),
      label: "Current Level", 
      color: "text-success"
    },
    {
      value: achievementCount.toString(),
      label: "Achievements",
      color: "text-secondary"
    },
    {
      value: streak.toString(),
      label: "Day Streak",
      color: "text-warning"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Growth Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* XP Progress Chart Placeholder */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">XP Progress (Last 30 Days)</h4>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">XP Progress Chart</p>
                <p className="text-sm text-gray-400">Showing daily XP gains</p>
              </div>
            </div>
          </div>
          
          {/* Skills Radar Placeholder */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Skills Assessment</h4>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Target className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">Skills Radar Chart</p>
                <p className="text-sm text-gray-400">Technical & Soft Skills</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Summary */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {summaryStats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
