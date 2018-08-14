var routes = {
  index: function(req, res) {
    // req._logs.push('  SELECT * FROM people');
    res.json({message: 'hello world'});
  },
};

module.exports = routes;
