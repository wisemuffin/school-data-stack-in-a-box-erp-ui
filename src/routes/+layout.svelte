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
		<!-- <AppSidebar /> -->

		
		
		<div class="w-screen">

			<SiteHeader />
			<!-- <Sidebar.Trigger /> -->

	

		  <ModeWatcher />
		   {@render children()}

		  <SiteFooter />
				{#if dev}
					<TailwindIndicator />
				{/if}
		</div>
	  </Sidebar.Provider>

	  
	  

