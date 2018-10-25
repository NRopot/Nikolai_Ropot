const express = require("express");
const port = 8080;
const app = express();

const users = require('./users');
const body = require('body-parser');

app.get('/users', function (req, res) {
	res.send(users);
});

app.get('/users/:id', function (req, res) {
	const [user] = users.filter(item => item.id == req.params.id);
  	res.send(user);
});

app.post('/users/add', function (req, res) {
	users.push({
		id					:req.params.id,
		name				:req.params.name,
		password			:req.params.password,
		date_of_birth		:new Date(req.params.date_of_birth).toISOString,
		first_login			:new Date(req.params.first_login).toISOString,
		next_notification	:new Date(req.params.next_notification).toISOString,
		information			:req.params.information
	});
	res.send(users[users.length - 1]);
});

app.put('/users/:id', function (req, res) {
	const {item} = users.filter(item => item.id == req.params.id);

	res.send(item.name = req.params.name); 
});

app.delete('/users/:id', function (req, res) {
	const indexUser = users.indexOf(users.find(item => item.id === req.params.id));
	users.splice(indexUser,1);
	res.send(users);
});
app.listen(port,()=>{
	console.log(`Server started on port ${port}`);
});

