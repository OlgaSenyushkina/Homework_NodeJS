const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin
});

rl.on("line", (data) => {
    const reversedData = data.toString().trim().split("").reverse().join("") + "\n";
    process.stdout.write(reversedData);
})