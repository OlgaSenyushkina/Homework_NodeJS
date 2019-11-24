import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import csv from "csvtojson";

const filePath = "./node_mentoring_t1_2_input_example.csv";
const nameFile = "homework_task3.txt";
const regExp = /book|author|price/i;

pipeline(
    createReadStream(filePath),
    csv({ 
        includeColumns: regExp
    }),
    createWriteStream(nameFile)
)