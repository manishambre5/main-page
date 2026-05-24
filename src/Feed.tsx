import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { StarIcon } from '@phosphor-icons/react';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from './components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';

export function Feed() {

    interface WikiFeed {
        tfa?: { titles: { normalized: string }; extract: string; 
            originalimage?: { source: string }; content_urls: { desktop: { page: string }; };
        };
        mostread?: { articles: Array<{ title: string; views: number }> };
        news?: Array<{ story: string }>;
        dyk?: Array<{ html: string; text: string }>;
        image?: { description: { text: string }; image: { source: string }; };
        onthisday: Array<{ text: string; year: number }>;
    }

    const [data, setData] = useState<WikiFeed | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const today = new Date();
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
    <>
    
        {/* Trending now card */}
        {data?.mostread &&
        <section className='relative m-2 border border-border p-4 flex gap-4'>
            <div className='text-nowrap relative w-fit'>
                <p className="text-2xl font-bold">Trending Now</p>
                <div className="absolute pointer-events-none -right-12 top-0 h-full w-8 bg-linear-to-r from-white to-transparent" />
            </div>
            <div className="flex-1 flex gap-4 overflow-x-auto overflow-y-visible no-scrollbar">
                {loading ? (
                        <div className='flex gap-4'>
                            <Skeleton className='w-full h-8' />
                            <Skeleton className='w-full h-8' />
                            <Skeleton className='w-full h-8' />
                            <Skeleton className='w-full h-8' />
                            <Skeleton className='w-full h-8' />
                        </div>
                ) : (
                data?.mostread?.articles.map((article, i) => (
                    <Item variant="outline" size="sm" key={i} className="group cursor-pointer shrink-0 w-fit md:w-full h-fit flex-nowrap md:flex-wrap md:text-wrap text-nowrap">
                        <ItemDescription className="text-slate-400 text-xs font-mono">#0{i + 1}</ItemDescription>
                        <ItemTitle className="font-medium group-hover:text-sky-700 transition-colors">
                            {article.title.replace(/_/g, ' ')}
                        </ItemTitle>
                        <ItemDescription className="text-xs text-slate-500 uppercase tracking-tighter">
                            {article.views.toLocaleString()} readers
                        </ItemDescription>
                    </Item>))
                )}
            </div>
            <div className="absolute pointer-events-none right-0 top-0 h-full w-8 bg-linear-to-l from-white to-transparent" />
        </section>}

        <section className="p-2 flex flex-col md:flex-row gap-2">



            {/* Left-most column */}
            <section className='order-2 md:order-1 w-full md:w-1/5 lg:w-1/6 flex flex-col gap-2'>
            {/* On this day card */}
            <Card className='relative max-h-96 md:max-h-screen'>
                <CardHeader className='relative'>
                    <CardTitle className="text-2xl font-bold">On this day</CardTitle>
                    <div className="absolute pointer-events-none right-0 -bottom-12 w-full h-8 bg-linear-to-b from-white to-transparent hidden md:block" />
                </CardHeader>
                <CardContent className="md:py-4 flex md:flex-col gap-4 overflow-x-auto overflow-y-visible no-scrollbar">
                    {loading ? (
                        <div className='flex md:flex-col gap-4'>
                            <Skeleton className='w-full h-8' />
                            <Skeleton className='w-full h-8' />
                            <Skeleton className='w-full h-8' />
                            <Skeleton className='w-full h-8' />
                            <Skeleton className='w-full h-8' />
                        </div>
                    ) : (
                    data?.onthisday.map((event, i) => (
                        <Item variant="outline" size="sm" key={i} className="group cursor-pointer shrink-0 w-2/3 md:w-full h-fit flex flex-col items-start">
                            <ItemDescription className="text-slate-400 px-1">{event.year}</ItemDescription>
                            <ItemTitle className="font-medium group-hover:text-sky-700 transition-colors">
                                {event.text}
                            </ItemTitle>
                        </Item>))
                    )}
                </CardContent>
                <div className="absolute pointer-events-none left-0 bottom-4 w-full h-8 bg-linear-to-t from-white to-transparent hidden md:block" />
                {/* fade for the sides on small screens */}
                <div className="absolute pointer-events-none right-0 top-0 h-full w-8 bg-linear-to-l from-white to-transparent md:hidden" />
                <div className="absolute pointer-events-none left-0 top-0 h-full w-8 bg-linear-to-r from-white to-transparent md:hidden" />
            </Card>
            </section>


            {/* Main middle column */}
            <main className='flex-1 md:order-2 columns-1 lg:columns-2 gap-2'>

                {/* Featured Article Card */}
                <Card className='mb-2'>
                    {loading ? (<Skeleton className='w-full h-64' />) : (<img
                        src={data?.tfa?.originalimage?.source}
                        alt="Featured Article Image"
                        className="size-full object-cover"
                    />)}
                    <CardHeader>
                        <CardDescription className='text-muted-foreground text-sm uppercase'>
                            <Badge variant="outline">
                                <StarIcon />
                                Featured Article
                            </Badge>
                        </CardDescription>
                        <CardTitle className="text-2xl font-bold">
                            {loading ? (<Skeleton className='h-4 w-2/3' />) : <a href={data?.tfa?.content_urls.desktop.page} className='hover:underline'>{data?.tfa?.titles.normalized}</a>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (<Skeleton className='w-full h-32' />) : (<p>{data?.tfa?.extract}</p>)}
                    </CardContent>
                </Card>

                {/* Featured Picture */}
                <Card className='mb-2'>
                    {loading ? (<Skeleton className='w-full h-64' />) : (
                    <img src={data?.image?.image.source}
                        alt="Featured Picture"
                        className="size-full object-cover"
                    />)}
                    <CardHeader>
                        <CardDescription className='text-muted-foreground text-sm uppercase'>
                            <Badge variant="outline">
                                <StarIcon />
                                Featured Picture
                            </Badge>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (<Skeleton className='w-full h-32' />) : (<p>{data?.image?.description.text}</p>)}
                    </CardContent>
                </Card>

                {/* In The News Card */}
                <Card className='mb-2'>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">In The News</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className='flex flex-col gap-4'>
                                <Skeleton className='w-full h-16' />
                                <Skeleton className='w-full h-16' />
                                <Skeleton className='w-full h-16' />
                            </div>
                        ) : (
                        <ItemGroup>
                            {data?.news?.map((item, i) => {
                            return (
                                <Item variant="outline" size="sm" key={i}>
                                <ItemContent>
                                    <ItemTitle>
                                    <span 
                                        dangerouslySetInnerHTML={{ __html: item.story }} 
                                    />
                                    </ItemTitle>
                                </ItemContent>
                                </Item>
                            );
                            })}
                        </ItemGroup>
                        )}
                    </CardContent>
                </Card>

            </main>


            {/* Right-most column */}
            <section className='order-3 w-full md:w-1/5 lg:w-1/6 flex flex-col gap-2'>
            {/* Did you know card */}
            <Card className='relative max-h-96 md:max-h-screen'>
                <CardHeader className='relative'>
                    <CardTitle className="text-2xl font-bold">Did You Know...</CardTitle>
                    <div className="absolute pointer-events-none right-0 -bottom-12 w-full h-8 bg-linear-to-b from-white to-transparent" />
                </CardHeader>
                <CardContent className="py-4 overflow-x-auto overflow-y-visible no-scrollbar">
                    <ItemGroup className=''>
                        {loading ? (
                            <div className='flex flex-col gap-4'>
                                <Skeleton className='w-full h-8' />
                                <Skeleton className='w-full h-8' />
                                <Skeleton className='w-full h-8' />
                                <Skeleton className='w-full h-8' />
                                <Skeleton className='w-full h-8' />
                            </div>
                        ) : (
                        data?.dyk?.map((factHtml, i) => (
                            <Item variant="outline" size="sm" key={i}>
                                <ItemContent>
                                    <ItemTitle>
                                        <span dangerouslySetInnerHTML={{ __html: factHtml.html }}></span>
                                    </ItemTitle>
                                </ItemContent>
                            </Item>
                        )))}
                    </ItemGroup>
                </CardContent>
                <div className="absolute pointer-events-none left-0 bottom-4 w-full h-8 bg-linear-to-t from-white to-transparent" />
            </Card>
            </section>

        </section>
    </>
  )
}
