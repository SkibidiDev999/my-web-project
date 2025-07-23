import { Plus, Route, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CustomPathBuilder() {
  const pathTemplates = [
    {
      id: 1,
      name: "Full-Stack Development",
      description: "Frontend → Backend → DevOps",
      icon: Route,
      duration: "6 months",
      color: "text-primary"
    },
    {
      id: 2,
      name: "Mobile Development", 
      description: "React Native → Flutter",
      icon: Smartphone,
      duration: "4 months",
      color: "text-secondary"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Customize Your Path</CardTitle>
          <Button className="text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Path
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pathTemplates.map((path) => {
            const IconComponent = path.icon;
            return (
              <div 
                key={path.id}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer group"
              >
                <div className="text-center">
                  <IconComponent className={`w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:${path.color} transition-colors`} />
                  <h4 className="font-medium text-gray-700 group-hover:text-gray-900">{path.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{path.description}</p>
                  <div className="mt-3">
                    <Badge variant="outline" className="text-xs">
                      {path.duration}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
