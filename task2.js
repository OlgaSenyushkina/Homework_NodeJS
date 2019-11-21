import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import csv from "csvtojson";

const filePath = "./node_mentoring_t1_2_input_example.csv";

const readStream = createReadStream(filePath);
const writeStream = createWriteStream("homework.txt");

pipeline(
    readStream,
    csv({ includeColumns: /book|author|price/i }),
    writeStream
)