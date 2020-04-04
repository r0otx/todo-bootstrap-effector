import {createEffect, createEvent} from "effector";
import {todoAPI} from "../../api/api";
import {$tasks} from "../../effector/model";

//Get set folder tasks
export const getTasks = createEffect("Get tasks from folder").use(async (tasklistid) => {
    return await todoAPI.getTasks(tasklistid);
});

$tasks.on(getTasks.done, (state, {result}) => result.data.items);

//Add new task
export const setTask = createEffect("Add Task").use( async (params) => {
    return await todoAPI.postTask(params);
});

$tasks.on(setTask.done, (state, {result}) => [result.data.data.item, ...state]);

//Delete task
export const delTask = createEffect("Delete Task").use(async (params) => {
    return await todoAPI.delTask(params);
});

$tasks.on(delTask.done, (state, params) => state.filter(task => task.id !== params.params.taskId));

//Completed task
export const completedTask = createEffect("Completed Task").use(async (params) => {
   return await todoAPI.completedTask(params);
});

$tasks.on(completedTask.done, (state, params) => [...state].find(task => task.id === params.params.id));

//Sort tasks
export const sortDone = createEvent("Sort Done task");
$tasks.on(sortDone, (state) => [...state].sort((a, b) => b.status - a.status));

//Rename task
export const renameTask = createEffect("Rename Task").use(async (params) => {
    return await todoAPI.renameTodoTask(params);
});

$tasks.on(renameTask.done, (state, params) => {
    [...state].forEach((task, i) => { if (task.id === params.params.showTaskItem.taskId) state[i].title = params.params.values.title});
    console.log(state);
});