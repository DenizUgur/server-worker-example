/**
 * @author Deniz Ugur <deniz343@gmail.com>
 */
import { DataTypes, Sequelize } from "sequelize";
let sequelize: Sequelize;

if (process.env.NODE_ENV == "production") {
	if (process.env.DATABASE_URL == undefined) {
		throw new Error("DATABASE_URL is not available");
	} else {
		sequelize = new Sequelize(process.env.DATABASE_URL, {
			dialect: "postgres",
			dialectOptions: {
				ssl: {
					rejectUnauthorized: false,
				},
			},
		});
	}
} else {
	sequelize = new Sequelize(
		"postgres://admin:root@localhost:5432/batterysizing",
		{
			dialect: "postgres",
		}
	);
}

const User = sequelize.define(
	"user",
	{
		email: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	},
	{
		freezeTableName: true,
		createdAt: false,
		updatedAt: false,
	}
);

const Jobs = sequelize.define(
	"user",
	{
		userEmail: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		jobId: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	},
	{
		freezeTableName: true,
		createdAt: false,
		updatedAt: false,
	}
);

User.hasMany(Jobs);
Jobs.belongsTo(User);

export default sequelize;
export { User };
