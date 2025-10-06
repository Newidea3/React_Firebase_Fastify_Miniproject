const fastify = require('fastify')({ logger: true });
const fastifyIO = require('fastify-socket.io');
require('dotenv').config();
const PORT = process.env.PORT;

fastify.register(fastifyIO, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

fastify.register(require('./routes/user-route'));

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.io.on('connection', (socket) => {
      socket.on('click', (data) => {
        //redis logic to increment count
        const newCount = (data.count || 0) + 1;
        socket.emit('countUpdated', { newCount: newCount });
      });
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
