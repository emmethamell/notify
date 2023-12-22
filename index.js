
import {initializeApp, applicationDefault} from "firebase-admin/app";
import {getMessaging} from "firebase-admin/messanging";
import express, { json } from "express";


process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());


app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
})


initializeApp({
  credential: applicationDefault(),
  projectId: 'lunchlink'
});


app.post("/send", function (req, res) {
    const receivedToken = req.body.fcmToken;
    
    const message = {
      notification: {
        title: "Notif",
        body: 'This is a Test Notification'
      },
      //can use recievedToken instead of hardcoded token
      
      token: "fLSTZfsc6EhhsRLHEqrEsH:APA91bHawgoe1swFzqsdRDWZp4dZj1IK_WIYGzk8umhi8dCiZ9SrgehmNq7ieP62oQLXqjysr-VUqPXvvUJ8qQQr_vA7RsuUmWiMzgaFEls1BHuKHgsx6z4jpeOMjid40pEks1d433ma",
    };
    
    getMessaging()
      .send(message)
      .then((response) => {
        res.status(200).json({
          message: "Successfully sent message",
          token: receivedToken,
        });
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        res.status(400);
        res.send(error);
        console.log("Error sending message:", error);
      });
    
    
  });



app.listen(3000, function() {
    console.log("Server is running on port 3000")
})

