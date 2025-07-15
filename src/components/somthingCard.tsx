'use client'
import {cn} from "@/lib/utils";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {Card} from "@/components/ui/card";
import React, {useCallback, useRef} from "react";
import {useRouter} from "next/navigation";

const SomthingCard = ({handleScroll,scrollAreaRef,isAtTop}) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7]
const router = useRouter()
    return(
        <ScrollArea
            ref={scrollAreaRef}
            className={cn("touch-pan-y h-[70%] w-full")}
            // style={{
            //     pointerEvents: isAtTop ? 'auto':"auto",
            //     touchAction: isAtTop?'auto' : 'pan-y'
            // }}
            onScrollCapture={handleScroll}
            onPointerDown={ (e)=> {
                if(!isAtTop){
                    e.stopPropagation()}
            }}>
            {numbers.map((number) => (
                <div key={number} className="w-full h-fit"
                onClick={() => {router.push('/hospitals')}}
                >
                    <div className="w-full h-fit px-4 pt-4">
                        <h1>hello</h1>
                    </div>
                    <div className="bg-amber-100 w-dvw h-fit py-5 px-4 rounded-[24px] sm:w-[650px]">
                        <div className="w-full px-4 py-4">
                            <p>흥선대원 의사</p>
                            <p>주중 영업시간 : 06:00 ~ 20:00</p>
                            <p>주말 영업시간 : 04:00 ~ 15:00</p>
                        </div>
                        <div className="w-full h-full">
                            <ScrollArea className="h-fit w-full">
                                <div className="flex gap-5 pl-[16px]">
                                    {numbers.map((number) => (
                                        <Card className="w-[130px] h-[88px] bg-indigo-100 rounded-[23px]" key={number}>
                                            {number}
                                        </Card>
                                    ))}
                                </div>
                                <ScrollBar hidden={true} orientation="horizontal" />
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            ))}
            {/*</div>*/}
            <ScrollBar hidden orientation="vertical" />
        </ScrollArea>
    )
}

export default SomthingCard