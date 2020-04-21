import { BsModalRef } from "ngx-bootstrap/modal";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { TodoDataService } from "./../service/data/todo-data.service";
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  EventEmitter,
} from "@angular/core";
import { Subject } from "rxjs";
import { BsModalService } from "ngx-bootstrap/modal";
import { TodoComponent } from "../todo/todo.component";

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}

  /* ngOnDestroy(): void {
    this.destroy.next();
    //throw new Error("Method not implemented.");
  } */
}

@Component({
  selector: "app-list-todos",
  templateUrl: "./list-todos.component.html",
  styleUrls: ["./list-todos.component.css"],
})
export class ListTodosComponent implements OnInit {
  todos: Todo[];
  message: String;
  currentDialog = null;
  bsModalRef: BsModalRef;

  constructor(
    private service: TodoDataService,
    private router: Router,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dataRefresh();

    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      const refresh = paramMap.get("refresh");

      if (refresh) {
        this.dataRefresh();
      }
    });
  }

  dataRefresh() {
    this.service.retrieveAllToDos("shrawin").subscribe((response) => {
      console.log(response);
      this.todos = response;
    });
  }

  deleteToDo(id) {
    console.log(`TODO ${id} was deleted.`);
    this.service.deleteToDos("Shrawin", id).subscribe((response) => {
      console.log(response);
      this.message = `Delete of Todo ${id} successful!`;
      this.dataRefresh();
    });
  }
  updateToDo(id) {
    const initialState = { passedId: id };
    this.bsModalRef = this.modalService.show(TodoComponent, { initialState });
    this.bsModalRef.content.closeBtnName = "Close";

    console.log(`TODO ${id} update.`);
    this.message = `Update of Todo ${id} successful!`;
  }

  addToDo() {
    console.log(`New button clicked.`);
    const initialState = { passedId: -1 };
    this.bsModalRef = this.modalService.show(TodoComponent, { initialState });
    this.bsModalRef.content.closeBtnName = "Close";
    this.message = `New ToDo created`;

    // this.dataRefresh();
  }
}
