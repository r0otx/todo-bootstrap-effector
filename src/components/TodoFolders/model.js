import {createEffect, createEvent, createStore} from "effector";
import {todoAPI} from "../../api/api";
import {$folders} from "../../effector/model"

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

$folders.on(delFolder.done, (state, payload) => state.filter(folder => folder.id !== payload.params));