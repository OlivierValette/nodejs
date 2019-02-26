const https = require('https');
const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

const githubOptions = {
        hostname: 'api.github.com',
        method: 'GET',
        headers: { 'User-Agent': 'OlivierValette-gitapitest', 'Content-Type': 'application/json'}
};

// get repositories of user 'gitUsername'
// return data with callback function (as it is an asynchronous process)
function getRepos(gitUser, callback) {
    https.get({...githubOptions, path: '/users/' + gitUser + '/repos'},res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => callback(JSON.parse(data)))
    });
}

// get repository of user 'gitUsername'
// return data with callback function (as it is an asynchronous process)
function getRepo(gitUser, repoName, callback) {
    https.get({...githubOptions, path: '/users/' + gitUser + '/repos' + repoName},res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => callback(JSON.parse(data)))
    });
}

// ask Git username and call getRepo
rl.question('Quel est votre user Git ?\n', gitUsername => {
    getRepos(gitUsername, repos => {
        console.log("\nListe des repos de l'utilisateur " + gitUsername);
        for (let i = 0; i < repos.length; i++) {
            console.log(repos[i].name)
        }
    });
    rl.close();
});

