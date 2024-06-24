import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import TaskModel from './models/task.model';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import { TaskDto } from './dto/CreateTask.dto';

dotenv.config();

const app = express();

app.use(cors({
    origin: ["http://localhost:8081"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json({limit : '100mb'}))

app.use(bodyParser.json({ limit: '1000mb' })); 

app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true })); 

const PORT = process.env.PORT;
const mongo_url = process.env.MONGO_URL;

mongoose.connect(`${mongo_url}`)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); // Filename format
    }
});

const upload = multer({ storage });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

app.post('/api/newTask', async (request: Request, response: Response) => {
    try {
        const existingTasksCount = await TaskModel.countDocuments();
        const taskNum = existingTasksCount + 1;

        const newTask = await TaskModel.create({
            completed: request.body.completed,
            image_url: request.body.image_url,
            header: request.body.header,
            context: request.body.context,
            taskNum: taskNum,
            deadline: request.body.deadline,
            hashtags: request.body.hashtags,
            extensions: request.body.extensions,
        })

        return response.status(200).json({ massage: 'ok', task: newTask })
    } catch (err) {
        return response.status(500).json({ massage: err })
    }
})

app.get('/api/getTasks', async (request: Request, response: Response) => {
    try {
        const tasks = await TaskModel.find({})

        return response.status(200).json({ tasks: tasks })
    } catch (err) {
        return response.status(500).json({ massage: err })
    }
})

app.post('/api/getSingleTask', async (request: Request, response: Response) => {
    try {
        const task = await TaskModel.find({ _id: request.body.id })

        response.status(200).json({ massage: 'ok', task: task })
    } catch (err) {
        return response.status(500).json({ massage: err })
    }
})

app.post('/api/updateTask', async (request: Request, response, Response) => {
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(request.body.id, {
            completed: request.body.completed,
            header: request.body.header,
            context: request.body.context,
            hashtags: request.body.hashtags,
            extensions: request.body.extensions,
            image_url:request.body.image_url
        }, { new: true })

        response.status(200).json({ massage: 'ok' })
    } catch (err) {
        return response.status(500).json({ massage: err })

    }
})

app.post('/api/deleteTask', async (request: Request, response, Response) => {
    try {
        const task = await TaskModel.findByIdAndDelete(request.body.id)

        response.status(200).json({ massage: 'ok' })
    } catch (err) {
        return response.status(500).json({ massage: err })
    }
})

app.get('/hello', (request: Request, response: Response) => {
    response.send('hiii');
})