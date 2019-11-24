process.stdin.on("data", (data) => {
    const reversedData = data.toString().trim().split("").reverse().join("") + "\n";
    process.stdout.write(reversedData);
})