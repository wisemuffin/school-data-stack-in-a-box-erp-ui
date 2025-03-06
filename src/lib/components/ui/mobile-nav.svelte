<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import * as Sheet from "$lib/components/ui/sheet";
    import { Menu } from "lucide-svelte";
    import { mainNav } from "$lib/config/nav.ts";
    
    let { class: className = '' } = $props();

    // Function to determine the nesting level of a navigation item
    function getItemNestingLevel(href: string) {
        // Split the path and count segments (excluding empty segments)
        const segments = href.split('/').filter(segment => segment);
        
        // Return the nesting level (0 for root, 1 for first level, etc.)
        return segments.length;
    }
    
    // Function to get the appropriate padding class based on nesting level
    function getPaddingClass(href: string) {
        const level = getItemNestingLevel(href);
        if (level === 2) return 'pl-6';
        if (level === 3) return 'pl-12';
        return '';
    }
</script>

<div class={className}>
    <Sheet.Root>
        <Sheet.Trigger class={buttonVariants({ variant: "ghost" })}>
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle mobile menu</span>
        </Sheet.Trigger>
        <Sheet.Content side="left" class="w-[300px]">
            <Sheet.Header>
                <Sheet.Title class="text-lg font-semibold text-nsw-brand-dark dark:text-white">Navigation</Sheet.Title>
                <Sheet.Description class="text-nsw-brand-dark dark:text-white">Access all areas of the application.</Sheet.Description>
            </Sheet.Header>
            <div class="p-4">
                <nav class="flex flex-col space-y-4">
                    {#each mainNav as item}
                        <a 
                            href={item.href}
                            class="flex items-center gap-2 text-lg font-semibold text-nsw-brand-dark dark:text-white hover:text-nsw-brand-dark/80 dark:hover:text-white/80 {getPaddingClass(item.href)}"
                        >
                            <item.icon class="h-5 w-5" />
                            {item.title}
                        </a>
                    {/each}
                </nav>
            </div>
        </Sheet.Content>
    </Sheet.Root>
</div> 