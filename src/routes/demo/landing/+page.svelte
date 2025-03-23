<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion";
  import * as Card from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import { Calendar, Info, FileText, School, Users, BookOpen } from "lucide-svelte";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
  
  // Data for collections
  const collections = [
    {
      id: "lbote",
      title: "Language Background other than English (LBOTE)",
      description: "Collection of student language background information",
      dueDate: "March 2025",
      category: "Student Data",
      status: "upcoming"
    },
    {
      id: "class-size",
      title: "Class Size Audit",
      description: "Verification of class sizes across all year levels",
      dueDate: "March 2025",
      category: "Class Data",
      status: "upcoming"
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
    }
  ];
  
  // Tools data
  const tools = [
    {
      id: "class-size-calculator",
      title: "Class Size Calculator",
      description: "Tool to calculate and optimize class sizes",
      availability: "All Year",
      icon: Users
    },
    {
      id: "new-arrivals",
      title: "New Arrivals Program application",
      description: "Application process for newly arrived students",
      availability: "All Year",
      icon: School
    }
  ];
  
  // Set initial tab value
  let tabValue = $state("collections");
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
              <Button variant="outline" size="sm" class="gap-2">
                <Calendar class="h-4 w-4" />
                <span>Calendar View</span>
              </Button>
            </div>
            <Card.Description>
              From Term 3 2024, schools can find information about data collections on the Staff Noticeboard.
              Access through the Staff Portal, filter on 'Notice Type: Administration and Management' and then 'Category: School Operations'.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Accordion.Root type="single" collapsible class="w-full">
              <Accordion.Item value="lbote" class="border rounded-md mb-4 overflow-hidden">
                <Accordion.Trigger class="px-4 py-4 hover:bg-muted/50 transition-all">
                  <div class="flex items-center justify-between w-full">
                    <div class="flex items-center gap-3">
                      <FileText class="h-5 w-5 text-primary" />
                      <div class="text-left">
                        <div class="font-medium">Language Background other than English (LBOTE)</div>
                        <div class="text-sm text-muted-foreground">Student language data collection</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <Badge variant="outline" class="bg-amber-100 text-amber-800 hover:bg-amber-100">March</Badge>
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
                        <span>View Guidelines</span>
                      </Button>
                      <Button size="sm" class="gap-1">
                        <FileText class="h-4 w-4" />
                        <span>Go to Report</span>
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
                        <svelte:component this={tool.icon} class="h-5 w-5 text-primary" />
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