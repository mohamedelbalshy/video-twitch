"use client";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { useCreatorSidebar } from "@/store/use-creator-seidebar";
import { ArrowLeftFromLineIcon, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {

    const { collapsed, onCollapse, onExpand } = useCreatorSidebar();

    const label = collapsed ? "Expand" : "Collapse";
    return <div>
        {collapsed && (
            <div className="w-full hidden lg:flex items-center justify-end p-3 pt-4 mb-4">
                <Hint label={label} side="right" asChild>
                    <Button onClick={onExpand} className="h-auto p-2 ml-auto" variant="ghost">
                        <ArrowRightFromLine className="h-4 w-4" />
                    </Button>
                </Hint>

            </div>
        )}

        {!collapsed && (
            <div className="w-full hidden lg:flex items-center pt-4 mb-4 pl-6 p-3">
                <p className="font-semibold text-primary">
                    Dashboard
                </p>
                <Hint label={label} side="right" asChild>
                    <Button onClick={onCollapse} className="h-auto p-2 ml-auto" variant="ghost">
                        <ArrowLeftFromLineIcon className="h-4 w-4" />
                    </Button>
                </Hint>

            </div>
        )}
    </div>
};