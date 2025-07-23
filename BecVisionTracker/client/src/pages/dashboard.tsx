import { useQuery } from "@tanstack/react-query";
import { Download, Settings } from "lucide-react";
import NavigationHeader from "@/components/navigation-header";
import OwlMascot, { OwlMascotWithSpeech } from "@/components/owl-mascot";
import WelcomeSection from "@/components/welcome-section";
import CurrentProjectCard from "@/components/current-project-card";
import SkillDevelopmentCard from "@/components/skill-development-card";
import CustomPathBuilder from "@/components/custom-path-builder";
import AchievementsPanel from "@/components/achievements-panel";
import StatsOverview from "@/components/stats-overview";
import UpcomingMilestones from "@/components/upcoming-milestones";
import AnalyticsSection from "@/components/analytics-section";
import MobileTabBar from "@/components/mobile-tab-bar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/users/1/dashboard"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-16 bg-white border-b" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-48" />
              <Skeleton className="h-40" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48" />
              <Skeleton className="h-32" />
              <Skeleton className="h-40" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to load dashboard</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const userForHeader = {
    ...dashboardData.user,
    initials: dashboardData.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader user={userForHeader} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        <WelcomeSection user={dashboardData.user} />
        
        {/* Owl Mascot Welcome */}
        <div className="mb-8">
          <OwlMascotWithSpeech 
            message={`Welcome back, ${dashboardData.user.name}! Ready to enhance your business and English skills? You're making excellent progress with ${dashboardData.user.xp} XP!`}
            position="right"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {dashboardData.currentProject && (
              <CurrentProjectCard
                project={dashboardData.currentProject}
                stages={dashboardData.projectStages}
              />
            )}
            
            <SkillDevelopmentCard skills={dashboardData.skills} />
            
            <CustomPathBuilder />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <AchievementsPanel achievements={dashboardData.recentAchievements} />
            
            <StatsOverview stats={dashboardData.stats} user={dashboardData.user} />
            
            <UpcomingMilestones />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-8">
          <AnalyticsSection
            user={dashboardData.user}
            stats={dashboardData.stats}
            achievementCount={dashboardData.recentAchievements.length}
            streak={dashboardData.user.streak}
          />
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
        <Button
          size="icon"
          className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-all"
          title="Export Progress Report"
        >
          <Download className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-all bg-success text-white border-success hover:bg-success/90"
          title="Customize Dashboard"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      <MobileTabBar />
    </div>
  );
}
