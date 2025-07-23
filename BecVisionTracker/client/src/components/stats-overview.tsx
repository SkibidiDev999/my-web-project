import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, FolderOpen, Clock, Users } from "lucide-react";

interface StatsOverviewProps {
  stats: {
    projectsCompleted: number;
    hoursThisWeek: number;
    collaborations: number;
  };
  user: {
    streak: number;
  };
}

export default function StatsOverview({ stats, user }: StatsOverviewProps) {
  const statItems = [
    {
      icon: Flame,
      label: "Current Streak",
      value: `${user.streak} days`,
      color: "text-warning"
    },
    {
      icon: FolderOpen,
      label: "Projects Completed",
      value: stats.projectsCompleted.toString(),
      color: "text-primary"
    },
    {
      icon: Clock,
      label: "Hours This Week",
      value: stats.hoursThisWeek.toString(),
      color: "text-secondary"
    },
    {
      icon: Users,
      label: "Team Collaborations",
      value: stats.collaborations.toString(),
      color: "text-success"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {statItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconComponent className={`w-4 h-4 ${item.color}`} />
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
