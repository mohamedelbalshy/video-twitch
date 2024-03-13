"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
    value?: string;

}

export function CopyButton({ value }: CopyButtonProps) {

    const [isCopied, setIsCopied] = useState(false);

    const onCopy = () => {
        if (!value) return;
        navigator.clipboard.writeText(value || "")
            .then(() => setIsCopied(true))
            .catch(() => setIsCopied(false));

        setTimeout(() => setIsCopied(false), 1000);
    }

    const Icon = isCopied ? CheckCheck : Copy;
    return (
        <Button
            variant="ghost"
            onClick={onCopy}
            disabled={!value || isCopied}
            size="sm"
        >
            <Icon className="h-4 w-4" />
        </Button>
    );
}