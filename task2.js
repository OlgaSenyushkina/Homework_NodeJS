const csv = require('csvtojson');
const readline = require('readline');
const filePath = "./node_mentoring_t1_2_input_example.csv";

const readStream = require('fs').createReadStream(filePath);
const writeStream = require('fs').createWriteStream("homework.txt");

const rl = readline.createInterface({
    input: readStream
});

let header = null;
rl.on("line", line => {
    if (!header) {
        header = line.toLowerCase();
    } else {
        csv({
            includeColumns: /book|author|price/
        })
            .fromString(header + "\n" + line)
            .pipe(writeStream);
    }    
});