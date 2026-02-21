const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();
const db = admin.firestore();

// Configure your Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdulaituurosungkhadija@gmail.com",       // replace with your email
    pass: "Ladyk100%"          // Gmail App Password
  }
});

// Runs every 3 days
exports.sendMarketingEmail = functions.pubsub
  .schedule("every 72 hours")
  .onRun(async () => {
    try {
      const snapshot = await db.collection("Contacts").get();

      const now = Date.now();

      snapshot.forEach(async (doc) => {
        const data = doc.data();

        // Only send if lastEmailed is null or more than 3 days ago
        if (!data.lastEmailed || (now - data.lastEmailed.toMillis()) >= 72 * 60 * 60 * 1000) {
          
          await transporter.sendMail({
            from: "abdulaituurosungkhadija@gmail.com",
            to: data.email,
            subject: "Your Affiliate Marketing Training",
            html: `
              <h2>Hey there 👋</h2>
              <p>Here’s your tip to get started with affiliate marketing!</p>
              <a href="https://digitstem.com/promo/?reference=Abdulai">Access Training</a>
            `
          });

          // Update lastEmailed timestamp
          await doc.ref.update({ lastEmailed: admin.firestore.Timestamp.now() });
        }
      });

      console.log("Marketing emails sent successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
    }

    return null;
  });