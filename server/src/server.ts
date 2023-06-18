import fastify from 'fastify';
import cors from 'fastify-cors';
import routes from '../src/routes/collectionRoutes';

const PORT = process.env.PORT || 3001;

const app = fastify({
  logger: true,
});

app.register(cors, {
  origin: true,
});

routes.forEach((route) => {
  app.route(route);
});
``;
const start = async () => {
  try {
    await app.listen(PORT);
    const address = app.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    app.log.info(`server listening on ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
