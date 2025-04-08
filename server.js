const express = require('express')
const path = require('path');
const fs=require('fs');
const { json } = require('stream/consumers');

const app = express()

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

const port = 3000


/* HTML ENDPOINTS */
app.get('/', (req, res)=> {
	res.sendFile(path.join(__dirname, "/index.html"));
})

app.get('/detail', (req, res)=> {
	res.send('HTML endpoint: detail');
})


/* API ENDPOINTS */

//Add new data to data.json
app.post('/api/pets', (req, res)=> {
	let content = req.body;

	let data = fs.readFileSync('./data.json');
	let jsonData = JSON.parse(data)

	jsonData.push(content)
	console.log(jsonData)

	fs.writeFileSync('./data.json',JSON.stringify(jsonData, null, 2));
	res.send(content);
})

//Gets the data in data.json
app.get('/api/pets', (req, res)=> {
	let content=fs.existsSync('./data.json') ? JSON.parse(fs.readFileSync('./data.json','utf8')) : {}
	res.send(JSON.stringify(content));
})

//Updates the data.json
app.put('/api/pets/:id', (req, res)=> {
	let content=req.body
	let id = req.params.id

	let data = fs.readFileSync('./data.json');
	let jsonData = JSON.parse(data)

	jsonData[id] = content


	fs.writeFileSync('./data.json',JSON.stringify(jsonData));
	res.send(JSON.stringify(content, null, 2));
})

//Deleta a data in data.json
app.delete('/api/pets/:id', (req, res)=> {

    const id = req.params.id
    
    let data = fs.readFileSync('data.json', 'utf8');
    let jsonData = JSON.parse(data);

    let deleted = jsonData.splice(id, 1)

    console.log(jsonData)

    fs.writeFileSync('./data.json', JSON.stringify(jsonData, null, 2))

	res.send(JSON.stringify({message:'data deleted'}));
})



app.listen(port, () => {
  console.log(port)
})