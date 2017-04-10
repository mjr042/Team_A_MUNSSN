//require the mongoClient from mongodb module
var MongoClient = require('mongodb').MongoClient;

//mongodb configs
var connectionUrl = 'mongodb://localhost:27017/myproject',
	profileCollection = 'profile';



MongoClient.connect(connectionUrl, function(err, db) {
	console.log("Connected correctly to server");

	// Get some collection
	var collection = db.collection(profileCollection);

	//Creates an index on group name
	//Link profiles to user id from the users collection
	
	//Create a group
	//Already created so will leave out for now	
	/*createProfile(collection,"Matthew","Joshua","Randell","mjr042","CS","Classics");
	createProfile(collection,"Kurt","NightCrawler","Vaughtner","knv435","Psychology","Classics");
	createProfile(collection,"Eric","Magneto","Lencher","eml229","Geology","Physics");
	createProfile(collection,"Charles","Professor","Xaivier","cpx902","Psychology","Education");
	createProfile(collection,"Logan","Wolverine","Jimmy","lwj876","Gym","Psychology");
	createProfile(collection,"Bobby","IceMan","Drake","bid342","Chem","Classics");
	createProfile(collection,"Raven","Mystique","Darkholm","rmd545","Chemistry","Gym");
	createProfile(collection,"Bruce","Batman","Wayne","bbw908","Police Studies","Social Justice");	
	createProfile(collection,"Oliver","GreenArrow","Quinn","ogq764","Physics","Buisness");
	createProfile(collection,"Clark","Superman","Kent","csk420","Politics","Comunications");
	createProfile(collection,"Diana","WonderWoman","Prince","dwp672","Politics","Gender Studies");
	createProfile(collection,"Raz","Al","Ghoul","rag674","Midevil studies","Classics");
	*/
	//Edit a major for testing
	//editMajor(collection,"Engineering", "BMG021")
	
	//Edit a minor for testing
	//editMinor(collection,"Ping Pong", "mjr042")
	
	//Edit a name for testing
	//editName(collection,"Matt","Josh","Randell", "mjr042")

	//addFriend(collection,"jbd745","mjr042")
	//removeFriend(collection,"bmg021","mjr042")
	
	getRandom(collection);	

	db.close()
});


function createProfile(collection,fName,mName,lName,user,major,minor) { //also create a link 	
		var profile = {
			_id : user,
			"First Name"  : fName,
			"Middle Name" : mName,
			"Last Name"   : lName, 
			"Major"       : major, 
			"Minor"       : minor,
			"User"        : user,
			"Friends"     : [],
			"Suggested Friends" : [],
			
		};
		collection.insert(profile,{upsert: true},  function(error, result) {
		//here result will contain an array of records inserted
		if(!error) {
			console.log("Success : " + result.ops.length + " profile inserted!");
		} else {
			console.log("Some error was encountered!");
			console.log(error);
		}
		});

}

function editName(collection,fName,mName,lName, user) { // check the given user id to find the profile	
	collection.update(
			{_id : user},
			{$set :{
				"First Name": fName,
				"Middle Name": mName,
				"Last Name": lName, 
			 }
			},
			{upsert: true}, 
    function(error, result) {
		if(!error) {
			console.log("Success : " + result);
		} else {
			console.log("Some error was encountered!");
			console.log(error);
		}	
		}); //sort			
}
function editMajor(collection,major, user) { // check the given user id to find the profile	
	collection.update(
			{_id : user},
			{$set :{
				"Major": major, 
			 }
			},
			{upsert: true}, 
    function(error, result) {
		if(!error) {
			console.log("Success : " + result);
		} else {
			console.log("Some error was encountered!");
			console.log(error);
		}	
		}); //sort			
}	

function editMinor(collection,minor, user) { // check the given user id to find the profile	
	collection.update(
			{_id : user},
			{$set :{
				"Minor": minor, 
			 }
			},
			{upsert: true}, 
    function(error, result) {
		if(!error) {
			console.log("Success : " + result);
		} else {
			console.log("Some error was encountered!");
			console.log(error);
		}	
		}); //sort
}

function addFriendUser(collection,friend,user){
	collection.update(
		{_id : user},
		{$addToSet:{
			"Friends" : friend
		}},
		{upsert: true},
		function(error, result) {
			if(!error) {
				console.log("Success : " + result);
			} else {
				console.log("Some error was encountered!");
				console.log(error);
		}	
	});
}
function addFriendTarget(collection,friend,user){
	collection.update(
		{_id : friend},
		{$addToSet:{
			"Friends" : user
		}},
		{upsert: true},
		function(error, result) {
			if(!error) {
				console.log("Success : " + result);
			} else {
				console.log("Some error was encountered!");
				console.log(error);
		}	
	});
}
function addFriend(collection,friend,user){
	addFriendUser(collection,friend,user);
	addFriendTarget(collection,friend,user);
}
function removeFriendUser(collection,friend,user){
	collection.update(
		{_id : user},
		{$pull:{
			"Friends" : friend
		}},
		{upsert: true},
		function(error, result) {
			if(!error) {
				console.log("Success : " + result);
			} else {
				console.log("Some error was encountered!");
				console.log(error);
		}	
	});
}
function removeFriendTarget(collection,friend,user){
	collection.update(
		{_id : friend},
		{$pull:{
			"Friends" : user
		}},
		{upsert: true},
		function(error, result) {
			if(!error) {
				console.log("Success : " + result);
			} else {
				console.log("Some error was encountered!");
				console.log(error);
		}	
	});
}
function removeFriend(collection,friend,user){
	removeFriendUser(collection,friend,user);
	removeFriendTarget(collection,friend,user);
}
// Use $out:someCollection inside the aggregate to send the samples to a new collection. 
function getRandom(collection){
	collection.aggregate(
   		[{$push: { $sample: { size: 10 } }{"Suggested Friends"} } ],
	function(error, result) {
			if(!error) {
				console.log("Success : " + result);
			} else {
				console.log("Some error was encountered!");
				console.log(error);
			}

		}	
	});
	
}


Contact GitHub API Training Shop Blog About
© 2017 GitHub, Inc. Terms Privacy Security Status Help
