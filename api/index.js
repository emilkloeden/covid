const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require('fs');
const path = require("path");

const app = express();

const PORT = 3001;

app.use(cors());

app.get('/', (req, res) => {
    fs.readFile(path.resolve(__dirname, 'data.json'), (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });

});


app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));