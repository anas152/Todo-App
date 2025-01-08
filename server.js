import express, { request, response } from "express";
const app = express();
const port = process.env.PORT || 5001;
const todos = [];

app.use(express.json()); // to convert body into json (body = ppost man body jis ma sare encrypted data hota ha)

// yah api sa todo ko lena ka lia ha
app.get("/all-todos", (request, response) => {
  response.send(todos);
});

// for post on new todo on browser
app.post("/add-todo", (request, response) => {
  todos.push({ todoContent: request.body.todo, id: new Date().getTime() });
  response.send("first todo");
});

// for edit only single todo
app.patch("/edit-todo/:id", (request, response) => {
  const id = parseInt(request.params.id);
  for (let index = 0; index < todos.length; index++) {
    if (todos[index].id === id) {
      // Compare with converted number
      todos[index].todoContent = request.body.todoContent;
      break;

    }
  }
  response.status(201).send("Todo Updated Sucussfully!");
});

//for delete only single todo
app.delete("/delete-solo-todo/:id", (request, response) => {});

//
app.use((request, response) => {
  response.status(404).send("No Route Found 404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
