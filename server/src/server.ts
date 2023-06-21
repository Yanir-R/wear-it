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

const start = async () => {
  try {
    await app.listen({ port: Number(PORT) });
    app.log.info(`server listening on ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
