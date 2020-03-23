import {createEffect, createEvent, createStore} from "effector";
import {todoAPI} from "../../api/api";
import {$tasks} from "../../effector/model";

//Input state title
const textChanged = createEvent("Input Text");
export const somethingAdded = createEvent();
export const onTextChanged = textChanged.prepend((event) => event.currentTarget.value);
export const $input = createStore("")
    .on(textChanged, (state, title) => title)
    .reset(somethingAdded);

//Add new task
export const setTask = createEffect("Add Task").use( async (params) => {
    return await todoAPI.postTask(params);
});

$tasks.on(setTask.done, (state, {result}) => [result.data.data.item, ...state]);

//Delete task
export const delTask = createEffect("Delete Task").use(async (params) => {
    return await todoAPI.delTask(params);
});

delTask.done.watch(({params}) => {
    console.log(params.taskId);
});

$tasks.on(delTask.done, (state, params) => state.filter(task => task.id !== params.taskId));