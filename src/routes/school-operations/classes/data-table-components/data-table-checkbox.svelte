<script lang="ts">
    import { Checkbox } from "$lib/components/ui/checkbox";
    
    let { checked, indeterminate, onCheckedChange, "aria-label": ariaLabel, id, checkedRows } = $props<{
        checked?: boolean;
        indeterminate?: boolean;
        onCheckedChange: (checked: boolean) => void;
        "aria-label": string;
        id?: string;
        checkedRows?: Set<string>;
    }>();
    
    $effect(() => {
        if (id && checkedRows) {
            if (checkedRows.has(id)) {
                checked = true;
            } else {
                checked = false;
            }
        }
    });
    
    function handleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        onCheckedChange(target.checked);
        
        if (id && checkedRows) {
            if (target.checked) {
                checkedRows.add(id);
            } else {
                checkedRows.delete(id);
            }
        }
    }
</script>

<Checkbox 
    {checked}
    {indeterminate}
    aria-label={ariaLabel}
    onchange={handleChange}
/> 