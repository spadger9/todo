import { Todo } from "./../../list-todos/list-todos.component";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL, API_JPA_URL } from "src/app/app.constants";

@Injectable({
  providedIn: "root",
})
export class TodoDataService {
  constructor(private http: HttpClient) {}

  retrieveAllToDos(name) {
    return this.http.get<Todo[]>(`${API_JPA_URL}/users/${name}/todos`);
  }

  deleteToDos(name, id) {
    return this.http.delete(`${API_JPA_URL}/users/${name}/todos/${id}`);
  }

  findToDo(name, id) {
    return this.http.get<Todo>(`${API_JPA_URL}/users/${name}/todos/${id}`);
  }
  updateToDo(name, id, todo) {
    return this.http.put(`${API_JPA_URL}/users/${name}/todos/${id}`, todo);
  }

  createToDo(name, todo) {
    return this.http.post(`${API_JPA_URL}/users/${name}/todos`, todo);
  }
}
