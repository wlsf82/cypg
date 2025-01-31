const express = require('express');
const { connectDB } = require('./db');
const cors = require('cors');
const employeesRoutes = require('./routes/employeesRoutes');

const app = express();

app.use(cors());

const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/employees', employeesRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
