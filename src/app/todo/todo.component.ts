import { ActivatedRoute, Router } from "@angular/router";
import { Todo } from "./../list-todos/list-todos.component";
import { TodoDataService } from "./../service/data/todo-data.service";
import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  id: number;
  todo: Todo;
  passedId: number;

  constructor(
    private todoDataService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    //this.getCovidData();
    //this.id = this.route.snapshot.params["id"];
    this.id = this.passedId;
    this.todo = new Todo(this.id, "", false, new Date());

    if (this.id != -1) {
      this.todoDataService
        .findToDo("shrawin", this.id)
        .subscribe((data) => (this.todo = data));
    }
  }

  saveToDo() {
    if (this.id < 0) {
      this.todoDataService
        .createToDo("shrawin", this.todo)
        .subscribe((data) => {
          console.log(data);
          this.close();
          //this.router.navigate(["todos"]);
        });
    } else {
      this.todoDataService
        .updateToDo("shrawin", this.id, this.todo)
        .subscribe((data) => {
          console.log(data);
          this.close();
          //this.router.navigate(["todos"]);
        });
    }
  }

  close() {
    this.bsModalRef.hide();
    this.router.navigate(["todos"], {
      queryParams: { refresh: new Date().getTime() },
    });
  }
}
