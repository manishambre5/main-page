import { useEffect, useState } from 'react';
import { Item, ItemDescription, ItemTitle } from './components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import InTheNews from './components/InTheNews';
import FeaturedPicture from './components/FeaturedPicture';
import OnThisDay from './components/OnThisDay';
import FeaturedArticle from './components/FeaturedArticle';
import DidYouKnow from './components/DidYouKnow';
import MoreContent from './components/MoreContent';

type FeedProps = {
    today: Date;
}

type WikiFeed = {
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

export function Feed( { today }: FeedProps ) {

    const [data, setData] = useState<WikiFeed | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
    <div className='flex flex-col h-full gap-2 p-2'>
    
        {/* Trending now card */}
        {data?.mostread &&
        <section className='relative ring-1 ring-foreground/10 p-2 flex'>
            <div className='relative w-fit flex items-center'>
                <p className="text-sm md:text-lg font-semibold border-r px-2 uppercase">Trending</p>
                <div className="absolute flex-1 pointer-events-none -right-4 h-12 w-4 bg-linear-to-r from-white to-transparent" />
            </div>
            <div className="flex-1 pl-2 flex gap-4 overflow-x-auto overflow-y-visible no-scrollbar">
                {loading ? (
                    <div className='flex gap-4 w-full'>
                        <Skeleton className='w-48 shrink-0 h-full' />
                        <Skeleton className='w-48 shrink-0 h-full' />
                        <Skeleton className='w-48 shrink-0 h-full' />
                        <Skeleton className='w-full h-full' />
                    </div>
                ) : (
                data?.mostread?.articles.map((article, i) => (
                    <Item variant="muted" size="xs" key={i} className="cursor-pointer shrink-0 size-fit flex-nowrap text-nowrap">
                        <ItemDescription className="text-muted-foreground text-xs font-mono">#0{i + 1}</ItemDescription>
                        <ItemTitle className="font-medium text-sm">
                            <a href={article.content_urls.desktop.page}>
                                {article.title.replace(/_/g, ' ')}
                            </a>
                        </ItemTitle>
                    </Item>
                    ))
                )}
            </div>
            <div className="absolute pointer-events-none right-0 top-0 h-full w-8 bg-linear-to-l from-white to-transparent" />
        </section>}



        <section className="relative flex flex-col md:flex-row gap-2">

            {/* Left-most column */}
            <aside className='relative order-2 md:order-1 w-full md:w-1/5 lg:w-1/6 xl:w-1/7 flex flex-col gap-2 min-h-100 md:min-h-0'>
                <div className="absolute inset-0 flex flex-col gap-2">
                    {/* On this day card */}
                    <OnThisDay loading={loading} onthisday={data?.onthisday} />
                </div>
            </aside>


            {/* Main middle column */}
            <main className='flex-1 order-1 md:order-2 flex flex-wrap gap-2 h-full'>
                {/* Featured Picture */}
                <FeaturedPicture loading={loading} image={data?.image} />

                <section className='flex-1 flex flex-wrap gap-2'>
                    {/* In The News Card */}
                    <InTheNews loading={loading} news={data?.news} />

                    {/* Featured Article Card */}
                    <FeaturedArticle loading={loading} tfa={data?.tfa} />
                </section>

            </main>


            {/* Right-most column */}
            <aside className='relative order-3 w-full md:w-1/5 lg:w-1/6 xl:w-1/7 flex flex-col gap-2 min-h-100 md:min-h-0'>
                <div className="absolute inset-0 flex flex-col gap-2">
                    {/* Did you know card */}
                    <DidYouKnow loading={loading} dyk={data?.dyk} />
                </div>
            </aside>

        </section>

        {/* More Content Cards (mostread content) */}
        {data?.mostread &&
            <MoreContent loading={loading} mostread={data?.mostread} />
        }

    </div>
  )
}
