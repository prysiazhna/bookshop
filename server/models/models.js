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

const CartBook = sequelize.define('CartBook', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
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

const OrderBook = sequelize.define('OrderBook', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
});

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Book, { through: CartBook });
Book.belongsToMany(Cart, { through: CartBook });

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Book, { through: OrderBook });
Book.belongsToMany(Order, { through: OrderBook });

// Define the association
Author.hasMany(Book, { foreignKey: 'authorId',  onDelete: 'CASCADE'  });
Book.belongsTo(Author, { foreignKey: 'authorId', onDelete: 'CASCADE' });

// Book can belong to many Categories, and a Category can have many Books (many-to-many)
Book.belongsToMany(Category, { through: 'BookCategory' });
Category.belongsToMany(Book, { through: 'BookCategory' });

// User can rate many Books, and a Book can be rated by many Users
User.belongsToMany(Book, { through: BookRate });
Book.belongsToMany(User, { through: BookRate });

module.exports = {
    User,
    Cart,
    CartBook,
    Book,
    Author,
    Order,
    BookRate,
    Category,
    OrderBook
}