import sequelize, { Model } from "sequelize";
import db from ".";

class Book extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare author: string;
}

Book.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    author: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "book",
  }
);

export default Book;
