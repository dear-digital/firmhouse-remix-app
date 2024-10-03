import { json } from "@remix-run/node";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// The action function handles POST requests
export let action = async ({ request }) => {
  try {
    // GraphQL mutation query for creating a cart
    const query = `
      mutation {
        createCart(input: {}) {
          cart {
            token
          }
          subscription {
            id
            checkoutUrl
          }
        }
      }
    `;

    // Send the GraphQL request using Axios
    const response = await axios({
      method: 'post',
      url: 'https://portal.firmhouse.com/graphql',
      headers: {
        // eslint-disable-next-line no-undef
        'X-PROJECT-ACCESS-TOKEN': process.env.X_PROJECT_ACCESS_TOKEN,  // use environment variable for security
      },
      data: {
        query: query,
      },
    });

    // Return the GraphQL response as JSON
    return json(response.data);

  } catch (error) {
    console.error("Error creating cart:", error);
    return json({ error: 'Oops! Some error occurred' }, { status: 500 });
  }
};
