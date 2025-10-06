const login = async (req, reply) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        reply.send({ token: 'fake-jwt-token' });
    }
    else {
        reply.status(401).send({ error: 'Invalid credentials' });
    }
}

const register = async (req, reply) => {
    const { username, password } = req.body;
    reply.send({ message: 'User registered successfully' });
};

const logout = async (req, reply) => {
    reply.send({ message: 'User logged out successfully' });
};



module.exports = { login };