// app/shopify.server.js
// Note that you don't need to import the node adapter if you're running on a different runtime.
import '@shopify/shopify-app-remix/server/adapters/node';
// Memory storage makes it easy to set an app up, but should never be used in production.
import {MemorySessionStorage} from '@shopify/shopify-app-session-storage-memory';

import {LATEST_API_VERSION, shopifyApp} from '@shopify/shopify-app-remix';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  appUrl: process.env.SHOPIFY_APP_URL,
  scopes: ['read_products'],
  apiVersion: LATEST_API_VERSION,
  // sessionStorage: new MemorySessionStorage(),
});
export default shopify;