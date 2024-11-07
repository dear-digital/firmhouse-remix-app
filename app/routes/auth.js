// routes/auth.js
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
  hostName: "https://firmhouse-remix-k1zownwpz-deardigital.vercel.app",
  apiVersion: ApiVersion.October22,
  isEmbeddedApp: false,
});

export let loader = async ({ request }) => {
  
  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get("shop");
    if (!shop) {
      throw new Error("Missing shop query parameter");
    }

    // Begin the Shopify OAuth process
    const authRoute = await shopify.auth.begin({
      shop: shop,
      callbackPath: "/auth/callback",
      isOnline: true,
      rawRequest: request, // Request from Remix
      rawResponse: new Response(), // Response placeholder, won't be used
    });

    // Redirect the user to the Shopify authentication page
    return redirect(authRoute);
  }
  catch(error) {
    console.error("Error in Shopify auth:", error);
    return redirect("/error");
  }
};
