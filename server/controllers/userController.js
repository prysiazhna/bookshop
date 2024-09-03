const ApiErrorHandler = require('../errorHandler/apiErrorHandler');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Cart, Author} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, username, role } = req.body;
            if (!email || !password) {
                return next(ApiErrorHandler.badRequest('Invalid email or password'));
            }

            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return next(ApiErrorHandler.badRequest('User with this email already exists'));
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ email, role, username, password: hashPassword });
            await Cart.create({ userId: user.id });
            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token });
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred during registration'));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return next(ApiErrorHandler.internal('User not found'));
            }

            const comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return next(ApiErrorHandler.internal('Incorrect password'));
            }

            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token });
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred during login'));
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role);
            return res.json({ token });
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred during token validation'));
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred while retrieving users'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return next(ApiErrorHandler.notFound('User not found'));
            }
            await user.destroy();
            return res.json({ message: 'User deleted successfully' });
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred while deleting the user'));
        }
    }
}

module.exports = new UserController();