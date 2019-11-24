const csv = require('csvtojson');
const { pipeline } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

const filePath = "./node_mentoring_t1_2_input_example.csv";
const nameFile = "homework_task2.txt";
const regExp = /book|author|price/i;

pipeline(
    createReadStream(filePath),
    csv({ 
        includeColumns: regExp,
    }),
    createWriteStream(nameFile)
)