<script lang="ts">
	import * as Icon from "../icons/index.js";
	import { page } from "$app/state";
	import { siteConfig } from "$lib/config/site.js";
	import { cn } from "$lib/utils.js";
</script>

<div class="mr-4 hidden md:flex">
	<a href="/" class="mr-6 flex items-center space-x-2">
		<Icon.Logo class="size-6" />
		<span class="hidden font-bold xl:inline-block">
			{siteConfig.name}
		</span>
	</a>
	<nav class="flex items-center gap-6 text-sm">
		<a
			href="/"
			class={cn(
				"hover:text-foreground/80 transition-colors",
				page.url.pathname === "/" ? "text-foreground" : "text-foreground/60"
			)}
		>
			Home
		</a>
		<a
			href="/school-data-table"
			class={cn(
				"hover:text-foreground/80 transition-colors",
				page.url.pathname.startsWith("/school-data-table")
					? "text-foreground"
					: "text-foreground/60"
			)}
		>
			School Table
		</a>
		<a
			href="/simple-data-table"
			class={cn(
				"hover:text-foreground/80 transition-colors",
				page.url.pathname.startsWith("/simple-data-table") ? "text-foreground" : "text-foreground/60"
			)}
		>
			Simple Table
		</a>
		
	</nav>
</div>