var express = require('express');
var app=express();
var hastir=new Array();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
var sql=require('sqlite3').verbose();
var db = new sql.Database('memory:');
db.serialize(function() {
    //db.run("CREATE TABLE Blogpost ( ID INTEGER PRIMARY KEY   AUTOINCREMENT, header TEXT,article TEXT)");
});
app.get('/',function (req,res) {
    res.sendFile(__dirname+'/index.html');
});
app.get('/deneme',function (req,res) {
    var rowing= {rok:[]};
  var satir=new Array();
  var falan=" ";
  var kar;
    db.each("SELECT Id,header,article FROM blogpost", function(err, row) {
        kar={id:row['ID'],head:row['header'],artik:row['article']};
        console.log(kar.id+kar.head+" Kar yazıldı");
        console.log(row);
         hastir.push(kar);
        console.log("calistim");
        olaylar=true;
    });
       res.redirect('/deneme2');
       // res.send("<html>" + satir + satir.pop() + " " + satir.pop() + satir.length + "</html>");
});
app.get('/deneme2',function (req,res) {
    res.send("A"+hastir+" "+hastir.length+hastir.pop().artik+hastir+""+hastir.pop().artik);
});

app.get('/addpost',function (req,res) {
    res.sendFile(__dirname+'/addpost.html')
});
app.post('/add',function (req,res) {
    console.log("add çalıştı");
    var k=req.body.header;
    var artik=req.body.artik;
    console.log(req.body.artik+" yazzz");
    console.log(k);
    var stmt = db.prepare("INSERT INTO blogpost (header,article) VALUES (?,?)");
    stmt.run(k,artik);
    stmt.finalize();
    res.status(200).send("");
});
app.get('/post:name',function (req,res) {
    var whichpost=req.param.name;
});
var server = require('http').createServer(app);
server.listen(4000);

console.log("Connecting 3000 port");