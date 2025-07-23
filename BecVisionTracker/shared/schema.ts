import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  recruitmentStage: text("recruitment_stage").notNull().default("application"), // application, case_study, interview, onboarded
  xp: integer("xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  streak: integer("streak").notNull().default(0),
  lastActive: timestamp("last_active").defaultNow(),
  avatar: text("avatar"),
  becRole: text("bec_role"), // member, lead, executive
  joinedDate: timestamp("joined_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const becProjects = pgTable("bec_projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // TEDx, Blead, etc.
  description: text("description"),
  type: text("type").notNull(), // event, program, initiative
  status: text("status").notNull().default("planning"), // planning, active, completed
  leadId: integer("lead_id"), // project lead
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  xpReward: integer("xp_reward").notNull().default(1000),
  createdAt: timestamp("created_at").defaultNow(),
});

// Tree structure for project management (branches and tasks)
export const projectBranches = pgTable("project_branches", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  parentBranchId: integer("parent_branch_id"), // null for root branches
  name: text("name").notNull(), // Content, EA, Marketing, etc.
  description: text("description"),
  position: integer("position").notNull().default(0), // for ordering
  color: text("color").notNull().default("#dc2626"), // red velvet default
  isCompleted: boolean("is_completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
});

export const projectTasks = pgTable("project_tasks", {
  id: serial("id").primaryKey(),
  branchId: integer("branch_id").notNull(),
  assignedUserId: integer("assigned_user_id"),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull().default("task"), // task, deliverable, milestone
  priority: text("priority").notNull().default("medium"), // low, medium, high, urgent
  status: text("status").notNull().default("todo"), // todo, in_progress, completed
  dueDate: timestamp("due_date"),
  xpReward: integer("xp_reward").notNull().default(50),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(), // technical, soft, design, management
  proficiency: integer("proficiency").notNull().default(0), // 0-100
  level: text("level").notNull().default("beginner"), // beginner, intermediate, advanced, expert
  xpEarned: integer("xp_earned").notNull().default(0),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // milestone, skill, project, streak, collaboration
  xpReward: integer("xp_reward").notNull().default(100),
  condition: json("condition"), // JSON object defining unlock conditions
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  achievementId: integer("achievement_id").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

// Recruitment process tracking
export const recruitmentStages = pgTable("recruitment_stages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Application, Case Study, Interview
  description: text("description"),
  position: integer("position").notNull(), // 1, 2, 3
  xpReward: integer("xp_reward").notNull().default(100),
  resources: json("resources"), // Array of resources/frameworks
});

export const userRecruitmentProgress = pgTable("user_recruitment_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  stageId: integer("stage_id").notNull(),
  status: text("status").notNull().default("pending"), // pending, in_progress, completed, failed
  score: integer("score"), // for case study, interview
  feedback: text("feedback"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // project_complete, skill_improve, achievement_unlock, milestone_reach
  description: text("description").notNull(),
  xpGained: integer("xp_gained").notNull().default(0),
  metadata: json("metadata"), // Additional data specific to activity type
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertBecProjectSchema = createInsertSchema(becProjects).omit({
  id: true,
  createdAt: true,
});

export const insertProjectBranchSchema = createInsertSchema(projectBranches).omit({
  id: true,
  completedAt: true,
});

export const insertProjectTaskSchema = createInsertSchema(projectTasks).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  unlockedAt: true,
});

export const insertRecruitmentStageSchema = createInsertSchema(recruitmentStages).omit({
  id: true,
});

export const insertUserRecruitmentProgressSchema = createInsertSchema(userRecruitmentProgress).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type BecProject = typeof becProjects.$inferSelect;
export type InsertBecProject = z.infer<typeof insertBecProjectSchema>;

export type ProjectBranch = typeof projectBranches.$inferSelect;
export type InsertProjectBranch = z.infer<typeof insertProjectBranchSchema>;

export type ProjectTask = typeof projectTasks.$inferSelect;
export type InsertProjectTask = z.infer<typeof insertProjectTaskSchema>;

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;

export type RecruitmentStage = typeof recruitmentStages.$inferSelect;
export type InsertRecruitmentStage = z.infer<typeof insertRecruitmentStageSchema>;

export type UserRecruitmentProgress = typeof userRecruitmentProgress.$inferSelect;
export type InsertUserRecruitmentProgress = z.infer<typeof insertUserRecruitmentProgressSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
