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

const Job = sequelize.define(
	"job",
	{
		userId: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		jobId: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		state: {
			type: DataTypes.ENUM("queued", "inprogress", "finished", "failed"),
		},
		inputData: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		outputData: {
			type: DataTypes.JSON,
		},
	},
	{
		freezeTableName: true,
		createdAt: false,
		updatedAt: false,
	}
);

export default sequelize;
export { Job };
