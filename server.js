const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authroutes = require('./routes/authroutes');  
const taskroutes = require('./routes/taskroutes');  

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/auth', authroutes); 
app.use('/api/task', taskroutes); 

const PORT = process.env.PORT || 5001;
mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
