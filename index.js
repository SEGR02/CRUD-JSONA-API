const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const PORT = 8000;
const app = express();
const jsonPath = path.resolve('./files/todo.json');

app.use(express.json());

app.get('/tasks', async (req, res)=>{
  const toDoList = await fs.readFile(jsonPath, 'utf-8');
  console.log(toDoList);
  res.end();
});

app.post('/tasks', async (req, res)=>{
  const toDoList = await fs.readFile(jsonPath, 'utf-8');
  const toDoForAdd = req.body;
  const toDoArray = JSON.parse(toDoList);
  const toDoIndex = toDoArray.length -1;
  const toDoNewId = toDoArray[toDoIndex].id +1;
  toDoForAdd.id = toDoNewId;
  toDoArray.push(toDoForAdd);
  console.log(toDoArray);
  await fs.writeFile(jsonPath,JSON.stringify(toDoArray));
  res.end();
});

app.put('/tasks', async(req, res)=>{
  const toDoList = await fs.readFile(jsonPath,"utf-8");
  const toDoForEdit = req.body;
  res.write("Please put in body an array with id and status");
  const toDoArray = JSON.parse(toDoList);
  for(let i = 0; i<toDoArray.length; i++){
    if(toDoForEdit.id === toDoArray[i].id) {
      toDoArray[i].status = toDoForEdit.status
    } else{
      res.write(' WRONG ID');
    }
  }
  console.log(toDoArray);
  await fs.writeFile(jsonPath, JSON.stringify(toDoArray));
  res.end();
});

app.delete('/tasks', async (req, res, next)=>{
  const toDoList = await fs.readFile(jsonPath, 'utf-8');
  const toDoArray = JSON.parse(toDoList);
  res.write('Please put an array with id');
  const toDoForDelete = req.body;
  for(let i = 0; i<toDoArray.length; i++){
    if(await toDoForDelete.id === toDoArray[i].id){
       toDoArray.splice(i,1)
      } else{
        res.write(" WRONG ID");
      }
  }
  console.log(toDoArray);
  await fs.writeFile(jsonPath, JSON.stringify(toDoArray));
  res.end();
});

app.listen(PORT);
console.log(`Escuchando en el puerto ${PORT}`);