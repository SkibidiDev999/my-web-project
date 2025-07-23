import { Link, useLocation } from "wouter";
import { Eye, Star, User } from "lucide-react";
import OwlMascot from "@/components/owl-mascot";

interface NavigationHeaderProps {
  user: {
    name: string;
    xp: number;
    level: number;
    initials: string;
  };
}

export default function NavigationHeader({ user }: NavigationHeaderProps) {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/recruitment", label: "Recruitment" },
    { path: "/projects", label: "Projects" },
    { path: "/achievements", label: "Achievements" },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <OwlMascot size="sm" />
              <h1 className="text-xl font-bold text-gray-900">BEC Vision</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span
                    className={`cursor-pointer ${
                      location === item.path
                        ? "text-primary font-medium border-b-2 border-primary pb-1"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-warning" />
              <span className="font-semibold text-gray-700">{user.xp.toLocaleString()} XP</span>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center relative">
                <span className="text-white font-semibold text-sm">{user.initials}</span>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center text-xs text-white font-bold">
                  {user.level}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
