const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

var database = [] //making an empty array to test putting items into a database

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Its ya test node server' });
});
app.post('/api/world', (req, res) => {
    console.log(req.body);

    database.push(req.body); //adding the results from the post method into the database
    console.log(database) //logging the contents of the db

    res.send(
        `The user currently in the system is: ${req.body.post}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));


