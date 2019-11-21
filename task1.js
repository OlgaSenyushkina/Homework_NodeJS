// let value = process.argv[2] || "";
// console.log("input: ", value);

// let newValue = value.split("").reverse().join("");
// console.log("outnput: ", newValue);


process.stdin.on("data", (data) => {
    const reversedData = data.toString().trim().split("").reverse().join("") + "\n";
    process.stdout.write(reversedData);
})