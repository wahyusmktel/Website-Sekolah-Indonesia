import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"
import apiClient from "@/lib/api-client"

interface CategorySelectProps {
    value: string
    onChange: (value: string) => void
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
    const [open, setOpen] = React.useState(false)

    const { data: categories = [] } = useQuery({
        queryKey: ['kategori-berita'],
        queryFn: async () => {
            const response = await apiClient.get('/kategori-berita');
            return response.data;
        }
    })

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-11 rounded-xl"
                >
                    {value
                        ? categories.find((c: any) => c.name === value)?.name
                        : "Pilih kategori..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-xl" align="start">
                <Command>
                    <CommandInput placeholder="Cari kategori..." />
                    <CommandList>
                        <CommandEmpty>Kategori tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((c: any) => (
                                <CommandItem
                                    key={c.id}
                                    value={c.name}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === c.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {c.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
