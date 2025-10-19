import Link from 'next/link'
import { ThemeToggle } from "@/components/themeProvider/ThemeToggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import Config from '@/lib/config'
import Image from 'next/image'
import { Settings, Search } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const isLoggedIn = false; // TODO: Replace with actual authentication logic

export function Navbar() {
    return (
        <nav className="flex flex-row items-center justify-between sticky top-3 sm:top-8 mx-3 sm:mx-8 p-4 bg-background/80 backdrop-blur z-50 border border-border rounded-2xl">
            <div className="flex flex-row items-center">
                <Link href="/" className="relative w-24 h-8 aspect-square">
                    <Image className="invert dark:invert-0 object-contain" src="/banner.png" alt="Logo" sizes="(max-width: 768px) 80vw, (max-width: 1200px) 30vw, 23vw" fill />
                </Link>
                <div className="hidden md:flex space-x-4 ml-6">
                    {Config.navItems.map((item) => (
                        <Link key={item.name} href={
                            item.path
                        } className="text-sm font-medium text-foreground/80 hover:text-foreground transition">
                            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex flex-row items-center space-x-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {isLoggedIn ? (
                            <Avatar className="rounded-lg">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        ) : (
                            <Button variant="outline" size="icon">
                                <Settings className="h-4 w-4 scale-100 rotate-0 transition-all" />
                            </Button>
                        )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-2">
                        <DropdownMenuLabel>Account</DropdownMenuLabel>
                        {isLoggedIn ? (
                            <>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem>Login</DropdownMenuItem>
                                <DropdownMenuItem>Sign Up</DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuLabel>Region</DropdownMenuLabel>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="eu">Europe</SelectItem>
                                    <SelectItem value="us">United States</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <DropdownMenuLabel>Theme</DropdownMenuLabel>
                        <ThemeToggle showText className="w-full" />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}