import { useEffect, useState } from 'react';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { ArrowUpRightIcon, StarIcon } from '@phosphor-icons/react';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from './components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';

export function Feed() {

    interface WikiFeed {
        tfa?: { titles: { normalized: string }; extract: string };
        mostread?: { articles: Array<{ title: string; views: number }> };
        news?: Array<{ story: string }>;
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
        })
        .catch(err => console.error("Failed to fetch wiki data:", err));
    }, []);

  return (
    <div>
        <div className="flex flex-col gap-4 p-4 w-full">
            
            {/* Main Column */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* Featured Article Card */}
                <Card>
                    <CardHeader className="font-bold tracking-wider">
                        <CardDescription className='text-muted-foreground text-sm uppercase'>
                            <Badge variant="outline">
                                <StarIcon />
                                Featured Article
                            </Badge>
                        </CardDescription>
                        <CardTitle className="text-2xl font-bold text-slate-800">
                            {loading ? (<Skeleton className='h-4 w-2/3' />) : (data?.tfa?.titles.normalized)}
                        </CardTitle>
                        <CardAction>
                            <Badge asChild>
                                <a href='#'>
                                    Wikipedia
                                    <ArrowUpRightIcon data-icon="inline-end" />
                                </a>
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        {loading ? (<Skeleton className='w-full h-32' />) : (<p className="mt-4 text-slate-600 leading-relaxed">{data?.tfa?.extract}</p>)}
                    </CardContent>
                </Card>

                {/* In The News Card */}
                <Card>
                    <CardHeader className='font-bold tracking-wider'>
                        <CardTitle className="text-2xl font-bold text-slate-800">In The News</CardTitle>
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
            </section>

            {/* Sidebar */}
            <section className='w-full'>
            <Card>
                <CardHeader className='font-bold tracking-wider'>
                    <CardTitle className="text-2xl font-bold text-slate-800">Trending Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loading ? (
                            <div className='flex flex-col gap-4'>
                                <Skeleton className='w-full h-8' />
                                <Skeleton className='w-full h-8' />
                                <Skeleton className='w-full h-8' />
                                <Skeleton className='w-full h-8' />
                                <Skeleton className='w-full h-8' />
                            </div>
                    ) : (
                    data?.mostread?.articles.slice(0, 5).map((art, i) => (
                        <Item variant="outline" key={i} className="group cursor-pointer">
                            <ItemDescription className="text-slate-400 text-xs font-mono">0{i + 1}</ItemDescription>
                            <ItemTitle className="font-medium group-hover:text-blue-300 transition-colors">
                                {art.title.replace(/_/g, ' ')}
                            </ItemTitle>
                            <ItemDescription className="text-xs text-slate-500 uppercase tracking-tighter">
                                {art.views.toLocaleString()} readers
                            </ItemDescription>
                        </Item>))
                    )}
                </CardContent>
            </Card>
            </section>

        </div>
    </div>
  )
}
