var routes = {
  index: function(req, res) {
    // req.logs.push('SELECT * FROM people');
    res.json({message: 'hello world'});
  },

  error: function(req, res) {
    // res.status(500).send({error: 'Something failed!'});
    res.status(500);
    res.render('error', {error: err});
  },
};

module.exports = routes;
