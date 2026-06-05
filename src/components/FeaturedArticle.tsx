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
        originalimage?: { source: string, height: number, width: number };
        content_urls: { desktop: { page: string }; };
    };
};

export default function FeaturedArticle( {loading, tfa}: FeaturedArticleProps ) {
    return (
        <Card className={`flex-1 min-w-2/3 pt-0 ${
            (tfa?.originalimage?.width ?? 0) > (tfa?.originalimage?.height ?? 0)
            ? ("")
            : ("md:pb-0 md:flex-row md:gap-0")
            } `}
        >
            {tfa?.originalimage && (
                loading ? (
                    <Skeleton className='w-full h-64 md:h-full' />
                ) : (
                    <img
                    src={tfa?.originalimage?.source}
                    alt="Featured Article Image"
                    className={`size-full object-cover
                        ${tfa.originalimage.width < tfa.originalimage.height && "md:min-w-1/2"}`}
                    />
                )
            )}
            <div className="min-w-1/3 md:py-4 flex flex-col gap-2">
            <CardHeader>
                <CardDescription className='text-muted-foreground text-sm uppercase'>
                    <Badge variant="outline">
                        <StarIcon />
                        Featured Article
                    </Badge>
                </CardDescription>
                <CardTitle className="text-2xl font-bold">
                    {loading ? (<Skeleton className='h-12 w-2/3' />) : <a href={tfa?.content_urls.desktop.page} className='hover:underline'>{tfa?.titles.normalized}</a>}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className='flex flex-col gap-2'>
                        <Skeleton className='w-full h-8' />
                        <Skeleton className='w-full h-8' />
                        <Skeleton className='w-full h-8' />
                        <Skeleton className='w-full h-8' />
                    </div>
                ) : (
                    tfa && <p>{parser(tfa.extract_html).content}</p>
                )}
            </CardContent>
            </div>
        </Card>
    );
}