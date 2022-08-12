let db_connection = require('./database'); //import the database connection
let UserModel = require('./models/user'); //import the user model

/* Create and Save a Record of a Model*/
//creating a user instance
let user = new UserModel({
    name: 'khalil',
    age: 22,
    email: 'khalilrafrafi2001@gmail.com',
    favoriteFoods: ['Pasta']
});

//using the sa save method woth a callback function
user.save(function(err, data) {
    if(err) return console.error(err);
    console.log(`data saved successfuly ${data}`)
});


/* Create Many Records with model.create()*/
UserModel
    .create([{
        name: 'saske',
        age: 35,
        email: 'sasouke@gmail.com',
        favoriteFoods: ['reatsu']
    }, {
        name: 'naruto',
        age: 27,
        email: 'coage@gmail.com',
        favoriteFoods: ['bankai']
    }, {
        name: 'ryuk',
        age: 211,
        email: 'hukx@gmail.com',
        favoriteFoods: ['getsuga tencho']
    }])
    .then(() =>{
        console.log("Inserting a lot of ppl successfuly");
    })
    .catch(err =>{
        console.error(err);
    })


/* Use model.find() to Search Your Database*/
UserModel
    .find({
        name: 'ichigo'
    })
    .then(res => {
        console.log("finding ppl with the name of ichigo");
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })


/* Use model.findOne() to Return a Single Matching Document from Your Database*/
let food = "mloukhia"
UserModel
    .findOne({favoriteFoods: { $elemMatch: {$eq: food}}})
    .then(res => {
        console.log("finding ppl by the food he love");
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })


/* Use model.findById() to Search Your Database By _id*/
UserModel
    .findById('5f39a64ce6d62f427c98f6da')
    .then(res => {
        console.log("finding ppl by his ID");
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })


/* Perform Classic Updates by Running Find, Edit, then Save*/
let id = '5f39a5f84bf603448408a2df';
UserModel
    .findById(id, function (err, data) {
        if(err) return console.error(err);
        //console.log(data);
        data.favoriteFoods.push("couscous");
        //inside the find callback
        data.save(function(err, data){
            if (err) return console.error(err);
            console.log("Document inserted succussfully! + we add the couscous");
        });
    });


/* Perform New Updates on a Document Using model.findOneAndUpdate()*/
UserModel
    .findOneAndUpdate({name: 'khalil'}, {age: 22}, {new: true, runValidators: true})
    .then(res => {
        console.log("New Document");
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })


/* Delete One Document Using model.findByIdAndRemove*/

UserModel
    .findByIdAndRemove(id)
    .then(res => {
        console.log("Removed Document");
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })
UserModel
    .remove({ name: 'khalil' })
    .then(res => {
        console.log("Delete work");
        console.log(res);
        if(res.n === 0){
            console.log("No persons deleted");
        }else
        {
            console.log(`${res.n} Person deleted`);
        }
    })
    .catch(err => {
        console.error(err);
    })
UserModel
    .find({favoriteFoods: { $elemMatch: {$eq: food}}})
    .sort({name: 1})
    .limit(2)
    .select({age: false})
    .exec(function(err, data){
        if(err) console.error(err);
        console.log(data);
    })
