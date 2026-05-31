import { StarIcon } from "@phosphor-icons/react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { parser } from "@/utils/parser";

type MoreContentProps = {
    loading: boolean;
    mostread?: {
        articles: Array<{
            title: string;
            views: number;
            content_urls: { desktop: { page: string } };
            extract_html: string;
            originalimage: { source: string };
        }>;
    };
};

export default function MoreContent( { loading, mostread }: MoreContentProps ) {
    return (
        <>
        {mostread && (
            <>
            {mostread?.articles.map((article, i) => (
                <Card key={i} className='mb-2 md:flex-row md:gap-0'>
                    {article.originalimage && (
                    <div className="w-full md:max-w-2/5 md:-my-4">
                        {loading ? (
                            <Skeleton className='size-full' />
                        ) : (
                            <img
                            src={article.originalimage?.source}
                            alt="Article Image"
                            className="size-full object-contain md:object-cover -mt-4 md:my-0" />
                        )}
                    </div>
                    )}
                    <div className="flex-1 relative">
                    <CardHeader className="relative">
                        <CardDescription className='text-muted-foreground text-sm uppercase'>
                            <Badge variant="outline">
                                <StarIcon />
                                Trending
                            </Badge>
                        </CardDescription>
                        <CardTitle className="text-xl font-bold pb-2">
                            {loading ? (<Skeleton className='h-8 w-2/3' />) : <a href={article.content_urls.desktop.page} className='hover:underline'>
                                {article.title.replace(/_/g, ' ')}
                            </a>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='text-sm max-h-fit'>
                        {loading ? (
                            <div className='flex flex-col gap-2'>
                                <Skeleton className='w-full h-5' />
                                <Skeleton className='w-full h-5' />
                                <Skeleton className='w-full h-5' />
                                <Skeleton className='w-full h-5' />
                            </div>
                        ) : (
                            <p>{parser(article.extract_html).content}</p>
                        )}
                    </CardContent>
                    </div>
                </Card>
            ))}
            </>
        )}
        </>
    );
}