import { json } from "@remix-run/node";

// Define a loader function to handle GET requests
export let loader = async () => {
  // Simulate some data to return
  const data = {
    message: "Hello from the Remix API!",
    success: true,
    timestamp: new Date(),
  };

  // Return JSON response
  return json(data);
};
