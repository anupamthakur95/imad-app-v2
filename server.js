var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var config={
    user:'anupamthakur95',
    database:'anupamthakur95',
    host:'db.imad.hasura.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2",10000,salt, hashed.toString('hex')].join('$');
}
app.get('/hash/input',function(req,res)
{
    var hashedString=hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});
app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.RandomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user"(username,password)VALUES(&1,&2)',[username,dbString],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        } else{
            res.send('user successfully created'+username);
        }
        
    } );
});
    var pool=new pool(config);
    app.get('/test-db',function(req,res){
        pool.query('SELECT * FROM test',function(err,result){
            if(err){
            res.status(500).send(err.toString());
        } else{
            rse.send(JSON.stringify(result.rows));
        }
        });
});




app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/anu.png ', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'anu.png '));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
