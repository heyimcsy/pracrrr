"use client"

import type React from "react"

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useState, useRef, useCallback } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Map } from "react-kakao-maps-sdk"
import SomthingCard from "@/components/somthingCard";

interface DummyProduct {
    id: number
    title: string
    price: string
}

export default function Home() {
    const [points, setPoints] = useState(0.9)
    const [isAtTop, setIsAtTop] = useState(true)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const numbers = [1, 2, 3, 4, 5, 6, 7]

    const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement
        const scrollTop = target.scrollTop
        setIsAtTop(scrollTop < 10)
    }, [])

    const handleDrawerTouchStart = useCallback(
        (event: React.TouchEvent) => {
            // 스크롤 영역 내부에서 발생한 터치인지 확인
            if (scrollAreaRef.current?.contains(event.target as Node)) {
                event.stopPropagation()
                return
            }

            // 스크롤이 맨 위에 있지 않으면 drawer 드래그 차단
            if (!isAtTop) {
                event.stopPropagation()
            }
        },
        [isAtTop]
    )

    const handleDrawerTouchMove = useCallback(
        (event: React.TouchEvent) => {
            // 스크롤 영역 내부에서 발생한 터치인지 확인
            if (scrollAreaRef.current?.contains(event.target as Node)) {
                event.stopPropagation()
                return
            }

            // 스크롤이 맨 위에 있지 않으면 drawer 드래그 차단
            if (!isAtTop) {
                event.stopPropagation()
            }
        },
        [isAtTop]
    )

    return (
        <main className="relativ h-dvh w-dvw max-w-[650px] overflow-hidden overscroll-contain">
            <div className="h-full w-full relative">
                <div className="h-6 w-6 rounded-[12px] bg-amber-300 absolute z-11 right-[18px] bottom-[300px]">매콤</div>
                <Map className="absolute inset-0 w-full h-full z-10" center={{ lat: 33.5563, lng: 126.79581 }}></Map>
            </div>
            <Drawer
                defaultOpen={true}
                snapPoints={[0.4, 0.9]}
                activeSnapPoint={points}
                setActiveSnapPoint={setPoints}
                dismissible={false}
                modal={false}>
                {points === 0.9 ? (
                    <div
                        className="animate-in fade-in-0 fixed inset-0 z-30 overflow-hidden overscroll-contain"
                        onClick={() => {
                            setPoints(0.4)
                        }}
                    />
                ) : null}
                <DrawerContent
                    className="border-none"
                    onTouchStart={handleDrawerTouchStart}
                    onTouchMove={handleDrawerTouchMove}
                >
                    <DrawerHeader>
                        <DrawerTitle>사고링크 행복 병원</DrawerTitle>
                        <DrawerDescription className="m-0"></DrawerDescription>
                    </DrawerHeader>
                   <SomthingCard handleScroll={handleScroll} scrollAreaRef={scrollAreaRef} isAtTop={isAtTop}/>
                </DrawerContent>
            </Drawer>
            <div className="fixed bottom-0 z-80 w-full pointer-events-auto">
                <ScrollArea className="w-full max-w-[650px] h-[80px] bg-gradient-to-b from-white/0 to-white to-[50%]">
                    <div className="flex space-x-[4px] pr-[16px]">
                        {numbers.map((number) => (
                            <Card
                                className="w-[100px] h-[80px] bg-indigo-100 rounded-[23px]"
                                onClick={() => {
                                    console.log("sdfasdf")
                                }}
                                key={number}>
                                {number}
                            </Card>
                        ))}
                    </div>
                    <ScrollBar hidden={true} orientation="horizontal" />
                </ScrollArea>
            </div>
        </main>
    )
}