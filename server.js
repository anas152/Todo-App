import express, { request, response } from 'express'
const app = express()
const port = 5001
const todos = [];



app.use(express.json())

// yah api sa todo ko lena ka lia ha 
app.get('/all-todos', (request, response) => {
  response.send(todos)
})


// for post on new todo on browser
app.post("/add-todo", (request, response) => {
  todos.push(request.body.todo)
  response.send("send first todo")
})

// for edit only single todo 
app.patch('/edit-todo/:id', (request, response) => {

})

//for delete only single todo 
app.delete('/delete-solo-todo/:id', (request, response) => {

})




//
app.use((request, response) =>{
  response.status(404).send('No Route Found 404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})