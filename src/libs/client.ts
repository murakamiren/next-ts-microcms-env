import { createClient } from "microcms-js-sdk";

export const client = createClient({
	serviceDomain: "llqvssp7hj",
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
});
