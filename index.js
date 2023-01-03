const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello from Amazon Backend");
});

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  //   console.log("Payment Request Recieved for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(
  5001,
  console.log(`Amazon server running on port: ${process.env.PORT}`)
);
