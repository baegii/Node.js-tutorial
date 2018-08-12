module.exports = function(app, fs)
{
    app.get('/', function(req,res){
       res.render('index', {
           title: "MY HOMPAGE",
           length: 5
       })
    });
}