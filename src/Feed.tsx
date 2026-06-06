import InTheNews from './components/InTheNews';
import FeaturedPicture from './components/FeaturedPicture';
import OnThisDay from './components/OnThisDay';
import FeaturedArticle from './components/FeaturedArticle';
import DidYouKnow from './components/DidYouKnow';
import MostReadContent from './components/MostReadContent';
import MostRead from './components/MostRead';
import type { WikiFeed } from './App';

type FeedProps = {
    today: Date;
    data: WikiFeed | null;
    loading: boolean;
    featPictLandscapeCheck: boolean;
}

export function Feed( { data, loading, featPictLandscapeCheck }: FeedProps ) {

  return (
    <div className='flex flex-col h-full gap-2 p-2'>
    
        {/* Trending now card */}
        <MostRead loading={loading} mostread={data?.mostread} />


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
                <FeaturedPicture loading={loading} image={data?.image} featPictLandscapeCheck={featPictLandscapeCheck} />

                <section className='flex-1 flex flex-wrap gap-2'>
                    {/* In The News Card */}
                    <InTheNews loading={loading} news={data?.news} />

                    {/* Featured Article Card */}
                    <FeaturedArticle loading={loading} tfa={data?.tfa} featPictLandscapeCheck={featPictLandscapeCheck} />
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

        {/* More Content Cards */}
        {data?.mostread &&
            <MostReadContent loading={loading} mostread={data?.mostread} />
        }

    </div>
  )
}
