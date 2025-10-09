const { getUser, registerClick, getCount } = require('../controllers/user-controller');
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

const registerClickOptions = {
    schema: {
        body: {
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
                    success: { type: 'boolean' },
                    newCount: { type: 'number' }
                }
            }
        }
    },
    handler: registerClick
};
const getUserCountOptions = {
    schema: {
        querystring: {
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
                    count: { type: 'number' },
                    source: { type: 'string', enum: ['cache', 'firestore'] }
                }
            }
        }
    },
    handler: getCount
};


module.exports = async function (fastify, opts) {
    fastify.post('/user/click', registerClickOptions);
    fastify.get('/user/count', getUserCountOptions);
}