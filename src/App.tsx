import { ArrowUpRightIcon, ImageIcon, NewspaperIcon, StarIcon } from "@phosphor-icons/react";
import { Button } from "./components/ui/button";
import { Feed } from "./Feed";
import { Separator } from "./components/ui/separator";
import Disclaimer from "./components/Disclaimer";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { useEffect, useState } from "react";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "./components/ui/item";
import { parser } from "./utils/parser";
import { ViewFinderBorder } from "./components/ui/viewfinderborder";
import { Badge } from "./components/ui/badge";

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
	image: {
		description: { text: string, html: string };
		image: {
			source: string,
			width: number,
			height: number
		};
		file_page: string;
		artist: {
			text: string,
			html: string
		}
	};
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
	const featArticlePictLandscapeCheck = (data?.tfa?.originalimage?.width ?? 0) > (data?.tfa?.originalimage?.height ?? 0);

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

			<div id="magazine" className="md:scale-100 scale-[calc(1/3)] origin-top-left">

				{/* Cover page */}
				<div className="relative max-w-300svw max-h-300svh inline-block">
					<img
						src={data?.image.image.source}
						alt="Featured Picture"
						className={`block max-w-[300svw] md:w-[200svw] lg:max-w-screen`}
					/>
					<div className="absolute inset-0 bg-black/20" />

					<div
						className={`absolute inset-0 flex flex-col p-2 justify-between gap-2 max-w-[300svw] md:max-w-[200svw] lg:max-w-screen
						${featPictLandscapeCheck
							? ("")
							: ("")
						}
					`}>

						<header className="w-full p-4 flex flex-col items-center justify-center gap-4">
							<div className="text-sm tracking-tight text-background flex gap-2 items-center">
								<span>English Wikipedia Edition</span>
								<Separator orientation="vertical" />
								<span>{formattedDate}</span>
							</div>
							<h1 className="text-9xl font-heading text-background font-semibold tracking-tight">Main Page</h1>
						</header>

						<p className="text-center text-bold text-background font-mono">(layout under construction...)</p>

						<div className="flex flex-row justify-between gap-2 flex-1">
							<div className="flex flex-col justify-around gap-2">

								<Item className="max-w-1/2 text-background w-fit relative bg-white/10">
									<ViewFinderBorder />
									<ItemDescription className="uppercase">
										<Badge variant="outline" className="text-accent">
											<StarIcon />
											Featured Article
										</Badge>
									</ItemDescription>
									<ItemTitle className="text-4xl leading-normal">{data?.tfa?.titles.normalized}</ItemTitle>
								</Item>

								<div className="max-w-1/2 text-background w-fit relative bg-white/10 p-4">
									<ViewFinderBorder />
									<p className="uppercase">
										<Badge variant="outline" className="text-accent">
											<StarIcon />
											News
										</Badge>
									</p>
									<div className="">
									{data?.news?.slice(0,2).map((item, i) => {
									return (
										<Item size="sm" key={i}>
											<ItemContent>
												<div className="lg:text-sm">
													{parser(item.story).content}
												</div>
											</ItemContent>
										</Item>
									);
									})}
									</div>
									<p className="text-right">...and more</p>
								</div>

							</div>
							<div className="flex flex-col justify-between gap-2">
								<div className="max-w-1/2 text-background w-fit self-end relative bg-white/10 p-4">
									<ViewFinderBorder />
									<p className="text-right uppercase">
										<Badge variant="outline" className="text-accent">
											<StarIcon />
											Most Read
										</Badge>
									</p>
									{data?.mostread?.articles.slice(0,5).map((article, i) => (
										<Item size="xs" key={i} className="shrink-0 flex-nowrap text-nowrap text-right justify-end">
											<ItemTitle className="font-medium text-sm">
												<a href={article.content_urls.desktop.page}>
													{article.title.replace(/_/g, ' ')}
												</a>
											</ItemTitle>
											<ItemDescription className="text-accent text-xs font-mono">#0{i + 1}</ItemDescription>
										</Item>
										))
									}
								</div>

								<Item className="max-w-2/3 text-right self-end mt-aut bg-white/10 relative">
									<ViewFinderBorder />
									<ItemContent>
										{data && <>
											<p className="text-background italic text-sm">{parser(data?.image?.description.html).content}</p>
											<p className="text-background">By {parser(data?.image.artist.html).content}</p>
											</>
										}
									</ItemContent>
								</Item>
							</div>
						</div>


					</div>
				</div>
				
				{/* Second page */}
				<div className="max-w-300svw max-h-300svh min-h-screen justify-center flex w-max">

					<div
						className={`flex ${featArticlePictLandscapeCheck && "flex-col"} items-center gap-4 w-[300svw] md:w-[200svw] lg:w-screen
						`}
					>
						{data?.tfa?.originalimage && <img
							src={data?.tfa?.originalimage?.source}
							alt="Featured Picture"
							className={`max-w-3/5`}
						/>}


						<Item className="flex-1 bg-white/10 flex-col p-12">
							<ItemDescription className="uppercase">
								<Badge variant="outline" className="">
									<StarIcon />
									Featured Article
								</Badge>
							</ItemDescription>
							<ItemTitle className="text-4xl leading-normal">
								<a href={data?.tfa?.content_urls.desktop.page} className='hover:underline'>{data?.tfa?.titles.normalized}</a>
							</ItemTitle>
							<ItemContent className="text-sm">
								{data?.tfa && <p>{parser(data?.tfa.extract_html).content}</p>}
							</ItemContent>
						</Item>
					</div>


				</div>

				{/* Third page */}
				<div className="max-w-300svw max-h-300svh">

					<div
						className={`w-[300svw] md:w-[200svw] lg:w-screen
						`}
					>
						<ItemGroup className="p-4 grid grid-cols-4 gap-4">
						<p className="text-5xl flex items-center col-span-2 justify-center">Did You Know?</p>
						{data?.dyk?.map((factHtml, i) => (
							<Item variant="muted" className="aspect-square text-center" size="xs" key={i}>
								<div className='text-sm'>
									{parser(factHtml.html).content}
								</div>
							</Item>
						))}
						</ItemGroup>
					</div>


				</div>

				{/* Fourth page */}
				<div className="max-w-300svw max-h-300svh inline-block bg-foreground">

					<div
						className={`flex w-[300svw] md:w-[200svw] lg:w-screen
						`}
					>
						<p className="text-5xl flex items-center row-span-full justify-center text-center text-accent">On this day...</p>
						<ItemGroup className="p-4 grid grid-cols-4 grid-rows-4 gap-4">
						{data?.onthisday?.map((event, i) => (
							<Item variant="default" size="xs" key={i} className="flex flex-col items-start bg-background">
								<ItemDescription className="text-slate-400 px-1">{event.year}</ItemDescription>
								<ItemTitle className="font-medium text-sm">
									{event.text}
								</ItemTitle>
							</Item>
						))}
						</ItemGroup>
					</div>


				</div>

			</div>

		)}
		</>
	)
}
