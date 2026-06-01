import { parser } from "@/utils/parser";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Item, ItemGroup } from "./ui/item";
import { Skeleton } from "./ui/skeleton";

type DidYouKnowProps = {
    loading: boolean;
    dyk?: Array<{ html: string; text: string }>;
};

export default function DidYouKnow ( { loading, dyk }: DidYouKnowProps ) {
    return (
        <Card className='relative gap-0'>
            <CardHeader className='relative'>
                <CardTitle className="text-2xl font-bold border-b italic">Did You Know...</CardTitle>
                <div className="absolute pointer-events-none right-0 -bottom-4 w-full h-4 bg-linear-to-b from-white to-transparent" />
            </CardHeader>
            <CardContent className="overflow-x-auto overflow-y-visible no-scrollbar pb-4">
                <ItemGroup className='pt-4'>
                    {loading ? (
                        <>
                            <Skeleton className='w-full h-20' />
                            <Skeleton className='w-full h-20' />
                            <Skeleton className='w-full h-20' />
                            <Skeleton className='w-full h-20' />
                        </>
                    ) : (
                    dyk?.map((factHtml, i) => (
                        <Item variant="muted" size="xs" key={i}>
                            <div className='xl:text-sm'>
                                {parser(factHtml.html).content}
                            </div>
                        </Item>
                    )))}
                </ItemGroup>
            </CardContent>
            <div className="absolute pointer-events-none left-0 bottom-4 w-full h-8 bg-linear-to-t from-white to-transparent" />
        </Card>
    );
}