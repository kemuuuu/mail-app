const jsforce = require('jsforce');
const conn = new jsforce.Connection();

exports.exec = (req, res, next) => {
  const username = '';
  const pass = '';
  conn.login(username, pass, function(err, res) {
    if (err) { return console.error(err); }
    conn.sobject('Account').create({
      name: Date.now().toString()
    });
  });
  res.json({res: true})
}
