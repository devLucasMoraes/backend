import sequelize, { Model } from "sequelize";
import db from ".";
import User from "./User";

class Sale extends Model {
  declare id: number;
  declare userId: number;
  declare total: number;
  declare date: number;
}

Sale.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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
    total: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "sale",
    underscored: true,
  }
);

Sale.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default Sale;
