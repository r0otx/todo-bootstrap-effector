import {createEffect, createEvent, createStore} from "effector";
import {todoAPI} from "../../api/api";
import {$folders, $tasks} from "../../effector/model"

//Input state
const textChanged = createEvent("Input Text");
export const somethingAdded = createEvent();
export const onTextChanged = textChanged.prepend((event) => event.currentTarget.value);
export const $input = createStore("")
    .on(textChanged, (state, title) => title)
    .reset(somethingAdded);

//Selected folder
export const selectedFolder = createEvent("Folder ID");
export const $selectedFolder = createStore("").on(selectedFolder, ((state, payload) => payload));

//Get all folders
export const getFolders = createEffect("Get Folders").use(async () => {
    return await todoAPI.getTodoFolders();
});

$folders.on(getFolders.done, (state, {result}) => result.data);

//Add new folder
export const setFolder = createEffect("Add Folder").use( async (title) => {
    return await todoAPI.postTodoFolder(title);
});

$folders.on(setFolder.done, (state, {result}) => [result.data.data.item, ...state]);

//Delete folder
export const delFolder = createEffect("Delete Folder").use( async (id) => {
    return await todoAPI.deleteTodoFolder(id);
});

export const folderDeleted = createEvent();

delFolder.done.watch(({params}) => {
    folderDeleted(params);
});

$folders.on(folderDeleted, (state, payload) => state.filter(folder => folder.id !== payload));

//Get tasks
export const getTasks = createEffect("Get tasks from folder").use(async (tasklistid) => {
   return await todoAPI.getTasks(tasklistid);
});

$tasks.on(getTasks.done, (state, {result}) => result.data.items);