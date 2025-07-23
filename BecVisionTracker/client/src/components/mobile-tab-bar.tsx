import { Link, useLocation } from "wouter";
import { Home, Route, Trophy, BarChart3 } from "lucide-react";

export default function MobileTabBar() {
  const [location] = useLocation();

  const tabs = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/recruitment", icon: Route, label: "Recruitment" },
    { path: "/projects", icon: BarChart3, label: "Projects" },
    { path: "/achievements", icon: Trophy, label: "Achievements" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-50">
      <div className="grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = location === tab.path;
          
          return (
            <Link key={tab.path} href={tab.path}>
              <div className={`flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                isActive ? "text-primary" : "text-gray-400"
              }`}>
                <IconComponent className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
