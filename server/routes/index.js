var express = require('express');
var router = express.Router();

var path = require('path');
var bodyParser = require('body-parser');
const mysql = require('mysql2');

(async () => {

  const sql = require('../public/javascripts/SQL')
  
  const client = await sql.Usuarios()

  console.log(client)
  
  
  router.get("/api", (req, res) => {
    res.json(client);
  });


  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
  });

/* POST home page. */
  router.post('/post', function(req, res, next) {
    
    if (req.body.password && req.body.user != '') {
      sql.Add({user: req.body.user, password: req.body.password })//Add funciona
    }
    // res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
  });

  router.post('/update', function(req, res, next){//acho que tenho qu mudar de postr para outra coisa
    
    const id = req.body.id

    let verificado = client.find(element => element['idnew_table'] == id);

    //Tem que colocar o ID dinamico para ser alterado
    if (req.body.password && req.body.user && req.body.id != '' && verificado != undefined) {
      sql.Update(id,{user: req.body.user, password: req.body.password})//Update funciona
    }

  });

  router.post('/delete', function(req, res, next){

    const id = req.body.id

    let verificado = client.find(element => element['idnew_table'] == id);

    if(req.body.id != '' && verificado != undefined){
      sql.Delete(id)//Delete funciona
    }
    // res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
  });

})()
module.exports = router;
