import { Router } from 'express';
import { countTask, createTask, deleteTask, getTasks, getTask  ,updateTask } from '../controllers/task.controller.js';


const router = Router();

router.get("/task", getTasks);
router.get("/task", getTask);
router.get("/task/count", countTask);
router.put("/task/:id", updateTask);
router.post("/task", createTask);
router.put("/task/:id", createTask);
router.delete("/task/:id", deleteTask);


export default router;
