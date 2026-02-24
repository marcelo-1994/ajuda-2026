import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

app.use(cors());

// Webhook needs raw body
app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return res.status(400).send("Webhook secret not configured");
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        // Here you would update the user's plan in Supabase
        // using the session.client_reference_id (user_id)
        // and session.subscription (subscription_id)
        console.log("Checkout session completed!", session);
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        const subscription = event.data.object as Stripe.Subscription;
        // Update subscription status in Supabase
        console.log("Subscription updated!", subscription);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);

// Body parser for other routes
app.use(express.json());

app.post("/api/create-checkout-session", async (req, res) => {
  const { priceId, userId } = req.body;

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: "Stripe is not configured." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      client_reference_id: userId,
      success_url: `${process.env.APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/pricing`,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
