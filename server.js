
var express = require('express'); // ExperssJS Framework
var app = express(); // Invoke express to variable for use in application
var port = process.env.PORT || 3000; // Set default port or assign a port in enviornment
var morgan = require('morgan'); // Import Morgan Package
var mongoose = require('mongoose'); // HTTP request logger middleware for Node.js
var bodyParser = require('body-parser'); // Node.js body parsing middleware. Parses incoming request bodies in a middleware before your handlers, available under req.body.
var router = express.Router(); // Invoke the Express Router
var appRoutes = require('./app/routes/api')(router); // Import the application end points/API
var path = require('path'); // Import path module
var passport = require('passport'); // Express-compatible authentication middleware for Node.js.
var social = require('./app/passport/passport')(app, passport); // Import passport.js End Points/API

app.use(morgan('dev')); // Morgan Middleware
app.use(bodyParser.json()); // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); // Allow front end to access public folder
app.use('/api', appRoutes); // Assign name to end points (e.g., '/api/management/', '/api/users' ,etc. )

const fileUpload = require('express-fileupload');
app.use(fileUpload());
var string = require('string')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded());

// 
// <---------- REPLACE WITH YOUR MONGOOSE CONFIGURATION ---------->
// 
mongoose.connect('mongodb://localhost/munssn', function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
    } else {
        console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
    }
});

var User = require('./app/models/user');
var Comment = require('./app/models/commentSchema');  



// Set Application Static Layout
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html')); // Set index.html as layout
});

var imge; 
var base64Image; 
var tempString
var ava

//image uploader (you must set username manually to your username, currently, so change based to whatever your username is) Current username is set to 'based', change that
app.post('/uploadimagetest', function(req, res) {   //when user uploads a photo
	if(req.files.foo == undefined) { console.log('FUckingfag') }

	//else if(req.files.foo.size > 100) {
	//	console.log('please upload an file under 15mb')
	//}

	else {
	imge = req.files.foo.data;
	
	console.log('size in bytes: ' + Buffer(imge).size)

	base64Image = Buffer(imge).toString('base64');

	User.findOneAndUpdate({ username: 'based' }, { avatar: 'data:image/jpg;base64,' + base64Image }, function(err, user) {
	  if (err) throw err;

	  // updated users avatar base64 returned to us, use line under this to check if this here works
	  //console.log(user.avatar);
	  console.log('users avatar succesfully updated')
		});
	}
	res.redirect('/profile')  
})

//about me updater/setter (you must set username manually to your username, currently, so change based to whatever your username is)
app.post('/aboutmetest', function(req, res) {   //when user updates their about me
	var tempString = req.body.fi;
	User.findOneAndUpdate({ username: 'based' }, { aboutme: tempString }, function(err, user) {
	  if (err) throw err;

	  console.log('test users aboutme succesfully updated')
	  console.log('new about me: ' + tempString)
	  var aba = user.aboutme
	});
	res.redirect('/profile') 
})

//resume updater/setter (you must set username manually to your username, currently, so change based to whatever your username is)
app.post('/resumetest', function(req, res) {   //when user updates their resume
	tempString = req.body.fa;

	User.findOneAndUpdate({ username: 'based' }, { resume: tempString }, function(err, user) {
	  if (err) throw err;

	  console.log('users aboutme succesfully updated')
	});
	res.redirect('/profile')  
})

//schedule updater/setter (you must set username manually to your username, currently, so change based to whatever your username is)
app.post('/schedtest', function(req, res) {   //when user updates their schedule (interim format, may be changed later)
	tempString = req.body.fum;

	User.findOneAndUpdate({ username: 'based' }, { schedule: tempString }, function(err, user) {
	  if (err) throw err;

	  console.log('users schedule succesfully updated')
	});
	res.redirect('/profile')       
})  

var tempString

app.post('/comment', function(req, res) {   //(you must set username manually to your username, currently, so change based to whatever your username is)
	var tempString = req.body.gi; //get the text entered on front end 

//check if comment is exists first
	Comment.findOne({ username: 'based' }, function(err, comment) {
	  	if (comment == null) {
	  		var newCom = Comment({
	  		username: 'based',
	  		comHistory : [tempString]
	  		});
	  		newCom.save(function(err) {
  				if (err) throw err;
  			console.log('comment created');
			});
	  	}


	else {
	comHistory : comment.comHistory.push(tempString) //comment history stores previous edits of comments/replies
	commentIterator : comment.commentIterator = 1
	comment.save(function(err) {
        if (err) throw err;
    	console.log('comment succesfully edited!');
  			})
		}
	})
	res.redirect('/profile')  
})

app.post('/reply', function(req, res) {   //(you must set the username and parents username manually to your username, currently, so change based to whatever your username is)
	var tempString = req.body.fa;

	Comment.findOne({ username: 'based' }, function(err, comment) {
	  	if (comment == null) {
	  		var newCom = Comment({
	  		username: 'based',
	  		parent: 'based',
	  		comHistory: [tempString]
	  		});
	  		newCom.save(function(err) {
  				if (err) throw err;
  			console.log('comment created');
			});
	  	}


	else {
	comHistory : comment.comHistory.push(tempString)
	commentIterator : comment.commentIterator = 1
	comment.save(function(err) {
        if (err) throw err;
    	console.log('reply succesfullly edited!');
  			})
		}
	})
	res.redirect('/profile')  
})



//display all users(for testing purposes)
User.find({}, function(err, users) { 
 if (err) throw err;

 //object of all the users
  console.log(users);
});

//display all comments (for testing purposes)
Comment.find({}, function(err, comments) { 
 if (err) throw err;

 //object of all the users
  console.log(comments);
});



// Start Server
app.listen(port, function() {
    console.log('Running the server on port ' + port); // Listen on configured port
});
