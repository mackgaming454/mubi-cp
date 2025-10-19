"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type CustomThemes, themeDisplayNames } from "./CustomThemes"

export function ThemeToggle({ showText, className }: { showText?: boolean, className?: string }) {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={showText ? "default" : "icon"} className={className}>
          <Palette className="h-5 w-5" />
          {showText && (
            <span className="ml-2 inline">
              Change Theme
            </span>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(themeDisplayNames).map(([key, name]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key as CustomThemes)}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
