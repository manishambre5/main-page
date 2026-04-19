import { useEffect, useState } from 'react';

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

    if (loading) return <div style={{ padding: '20px' }}>Loading Wikipedia Feed...</div>;

  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Main Column */}
            <div className="md:col-span-2 space-y-8">
            {/* Featured Article Card */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Featured Article</span>
                <h2 className="text-2xl font-bold mt-2 text-slate-800">{data?.tfa?.titles.normalized}</h2>
                <p className="mt-4 text-slate-600 leading-relaxed">{data?.tfa?.extract}</p>
            </section>

            {/* In The News Card */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📰</span> In The News
                </h2>
                <ul className="space-y-4">
                {data?.news?.map((item, i) => (
                    <li 
                    key={i} 
                    className="text-slate-700 border-l-4 border-slate-100 pl-4 hover:border-blue-400 transition-colors"
                    dangerouslySetInnerHTML={{ __html: item.story }} 
                    />
                ))}
                </ul>
            </section>
            </div>

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
