interface WelcomeSectionProps {
  user: {
    name: string;
    xp: number;
    level: number;
    streak: number;
  };
}

export default function WelcomeSection({ user }: WelcomeSectionProps) {
  const currentLevelXp = (user.level - 1) * 1000;
  const nextLevelXp = user.level * 1000;
  const progressXp = user.xp - currentLevelXp;
  const levelProgressPercent = (progressXp / (nextLevelXp - currentLevelXp)) * 100;

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}!</h2>
            <p className="text-blue-100">You're on track to reach Level {user.level + 1} this week. Keep up the great work!</p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">{user.streak}</div>
              <div className="text-sm text-blue-100">Day Streak</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Level {user.level} Progress</span>
            <span>{progressXp} / {nextLevelXp - currentLevelXp} XP</span>
          </div>
          <div className="w-full bg-blue-700 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(levelProgressPercent, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
