const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Quel est votre prénom ?\n', (firstname) => {
    console.log(`Bonjour ${firstname}`);
    rl.close();
});