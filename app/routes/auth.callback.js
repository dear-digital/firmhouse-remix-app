// routes/auth/callback.js
import { redirect } from "@remix-run/node";
import "@shopify/shopify-api/adapters/node";
import { shopifyApi, ApiVersion } from "@shopify/shopify-api";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SHOPIFY_API_SCOPES,
  hostName: process.env.HOST.replace(/https:\/\//, ''),
  apiVersion: ApiVersion.October22,
  isEmbeddedApp: false,
});

export let loader = async ({ request }) => {
  try {
    // Handle the Shopify callback
    const callbackResponse = await shopify.auth.callback({
      rawRequest: request, // Remix request
      rawResponse: new Response(), // Not used in this case
    });

    console.log(callbackResponse); // Log the session data for debugging

    // Extract shop and host from the session and query parameters
    const shop = callbackResponse.session.shop;
    const url = new URL(request.url);
    const host = url.searchParams.get("host");

    // Redirect the user to the homepage with shop and host as query parameters
    return redirect(`/?shop=${shop}&host=${host}`);
  } catch (error) {
    console.error("Error in Shopify auth callback:", error);
    // Handle error or redirect to an error page
    return redirect("/error"); // You can customize this as needed
  }
};
