import express from 'express'
import Task from './routes/task.js'
const app = express()


app.use(express.json());
app.use(Task);

export default app;
