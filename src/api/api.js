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
    getTodoList() {
        return httpClient.get(`todo-lists`);
    },
    postTodoItem(title) {
        return httpClient.post(`todo-lists`, {title});
    },
    deleteTodoItem(id) {
        return httpClient.delete(`todo-lists/${id}`);
    },
    renameTodoItem(id, name) {
        return httpClient.put(`todo-lists/${id}`, {title: name})
    }
};