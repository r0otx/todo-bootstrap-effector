import {combine, createStore} from "effector";

export const $folders = createStore([]);
export const $tasks = createStore([]);


const $store = combine({
    folders: $folders,
    tasks: $tasks
});

export default $store;