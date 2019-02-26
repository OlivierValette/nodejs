const https = require('https');

https.get('https://jsonplaceholder.typicode.com/posts/1', function(res) {
    let data = '';
    res.on('data', function(chunk) {
        data += chunk;
    });
    res.on('end', function() {
        const post = JSON.parse(data);
        console.log(post.title, post.body);
    });
}).on('error', function(error) {
    console.log('error: ', error);
});