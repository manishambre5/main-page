import { Item, ItemDescription, ItemTitle } from "./ui/item";
import { Skeleton } from "./ui/skeleton";

type MostReadProps = {
    loading: boolean;
    mostread?: {
        articles: Array<{
            title: string;
            content_urls: { desktop: { page: string } };
        }>;
    };
};

export default function MostRead( {loading, mostread}: MostReadProps ) {

    return (
        <>
        {mostread &&
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
                mostread?.articles.map((article, i) => (
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
        </>
    );
}