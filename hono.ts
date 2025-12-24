import { z, createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';

const app = new OpenAPIHono();

const signUpInput = z
  .object({
    username: z.string().min(3),
    password: z.string().min(8),
  })
  .openapi('UserCredentials');

const signUpOutut = z
  .object({
    message: z.string(),
  })
  .openapi('UserSignupMessage');

const route = createRoute({
  method: 'post',
  path: '/signup',
  request: {
    body: {
      content: {
        'application/json': {
          schema: signUpInput,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: signUpOutut,
        },
      },
      description: 'Creating the user',
    },
  },
});

app.openapi(route, async (c) => {
  let { username, password } = c.req.valid('json');

  return c.json({
    message: 'User signedup successfully',
  });
});

app.get('/ui', swaggerUI({ url: '/' }));

app.doc('/', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'API',
  },
});

export default app;
