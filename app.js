const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/', function(req, res) {
    var url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    var p = url.searchParams.get('p');
    var c = url.searchParams.get('c');
    if(p !== null) {
        res.redirect('https://rdrama.net/post/'+p);
    }
    else if(c !== null) {
        res.redirect('https://rdrama.net/comment/'+c+'/?context=5#context');
    }
    else {
        res.sendFile(path.join(__dirname, '/content/index.html'));
    }
});

app.get('/post/:postid', function (req, res) {
    let pid = req.params.postid;
    res.redirect('https://rdrama.net/post/'+pid);
});

app.get('/comment/:commentid', function (req, res) {
    let cid = req.params.commentid;
    res.redirect('https://rdrama.net/comment/'+cid+'/?context=5#context');
});

app.get('/content/:fileid', function (req, res) {
    let fid = req.params.fileid;
    res.sendFile(path.join(__dirname, '/content/'+fid));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});