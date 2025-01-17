<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Squiggle from '$lib/components/svg/data-stack-in-a-box-education-squiggle.svelte';
	import SquiggleAndImage from '$lib/components/svg/data-stack-in-a-box-education--illistration-and-squiggle.svelte';
	import Image2 from '$lib/components/svg/data-stack-in-a-box-education-illistration-2.svelte';
	import Image from '$lib/components/svg/data-stack-in-a-box-education-illistration.svelte';
</script>

<!-- <div class="w-full h-screen flex items-center justify-center"></div>     -->
<div class="flex w-full h-full grow flex-col items-center justify-center">
    <div class=" flex gap-8 w-full h-full grow flex-col items-center justify-center ">
	<h1 class="text-4xl">School Operations</h1>
	<p>Your all-in-one solution for managing school operations efficiently.</p>
	<div class="flex gap-4">
		<Button class="">Manage your School</Button>
		<Button variant="secondary">TBC 🚧</Button>
	</div>
	<Image class="fill-primary" />
    </div>
	<div class="grow w-full flex flex-row flex-wrap justi  bg-nsw-brand-dark gap-4">
		<div class="flex justify-center items-center gap-10 pt-50   grow  flex-col ">
					<h1 class="text-5xl text-white">Data Stack in a Box</h1>
				<Squiggle class="fill-nsw-brand-accent" />
                <p class=" text-white">Vision statement</p>
		</div>
		<div class="flex flex-col justify-center items-center grow">
			<SquiggleAndImage class="fill-nsw-brand-dark" />
		</div>
        
	</div>
    <div class="grow w-full  bg-nsw-brand-accent flex flex-col justify-center items-center gap-4">
        <h1 class="text-5xl">Our work</h1>
        <p>Vision statement</p>
    </div>
</div>
