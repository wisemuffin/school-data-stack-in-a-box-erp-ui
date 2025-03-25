<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion";
  import * as Card from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import CalendarIcon from "lucide-svelte/icons/calendar";
  import Info from "lucide-svelte/icons/info";
  import FileText from "lucide-svelte/icons/file-text";
  import School from "lucide-svelte/icons/school";
  import Users from "lucide-svelte/icons/users";
  import BookOpen from "lucide-svelte/icons/book-open";
  import List from "lucide-svelte/icons/list";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
  import { CalendarDate } from "@internationalized/date";
  import CalendarView from "./CalendarView.svelte";
  
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
      status: "submitted"
    },
    {
      id: "class-size",
      title: "Class Size Audit",
      description: "Verification of class sizes across all year levels",
      dueDate: "March 2025",
      category: "Class Data",
      status: "overdue"
    },
    {
      id: "k4-language",
      title: "K-4 Language Programs: non-CLP (PLOTE)",
      description: "Information about language programs for K-4 students",
      dueDate: "May 2025",
      category: "Program Data",
      status: "upcoming"
    },
    {
      id: "k6-language",
      title: "K-6 Language Programs: Community Languages Program K-6 (CLP)",
      description: "Details of community language programs for K-6 students",
      dueDate: "May 2025",
      category: "Program Data",
      status: "upcoming"
    },
    {
      id: "languages-participation",
      title: "Languages Participation Collection for Years 7 to 9 students",
      description: "Data on student participation in language studies for years 7-9",
      dueDate: "May 2025",
      category: "Student Data",
      status: "upcoming"
    },
    {
      id: "eald",
      title: "English as an Additional Language or Dialect (EAL/D)",
      description: "Information about students with English as an additional language",
      dueDate: "May 2025",
      category: "Student Data",
      status: "upcoming"
    },
    {
      id: "attendance-sem1",
      title: "Attendance (Return of Absences) Semester 1",
      description: "Reporting of student attendance and absences for first semester",
      dueDate: "July 2025",
      category: "Attendance Data",
      status: "upcoming"
    },
    {
      id: "suspension-sem1",
      title: "Suspension and Expulsion Semester 1",
      description: "Data on student suspensions and expulsions for first semester",
      dueDate: "July 2025",
      category: "Behavior Data",
      status: "upcoming"
    },
    {
      id: "mid-year-census",
      title: "Mid-year (Age/Grade) Census",
      description: "Collection of student demographic data by age and grade",
      dueDate: "August 2025",
      category: "Census Data",
      status: "upcoming"
    },
    {
      id: "nccd",
      title: "Nationally Consistent Collection of Data on School Students with Disability (NCCD)",
      description: "Data collection on students with disability requiring adjustments",
      dueDate: "August 2025",
      category: "Student Data",
      status: "upcoming"
    },
    {
      id: "attendance-sem2",
      title: "Attendance (Return of Absences) Semester 2",
      description: "Reporting of student attendance and absences for second semester",
      dueDate: "November 2025",
      category: "Attendance Data",
      status: "upcoming"
    },
    {
      id: "suspension-sem2",
      title: "Suspension and Expulsion Data Collection Semester 2",
      description: "Data on student suspensions and expulsions for second semester",
      dueDate: "December 2025",
      category: "Behavior Data",
      status: "upcoming"
    },
    {
      id: "attendance-monitoring",
      title: "Attendance Monitoring",
      description: "Ongoing monitoring of student attendance patterns",
      dueDate: "April 2025",
      category: "Attendance Data",
      status: "upcoming"
    }
  ];
  
  // Tools data
  const tools = [
    {
      id: "class-size-calculator",
      title: "Class Size Calculator",
      description: "Tool to calculate and optimize class sizes",
      availability: "All Year",
      iconName: "Users"
    },
    {
      id: "new-arrivals",
      title: "New Arrivals Program application",
      description: "Application process for newly arrived students",
      availability: "All Year",
      iconName: "School"
    }
  ];
  
  // Set initial tab value
  let tabValue = $state("collections");
  
  // Toggle between list and calendar view
  let viewMode = $state("list"); // "list" or "calendar"
  
  // School calendar key dates
  const schoolDates = {
    termDates: [
      { name: "Term 1", start: new CalendarDate(2025, 1, 31), end: new CalendarDate(2025, 4, 11) },
      { name: "Term 2", start: new CalendarDate(2025, 4, 28), end: new CalendarDate(2025, 7, 4) },
      { name: "Term 3", start: new CalendarDate(2025, 7, 22), end: new CalendarDate(2025, 9, 26) },
      { name: "Term 4", start: new CalendarDate(2025, 10, 13), end: new CalendarDate(2025, 12, 19) }
    ],
    holidays: [
      // Summer 2024-2025
      { name: "Summer Break", start: new CalendarDate(2024, 12, 22), end: new CalendarDate(2025, 1, 30) },
      // Autumn
      { name: "Autumn Break", start: new CalendarDate(2025, 4, 14), end: new CalendarDate(2025, 4, 25) },
      // Winter
      { name: "Winter Break", start: new CalendarDate(2025, 7, 7), end: new CalendarDate(2025, 7, 18) },
      // Spring
      { name: "Spring Break", start: new CalendarDate(2025, 9, 29), end: new CalendarDate(2025, 10, 10) },
      // Summer 2025-2026
      { name: "Summer Break", start: new CalendarDate(2025, 12, 22), end: new CalendarDate(2026, 1, 30) }
    ],
    publicHolidays: [
      new CalendarDate(2025, 1, 1),  // New Year's Day
      new CalendarDate(2025, 1, 27), // Australia Day (observed)
      new CalendarDate(2025, 4, 18), // Good Friday
      new CalendarDate(2025, 4, 21), // Easter Monday
      new CalendarDate(2025, 4, 25), // Anzac Day
      new CalendarDate(2025, 6, 9),  // King's Birthday
      new CalendarDate(2025, 10, 6), // Labour Day
      new CalendarDate(2025, 12, 25), // Christmas Day
      new CalendarDate(2025, 12, 26)  // Boxing Day
    ]
  };
  
  // Convert collection due dates to CalendarDate objects
  const collectionDates = collections.map(collection => {
    const [month, year] = collection.dueDate.split(' ');
    let monthNum = 1;
    
    switch(month) {
      case 'January': monthNum = 1; break;
      case 'February': monthNum = 2; break;
      case 'March': monthNum = 3; break;
      case 'April': monthNum = 4; break;
      case 'May': monthNum = 5; break;
      case 'June': monthNum = 6; break;
      case 'July': monthNum = 7; break;
      case 'August': monthNum = 8; break;
      case 'September': monthNum = 9; break;
      case 'October': monthNum = 10; break;
      case 'November': monthNum = 11; break;
      case 'December': monthNum = 12; break;
    }
    
    // Set specific due dates for each collection
    let dueDay = 15; // Default to middle of month
    
    // Assign specific due dates based on collection ID
    switch(collection.id) {
      case "lbote": dueDay = 31; break;              // March 31
      case "class-size": dueDay = 24; break;         // March 24
      case "k4-language": dueDay = 15; break;        // May 15
      case "k6-language": dueDay = 22; break;        // May 22
      case "languages-participation": dueDay = 29; break; // May 29
      case "eald": dueDay = 8; break;                // May 8
      case "attendance-sem1": dueDay = 21; break;    // July 21
      case "suspension-sem1": dueDay = 28; break;    // July 28
      case "mid-year-census": dueDay = 14; break;    // August 14
      case "nccd": dueDay = 21; break;               // August 21
      case "attendance-sem2": dueDay = 17; break;    // November 17
      case "suspension-sem2": dueDay = 12; break;    // December 12
      case "attendance-monitoring": dueDay = 15; break; // April 15
    }
    
    return {
      ...collection,
      date: new CalendarDate(parseInt(year), monthNum, dueDay)
    };
  });
</script>

<div class="container mx-auto p-6 max-w-5xl">
  <div class="space-y-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold tracking-tight">Data Collections (2025)</h1>
      <p class="text-muted-foreground">
        Information about required data collections for schools. Click on each collection to view details.
      </p>
    </div>
    
    <Tabs value={tabValue} onValueChange={(val) => tabValue = val} class="w-full">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="collections">Collections</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
      </TabsList>
      
      <TabsContent value="collections" class="mt-6">
        <Card.Root>
          <Card.Header>
            <div class="flex items-center justify-between">
              <Card.Title>Required Collections</Card.Title>
              <div class="flex gap-2">
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="sm" 
                  class="gap-2"
                  onclick={() => viewMode = "list"}
                >
                  <List class="h-4 w-4" />
                  <span>List View</span>
                </Button>
                <Button 
                  variant={viewMode === "calendar" ? "default" : "outline"} 
                  size="sm" 
                  class="gap-2"
                  onclick={() => viewMode = "calendar"}
                >
                  <CalendarIcon class="h-4 w-4" />
                  <span>Calendar View</span>
                </Button>
              </div>
            </div>
            <Card.Description>
              From Term 3 2024, schools can find information about data collections on the Staff Noticeboard.
              Access through the Staff Portal, filter on 'Notice Type: Administration and Management' and then 'Category: School Operations'.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            {#if viewMode === "list"}
            <Accordion.Root type="multiple" class="w-full">
              <Accordion.Item value="lbote" class="border rounded-md mb-4 overflow-hidden">
                <Accordion.Trigger class="px-4 py-4 hover:bg-muted/50 transition-all">
                  <div class="flex items-center justify-between w-full">
                    <div class="flex items-center gap-3">
                      <FileText class="h-5 w-5 text-primary" />
                      <div class="text-left">
                        <div class="font-medium">Language Background other than English (LBOTE)</div>
                        <div class="text-sm text-muted-foreground">Collection of student language background information</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <Badge variant="outline" class="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        March
                      </Badge>
                      <Badge 
                        variant="default"
                        class="ml-auto"
                      >
                        Submitted
                      </Badge>
                    </div>
                  </div>
                </Accordion.Trigger>
                <Accordion.Content class="px-4 pb-4">
                  <div class="pt-2 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <h4 class="font-medium text-sm">Description</h4>
                        <p class="text-sm text-muted-foreground">
                          The LBOTE collection gathers information about students' language backgrounds other than English.
                          This data helps schools provide appropriate support and resources for students from diverse linguistic backgrounds.
                        </p>
                      </div>
                      <div class="space-y-2">
                        <h4 class="font-medium text-sm">Key Information</h4>
                        <ul class="text-sm text-muted-foreground space-y-1">
                          <li>• Due date: March 31, 2025</li>
                          <li>• Mandatory for all schools</li>
                          <li>• Requires updated student language profiles</li>
                          <li>• Data to be submitted via the School Portal</li>
                        </ul>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div class="space-y-2">
                      <h4 class="font-medium text-sm">Required Actions</h4>
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Card.Root class="bg-muted/50">
                          <Card.Content class="p-3">
                            <div class="flex flex-col gap-1">
                              <span class="text-sm font-medium">1. Update Records</span>
                              <span class="text-xs text-muted-foreground">Ensure all student language records are current</span>
                            </div>
                          </Card.Content>
                        </Card.Root>
                        <Card.Root class="bg-muted/50">
                          <Card.Content class="p-3">
                            <div class="flex flex-col gap-1">
                              <span class="text-sm font-medium">2. Verify Data</span>
                              <span class="text-xs text-muted-foreground">Check for accuracy and completeness</span>
                            </div>
                          </Card.Content>
                        </Card.Root>
                        <Card.Root class="bg-muted/50">
                          <Card.Content class="p-3">
                            <div class="flex flex-col gap-1">
                              <span class="text-sm font-medium">3. Submit Report</span>
                              <span class="text-xs text-muted-foreground">Complete submission through the portal</span>
                            </div>
                          </Card.Content>
                        </Card.Root>
                      </div>
                    </div>
                    
                    <div class="flex justify-end gap-2 pt-2">
                      <Button variant="outline" size="sm" class="gap-1">
                        <Info class="h-4 w-4" />
                        <span>View Instructions</span>
                      </Button>
                      <Button size="sm" class="gap-1">
                        <FileText class="h-4 w-4" />
                        <span>Go to Collection</span>
                      </Button>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
              
              {#each collections.filter(c => c.id !== "lbote") as collection (collection.id)}
                <Accordion.Item value={collection.id} class="border rounded-md mb-4 overflow-hidden">
                  <Accordion.Trigger class="px-4 py-4 hover:bg-muted/50 transition-all">
                    <div class="flex items-center justify-between w-full">
                      <div class="flex items-center gap-3">
                        <FileText class="h-5 w-5 text-primary" />
                        <div class="text-left">
                          <div class="font-medium">{collection.title}</div>
                          <div class="text-sm text-muted-foreground">{collection.description}</div>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <Badge variant="outline" class="bg-amber-100 text-amber-800 hover:bg-amber-100">
                          {collection.dueDate.split(' ')[0]}
                        </Badge>
                        <Badge 
                          variant={
                            collection.status === "overdue" ? "destructive" : 
                            collection.status === "submitted" ? "default" : 
                            "outline"
                          }
                          class="ml-auto"
                        >
                          {
                            collection.status === "overdue" ? "Overdue" : 
                            collection.status === "submitted" ? "Submitted" : 
                            "Upcoming"
                          }
                        </Badge>
                      </div>
                    </div>
                  </Accordion.Trigger>
                  <Accordion.Content class="px-4 pb-4">
                    <div class="pt-2">
                      <p class="text-sm text-muted-foreground">
                        Detailed information about this collection will be provided closer to the due date.
                      </p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              {/each}
            </Accordion.Root>
            {:else}
              <CalendarView 
                {collections}
                {schoolDates}
                {collectionDates}
              />
            {/if}
          </Card.Content>
        </Card.Root>
      </TabsContent>
      
      <TabsContent value="tools" class="mt-6">
        <Card.Root>
          <Card.Header>
            <Card.Title>Support Tools</Card.Title>
            <Card.Description>
              Tools to support schools in completing data collections and managing school operations.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#each tools as tool (tool.id)}
                <Card.Root class="border">
                  <Card.Content class="p-6">
                    <div class="flex items-start gap-4">
                      <div class="rounded-full bg-primary/10 p-2">
                        {#if tool.iconName === "Users"}
                          <Users class="h-5 w-5 text-primary" />
                        {:else if tool.iconName === "School"}
                          <School class="h-5 w-5 text-primary" />
                        {/if}
                      </div>
                      <div class="space-y-1">
                        <h3 class="font-medium">{tool.title}</h3>
                        <p class="text-sm text-muted-foreground">{tool.description}</p>
                        <div class="pt-2">
                          <Badge variant="outline" class="text-xs">{tool.availability}</Badge>
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                  <Card.Footer class="border-t px-6 py-3">
                    <Button variant="ghost" size="sm" class="w-full justify-center">Access Tool</Button>
                  </Card.Footer>
                </Card.Root>
              {/each}
            </div>
          </Card.Content>
        </Card.Root>
      </TabsContent>
    </Tabs>
  </div>
</div>