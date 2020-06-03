const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const path = require('path')
const url = "mongodb://localhost:27017"


const app = express()

const urlencodedParser = bodyParser.urlencoded({ extended: true})

const dbName = 'employeedb'
const collectionName = 'todo'




//connect to mongodb

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client){
    if(err) throw err;
    console.log("Connected to database")
    const dbo = client.db(dbName)
        dbo.createCollection(collectionName, function(err, res){
        if(err) throw err
        console.log("todo collection created")
        client.close()
        
    })
})



//set up template engine
app.set('view engine', 'ejs')

//static files
app.use(express.static('./public'))


//body parser for displaying contents in text
app.use(bodyParser.text())

//body parser for accessing contents of the post request
app.use(bodyParser.urlencoded({ extended: true}))

//set up routes
app.get('/', function(req, res){
    res.render('homeView')
})

app.get('/sow_seeds', urlencodedParser, function(req, res){
    res.render('sow_seeds_view')
    
});

app.get('/chatroom', urlencodedParser, function(req, res){
  res.render('chatroom_view')
  
});

    
//get complete list of employees and their todolist and render it in todolist view
app.get('/pay_tithe', function(req, res){
    res.render('pay_tithe_view') 

    })

    app.get('/testimonies', urlencodedParser, function(req, res){
      res.render('testimonies_view')
      
  });
    
app.get('/pay_offertory', function(req, res){
    res.render('pay_offertory_view')
})

//get tithe values and re-render page
app.get('/donate', urlencodedParser, function(req, res){
     res.render('donations_view')
    
});



//get user credentials and re-render page
app.post('/pay_offertory', urlencodedParser, function(req, res){
  res.render('pay_offertory_view')
 
});

//get tithe values and re-render page
app.post('/pay_tithe', urlencodedParser, function(req, res){
     res.render('pay_tithe_view')
    
});

//get sow seeds values and re-render page
app.post('/sow_seeds', urlencodedParser, function(req, res){
     res.render('sow_seeds_view')
    
});

//listen to port
app.listen(3000)
console.log('listening on port 3000')