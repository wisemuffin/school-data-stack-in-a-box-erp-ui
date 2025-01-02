<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { page } from '$app/stores';


	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/app-sidebar.svelte";

	import { ModeWatcher } from "mode-watcher";

	import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
 
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";

  import { SiteFooter, SiteHeader, TailwindIndicator } from "$lib/components/ui/index.ts";
	import { dev } from "$app/environment";

</script>


	<Sidebar.Provider>
		<AppSidebar />

		
		
		<main>

			<SiteHeader />
	
			
			<div class="flex gap-4">
				<Sidebar.Trigger />

				

				<h2 class="pb-2 text-3xl scroll-m-20">{$page.route.id}</h2>
				<Button class="align-bottom" onclick={toggleMode} variant="outline" size="icon">
				  <Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				  />
				  <Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				  />
				  <span class="sr-only">Toggle theme</span>
				</Button>
	  
			</div>
		  <ModeWatcher />
		  {@render children?.()}

		  <SiteFooter />
				{#if dev}
					<TailwindIndicator />
				{/if}
		</main>
	  </Sidebar.Provider>

	  
	  

