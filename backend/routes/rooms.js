const { MongoClient } = require('mongodb');
const { BSON } = require('bson');
const uri = "mongodb+srv://Aravindan:AravSru19@roomiez-ozts7.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true});

exports.findByCampus = function(req, res) {
    client.connect(function (err, db) {
        const dbName = 'roomsdb';
        var dbs = client.db(dbName);
        var campus = req.body.campus;
        var budget = req.body.budget;
        dbs.collection('rooms', function (err, collection) {
            collection.find().toArray(function (err, items) {
                var data = items;
                var result = [];
                for(var i = 0; i < data.length; i++){
                    if( (campus == data[i].campus) && (data[i].rent <= budget)) {
                        result.push(data[i]);
                    }
                }
                res.send(result);
            });
        });
    });
};

exports.findById = function(req, res) {
    client.connect(function (err, db) {
        const dbName = 'roomsdb';
        var dbs = client.db(dbName);
        var id = req.body.id;
        dbs.collection('rooms', function (err, collection) {
            collection.find().toArray(function (err, items) {
                var data = items;
                var result = [];
                for(var i = 0; i < data.length; i++){
                    if(id == data[i]._id) {
                        result.push(data[i]);
                    }
                }
                res.send(result);
            });
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

exports.deleteRoom = function(req, res) {
    client.connect(function (err, db) {
        const dbName = 'roomsdb';
        var dbs = client.db(dbName);
        var id = req.body.id;
        console.log('Deleting room: ' + id);
        dbs.collection('rooms', function (err, collection) {
            collection.deleteOne({_id: new BSON.ObjectID(id)}, {safe: true}, function (err, result) {
                if (err) {
                    res.send({'error': 'An error has occurred - ' + err});
                } else {
                    console.log('' + result + ' document(s) deleted');
                    res.send(result);
                }
            });
        });
    });
};