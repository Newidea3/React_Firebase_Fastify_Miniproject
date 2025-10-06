const { getUser } = require('../controllers/user-controller');
const getUserOptions = {
    schema: {
        params: {
            type: 'object',
            properties: {
                userId: { type: 'string' }
            },
            required: ['userId']
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                    name: { type: 'string' }
                }
            }
        }
    },
    handler: getUser
}
module.exports = async function (fastify, opts) {
    fastify.get('/user/:userId', getUserOptions);
}