import { json } from "@remix-run/node";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export let action = async ({ request }) => {
  try {
    // Assuming the incoming request has JSON content
    const body = await request.json();  // Read JSON body
    //const { productId, quantity, subscriptionId } = body;

    // GraphQL mutation query with variables
    const query = `
      mutation createOrderedProduct($input: CreateOrderedProductInput!) {
        createOrderedProduct(input: $input) {
          orderedProduct {
            id
            quantity
          }
        }
      }
    `;

    // Variables to pass to the mutation
    // const variables = {
    //   input: {
    //     productId: productId,
    //     quantity: quantity,
    //     subscriptionId: subscriptionId,
    //   },
    // };

    // Send the GraphQL request using Axios
    const response = await axios({
      method: 'post',
      url: 'https://portal.firmhouse.com/graphql',
      headers: {
        'X-PROJECT-ACCESS-TOKEN': process.env.X_PROJECT_ACCESS_TOKEN,  // Use environment variable for security
        'Content-Type': 'application/json',  // Ensure proper content type for JSON
      },
      data: {
        query: query,
        variables: {
            input: body
        },
      },
    });

    // Return the GraphQL response as JSON
    return json(response.data);

  } catch (error) {
    console.error("Error creating cart:", error);
    return json({ error: 'Oops! Some error occurred' }, { status: 500 });
  }
};
