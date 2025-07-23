import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Star } from "lucide-react";

interface AchievementsPanelProps {
  achievements: Array<{
    id: number;
    achievementId: number;
    unlockedAt: Date;
    achievement?: {
      name: string;
      description: string;
      icon: string;
      category: string;
    };
  }>;
}

export default function AchievementsPanel({ achievements }: AchievementsPanelProps) {
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

  const getIconColor = (category: string) => {
    switch (category) {
      case "skill":
        return "bg-warning";
      case "collaboration":
        return "bg-success";
      case "milestone":
        return "bg-secondary";
      default:
        return "bg-primary";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return `${Math.floor(diffInHours / 168)}w ago`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Achievements</CardTitle>
          <a href="/achievements" className="text-primary text-sm font-medium hover:underline">
            View All
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {achievements.map((userAchievement) => {
            if (!userAchievement.achievement) return null;
            
            const IconComponent = getIcon(userAchievement.achievement.icon);
            return (
              <div key={userAchievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(userAchievement.achievement.category)}`}>
                  <IconComponent className="text-white w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{userAchievement.achievement.name}</h4>
                  <p className="text-xs text-gray-500">{userAchievement.achievement.description}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {formatTimeAgo(new Date(userAchievement.unlockedAt))}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
