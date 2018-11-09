// import * as express from 'express';
// import * as body from 'body-parser';
// import * as cors from 'cors';
// import * as moment from 'moment';
const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const moment = require('moment');
const cookieParser  = require('cookie-parser');

const users = require('./users');
const port = 8080;
const app = express();

let userStore = null;
app.use(cookieParser());
app.use(body.json());
app.use(body.urlencoded({extended:true}));
app.use(cors({origin:'http://localhost:4200', credentials : true}));

app.get('/users', function (req, res) {
	res.send(users);
});
app.get('/users/:name', function (req, res) {
	const [user] = users.filter(item => item.name === req.params.name);
	res.send(user);
});

app.post('/users/add', function (req, res) {
	users.push({
		id					    :req.params.id,
		name				    :req.params.name,
		password			  :req.params.password,
    date_of_birth:  moment(req.params.birthDate, "YYYY/MM/DD").toString,
    first_login:    moment(req.params.firstLogin, "DD MMMM YYYY").toString,
    next_notification: moment(req.params.notifyDate, "DD-MMM-YY").toString,
		information			:req.params.information
	});
	res.send(users[users.length - 1]);
});

app.put('/users/:id', function (req, res) {
  const [user] = users.map((item) => { if (item.id === req.body.id) { item = req.body }} ) ;
	res.send(user); 
});

app.delete('/users/:id', function (req, res) {
  const indexUser = users.indexOf(users.find(item => item.id === req.params.id));
	users.splice(indexUser,1);
	res.send(users);
});

app.post('/login', function (req, res) {
	console.log('Cookies: ', req.cookies);
	if(req.cookies.isLogged === 'true'){
		res.send(userStore);
	}else{
		const [user] = users.filter(item => item.name === req.body.name && item.password === req.body.password); 
		userStore = user;
		user ? res.cookie('isLogged', true, { maxAge: 900000, httpOnly: true }) :
					 res.cookie('isLogged', false, { maxAge: 900000, httpOnly: true });
		res.send(user ? user : res.sendStatus(404));
	}
});

app.post('/forgotPassword', function (req, res) {
  const [user] = users
    .filter(item => item.name === req.body.name)
    .map((item) => {item.password = req.body.password;return item});
  res.send(user ? user : res.sendStatus(404));
});

app.get('/logout',function(req,res){
	res.cookie('isLogged', null, { maxAge: 0, httpOnly: true });
	console.log('Cookies: ', req.cookies);
	res.send();
});

app.listen(port,()=>{
	console.log(`Server started on port ${port}`);
});

