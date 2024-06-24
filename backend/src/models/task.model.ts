import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface Extension {
    name: string,
    text: string
}

export interface Task extends Document {
    completed: boolean,
    image_url: string,
    header: string,
    context: string,
    taskNum: number,
    deadline: Date,
    hashtags: string[],
    extensions: Extension[]
}

const TaskSchema: Schema = new Schema({
    completed: {
        type: Boolean,
        required: true
    },
    image_url: {
        type: String
    },
    header: {
        type: String,
        required: true
    },
    context: {
        type: String,
        required: true
    },
    taskNum: {
        type: Number,
        required: true,
    },
    deadline: {
        type: Date
    },
    hashtags: {
        type: Array
    },
    extensions: {
        type: Array
    }
});

const TaskModel = mongoose.model<Task>('Task', TaskSchema);

export default TaskModel;
