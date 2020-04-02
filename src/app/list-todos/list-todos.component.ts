import { Component, OnInit } from "@angular/core";

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}

@Component({
  selector: "app-list-todos",
  templateUrl: "./list-todos.component.html",
  styleUrls: ["./list-todos.component.css"]
})
export class ListTodosComponent implements OnInit {
  todos = [
    new Todo(1, "Learn Angular", false, new Date()),
    new Todo(2, "Visit Greece", false, new Date()),
    new Todo(3, "Visit Nepal", true, new Date()),
    new Todo(4, "Eat something..", false, new Date()),
    new Todo(5, "Should find a suit pasal and get a suit..", false, new Date())

    // { id: 2, description: "Visit Greece" },
    // { id: 3, description: "Visit Nepal" },
    // { id: 4, description: "Eat something..." },
    // { id: 5, description: "Should find a suit pasal and get a suit.." }
  ];

  // todo = {
  //   id: 1,
  //   description: "Eat food"
  // };

  constructor() {}

  ngOnInit() {}
}
