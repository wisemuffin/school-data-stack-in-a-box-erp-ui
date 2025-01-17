<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Squiggle from '$lib/components/svg/data-stack-in-a-box-education-squiggle.svelte';
	import SquiggleAndImage from '$lib/components/svg/data-stack-in-a-box-education--illistration-and-squiggle.svelte';
	import Image2 from '$lib/components/svg/data-stack-in-a-box-education-illistration-2.svelte';
	import Image from '$lib/components/svg/data-stack-in-a-box-education-illistration.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<!-- <div class="w-full h-screen flex items-center justify-center"></div>     -->
<div class="flex h-full w-full grow flex-col items-center justify-center">
	<div class=" flex h-full w-full grow flex-col items-center justify-center gap-8">
		<h1 class="text-4xl">School Operations</h1>
		<p>Your all-in-one solution for managing school operations efficiently.</p>
		<div class="flex gap-4">
			<Button class=""><a href="/school-operations">Manage your School</a></Button>
			<Button variant="secondary">TBC 🚧</Button>
		</div>
		<Image class="fill-primary" />
	</div>
	<div class="justi flex w-full grow flex-row flex-wrap gap-4 bg-nsw-brand-dark">
		<div class="pt-50 flex grow flex-col items-center justify-center gap-10">
			<h1 class="text-5xl text-white">Data Stack in a Box</h1>
			<Squiggle class="fill-nsw-brand-accent" />
			<p class=" text-white">Vision statement</p>
		</div>
		<div class="flex grow flex-col items-center justify-center">
			<SquiggleAndImage class="fill-nsw-brand-dark" />
		</div>
	</div>
	<div
		class="flex w-full grow flex-col items-center justify-center gap-4 bg-nsw-brand-accent pb-10"
	>
		<h1 class="text-5xl">Our work</h1>
		<p>Vision statement</p>
        <div class="flex flex-row gap-4">

            <Card.Root>
                <Card.Content>
                    <Image2 class="size-40 fill-primary" />
                </Card.Content>
                <Card.Header>
                    <Card.Title>Play Hard</Card.Title>
                    <Card.Description>Work Hard</Card.Description>
                </Card.Header>
                <!-- <Card.Footer>
                            <p>Card Footer</p>
                    </Card.Footer> -->
            </Card.Root>

            <Card.Root>
                <Card.Content>
                    <Image class="size-40 fill-primary" />
                </Card.Content>
                <Card.Header>
                    <Card.Title>Play Hard</Card.Title>
                    <Card.Description>Work Hard</Card.Description>
                </Card.Header>
                <!-- <Card.Footer>
                            <p>Card Footer</p>
                    </Card.Footer> -->
            </Card.Root>

            <Card.Root>
                <Card.Content>
                    <SquiggleAndImage class="size-40 fill-primary" />
                </Card.Content>
                <Card.Header>
                    <Card.Title>Play Hard</Card.Title>
                    <Card.Description>Work Hard</Card.Description>
                </Card.Header>
                <!-- <Card.Footer>
                            <p>Card Footer</p>
                    </Card.Footer> -->
            </Card.Root>
        </div>
	</div>
</div>
