import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Item, ItemDescription, ItemTitle } from "./ui/item";
import { Skeleton } from "./ui/skeleton";

type OnThisDayProps = {
    loading: boolean;
    onthisday?: Array<{ text: string; year: number }>;
};

export default function OnThisDay ( { loading, onthisday }: OnThisDayProps ) {
    return (
        <Card className='relative gap-0'>
            <CardHeader className='relative'>
                <CardTitle className="text-2xl font-bold border-b italic">On this day</CardTitle>
                <div className="z-10 absolute pointer-events-none right-0 -bottom-4 w-full h-4 bg-linear-to-b from-white to-transparent" />
            </CardHeader>
            <CardContent className="relative flex-1 overflow-y-scroll no-scrollbar pb-4">
                <div className='pt-4 grid md:grid-cols-1 grid-cols-2 gap-4'>
                {loading ? (
                    <>
                        <Skeleton className='w-full h-20' />
                        <Skeleton className='w-full h-20' />
                        <Skeleton className='w-full h-20' />
                        <Skeleton className='w-full h-20' />
                    </>
                ) : (
                onthisday?.map((event, i) => (
                    <Item variant="muted" size="xs" key={i} className="shrink-0 w-full flex flex-col items-start">
                        <ItemDescription className="text-slate-400 px-1">{event.year}</ItemDescription>
                        <ItemTitle className="font-medium xl:text-sm">
                            {event.text}
                        </ItemTitle>
                    </Item>))
                )}
                </div>
            </CardContent>
            <div className="absolute pointer-events-none left-0 bottom-4 w-full h-8 bg-linear-to-t from-white to-transparent" />
        </Card>
    );
}