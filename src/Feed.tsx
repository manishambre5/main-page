import { useEffect, useState } from 'react';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { ArrowUpRightIcon, StarIcon } from '@phosphor-icons/react';
import { Item, ItemActions, ItemContent, ItemGroup, ItemTitle } from './components/ui/item';

export function Feed() {

    interface WikiFeed {
        tfa?: { titles: { normalized: string }; extract: string };
        mostread?: { articles: Array<{ title: string; views: number }> };
        news?: Array<{ story: string }>;
    }

    interface NewsItem {
        text: string;
        links: { label: string; url: string }[];
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

    //loading alert
    if (loading) return <div style={{ padding: '20px' }}>Loading Wikipedia Feed...</div>;

    //dealing with fetched html
    const parseWikiHTML = (html: string): NewsItem => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        //extracting links
        const linkElements = doc.querySelectorAll('a');
        const links = Array.from(linkElements).map(a => ({
            label: a.textContent || '',
            // convert relative wiki links to absolute links
            url: a.getAttribute('href')?.startsWith('/') 
            ? `https://en.wikipedia.org${a.getAttribute('href')}` 
            : a.getAttribute('href') || ''
        }));

        // get clean text by stripping the HTML
        const text = doc.body.textContent || '';

        return { text, links };
    };

  return (
    <div>
        <div className="flex gap-4 p-4">
            
            {/* Main Column */}
            <section className="flex gap-4">
                {/* Featured Article Card */}
                <Card>
                    <CardHeader className="font-bold tracking-wider">
                        <CardDescription className='text-muted-foreground text-sm uppercase'>
                            <Badge variant="outline">
                                <StarIcon />
                                Featured Article
                            </Badge>
                        </CardDescription>
                        <CardTitle className="text-2xl font-bold text-slate-800">{data?.tfa?.titles.normalized}</CardTitle>
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
                        <p className="mt-4 text-slate-600 leading-relaxed">{data?.tfa?.extract}</p>
                    </CardContent>
                </Card>

                {/* In The News Card */}
                <Card>
                    <CardHeader className='font-bold tracking-wider'>
                        <CardTitle className="text-2xl font-bold text-slate-800">In The News</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                </Card>
            </section>

            {/* Sidebar */}
            <aside className="space-y-8">
            <section className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="animate-pulse text-red-500">●</span> Trending Now
                </h2>
                <ol className="space-y-4">
                {data?.mostread?.articles.slice(0, 5).map((art, i) => (
                    <li key={i} className="group cursor-pointer">
                    <div className="text-slate-400 text-xs font-mono">0{i + 1}</div>
                    <div className="font-medium group-hover:text-blue-300 transition-colors">
                        {art.title.replace(/_/g, ' ')}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-tighter">
                        {art.views.toLocaleString()} readers
                    </div>
                    </li>
                ))}
                </ol>
            </section>
            </aside>

        </div>
    </div>
  )
}
