import { StarIcon } from "@phosphor-icons/react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { parser } from "@/utils/parser";

type FeaturedArticleProps = {
    loading: boolean;
    tfa?: {
        titles: { normalized: string };
        extract_html: string;
        originalimage?: { source: string };
        content_urls: { desktop: { page: string }; };
    };
};

export default function FeaturedArticle( {loading, tfa}: FeaturedArticleProps ) {
    return (
        <Card className='pt-0 flex-1 min-w-80'>
            {tfa?.originalimage && (
                loading ? (
                    <Skeleton className='w-full h-56' />
                ) : (
                    <img
                    src={tfa?.originalimage?.source}
                    alt="Featured Article Image"
                    className="size-fit object-cover" />
                )
            )}
            <CardHeader>
                <CardDescription className='text-muted-foreground text-sm uppercase'>
                    <Badge variant="outline">
                        <StarIcon />
                        Featured Article
                    </Badge>
                </CardDescription>
                <CardTitle className="text-2xl font-bold">
                    {loading ? (<Skeleton className='h-8 w-2/3' />) : <a href={tfa?.content_urls.desktop.page} className='hover:underline'>{tfa?.titles.normalized}</a>}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className='flex flex-col gap-2'>
                        <Skeleton className='w-full h-5' />
                        <Skeleton className='w-full h-5' />
                        <Skeleton className='w-full h-5' />
                        <Skeleton className='w-full h-5' />
                    </div>
                ) : (
                    tfa && <p>{parser(tfa.extract_html).content}</p>
                )}
            </CardContent>
        </Card>
    );
}