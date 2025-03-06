<script lang="ts">
	import * as Icon from "../icons/index.js";
	import { page } from "$app/state";
	import { siteConfig } from "$lib/config/site.js";
	import { cn } from "$lib/utils.js";
	import { mainNav } from "$lib/config/nav.ts";

	let { class: className = '' } = $props();
</script>

<div class={cn("mr-4 hidden md:flex", className)}>
	<a href="/" class="mr-6 flex items-center space-x-2">
		<Icon.Logo class="size-6" />
		<span class="hidden font-bold xl:inline-block">
			{siteConfig.name}
		</span>
	</a>
	<nav class="flex items-center gap-6 text-sm">

		{#each mainNav as item}
			<a
				href={item.href}
				class={cn(
					"hover:text-foreground/80 transition-colors",
					page.url.pathname.endsWith(item.href) ? "font-bold" : "font-normal",
					""
				)}
			>
				{item.title}
			</a>
		{/each}
	</nav>
</div>