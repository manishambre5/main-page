import { StarIcon } from "@phosphor-icons/react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type FeaturedArticleProps = {
    loading: boolean;
    tfa?: {
        titles: { normalized: string };
        extract: string;
        originalimage?: { source: string };
        content_urls: { desktop: { page: string }; };
    };
};

export default function FeaturedArticle( {loading, tfa}: FeaturedArticleProps ) {
    return (
        <Card className='mb-2'>
            {tfa?.originalimage && (
                loading ? (
                <Skeleton className='w-full h-56 -mt-4' />) : (
                    <img
                    src={tfa?.originalimage?.source}
                    alt="Featured Article Image"
                    className="size-full object-cover" />
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
            <CardContent className='text-sm'>
                {loading ? (
                    <div className='flex flex-col gap-2'>
                        <Skeleton className='w-full h-5' />
                        <Skeleton className='w-full h-5' />
                        <Skeleton className='w-full h-5' />
                        <Skeleton className='w-full h-5' />
                    </div>
                ) : (<p>{tfa?.extract}</p>)}
            </CardContent>
        </Card>
    );
}