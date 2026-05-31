import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "./ui/item";
import { Skeleton } from "./ui/skeleton";
import { parser } from "@/utils/parser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type InTheNewsProps = {
    loading: boolean;
    news?: Array<{ story: string }>;
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

export default function InTheNews( {loading, news, mostread}: InTheNewsProps ) {

    return (
        <Card className='lg:col-span-2'>
            <Tabs defaultValue="news">
            <CardHeader>
                <TabsList variant="line">
                    <TabsTrigger value="news">
                        <CardTitle className="text-2xl font-bold italic">News</CardTitle>
                    </TabsTrigger>
                    <TabsTrigger value="mostread">
                        <CardTitle className="text-2xl font-bold italic">Most Read</CardTitle>
                    </TabsTrigger>
                </TabsList>
            </CardHeader>
            <CardContent>
                <TabsContent value="news">
                {loading ? (
                    <div className='flex flex-col gap-4'>
                        <Skeleton className='w-full h-12' />
                        <Skeleton className='w-full h-12' />
                        <Skeleton className='w-full h-12' />
                        <Skeleton className='w-full h-12' />
                    </div>
                ) : (
                <ItemGroup>
                    {news?.map((item, i) => {
                    return (
                        <Item variant="muted" size="xs" key={i} className='border-l-2 border-l-accent-foreground'>
                            <ItemContent>
                                <div className="xl:text-sm">
                                    {parser(item.story).content}
                                </div>
                            </ItemContent>
                        </Item>
                    );
                    })}
                </ItemGroup>
                )}
                </TabsContent>
                <TabsContent value="mostread">
                {loading ? (
                    <div className='flex flex-col gap-4'>
                        <Skeleton className='w-full h-12' />
                        <Skeleton className='w-full h-12' />
                        <Skeleton className='w-full h-12' />
                        <Skeleton className='w-full h-12' />
                    </div>
                ) : (
                <ItemGroup>
                    {mostread?.articles.slice(0,5).map((item, i) => {
                    return (
                        <Item variant="muted" size="xs" key={i}>
                            <ItemContent>
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
                            {item.originalimage && (
                                loading ? (
                                    <Skeleton className='size-12' />
                                ) : (
                                    <ItemMedia className="max-w-12" variant="icon">
                                        <img
                                        src={item.originalimage.source}
                                        alt={item.title}
                                        className="object-cover"
                                        />
                                    </ItemMedia>
                                )
                            )}
                        </Item>
                    );
                    })}
                </ItemGroup>
                )}
                </TabsContent>
            </CardContent>
            </Tabs>
        </Card>
    );
}