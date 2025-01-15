# data table re usable comment
https://github.com/huntabyte/shadcn-svelte/issues/1189

following: https://next.shadcn-svelte.com/docs/components/data-table

# TODO

need to refresh the table in /source-data/schools when delete occours.

curently context menu:

<DropdownMenu.Item onclick={() => api.del("schools/"+id)}>

But think if it was a form submission it would be fine??? but need to understand form to table action inpact.