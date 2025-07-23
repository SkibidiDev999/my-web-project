import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UpcomingMilestones() {
  const milestones = [
    {
      id: 1,
      title: "Complete Frontend Module",
      timeframe: "3 days",
      xpReward: 250,
      color: "bg-primary"
    },
    {
      id: 2,
      title: "Level 13 Achievement",
      timeframe: "1 week", 
      xpReward: 500,
      color: "bg-secondary"
    },
    {
      id: 3,
      title: "Project Demo Day",
      timeframe: "2 weeks",
      xpReward: 1000,
      color: "bg-success"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-start space-x-3">
              <div className={`w-3 h-3 rounded-full mt-1.5 ${milestone.color}`} />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">{milestone.title}</h4>
                <p className="text-xs text-gray-500">Expected: {milestone.timeframe}</p>
                <span className={`text-xs font-medium ${
                  milestone.color === "bg-primary" ? "text-primary" :
                  milestone.color === "bg-secondary" ? "text-secondary" : "text-success"
                }`}>
                  +{milestone.xpReward} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
