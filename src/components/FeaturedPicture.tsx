import { StarIcon } from "@phosphor-icons/react";
import { Badge } from "./ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type FeaturedPictureProps = {
    loading: boolean;
    image?: {
        description: { text: string };
        image: { source: string };
        file_page: string;
    };
};

export default function FeaturedPicture( {loading, image}: FeaturedPictureProps ) {
    return (
        <Card className='mb-2 pt-0'>
            {loading ? (
                <Skeleton className='w-full h-64' />
            ) : (
                <a href={image?.file_page}>
                    <img src={image?.image.source}
                        alt="Featured Picture"
                        className="size-full object-cover"
                    />
                </a>
            )}
            <CardHeader>
                <CardDescription className='text-muted-foreground text-sm uppercase'>
                    <Badge variant="outline">
                        <StarIcon />
                        Featured Picture
                    </Badge>
                </CardDescription>
                <CardTitle className='italic text-sm'>
                    {loading ? (<Skeleton className='w-full h-8' />) : (<p>{image?.description.text}</p>)}
                </CardTitle>
            </CardHeader>
        </Card>
    );
}