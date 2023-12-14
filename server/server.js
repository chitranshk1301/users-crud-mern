const express = require('express');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', require('./routes/users'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    }
);