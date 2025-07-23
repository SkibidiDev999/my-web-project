import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SkillDevelopmentCardProps {
  skills: Array<{
    id: number;
    name: string;
    proficiency: number;
    level: string;
  }>;
}

export default function SkillDevelopmentCard({ skills }: SkillDevelopmentCardProps) {
  const getSkillColor = (proficiency: number) => {
    if (proficiency >= 80) return "bg-success";
    if (proficiency >= 60) return "bg-primary";
    if (proficiency >= 40) return "bg-secondary";
    return "bg-warning";
  };

  const formatLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Skill Development</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">{skill.name}</span>
                <span className="text-sm text-gray-500">{formatLevel(skill.level)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getSkillColor(skill.proficiency)}`}
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
