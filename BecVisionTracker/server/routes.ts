import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, insertBecProjectSchema, insertProjectBranchSchema, insertProjectTaskSchema,
  insertSkillSchema, insertRecruitmentStageSchema, insertUserRecruitmentProgressSchema, insertActivitySchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const user = await storage.updateUser(id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Project routes
  app.get("/api/users/:userId/projects", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const projects = await storage.getUserProjects(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to get projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const project = await storage.updateProject(id, updates);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  // Project stage routes
  app.get("/api/projects/:projectId/stages", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const stages = await storage.getProjectStages(projectId);
      res.json(stages);
    } catch (error) {
      res.status(500).json({ message: "Failed to get project stages" });
    }
  });

  app.post("/api/project-stages", async (req, res) => {
    try {
      const data = insertProjectStageSchema.parse(req.body);
      const stage = await storage.createProjectStage(data);
      res.status(201).json(stage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid stage data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create project stage" });
    }
  });

  app.put("/api/project-stages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const stage = await storage.updateProjectStage(id, updates);
      if (!stage) {
        return res.status(404).json({ message: "Project stage not found" });
      }
      res.json(stage);
    } catch (error) {
      res.status(500).json({ message: "Failed to update project stage" });
    }
  });

  // Skill routes
  app.get("/api/users/:userId/skills", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const skills = await storage.getUserSkills(userId);
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to get skills" });
    }
  });

  app.post("/api/skills", async (req, res) => {
    try {
      const data = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(data);
      res.status(201).json(skill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid skill data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create skill" });
    }
  });

  app.put("/api/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const skill = await storage.updateSkill(id, updates);
      if (!skill) {
        return res.status(404).json({ message: "Skill not found" });
      }
      res.json(skill);
    } catch (error) {
      res.status(500).json({ message: "Failed to update skill" });
    }
  });

  // Achievement routes
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to get achievements" });
    }
  });

  app.get("/api/users/:userId/achievements", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userAchievements = await storage.getUserAchievements(userId);
      const allAchievements = await storage.getAllAchievements();
      
      const achievementsWithDetails = userAchievements.map(ua => {
        const achievement = allAchievements.find(a => a.id === ua.achievementId);
        return { ...ua, achievement };
      });
      
      res.json(achievementsWithDetails);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user achievements" });
    }
  });

  // Learning path routes
  app.get("/api/users/:userId/learning-paths", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const paths = await storage.getUserLearningPaths(userId);
      res.json(paths);
    } catch (error) {
      res.status(500).json({ message: "Failed to get learning paths" });
    }
  });

  app.post("/api/learning-paths", async (req, res) => {
    try {
      const data = insertLearningPathSchema.parse(req.body);
      const path = await storage.createLearningPath(data);
      res.status(201).json(path);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid learning path data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create learning path" });
    }
  });

  app.put("/api/learning-paths/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const path = await storage.updateLearningPath(id, updates);
      if (!path) {
        return res.status(404).json({ message: "Learning path not found" });
      }
      res.json(path);
    } catch (error) {
      res.status(500).json({ message: "Failed to update learning path" });
    }
  });

  // Activity routes
  app.get("/api/users/:userId/activities", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const activities = await storage.getUserActivities(userId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to get activities" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const data = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(data);
      res.status(201).json(activity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid activity data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create activity" });
    }
  });

  // Dashboard data endpoint
  app.get("/api/users/:userId/dashboard", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      const [user, projects, skills, userAchievements, activities] = await Promise.all([
        storage.getUser(userId),
        storage.getUserProjects(userId),
        storage.getUserSkills(userId),
        storage.getUserAchievements(userId),
        storage.getUserActivities(userId)
      ]);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const currentProject = projects.find(p => p.status === "active");
      let projectStages: any[] = [];
      
      if (currentProject) {
        projectStages = await storage.getProjectStages(currentProject.id);
      }

      const allAchievements = await storage.getAllAchievements();
      const achievementsWithDetails = userAchievements.slice(0, 3).map(ua => {
        const achievement = allAchievements.find(a => a.id === ua.achievementId);
        return { ...ua, achievement };
      });

      const dashboardData = {
        user,
        currentProject,
        projectStages,
        skills,
        recentAchievements: achievementsWithDetails,
        recentActivities: activities.slice(0, 5),
        stats: {
          projectsCompleted: projects.filter(p => p.status === "completed").length,
          totalProjects: projects.length,
          hoursThisWeek: 28.5, // This would be calculated from activity data
          collaborations: 8, // This would be calculated from collaboration activities
        }
      };

      res.json(dashboardData);
    } catch (error) {
      res.status(500).json({ message: "Failed to get dashboard data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
