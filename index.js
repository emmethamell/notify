
import admin from 'firebase-admin';
import express from 'express';
import serviceAccount from './lunchlink-51a43-firebase-adminsdk-kiyqj-907d692947.json' assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'lunchlink-51a43'
});

const messaging = admin.messaging();

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
})



app.post("/send", function (req, res) {
    const tokens = req.body.fcmTokens;
    const headerText = req.body.header;
    const  bodyText = req.body.body;
    
    const message = {
      notification: {
        title: headerText,
        body: bodyText
      },
      //can use recievedToken instead of hardcoded token
      tokens: tokens //should recieve an array of tokens
    };
    
    admin.messaging().sendEachForMulticast(message)
      .then((response) => {
        res.status(200).json({
          message: "Successfully sent message",
          successCount: response.successCount,
          failureCount: response.failureCount
        });
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        res.status(400).json(error);
        console.log("Error sending message:", error);
      });
  });

app.listen(3000, function() {
    console.log("Server is running on port 3000")
})

