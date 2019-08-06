var jsforce = require('jsforce');
var conn = new jsforce.Connection();
const Inbox = require('inbox');
const simpleParser = require('mailparser').simpleParser;

/**
 * Mailerと接続
 */
class ConnectionToMailer {

  /**
   * @param {string} user 
   * @param {string} pass 
   */
  constructor(user, pass) {
    this._client = Inbox.createConnection(false, "imap.gmail.com", {
      secureConnection: true,
      auth: {
        user: user,
        pass: pass
      }
    });
  }

  /**
   * 指定clientに接続
   */
  connect() {
    return new Promise((resolve, reject) => {
      this._client.connect();
      this._client.on("connect", () => {
        console.log("Successfully connected to mailer");
        resolve();
      });
    })
  }

  /**
   * 新着メール待機
   */
  waitForMail() {
    console.log('Waiting for a new mail...');

    this._client.on('new', (message) => {
      console.log('GET a new mail: ' + message.title);
      console.log(message);
      // メール情報パースStream
      const stream = this._client.createMessageStream(message.UID);
      simpleParser(stream)
      .then(mail => {
        console.log(mail.text);
        // Salesforce connect
        conn.login('dev@skmr.com', 'a1234567', function(err, res) {
          if (err) { return console.error(err); }
          conn.sobject('Account').create({
            name: mail.text
          });
        });
      })
    })
  }

  /**
   * メールBox選択
   */
  selectMailBox() {
    return new Promise((resolve, reject) => {
      // mailbox選択
      this._client.openMailbox('[Gmail]/&MFkweTBmMG4w4TD8MOs-', (error, info) => {
        if (error) throw error
        console.log('Selected a mail box: ');
        console.log(info)
        resolve();
      })
    })
  }

  /**
   * 最新メール取得
   */
  getmails() {
    return new Promise((resolve, reject) => {
      this._client.listMessages(-10, (err, messages) => {
        if (err) throw err;
        messages.map(message => {
            console.log(message.UID + ": " + message.title);
        });
      });
    })
  }
}


module.exports = ConnectionToMailer;

