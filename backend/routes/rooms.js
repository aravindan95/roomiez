const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Aravindan:AravSru19@roomiez-ozts7.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true});

exports.findById = function(req, res) {
        var id = req.params.id;
        console.log('Retrieving wine: ' + id);
        db.collection('wines', function(err, collection) {
            collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
                res.send(item);
            });
        });
    };

exports.findAll = function(req, res) {
    client.connect(function (err, db) {
        const dbName = 'roomsdb';
        var dbs = client.db(dbName);
        dbs.collection('rooms', function (err, collection) {
            collection.find().toArray(function (err, items) {
                res.send(items);
            });
        });
    });
};

exports.addRoom = function(req, res) {
    client.connect(function (err, db) {
        const dbName = 'roomsdb';
        var dbs = client.db(dbName);
        var room = req.body;
        console.log(room);
        console.log('Adding room: ' + JSON.stringify(room));
        dbs.collection('rooms', function (err, collection) {
            collection.insert(room, {safe: true}, function (err, result) {
                if (err) {
                    res.send({'error': 'An error has occurred'});
                } else {
                    console.log('Success: ' + JSON.stringify(result));
                    res.send(result);
                }
            });
        });
    });
};

exports.updateWine = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('wines', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
};

exports.deleteWine = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('wines', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};