const { db, admin } = require('../utils/firebase-admin-setup');
const getUser = (request, reply) => {
    const { userId } = request.params;
    reply.send({ userId, name: "John Doe" });
};

const registerClick = async (request, reply) => {
    const userId = request.body.userId;

    const { redisCache, redisPub, CHANNEL_NAME } = request.server;

    const userDocRef = db.collection('users').doc(userId);
    const cacheKey = `user:${userId}:clickCount`;
    let newCount;
    try {
        await userDocRef.update({
            clicks: admin.firestore.FieldValue.increment(1)
        }, { merge: true });

        const userDoc = await userDocRef.get();
        newCount = userDoc.exists ? userDoc.data().clicks : 0;

        await redisCache.del(cacheKey);

        const message = JSON.stringify({ userId, newCount });
        await redisPub.publish(CHANNEL_NAME, message);

        reply.send({ success: true, newCount: newCount });
    }
    catch (error) {
        console.error('Error registering click:', error);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};

const getCount = async (request, reply) => {
    const { redisCache, redisPub, CHANNEL_NAME } = request.server;
    const userId = request.query.userId || 'test-user-123';
    const cacheKey = `user:count:${userId}`;

    let count = await redisCache.get(cacheKey);

    if (count !== null) {
        return { count: parseInt(count, 10), source: 'cache' };
    }


    const docRef = db.collection('users').doc(userId);
    const doc = await docRef.get();

    let firestoreCount = 0;
    if (doc.exists) {
        firestoreCount = doc.data().clicks || 0;
    }

    await redisCache.set(cacheKey, firestoreCount, 'EX', 60);

    return { count: firestoreCount, source: 'firestore' };
}

module.exports = { getUser, registerClick, getCount };