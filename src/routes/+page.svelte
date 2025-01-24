<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Squiggle from '$lib/components/svg/data-stack-in-a-box-education-squiggle.svelte';
	import SquiggleAndImage from '$lib/components/svg/data-stack-in-a-box-education--illistration-and-squiggle.svelte';
	import Image2 from '$lib/components/svg/data-stack-in-a-box-education-illistration-2.svelte';
	import Image from '$lib/components/svg/data-stack-in-a-box-education-illistration.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { quintIn, quintOut } from 'svelte/easing';
	import * as Carousel from "$lib/components/ui/carousel";
	import type { EmblaOptionsType } from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import * as Avatar from "$lib/components/ui/avatar";
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();

	const carouselOptions: EmblaOptionsType = {
		loop: true,
		align: 'start',
		skipSnaps: false,
		dragFree: true,
	};

	// Configure autoplay plugin
	const autoplayOptions = {
		delay: 4000,
		stopOnInteraction: false,
		stopOnMouseEnter: true
	};

	const plugins = [
		Autoplay(autoplayOptions)
	];
</script>

<!-- <div class="w-full h-screen flex items-center justify-center"></div>     -->
<div class="flex h-full w-full grow flex-col items-center justify-center">
	<!-- Hero Section -->
	<div class="relative w-full bg-white dark:bg-gray-950 py-32">
		<div class="container mx-auto px-4">
			<div class="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
				<div class="flex flex-col gap-8 max-w-xl">
					<h1 class="text-6xl font-bold leading-tight text-nsw-brand-dark dark:text-white">
						Transform Your School Operations
					</h1>
					<p class="text-xl text-gray-600 dark:text-gray-300">
						Streamline administration, enhance communication, and improve efficiency with our comprehensive school management platform.
					</p>
					<div class="flex gap-4">
						<Button class="bg-nsw-brand-dark dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100">
							<a href="/school-operations">Get Started</a>
						</Button>
						<Button variant="outline" class="border-nsw-brand-dark text-nsw-brand-dark dark:border-white dark:text-white hover:bg-nsw-brand-dark/10 dark:hover:bg-white/10">
							Learn More
						</Button>
					</div>
				</div>
				<div class="w-full max-w-md">
					<Image class="w-full h-auto fill-nsw-brand-dark dark:fill-white" />
				</div>
			</div>
		</div>
	</div>

	<!-- Features Section -->
	<div class="w-full bg-gray-50 dark:bg-gray-900 py-24">
		<div class="container mx-auto px-4">
			<div class="flex flex-col items-center gap-12">
				<div class="text-center max-w-2xl">
					<h2 class="text-4xl font-bold text-nsw-brand-dark dark:text-white mb-4">Powerful Features</h2>
					<p class="text-xl text-nsw-brand-dark/80 dark:text-white/80">Everything you need to manage your school operations effectively</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<Card.Root class="dark:bg-gray-800">
						<Card.Content class="pt-6">
							<Image2 class="size-20 fill-nsw-brand-dark dark:fill-white mx-auto mb-4" />
							<Card.Header>
								<Card.Title class="text-xl font-semibold text-center text-nsw-brand-dark dark:text-white">Student Management</Card.Title>
								<Card.Description class="text-center text-nsw-brand-dark/70 dark:text-white/70">
									Efficiently manage student records, attendance, and academic progress all in one place.
								</Card.Description>
							</Card.Header>
						</Card.Content>
					</Card.Root>

					<Card.Root class="dark:bg-gray-800">
						<Card.Content class="pt-6">
							<Image class="size-20 fill-nsw-brand-dark dark:fill-white mx-auto mb-4" />
							<Card.Header>
								<Card.Title class="text-xl font-semibold text-center text-nsw-brand-dark dark:text-white">Resource Planning</Card.Title>
								<Card.Description class="text-center text-nsw-brand-dark/70 dark:text-white/70">
									Optimize resource allocation and scheduling for better operational efficiency.
								</Card.Description>
							</Card.Header>
						</Card.Content>
					</Card.Root>

					<Card.Root class="dark:bg-gray-800">
						<Card.Content class="pt-6">
							<SquiggleAndImage class="size-20 fill-nsw-brand-dark dark:fill-white mx-auto mb-4" />
							<Card.Header>
								<Card.Title class="text-xl font-semibold text-center text-nsw-brand-dark dark:text-white">Data Analytics</Card.Title>
								<Card.Description class="text-center text-nsw-brand-dark/70 dark:text-white/70">
									Make data-driven decisions with powerful analytics and reporting tools.
								</Card.Description>
							</Card.Header>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</div>
	</div>

	<!-- Testimonials Section -->
	<div class="w-full bg-white dark:bg-gray-950 py-24">
		<div class="container mx-auto px-4">
			<div class="flex flex-col items-center gap-12">
				<div class="text-center max-w-2xl">
					<h2 class="text-4xl font-bold text-nsw-brand-dark dark:text-white mb-4">What People Say</h2>
					<p class="text-xl text-nsw-brand-dark/80 dark:text-white/80">Trusted by education professionals worldwide</p>
				</div>

				<div class="w-full max-w-4xl">
					<Carousel.Root 
						class="w-full" 
						opts={carouselOptions}
						plugins={plugins}
					>
						<Carousel.Content class="-ml-4">
							{#each data.testimonials as testimonial (testimonial.author)}
								<Carousel.Item class="pl-4 md:basis-1/2">
									<div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg h-full">
										<p class="text-lg text-nsw-brand-dark dark:text-white mb-6">"{testimonial.text}"</p>
										<div class="flex items-center gap-4">
											<Avatar.Root>
												<Avatar.Image
													src={testimonial.avatar}
													alt={testimonial.author}
												/>
												<Avatar.Fallback>
													{testimonial.author.slice(1, 3).toUpperCase()}
												</Avatar.Fallback>
											</Avatar.Root>
											<div class="flex flex-col">
												<span class="text-nsw-brand-dark dark:text-white font-medium">{testimonial.author}</span>
												<span class="text-sm text-nsw-brand-dark/60 dark:text-white/60">{testimonial.time}</span>
											</div>
										</div>
									</div>
								</Carousel.Item>
							{/each}
						</Carousel.Content>
					</Carousel.Root>
				</div>
			</div>
		</div>
	</div>
</div>
