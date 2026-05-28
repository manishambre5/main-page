import { useEffect, useState } from 'react';
import { Item, ItemDescription, ItemTitle } from './components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import InTheNews from './components/InTheNews';
import FeaturedPicture from './components/FeaturedPicture';
import OnThisDay from './components/OnThisDay';
import FeaturedArticle from './components/FeaturedArticle';
import DidYouKnow from './components/DidYouKnow';

type FeedProps = {
    today: Date;
}

export function Feed( { today }: FeedProps ) {

    type WikiFeed = {
        tfa?: {
            titles: { normalized: string };
            extract_html: string;
            originalimage?: { source: string };
            content_urls: { desktop: { page: string }; };
        };
        mostread?: {
            articles: Array<{
                title: string;
                views: number;
                content_urls: { desktop: { page: string } };
            }>;
        };
        news?: Array<{ story: string }>;
        dyk?: Array<{ html: string; text: string }>;
        image?: { description: { text: string }; image: { source: string }; file_page: string };
        onthisday: Array<{ text: string; year: number }>;
    }

    const [data, setData] = useState<WikiFeed | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const datePath = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
        
        fetch(`https://en.wikipedia.org/api/rest_v1/feed/featured/${datePath}?origin=*`)
        .then(res => res.json())
        .then(json => {
            setData(json);
            setLoading(false);
            console.log(json);
        })
        .catch(err => console.error("Failed to fetch wiki data:", err));
    }, []);

  return (
    <div className='flex flex-col gap-2 p-2'>
    
        {/* Trending now card */}
        {data?.mostread &&
        <section className='relative ring-1 ring-foreground/10 p-2 flex'>
            <div className='relative w-fit flex items-center'>
                <p className="text-sm md:text-lg font-semibold border-r pr-2 uppercase">Trending</p>
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
                        <ItemDescription className="text-slate-400 text-xs font-mono">#0{i + 1}</ItemDescription>
                            <ItemTitle className="font-medium text-sm">
                                <a href={article.content_urls.desktop.page}>
                                    {article.title.replace(/_/g, ' ')}
                                </a>
                            </ItemTitle>
                        <ItemDescription className="text-xs text-slate-500 uppercase tracking-tighter">
                            {article.views.toLocaleString()} readers
                        </ItemDescription>
                    </Item>
                    ))
                )}
            </div>
            <div className="absolute pointer-events-none right-0 top-0 h-full w-8 bg-linear-to-l from-white to-transparent" />
        </section>}



        <section className="flex flex-col md:flex-row gap-2">

            {/* Left-most column */}
            <section className='order-2 md:order-1 w-full md:w-1/5 lg:w-1/6 flex flex-col gap-2'>
                {/* On this day card */}
                <OnThisDay loading={loading} onthisday={data?.onthisday} />
            </section>


            {/* Main middle column */}
            <main className='flex-1 md:order-2 columns-1 lg:columns-2 gap-2'>

                {/* Featured Picture */}
                <FeaturedPicture loading={loading} image={data?.image} />

                {/* In The News Card */}
                <InTheNews loading={loading} news={data?.news} />

                {/* Featured Article Card */}
                <FeaturedArticle loading={loading} tfa={data?.tfa} />

            </main>


            {/* Right-most column */}
            <section className='order-3 w-full md:w-1/5 lg:w-1/6 flex flex-col gap-2'>
                {/* Did you know card */}
                <DidYouKnow loading={loading} dyk={data?.dyk} />
            </section>

        </section>
    </div>
  )
}
