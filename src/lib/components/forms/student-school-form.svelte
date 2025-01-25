<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import type { SuperForm } from "sveltekit-superforms";



    let { form, title, description, submitLabel, cancelHref, fields } = $props();
    const { form: formData, enhance } = form;
</script>

<div class="container mx-auto p-6">
    <Card.Root class="max-w-md mx-auto">
        <Card.Header>
            <Card.Title class="text-nsw-brand-dark dark:text-white">{title}</Card.Title>
            <Card.Description class="text-nsw-brand-dark/70 dark:text-white/70">
                {description}
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <form method="POST" use:enhance class="space-y-6">
                {@render fields(formData)}

                <div class="flex justify-end gap-4 pt-4">
                    <Button 
                        variant="outline" 
                        href={cancelHref}
                        class="border-nsw-brand-dark text-nsw-brand-dark dark:border-white dark:text-white hover:bg-nsw-brand-dark/10 dark:hover:bg-white/10"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" class="bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100">
                        {submitLabel}
                    </Button>
                </div>
            </form>
        </Card.Content>
    </Card.Root>
</div> 