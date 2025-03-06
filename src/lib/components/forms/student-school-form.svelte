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
            <Card.Title >{title}</Card.Title>
            <Card.Description >
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
                        
                    >
                        Cancel
                    </Button>
                    <Button type="submit" >
                        {submitLabel}
                    </Button>
                </div>
            </form>
        </Card.Content>
    </Card.Root>
</div> 