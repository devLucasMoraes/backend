import sequelize, { Model } from "sequelize";
import db from ".";
import Book from "./Book";
import Sale from "./Sale";

class BookSale extends Model {
  declare saleId: number;
  declare bookId: number;
  declare quantity: number;
}

BookSale.init(
  {
    bookId: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "book",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    saleId: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "sale",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    quantity: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "book_sale",
    underscored: true,
  }
);

Book.belongsToMany(Sale, {
  foreignKey: "bookId",
  otherKey: "saleId",
  as: "sales",
  through: BookSale,
});

Sale.belongsToMany(Book, {
  foreignKey: "saleId",
  otherKey: "bookId",
  as: "sales",
  through: BookSale,
});

export default BookSale;
