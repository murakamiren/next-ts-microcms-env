import { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import { client } from "../libs/client";
import { worksType } from "../types/worksType";

const Whenuseswr: NextPage = () => {
	const fetcher = async (endPoint: string) => {
		const data = await client.get({
			endpoint: endPoint,
		});
		return data.contents;
	};

	const { data, error } = useSWR<Array<worksType>>("testworks", fetcher);

	if (!data) {
		return (
			<div>
				<Link href="/">普通のデータフェッチ</Link>
				<p>isLoading</p>
			</div>
		);
	} else if (error) {
		return (
			<div>
				<Link href="/">普通のデータフェッチ</Link>
				<p>cant load data</p>
			</div>
		);
	}
	return (
		<div>
			<Link href="/">普通のデータフェッチ</Link>
			<h1>useSWRを使ったデータフェッチ</h1>
			{data.map((work) => (
				<div key={work.id}>
					<h2>{work.name}</h2>
					<p>{work.desc}</p>
					<p>使用技術</p>
					{work.technologies.map((tech) => (
						<ul key={tech + work.id}>
							<li>{tech}</li>
						</ul>
					))}
				</div>
			))}
		</div>
	);
};

export default Whenuseswr;
