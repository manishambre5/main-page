import { ArrowUpRightIcon, ImageIcon, NewspaperIcon } from "@phosphor-icons/react";
import { Button } from "./components/ui/button";
import { Feed } from "./Feed";
import { Separator } from "./components/ui/separator";
import Disclaimer from "./components/Disclaimer";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { useEffect, useState } from "react";

type Layout = "newspaper" | "magazine";

export type WikiFeed = {
	tfa?: {
		titles: { normalized: string };
		extract_html: string;
		originalimage?: { source: string, height: number, width: number };
		content_urls: { desktop: { page: string }; };
	};
	mostread?: {
		articles: Array<{
			title: string;
			views: number;
			content_urls: { desktop: { page: string } };
			extract_html: string;
			description: string;
			originalimage: { source: string };
		}>;
	};
	news?: Array<{ story: string }>;
	dyk?: Array<{ html: string; text: string }>;
	image: { description: { text: string }; image: { source: string, width: number, height: number }; file_page: string };
	onthisday: Array<{
		text: string;
		year: number;
		pages: Array<{
			content_urls: {
				desktop: { page: string };
			};
			extract_html: string;
			normalizedtitle: string;
			thumbnail: { source: string };
		}>;
	}>;
}

export default function App() {

	const [ layout, setLayout ] = useState<Layout>("newspaper");
	const [data, setData] = useState<WikiFeed | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const today = new Date();

	const formattedDate = today.toLocaleDateString("en-US", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const featPictLandscapeCheck = (data?.image?.image?.width ?? 0) > (data?.image?.image?.height ?? 0);

	useEffect(() => {
		const datePath = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

		fetch(`https://en.wikipedia.org/api/rest_v1/feed/featured/${datePath}?origin=*`, {
			method: 'GET',
			headers: {
				// Wikimedia User-Agent Policy
				'Api-User-Agent': 'main-page/1.0 (contact: manishambre5@gmail.com)'
			}
		})
		.then(res => {
			if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
			}
			return res.json();
		})
		.then(json => {
			setData(json);
			setLoading(false);
			console.log(json);
		})
		.catch(err => {
			console.error("Failed to fetch wiki data:", err);
			setLoading(false);
		});

		// TODO: Caching the response json in localStorage for the day
	}, []);

	return (
		<>
		<Disclaimer />

		<ToggleGroup
			type="single"
			value={layout}
			onValueChange={(value) => {
				if (value) {
					setLayout(value as Layout);
				}
			}}
			size="sm"
			variant="outline"
			className="fixed z-10 bg-background bottom-4 right-4"
		>
			<ToggleGroupItem value="newspaper" aria-label="Toggle newspaper layout"><NewspaperIcon /></ToggleGroupItem>
			<ToggleGroupItem value="magazine" aria-label="Toggle magazine layout"><ImageIcon /></ToggleGroupItem>
		</ToggleGroup>

		{layout === "newspaper" ? (
			<div className="flex flex-col">

				<header className="w-full p-4 flex flex-col items-center justify-center gap-4">
					<h1 className="text-7xl font-heading text-foreground font-semibold tracking-tight">Main Page</h1>
					<div className="text-sm tracking-tight text-secondary-foreground flex gap-2 items-center">
						<span>English Wikipedia Edition</span>
						<Separator orientation="vertical" />
						<span>{formattedDate}</span>
					</div>
				</header>

				<Separator />

				<Feed today={today} data={data} loading={loading} featPictLandscapeCheck={featPictLandscapeCheck} />

				<footer className="flex flex-col items-center justify-center w-full p-4 min-h-16 bg-foreground">
					<Button variant="secondary" asChild>
						<a href="https://github.com/manishambre5/main-page">
							source code<ArrowUpRightIcon data-icon="inline-end" />
						</a>
					</Button>
				</footer>
			</div>

		) : (

			<div className="flex justify-center items-center">
				<div className="relative max-w-screen max-h-screen inline-block">
					<img
						src={data?.image.image.source}
						alt="Featured Picture"
						className="block max-w-screen max-h-screen"
					/>
					<div className="absolute inset-0 bg-black/20" />

					<div className="absolute inset-0 flex flex-col justify-around">
						<header className="w-full p-4 flex flex-col items-center justify-center gap-4">
							<h1 className="text-7xl font-heading text-background font-semibold tracking-tight">Main Page</h1>
							<div className="text-sm tracking-tight text-background flex gap-2 items-center">
								<span>English Wikipedia Edition</span>
								<Separator orientation="vertical" />
								<span>{formattedDate}</span>
							</div>
						</header>

						<p className="text-center text-background">under construction...</p>
					</div>
				</div>
			</div>

		)}
		</>
	)
}
