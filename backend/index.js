const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors());


mongoose
  .connect('mongodb+srv://vismayashankar:mymongoias@cluster0.kvq8zfx.mongodb.net/todo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const Todo = mongoose.model('Todo', {
  description: String,
  completed: Boolean,
});

app.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/create', async (req, res) => {
  try {
    const { description, completed } = req.body;
    const todo = new Todo({
      description,
      completed,
    });
    await todo.save();
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    await Todo.findByIdAndUpdate(id, { completed });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







app.delete('/delete/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/filter/api/todos', async (req, res) => {
    try {
      const { text, completed } = req.body;
      const todo = new Todo({ text, completed });
      await todo.save();
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });


const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
