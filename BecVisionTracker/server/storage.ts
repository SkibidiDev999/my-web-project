import { 
  users, becProjects, projectBranches, projectTasks, skills, achievements, userAchievements, 
  recruitmentStages, userRecruitmentProgress, activities,
  type User, type InsertUser, type BecProject, type InsertBecProject,
  type ProjectBranch, type InsertProjectBranch, type ProjectTask, type InsertProjectTask,
  type Skill, type InsertSkill, type Achievement, type InsertAchievement, 
  type UserAchievement, type InsertUserAchievement, type RecruitmentStage, type InsertRecruitmentStage,
  type UserRecruitmentProgress, type InsertUserRecruitmentProgress, type Activity, type InsertActivity
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  getUserProjects(userId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined>;
  
  // Project stage operations
  getProjectStages(projectId: number): Promise<ProjectStage[]>;
  createProjectStage(stage: InsertProjectStage): Promise<ProjectStage>;
  updateProjectStage(id: number, updates: Partial<ProjectStage>): Promise<ProjectStage | undefined>;
  
  // Skill operations
  getUserSkills(userId: number): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, updates: Partial<Skill>): Promise<Skill | undefined>;
  
  // Achievement operations
  getAllAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: number): Promise<UserAchievement[]>;
  createUserAchievement(userAchievement: InsertUserAchievement): Promise<UserAchievement>;
  
  // Learning path operations
  getUserLearningPaths(userId: number): Promise<LearningPath[]>;
  createLearningPath(path: InsertLearningPath): Promise<LearningPath>;
  updateLearningPath(id: number, updates: Partial<LearningPath>): Promise<LearningPath | undefined>;
  
  // Activity operations
  getUserActivities(userId: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private projects: Map<number, Project> = new Map();
  private projectStages: Map<number, ProjectStage> = new Map();
  private skills: Map<number, Skill> = new Map();
  private achievements: Map<number, Achievement> = new Map();
  private userAchievements: Map<number, UserAchievement> = new Map();
  private learningPaths: Map<number, LearningPath> = new Map();
  private activities: Map<number, Activity> = new Map();
  
  private currentUserId = 1;
  private currentProjectId = 1;
  private currentProjectStageId = 1;
  private currentSkillId = 1;
  private currentAchievementId = 1;
  private currentUserAchievementId = 1;
  private currentLearningPathId = 1;
  private currentActivityId = 1;

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    // Create default user
    const defaultUser: User = {
      id: 1,
      username: "john_doe",
      email: "john@bec.com",
      name: "John Smith",
      xp: 2847,
      level: 12,
      streak: 7,
      lastActive: new Date(),
      avatar: null,
      createdAt: new Date(),
    };
    this.users.set(1, defaultUser);

    // Create sample achievements
    const sampleAchievements: Achievement[] = [
      { id: 1, name: "Code Master", description: "Completed 10 coding challenges", icon: "fas fa-trophy", category: "skill", xpReward: 150, condition: null },
      { id: 2, name: "Team Player", description: "Collaborated on 5 projects", icon: "fas fa-medal", category: "collaboration", xpReward: 200, condition: null },
      { id: 3, name: "Fast Learner", description: "Completed course in record time", icon: "fas fa-star", category: "milestone", xpReward: 100, condition: null },
    ];
    
    sampleAchievements.forEach(achievement => {
      this.achievements.set(achievement.id, achievement);
    });

    // Create sample project
    const sampleProject: Project = {
      id: 1,
      userId: 1,
      name: "E-Commerce Platform Development",
      description: "Building a full-stack e-commerce solution with React and Node.js",
      status: "active",
      currentStage: 3,
      totalStages: 5,
      xpReward: 1000,
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      expectedEndDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      completedAt: null,
    };
    this.projects.set(1, sampleProject);

    // Create sample project stages
    const sampleStages: ProjectStage[] = [
      { id: 1, projectId: 1, stageNumber: 1, name: "Planning & Research", description: "Initial project planning and research", xpReward: 150, isCompleted: true, completedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) },
      { id: 2, projectId: 1, stageNumber: 2, name: "UI/UX Design", description: "Design user interface and experience", xpReward: 200, isCompleted: true, completedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) },
      { id: 3, projectId: 1, stageNumber: 3, name: "Frontend Development", description: "Implement frontend components", xpReward: 250, isCompleted: false, completedAt: null },
      { id: 4, projectId: 1, stageNumber: 4, name: "Backend Development", description: "Build backend API and database", xpReward: 300, isCompleted: false, completedAt: null },
      { id: 5, projectId: 1, stageNumber: 5, name: "Testing & Deployment", description: "Test and deploy the application", xpReward: 200, isCompleted: false, completedAt: null },
    ];
    
    sampleStages.forEach(stage => {
      this.projectStages.set(stage.id, stage);
    });

    // Create sample skills
    const sampleSkills: Skill[] = [
      { id: 1, userId: 1, name: "React.js", category: "technical", proficiency: 85, level: "advanced", xpEarned: 850 },
      { id: 2, userId: 1, name: "Node.js", category: "technical", proficiency: 65, level: "intermediate", xpEarned: 650 },
      { id: 3, userId: 1, name: "UI/UX Design", category: "design", proficiency: 70, level: "intermediate", xpEarned: 700 },
      { id: 4, userId: 1, name: "Project Management", category: "management", proficiency: 35, level: "beginner", xpEarned: 350 },
    ];
    
    sampleSkills.forEach(skill => {
      this.skills.set(skill.id, skill);
    });

    // Create sample user achievements
    const sampleUserAchievements: UserAchievement[] = [
      { id: 1, userId: 1, achievementId: 1, unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { id: 2, userId: 1, achievementId: 2, unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      { id: 3, userId: 1, achievementId: 3, unlockedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
    ];
    
    sampleUserAchievements.forEach(userAchievement => {
      this.userAchievements.set(userAchievement.id, userAchievement);
    });

    // Update counters
    this.currentUserId = 2;
    this.currentProjectId = 2;
    this.currentProjectStageId = 6;
    this.currentSkillId = 5;
    this.currentAchievementId = 4;
    this.currentUserAchievementId = 4;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      lastActive: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Project operations
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getUserProjects(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.userId === userId);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      startDate: new Date(),
      completedAt: null,
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...updates };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  // Project stage operations
  async getProjectStages(projectId: number): Promise<ProjectStage[]> {
    return Array.from(this.projectStages.values())
      .filter(stage => stage.projectId === projectId)
      .sort((a, b) => a.stageNumber - b.stageNumber);
  }

  async createProjectStage(insertStage: InsertProjectStage): Promise<ProjectStage> {
    const id = this.currentProjectStageId++;
    const stage: ProjectStage = {
      ...insertStage,
      id,
      completedAt: null,
    };
    this.projectStages.set(id, stage);
    return stage;
  }

  async updateProjectStage(id: number, updates: Partial<ProjectStage>): Promise<ProjectStage | undefined> {
    const stage = this.projectStages.get(id);
    if (!stage) return undefined;
    
    const updatedStage = { ...stage, ...updates };
    this.projectStages.set(id, updatedStage);
    return updatedStage;
  }

  // Skill operations
  async getUserSkills(userId: number): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(skill => skill.userId === userId);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const skill: Skill = { ...insertSkill, id };
    this.skills.set(id, skill);
    return skill;
  }

  async updateSkill(id: number, updates: Partial<Skill>): Promise<Skill | undefined> {
    const skill = this.skills.get(id);
    if (!skill) return undefined;
    
    const updatedSkill = { ...skill, ...updates };
    this.skills.set(id, updatedSkill);
    return updatedSkill;
  }

  // Achievement operations
  async getAllAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values());
  }

  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    return Array.from(this.userAchievements.values())
      .filter(ua => ua.userId === userId)
      .sort((a, b) => b.unlockedAt!.getTime() - a.unlockedAt!.getTime());
  }

  async createUserAchievement(insertUserAchievement: InsertUserAchievement): Promise<UserAchievement> {
    const id = this.currentUserAchievementId++;
    const userAchievement: UserAchievement = {
      ...insertUserAchievement,
      id,
      unlockedAt: new Date(),
    };
    this.userAchievements.set(id, userAchievement);
    return userAchievement;
  }

  // Learning path operations
  async getUserLearningPaths(userId: number): Promise<LearningPath[]> {
    return Array.from(this.learningPaths.values())
      .filter(path => path.userId === userId);
  }

  async createLearningPath(insertPath: InsertLearningPath): Promise<LearningPath> {
    const id = this.currentLearningPathId++;
    const path: LearningPath = {
      ...insertPath,
      id,
      createdAt: new Date(),
    };
    this.learningPaths.set(id, path);
    return path;
  }

  async updateLearningPath(id: number, updates: Partial<LearningPath>): Promise<LearningPath | undefined> {
    const path = this.learningPaths.get(id);
    if (!path) return undefined;
    
    const updatedPath = { ...path, ...updates };
    this.learningPaths.set(id, updatedPath);
    return updatedPath;
  }

  // Activity operations
  async getUserActivities(userId: number): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter(activity => activity.userId === userId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const activity: Activity = {
      ...insertActivity,
      id,
      createdAt: new Date(),
    };
    this.activities.set(id, activity);
    return activity;
  }
}

export const storage = new MemStorage();
