const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const app = express();
app.listen(2000, ()=> console.log('listening at 2000'));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));


const database = new Datastore('database.db');
database.loadDatabase();
// database.insert({name: 'Shreefman', status:'rainbow'});
//  database.deleteRow({name: 'Daniel', status:'rainbow',_id:"KsGEXV9Vt7r6OCbH"});
// database.remove({ _id: "KsGEXV9Vt7r6OCbH" }, {}, function (err, numRemoved) {
//     console.log('removed');
//   })
app.get('/api',(request, response)=>{
    database.find({},(err,data)=>{
        if(err){
            response.end();
            return;
        }
        response.json(data); 
    });
    
});

app.post('/api',(request, response) =>{
    console.log('I got a request!');
    
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    
    // response.end();
    response.json(data);
});
app.get('/weatherUrl/:latlon',async (request,response)=> {
    console.log(request.prams);
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);
    

    const api_url='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=6dea53f9062319f8eee781bac79a28de';
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    console.log(json);
    response.json(json);
});
