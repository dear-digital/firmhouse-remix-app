// app/routes/auth/$.tsx
import {LoaderFunctionArgs} from '@remix-run/node';

import shopify from '~/shopify.server';

export async function loader({request}: LoaderFunctionArgs) {
  await shopify.authenticate.admin(request);

  return null;
}