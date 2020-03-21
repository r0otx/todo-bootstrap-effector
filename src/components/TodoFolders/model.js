import {createEffect, createEvent, createStore} from "effector";
import {todoAPI} from "../../api/api";
import {$folders} from "../../effector/model"

//Get all folders
export const getFolders = createEffect("Get Folders").use(async () => {
    return await todoAPI.getTodoList();
});

$folders.on(getFolders.done, (state, {result}) => result.data);

//Input state
const textChanged = createEvent("Input Text");
export const somethingAdded = createEvent();
export const onTextChanged = textChanged.prepend((event) => event.currentTarget.value);
export const $input = createStore("")
    .on(textChanged, (state, title) => title)
    .reset(somethingAdded);

//Add new folder
export const setFolder = createEffect("Add Folder").use( async (title) => {
    return await todoAPI.postTodoItem(title);
});

$folders.on(setFolder.done, (state, {result}) => [result.data.data.item, ...state]);

//Delete folder
export const delFolder = createEffect("Delete Folder").use( async (id) => {
    return await todoAPI.deleteTodoItem(id);
});

export const folderDeleted = createEvent();

delFolder.done.watch(({params}) => {
    folderDeleted(params);
});

$folders.on(folderDeleted, (state, payload) => state.filter(folder => folder.id !== payload));