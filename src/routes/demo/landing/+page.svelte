<script lang="ts">
  // ... existing imports ...
  import { goto } from "$app/navigation";
  
  // Icon mapping
  const iconMap = {
    Users,
    School,
    BookOpen,
    FileText,
    CalendarIcon,
    List,
    Info
  };
  
  // Data for collections
  const collections = [
    {
      id: "lbote",
      title: "Language Background other than English (LBOTE)",
      description: "Collection of student language background information",
      dueDate: "March 2025",
      category: "Student Data",
      status: "submitted",
      route: "/demo-data-collection/lbote"
    },
    {
      id: "class-size",
      title: "Class Size Audit",
      description: "Verification of class sizes across all year levels",
      dueDate: "March 2025",
      category: "Class Data",
      status: "overdue",
      route: "/demo-data-collection/class-size"
    },
    // ... other collections with routes added ...
  ];

  // ... rest of script ...
</script>

<!-- In the LBOTE collection section -->
<div class="flex justify-end gap-2 pt-2">
  <Button variant="outline" size="sm" class="gap-1">
    <Info class="h-4 w-4" />
    <span>View Guidelines</span>
  </Button>
  <Button size="sm" class="gap-1" onclick={() => goto(collections.find(c => c.id === "lbote").route)}>
    <FileText class="h-4 w-4" />
    <span>Go to Report</span>
  </Button>
</div>

<!-- In the other collections section -->
<Accordion.Content class="px-4 pb-4">
  <div class="pt-2">
    <p class="text-sm text-muted-foreground">
      Detailed information about this collection will be provided closer to the due date.
    </p>
    <div class="flex justify-end gap-2 pt-4">
      <Button variant="outline" size="sm" class="gap-1">
        <Info class="h-4 w-4" />
        <span>View Guidelines</span>
      </Button>
      <Button 
        size="sm" 
        class="gap-1" 
        onclick={() => goto(collection.route)}
        disabled={collection.status === "upcoming"}
      >
        <FileText class="h-4 w-4" />
        <span>Go to Report</span>
      </Button>
    </div>
  </div>
</Accordion.Content> 