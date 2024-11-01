import sequelize, { Model } from "sequelize";
import db from ".";
import Book from "./Book";
import User from "./User";

class Wistlist extends Model {
  declare userId: number;
  declare bookId: number;
}

Wistlist.init(
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
    userId: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "wistlist",
    underscored: true,
  }
);

Book.belongsToMany(User, {
  foreignKey: "bookId",
  otherKey: "userId",
  as: "users",
  through: Wistlist,
});

User.belongsToMany(Book, {
  foreignKey: "userId",
  otherKey: "bookId",
  as: "books",
  through: Wistlist,
});

export default Wistlist;
