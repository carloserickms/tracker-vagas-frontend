"use client"
import DefaultNavBar from "@/components/DefaultNavBar";

export default function() {
    return (
        <div className="flex-col h-dvh overflow-y-hidden">
            <div className="flex justify-center h-[10%] p-1">
                <DefaultNavBar/>
            </div>

            <div className="flex justify-center items-center h-full">
                <p>dashboard</p>
            </div>
        </div>
    );
}