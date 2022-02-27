import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { client } from "../../libs/client";
import { worksType } from "../../types/worksType";

type PathParams = {
	pid: string;
} & ParsedUrlQuery;

type postProps = {
	work: worksType;
};

const Post: NextPage<postProps> = (props) => {
	const router = useRouter();
	const { pid } = router.query;

	return (
		<div>
			<h1>今のパス: {pid}</h1>
			<h2>{props.work.name}</h2>
			<p>{props.work.desc}</p>
			<p>使用技術</p>
			{props.work.technologies.map((tech) => (
				<ul key={tech + props.work.id}>
					<li>{tech}</li>
				</ul>
			))}
		</div>
	);
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
	const data = await client.get({
		endpoint: "testworks",
	});

	const posts: worksType[] = data.contents;

	const paths = posts.map((post) => ({
		params: {
			pid: post.name,
		},
	}));
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<postProps, PathParams> = async (context) => {
	const { pid } = context.params as PathParams;

	const data = await client.get({
		endpoint: "testworks",
	});

	const posts: worksType[] = data.contents;

	const finalPost = posts.filter((d) => d.name === pid);
	const work = finalPost[0];

	return {
		props: {
			work,
		},
	};
};

export default Post;
