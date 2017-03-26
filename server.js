var express        = require('express');
var app            = express();
var http           = require("http").Server(app);
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json()); 
mongoose.connect('mongodb://localhost/belajarmean');
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',function(req,res,next){
    res.send('hello world');
});
var Barang = mongoose.model('barang', {
                namabarang : {type : String},
                stok : {type:String},
                status : {type : String, default: ''}
            });
app.get("/data/api",function(req,res,next){
    Barang.find().exec().then(function(docs){
        res.json(docs);
    })
})
app.post("/data/api",function(req,res,next){
     var Barangbaru = new Barang();
 		    Barangbaru.namabarang = req.body.namabarang;
             Barangbaru.stok = req.body.stok;
             Barangbaru.status = req.body.status;
		        Barangbaru.save(function(){
    	            res.end()
 	        })
        });
app.put("/data/api",function(req,res,next){
    var  namabarang = req.body.namabarang;
    var stok = req.body.stok;
    var status = req.body.status;
    var id = req.body.id;
    Barang.update({_id:id},{$set:{
        namabarang:namabarang,
        stok:stok,
        status:status
    }},function(){
         res.end();
    })
});
app.delete("/data/api/:id",function(req,res,next){
      var id = req.params.id;
       Barang.remove({_id:id},function(){
       res.end();
    })
})

http.listen('80');