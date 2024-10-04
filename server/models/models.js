const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    password: { type: DataTypes.STRING, allowNull: true }
});

const Cart = sequelize.define('Cart', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    total: {type: DataTypes.FLOAT, allowNull: false, defaultValue: 0}
});

const CartItem = sequelize.define('CartItem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    price: { type: DataTypes.FLOAT, allowNull: false },
    bookId: { type: DataTypes.INTEGER, references: { model: 'Books', key: 'id' }, field: 'bookId' },
});

const Category = sequelize.define('Category', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
});

const Order = sequelize.define('Order', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    total: { type: DataTypes.FLOAT, allowNull: false }
});

const Book = sequelize.define('Book', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false},
    authorId: {type: DataTypes.INTEGER, allowNull: false},
    categoryIds: {type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false, defaultValue: []},
    price: {type: DataTypes.FLOAT, allowNull: false},
    stock: {type: DataTypes.BOOLEAN, allowNull: false},
    rating: {type: DataTypes.FLOAT, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: true}
});

const Author = sequelize.define('Author', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false}
});

const BookRate = sequelize.define('BookRate', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    comment: { type: DataTypes.TEXT, allowNull: true }
});


User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order);
Order.belongsTo(User);

CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
Cart.hasMany(CartItem, {
    as: 'cartItems',
    foreignKey: 'cartId',
});


Book.hasMany(CartItem, { foreignKey: 'bookId' });
CartItem.belongsTo(Book, {
    as: 'book',
    foreignKey: 'bookId',
});

Author.hasMany(Book, { foreignKey: 'authorId', as: 'Books', onDelete: 'CASCADE' });
Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author', onDelete: 'CASCADE' });

Book.belongsToMany(Category, { through: 'BookCategory' });
Category.belongsToMany(Book, { through: 'BookCategory' });

// User can rate many Books, and a Book can be rated by many Users
User.belongsToMany(Book, { through: BookRate });
Book.belongsToMany(User, { through: BookRate });

module.exports = {
    User,
    Cart,
    CartItem,
    Book,
    Author,
    Order,
    BookRate,
    Category
}