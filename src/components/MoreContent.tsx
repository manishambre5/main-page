import { Skeleton } from "./ui/skeleton";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./ui/item";

type MoreContentProps = {
    loading: boolean;
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
};

export default function MoreContent( { loading, mostread }: MoreContentProps ) {
    return (
        <div className="relative flex">
            <div className="max-w-1/3 text-center py-2 flex relative z-10">
                <p className="text-2xl italic self-center border-r px-2">Most Read Articles</p>
                <div className="absolute flex-1 pointer-events-none -right-2 top-0 h-full w-4 bg-linear-to-r from-white to-transparent" />
            </div>
            <div className="flex-1 flex gap-2 overflow-y-auto no-scrollbar z-0">
            {loading ? (
                <>
                    <Skeleton className='w-full h-24' />
                    <Skeleton className='w-full h-24' />
                    <Skeleton className='w-full h-24' />
                    <Skeleton className='w-full h-24' />
                </>
            ) : (
            <>
                {mostread?.articles.slice(0,5).map((item, i) => {
                return (
                    <Item variant="muted" size="sm" key={i} className="shrink-0 w-fit">
                        {item.originalimage && (
                            loading ? (
                                <Skeleton className='size-12' />
                            ) : (
                                <ItemMedia variant="icon">
                                    <img
                                    src={item.originalimage.source}
                                    alt={item.title}
                                    className="max-h-16 object-cover"
                                    />
                                </ItemMedia>
                            )
                        )}
                        <ItemContent className="">
                            <ItemDescription className="text-xs text-muted-foreground uppercase">
                                {item.views.toLocaleString()} readers
                            </ItemDescription>
                            <ItemTitle className="text-base">
                                <a href={item.content_urls.desktop.page}>
                                    {item.title.replace(/_/g, ' ')}
                                </a>
                            </ItemTitle>
                            <ItemDescription className="italic">{item.description}</ItemDescription>
                        </ItemContent>
                    </Item>
                );
                })}
            </>
            )}
            </div>
            <div className="absolute flex-1 pointer-events-none right-0 top-0 h-full w-4 bg-linear-to-l from-white to-transparent" />
        </div>
    )
}