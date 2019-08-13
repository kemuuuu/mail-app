const jsforce = require('jsforce');
const conn = new jsforce.Connection();

exports.exec = (req, res, next) => {
  conn.login('dev@skmr.com', 'a1234567', function(err, res) {
    if (err) { return console.error(err); }
    conn.sobject('Account').create({
      name: Date.now().toString()
    });
  });
  res.json({res: true})
}
