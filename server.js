const Inbox = require('inbox');
const simpleParser = require('mailparser').simpleParser;

const client = Inbox.createConnection(false, "imap.gmail.com", {
  secureConnection: true,
  auth: {
    user: "alt.sakamura@gmail.com",
    pass: "Ysakamura53@"
  }
});
new Promise((resolve,reject) => {
  client.connect();
  resolve()
})
.then(() => {
  // 新着メール待機
  client.on('new', (message) => {
    console.log('GET a new mail: ' + message.title);
    console.log(message);
    const stream = client.createMessageStream(message.UID);
    simpleParser(stream)
    .then(mail => {
      console.log(mail.text);
    })
  })
})
.catch(error => console.error(error))


// FUNCTIONS
// mailbox選択
const selectMailBox = () => {
  return new Promise((resolve, reject) => {
    // mailbox選択
    client.openMailbox('[Gmail]/&MFkweTBmMG4w4TD8MOs-', (error, info) => {
      if (error) throw error
      console.log('Selected a mail box: ');
      console.log(info)
      resolve();
    })
  })
}

// メール取得
const getmails = () => {
  return new Promise((resolve, reject) => {
    client.listMessages(-10, (err, messages) => {
      if (err) throw err;
      messages.map(message => {
          console.log(message.UID + ": " + message.title);
      });
    });
  })
}

new Promise((resolve,reject) => {
  // 接続成功
  client.on("connect", () => { 
    console.log('Successfully connectted to server');
    resolve()
  })
})
.then(selectMailBox)
.then(getmails)
.catch(err => console.error(err))