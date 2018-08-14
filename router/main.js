module.exports = function(app, fs)
{
    app.get('/', function(req,res){
       res.render('index', {
           title: "MY HOMEPAGE",
           length: 5
       })
    });

    // List 표시 api
    app.get('/list', function(req,res){
        fs.readFile(__dirname + '/../data/' + 'user.json', 'utf8', function(err,data){
            console.log(data);
            res.end(data);
        });
    });

    // User 표시 api
    app.get('/getUser/:username', function(req,res){
        fs.readFile(__dirname + '/../data/user.json', 'utf8', function(err,data){
            var users = JSON.parse(data);
            res.json(users[req.params.username]);
        });
    });

    // User 추가 api
    app.post('/addUser/:username', function(req,res){
        var result = {};
        var username = req.params.username;

        // CHECK REQ VALIDITY
        if(!req.body['password'] || !req.body['name']){
            result['success'] = 0;
            result['error'] = 'invalid request';
            res.json(result);
            return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile(__dirname + '/../data/user.json', 'utf8', function(err,data){
            var users = JSON.parse(data);
            if(users[username]){
                // DUPLICATION FOUND
                result['success'] = 0;
                result['error'] = 'duplicate';
                res.json(result);
                return;
            }

            // ADD TO DATA
            users[username] = req.body;
            // SAVE DATA
            fs.writeFile(__dirname + '/../data/user.json', JSON.stringify(users, null, '\t'), 'utf8', function(err, data){
                result = {'success' : 1};
                res.json(result);
            })
        })
    })

    // User update api
    app.put('/updateUser/:username', function(req,res){
        var result = {};
        var username = req.params.username;

        // CHECK REQ VALIDITY
        if(!req.body['password'] || !req.body['name']){
            result['success'] = 0;
            result['error'] = 'invalid request';
            res.json(result);
            return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile(__dirname + '/../data/user.json', 'utf8', function(err,data){
            var users = JSON.parse(data);
            if(users[username]){
                // DUPLICATION FOUND
                result['success'] = 0;
                result['error'] = 'duplicate';
                res.json(result);
                return;
            }

            // ADD TO DATA
            users[username] = req.body;
            // SAVE DATA
            fs.writeFile(__dirname + '/../data/user.json', JSON.stringify(users, null, '\t'), 'utf8', function(err, data){
                result = {'success' : 1};
                res.json(result);
            })
        })
    })

    // User 삭제 api
    app.delete('/deleteUser/:username', function(req,res){
        var result = {};
        var username = req.params.username;

        // LOAD DATA
        fs.readFile(__dirname + '/../data/user.json', 'utf8', function(err,data){
            var users = JSON.parse(data);
            // IF NOT FOUND
            if(!users[username]){
                result['success'] = 0;
                result['error'] = 'not found';
                res.json(result);
                return;
            }

            delete users[username];
            // SAVE DATA
            fs.writeFile(__dirname + '/../data/user.json', JSON.stringify(users, null, '\t'), 'utf8', function(err, data){
                result = {'success' : 1};
                res.json(result);
            });
        });
    })
}