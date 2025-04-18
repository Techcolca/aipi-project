import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add CORS headers for widget integration
app.use((req, res, next) => {
  // Allow requests from any origin
  res.header("Access-Control-Allow-Origin", "*");
  
  // Allow specific headers
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-api-key");
  
  // Allow specific methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(204).send();
  }
  
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  // En Replit, siempre usamos la configuración de desarrollo
  // para evitar problemas de acceso a la aplicación
  const isReplit = process.env.REPL_ID !== undefined;
  if (app.get("env") === "development" || isReplit) {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Serving the app on port 3000 for deployment compatibility
  // this serves both the API and the client.
  // Changed from 5000 to 5017 to avoid port conflicts in deployment.
  const port = 3000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
