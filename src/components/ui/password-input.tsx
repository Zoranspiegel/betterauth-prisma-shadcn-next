"use client";

import { useState } from "react";
import { Input } from "./input";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "./button";

export default function PasswordInput({
  ...props
}: React.ComponentProps<"input">) {
  const [inputType, setInputType] = useState<"text" | "password">("password");

  return (
    <div className="relative">
      <Input type={inputType} className="pr-8" {...props} />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0"
        onClick={() =>
          setInputType(inputType === "password" ? "text" : "password")
        }
      >
        {inputType === "password" ? <Eye /> : <EyeClosed />}
      </Button>
    </div>
  );
}
