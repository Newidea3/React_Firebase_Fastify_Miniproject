require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const fastifyIO = require('fastify-socket.io');
const Redis = require('ioredis');
const PORT = process.env.PORT;

const redisCache = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const redisPub = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const redisSub = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});



redisCache.on('error', (err) => console.error('Redis Cache Error:', err));
redisPub.on('error', (err) => console.error('Redis Publisher Error:', err));
redisSub.on('error', (err) => console.error('Redis Subscriber Error:', err));

const CHANNEL_NAME = 'clickUpdates';

fastify.decorate('redisCache', redisCache);
fastify.decorate('redisPub', redisPub);
fastify.decorate('CHANNEL_NAME', CHANNEL_NAME);


fastify.register(require('@fastify/cors'), {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  credentials: true
});

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
    redisSub.subscribe(CHANNEL_NAME, (err, count) => {
      if (err) {
        fastify.log.error('Failed to subscribe to Redis channel:', err);
      } else {
        fastify.log.info(`Redis subscriber listening on ${count} channel(s).`);
      }
    });
    redisSub.on('message', (channel, message) => {
      if (channel === CHANNEL_NAME) {
        const update = JSON.parse(message);

        fastify.io.emit('countUpdated', update);
        fastify.log.info(`Broadcasted update for user ${update.userId}: ${update.newCount}`);
      }
    });
    fastify.io.on('connection', (socket) => {
      fastify.log.info('A client connected:', socket.id);
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
