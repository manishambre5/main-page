import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Item, ItemContent, ItemGroup } from "./ui/item";
import { Skeleton } from "./ui/skeleton";
import { parser } from "@/utils/parser";

type InTheNewsProps = {
    loading: boolean;
    news?: Array<{ story: string }>;
};

export default function InTheNews( {loading, news}: InTheNewsProps ) {

    return (
        <Card className='mb-2'>
            <CardHeader>
                <CardTitle className="text-2xl font-bold italic">In The News</CardTitle>
            </CardHeader>
            <CardContent>
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
                                <div className="text-sm">
                                    {parser(item.story).content}
                                </div>
                            </ItemContent>
                        </Item>
                    );
                    })}
                </ItemGroup>
                )}
            </CardContent>
        </Card>
    );
}