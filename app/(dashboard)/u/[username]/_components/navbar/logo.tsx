import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils"
import Link from "next/link";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
})
export function Logo() {
    return (
        <Link href="/">
            <div className="flex items-center gap-x-4 hover:opacity-75 transition">
                <div className="bg-white rounded-full p-1 mr-12 shrink-0 ">
                    <Image src="/spooky.svg" alt="Gamehub" height="32" width="32"></Image>
                </div>
                
                <div className="hidden lg:block">
                    <p className="text-lg font-semibold">Gamehub</p>
                    <p className="text-sm text-muted-foreground">Creator Dashboard</p>
                </div>
            </div>
        </Link>
    )
}