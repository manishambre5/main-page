import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { StarIcon } from '@phosphor-icons/react';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from './components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';

export function Feed() {

    interface WikiFeed {
        tfa?: { titles: { normalized: string }; extract: string; originalimage?: { source: string }; content_urls: { desktop: { page: string }; }; };
        mostread?: { articles: Array<{ title: string; views: number }> };
        news?: Array<{ story: string }>;
        dyk?: string[];
        image?: { description: { text: string }; image: { source: string }; };
    }

    const [data, setData] = useState<WikiFeed | null>(null);
    const [loading, setLoading] = useState(true);
    const [dyk, setDyk] = useState<string[]>([]);

    useEffect(() => {
        const today = new Date();
        const datePath = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
        
        fetch(`https://en.wikipedia.org/api/rest_v1/feed/featured/${datePath}?origin=*`)
        .then(res => res.json())
        .then(json => {
            setData(json);
            setLoading(false);
            console.log(json.tfa);
        })
        .catch(err => console.error("Failed to fetch wiki data:", err));
    }, []);

    useEffect(() => {
        const fetchDYK = async () => {
            try{
                const response = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=Template:Did_you_know&format=json&origin=*`);
                const data = await response.json();
                const html = data.parse.text["*"];
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const listItems = Array.from(doc.querySelectorAll<HTMLLIElement>("ul li")).filter(li => li.innerText.trim().startsWith("..."));

                const facts = listItems.map(li => li.innerHTML);
                setDyk(facts);
            } catch (error) {
                console.error("Error fetching DYK:", error);
            }
        };

        fetchDYK();
    }, []);

  return (
    
        <section className="p-2 grid md:grid-cols-5 gap-2">

            {/* Left-most column */}
            <section className=''>
            {/* Trending now card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Trending Now</CardTitle>
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


            {/* Main middle column */}
            <main className='md:col-span-3 grid md:grid-cols-2 place-items-start gap-4 md:border-x md:px-2'>

                {/* Featured Article Image */}
                <section className='size-full row-span-2 border'>
                    {loading ? (<Skeleton className='w-full h-64' />) : (<img
                        src={data?.tfa?.originalimage?.source}
                        alt="Featured Article Image"
                        className="size-full object-cover"
                    />)}
                </section>

                {/* Featured Article Card */}
                <Card className=''>
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
                <Card className="row-span-2">
                    <CardHeader>
                        <CardDescription className='text-muted-foreground text-sm uppercase'>
                            <Badge variant="outline">
                                <StarIcon />
                                Featured Picture
                            </Badge>
                        </CardDescription>
                    </CardHeader>
                    {loading ? (<Skeleton className='w-full h-64' />) : (
                    <img src={data?.image?.image.source}
                        alt="Featured Picture"
                        className="w-full aspect-auto object-cover"
                    />)}
                    <CardContent>
                        {loading ? (<Skeleton className='w-full h-32' />) : (<p>{data?.image?.description.text}</p>)}
                    </CardContent>
                </Card>

                {/* In The News Card */}
                <Card className=''>
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
            <section className=''>
            {/* Did you know card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Did You Know...</CardTitle>
                </CardHeader>
                <CardContent>
                    <ItemGroup>
                        {dyk.map((factHtml, i) => (
                            <Item variant="outline" size="sm" key={i}>
                                <ItemContent>
                                    <ItemTitle>
                                        <span dangerouslySetInnerHTML={{ __html: factHtml }}></span>
                                    </ItemTitle>
                                </ItemContent>
                            </Item>
                        ))}
                    </ItemGroup>
                </CardContent>
            </Card>
            </section>

        </section>
    
  )
}
