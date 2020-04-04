import * as axios from "axios";

const httpClient = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "0c4347f8-5d25-4f91-a508-15a0777b08c3"
    }
});

export const authAPI = {};

export const todoAPI = {
    getTodoFolders() {
        return httpClient.get(`todo-lists`);
    },
    postTodoFolder(title) {
        return httpClient.post(`todo-lists`, {title});
    },
    deleteTodoFolder(id) {
        return httpClient.delete(`todo-lists/${id}`);
    },
    renameTodoFolder(id, name) {
        return httpClient.put(`todo-lists/${id}`, {title: name})
    },
    getTasks(tasklistid) {
        return httpClient.get(`todo-lists/${tasklistid}/tasks`);
    },
    postTask(params) {
        return httpClient.post(`todo-lists/${params.id}/tasks`, {title: params.title, description: params.description});
    },
    delTask(params) {
        return httpClient.delete(`todo-lists/${params.listId}/tasks/${params.taskId}`)
    },
    completedTask(params) {
        return httpClient.put(`todo-lists/${params.todoListId}/tasks/${params.id}/`, {title: params.title,
            description: params.description,
            status: 1,})
    },
    renameTodoTask(params) {
        return httpClient.put(`todo-lists/${params.showTaskItem.listId}/tasks/${params.showTaskItem.taskId}/`, {title: params.values.title})
    },
};