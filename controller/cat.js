const Cat = require('../models/cat');
const { validationResult } = require('express-validator');
var timestamp = require('unix-timestamp');
timestamp.round = true;

// Create a cat
exports.createCat = (req, res, next) => {
    const err = validationResult(req);
    if(!err.isEmpty()) {
        return res.status(422).json({
            message: "Vaildation error",
            err: err.array()
        });
    }
    
    var name = req.body.name;
    var age = req.body.age;
    
    const cat = new Cat({
        name: name,
        age: age,
        timestamp: timestamp.now()
    });
    
    cat.save()
    .then(result => {
        res.status(201).json({
            message: "Cat Created Successfully!",
            name: result.name,
            age: result.age,
            timestamp: result.timestamp
        });
    })
    .catch(err => {
        res.send(err);
    });
};

//get the cat with that name (accessed at GET localhost:3000/getcat/:name)
exports.getCat = (req, res, next) => {
    if (req.query.timestamp==undefined) {
        Cat.findByName(req.params.name, function(err, cat) {
            if (err)
            res.send(err);
            if(Object.keys(cat).length==0) //If no cat exists with that name
            res.send("Error: No cats exist with that specified name! Note that cat names are case sensitive.");
            else
            res.json({ Age: + cat[0].age });
        }).sort({ timestamp: -1 }).limit(1);
    } else {
        Cat.find({timestamp: {$lte: req.query.timestamp}}, function (err, cat) {
            
            if(err) 
            res.send(err); 
            
            if(Object.keys(cat).length==0) //If timestamp earlier than the earliest timestamp is chosen
            res.send("Error: No cats exist before the specified timestamp!")
            else
            res.json({ Age: + cat[0].age });
            
        }).sort({ timestamp: -1 }).limit(1)
    }
};