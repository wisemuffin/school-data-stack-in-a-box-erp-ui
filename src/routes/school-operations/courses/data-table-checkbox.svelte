<script lang="ts">
    import { Checkbox } from "$lib/components/ui/checkbox";
    
    let { id, checkedRows } = $props<{
        id: string;
        checkedRows: Set<string>;
    }>();

    const toggleRow = () => {
        if (checkedRows.has(id)) {
            checkedRows.delete(id);
        } else {
            checkedRows.add(id);
        }
    };
</script>

<Checkbox 
    checked={checkedRows.has(id)}
    onCheckedChange={toggleRow}
/> 