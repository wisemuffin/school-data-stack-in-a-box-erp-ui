<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import * as Drawer from "$lib/components/ui/drawer";
    import { Menu, X } from "lucide-svelte";
    import { mainNav } from "$lib/config/nav.ts";
    
    let { class: className = '' } = $props();
</script>

<div class={className}>
    <Drawer.Root>
        <Drawer.Trigger class={buttonVariants({ variant: "ghost" })}>
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle mobile menu</span>
        </Drawer.Trigger>
        <Drawer.Content>
            <div class="mx-auto w-full max-w-sm">
                <Drawer.Header>
                    <Drawer.Title class="text-lg font-semibold text-nsw-brand-dark dark:text-white">Navigation</Drawer.Title>
                    <Drawer.Description class="text-nsw-brand-dark dark:text-white">Access all areas of the application.</Drawer.Description>
                </Drawer.Header>
                <div class="p-4">
                    <nav class="flex flex-col space-y-4">
                        {#each mainNav as item}
                            <a 
                                href={item.href}
                                class="text-lg font-semibold text-nsw-brand-dark dark:text-white hover:text-nsw-brand-dark/80 dark:hover:text-white/80"
                            >
                                {item.title}
                            </a>
                        {/each}
                    </nav>
                </div>
                <Drawer.Footer>
                    <Drawer.Close class={buttonVariants({ variant: "outline" }) + "text-nsw-brand-dark dark:text-white"}>
                        <X class="mr-2 h-4 w-4" />
                        Close Menu
                    </Drawer.Close>
                </Drawer.Footer>
            </div>
        </Drawer.Content>
    </Drawer.Root>
</div> 