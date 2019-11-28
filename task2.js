const csv = require('csvtojson');
const { pipeline } = require('stream');
const fs = require('fs');

const filePath = "./node_mentoring_t1_2_input_example.csv";
const nameFile = "homework_task2.txt";
const regExp = /book|author|price/i;

pipeline(
    fs.createReadStream(filePath),
    csv({ 
        includeColumns: regExp,
    }),
    fs.createWriteStream(nameFile),
    (err) => {
        if (err) {
          console.error('Pipeline failed.', err);
        } else {
          console.log('Pipeline succeeded.');
        }
    }
)