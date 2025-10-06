const getUser = (request, reply) => {
    const { userId } = request.params;
    reply.send({ userId, name: "John Doe" });
};

const registerClick = (request, reply) => {
    const { userId } = request.params;
    reply.send({ message: `Click registered for user ${userId}` });
};



module.exports = { getUser };