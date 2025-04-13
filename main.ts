import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

// Initialize storage
const storageFile = "tasks.json";
let tasks = [];

try {
  const data = await Deno.readTextFile(storageFile);
  tasks = JSON.parse(data);
} catch {
  // File doesn't exist, initialize with empty array
  tasks = [];
}

async function saveTasks() {
  await Deno.writeTextFile(storageFile, JSON.stringify(tasks));
}

const app = new Application();
const router = new Router();

// Serve static files
app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/static`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

// API Routes
router
  .get("/api/tasks", (context) => {
    context.response.body = tasks;
  })
  .post("/api/tasks", async (context) => {
    const { title } = await context.request.body().value;
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };
    tasks.push(newTask);
    await saveTasks();
    context.response.body = { message: "Task created successfully" };
  })
  .put("/api/tasks/:id", async (context) => {
    const id = parseInt(context.params.id);
    const { completed } = await context.request.body().value;
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = completed;
      await saveTasks();
      context.response.body = { message: "Task updated successfully" };
    } else {
      context.response.status = 404;
      context.response.body = { message: "Task not found" };
    }
  })
  .delete("/api/tasks/:id", async (context) => {
    const id = parseInt(context.params.id);
    tasks = tasks.filter(t => t.id !== id);
    await saveTasks();
    context.response.body = { message: "Task deleted successfully" };
  });

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 }); 