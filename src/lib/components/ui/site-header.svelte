<script lang="ts">
	import Svelte5Banner from "./svelte-5-banner.svelte";
	import {
		// CommandMenu,
		// Icons,
		MainNav,
		// MobileNav,
		ModeToggle,
	} from "$lib/components/ui/index.js";
    import * as Icon from "$lib/components/icons/index"
	import { buttonVariants } from "$lib/components/ui/button";
	import { siteConfig } from "$lib/config/site.js";
	import { cn } from "$lib/utils.js";
</script>

<header
	class="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
>
	<Svelte5Banner />
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<MainNav />
		<!-- <MobileNav /> -->
		<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
			<!-- <div class="w-full flex-1 md:w-auto md:flex-none">
				<CommandMenu />
			</div> -->
			<nav class="flex items-center">
				<a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
					<div
						class={cn(
							buttonVariants({
								size: "sm",
								variant: "ghost",
							}),
							"h-8 w-8 px-0"
						)}
					>
						<Icon.GitHub class="h-4 w-4" />
						<span class="sr-only">GitHub</span>
					</div>
				</a>
				
				<ModeToggle />
                    <!-- <Search />
                    <UserNav /> -->
			</nav>
		</div>
	</div>
</header>