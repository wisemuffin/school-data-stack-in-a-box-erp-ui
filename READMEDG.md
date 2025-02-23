# data table re usable comment
https://github.com/huntabyte/shadcn-svelte/issues/1189

following: https://next.shadcn-svelte.com/docs/components/data-table

# TODO


## delete issue
need to refresh the table in /source-data/schools when delete occours.

curently context menu:

<DropdownMenu.Item onclick={() => api.del("schools/"+id)}>

But think if it was a form submission it would be fine??? but need to understand form to table action inpact.

## edit and add

Currently edit and add are handled in the same page in a dialog for student. looks good but more complex to pull off. Other routes handles this with a seperate page.

## analytics api slow

currently the skeleton is not rendering whilst the data is loading.