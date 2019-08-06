const jsforce = require('jsforce');
const conn = new jsforce.Connection();
conn.login('dev@skmr.com', 'a1234567', function(err, res) {
  if (err) { return console.error(err); }
  conn.sobject('Account').create({
    
  });
});

module.exports = conn;