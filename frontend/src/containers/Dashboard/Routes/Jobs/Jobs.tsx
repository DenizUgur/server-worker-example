import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./Jobs.module.scss";
import { Empty, Table, Tag } from "antd";

const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Age",
		dataIndex: "age",
		key: "age",
	},
	{
		title: "Address",
		dataIndex: "address",
		key: "address",
	},
	{
		title: "Tags",
		key: "tags",
		dataIndex: "tags",
		render: (tags: any) => (
			<>
				{tags.map((tag: any) => {
					let color = tag.length > 5 ? "geekblue" : "green";
					if (tag === "loser") {
						color = "volcano";
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</>
		),
	},
];

let data: any = [
	{
		key: "9",
		name: "Joe Black",
		age: 32,
		address: "Sidney No. 1 Lake Park",
		tags: ["cool", "teacher"],
	},
	{
		key: "10",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "11",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "12",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "13",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "14",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "15",
		name: "Jim Green",
		age: 42,
		address: "London No. 1 Lake Park",
		tags: ["loser"],
	},
	{
		key: "16",
		name: "Joe Black",
		age: 32,
		address: "Sidney No. 1 Lake Park",
		tags: ["cool", "teacher"],
	},
];

export default function Jobs() {
	const ref = useRef<any>(null);
	const [count, setCount] = useState(1);

	useLayoutEffect(() => {
		const updateCount = () => {
			// 66 + 32 + 55 + 32 = 185
			setCount(
				Math.max(
					Math.floor((ref?.current.offsetHeight - 185) / 56) - 1,
					1
				)
			);
		};
		window.addEventListener("resize", updateCount);
		updateCount();
		return () => window.removeEventListener("resize", updateCount);
	}, []);

	return (
		<div
			className={styles.Root}
			ref={ref}
			style={{
				justifyContent:
					data && data.length > 0 ? "space-between" : "center",
			}}
		>
			{data && data.length > 0 ? (
				<>
					<h1>Jobs</h1>
					<p>
						Here you can find all the jobs you have created. Select
						any of them to go to their respective results page.
					</p>
					<Table
						className={styles.Table}
						columns={columns}
						dataSource={data}
						pagination={{
							position: ["bottomCenter"],
							pageSize: count,
						}}
					/>
				</>
			) : (
				<Empty
					description={`No Jobs. Click on the "New" button to create one.`}
				/>
			)}
		</div>
	);
}
