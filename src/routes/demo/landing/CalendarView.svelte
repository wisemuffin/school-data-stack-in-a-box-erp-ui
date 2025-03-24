<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import * as Calendar from "$lib/components/ui/calendar/index.js";
  import { getLocalTimeZone, today, CalendarDate, parseDate, DateFormatter } from "@internationalized/date";
  
  // Props
  const { collections = [], schoolDates = { termDates: [], holidays: [], publicHolidays: [] }, collectionDates = [] } = $props();
  
  // Calendar state
  let calendarValue = $state(undefined);
  let calendarPlaceholder = $state(today(getLocalTimeZone()));
  
  // For multi-month display
  const monthsToShow = 3;
  let currentMonthOffset = $state(0);
  
  // Format month names
  const monthFmt = new DateFormatter("en-US", { month: "long" });
  
  // Function to determine if a date has a collection due
  function getCollectionsForDate(date) {
    return collectionDates.filter(collection => 
      collection.date.year === date.year && 
      collection.date.month === date.month && 
      collection.date.day === date.day
    );
  }
  
  // Function to determine if a date is a school holiday
  function isHoliday(date) {
    return schoolDates.holidays.some(holiday => {
      const dateObj = new Date(date.year, date.month - 1, date.day);
      const startObj = new Date(holiday.start.year, holiday.start.month - 1, holiday.start.day);
      const endObj = new Date(holiday.end.year, holiday.end.month - 1, holiday.end.day);
      return dateObj >= startObj && dateObj <= endObj;
    });
  }
  
  // Function to determine if a date is a public holiday
  function isPublicHoliday(date) {
    return schoolDates.publicHolidays.some(holiday => 
      holiday.year === date.year && 
      holiday.month === date.month && 
      holiday.day === date.day
    );
  }
  
  // Function to determine if a date is in a school term
  function getTermForDate(date) {
    return schoolDates.termDates.find(term => {
      const dateObj = new Date(date.year, date.month - 1, date.day);
      const startObj = new Date(term.start.year, term.start.month - 1, term.start.day);
      const endObj = new Date(term.end.year, term.end.month - 1, term.end.day);
      return dateObj >= startObj && dateObj <= endObj;
    });
  }
  
  // Function to get cell class based on date
  function getCellClass(date) {
    const classes = ["p-0", "relative", "focus-within:relative", "focus-within:z-20"];
    
    if (getCollectionsForDate(date).length > 0) {
      classes.push("collection-due");
    }
    
    if (isPublicHoliday(date)) {
      classes.push("public-holiday");
    } else if (isHoliday(date)) {
      classes.push("school-holiday");
    }
    
    if (getTermForDate(date)) {
      classes.push("in-term");
    }
    
    return classes.join(" ");
  }
  
  // Function to get day class based on date
  function getDayClass(date) {
    const classes = ["h-9", "w-9", "p-0", "font-normal", "aria-selected:opacity-100"];
    
    if (getCollectionsForDate(date).length > 0) {
      classes.push("bg-amber-500", "text-white", "font-bold", "hover:bg-amber-600", "focus:bg-amber-600");
    } else if (isPublicHoliday(date)) {
      classes.push("bg-blue-100", "text-blue-800", "hover:bg-blue-200", "focus:bg-blue-200");
    } else if (isHoliday(date)) {
      classes.push("bg-blue-50", "hover:bg-blue-100", "focus:bg-blue-100");
    }
    
    return classes.join(" ");
  }
  
  // Navigate months
  function previousMonth() {
    currentMonthOffset -= monthsToShow;
    updateCalendarPlaceholder();
  }
  
  function nextMonth() {
    currentMonthOffset += monthsToShow;
    updateCalendarPlaceholder();
  }
  
  function resetToToday() {
    currentMonthOffset = 0;
    updateCalendarPlaceholder();
  }
  
  function updateCalendarPlaceholder() {
    const now = today(getLocalTimeZone());
    calendarPlaceholder = now.add({ months: currentMonthOffset });
  }
</script>

<div class="border rounded-md p-4 space-y-4">
  <h3 class="font-medium">School Year Calendar</h3>
  
  <!-- Custom Calendar Component -->
  <div class="custom-calendar">
    <!-- Calendar navigation controls -->
    <div class="flex justify-between items-center mb-4">
      <Button variant="outline" size="sm" class="gap-1" onclick={previousMonth}>
        <ChevronLeft class="h-4 w-4" />
        <span>Previous</span>
      </Button>
      <Button variant="outline" size="sm" onclick={resetToToday}>
        Today
      </Button>
      <Button variant="outline" size="sm" class="gap-1" onclick={nextMonth}>
        <span>Next</span>
        <ChevronRight class="h-4 w-4" />
      </Button>
    </div>
    
    <!-- Calendar Legend -->
    <div class="flex flex-wrap gap-3 mb-4 text-xs">
      <div class="flex items-center gap-1.5">
        <div class="w-4 h-4 rounded-sm bg-amber-500"></div>
        <span>Collection Due</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-4 h-4 rounded-sm bg-blue-50"></div>
        <span>School Holiday</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-4 h-4 rounded-sm bg-blue-100"></div>
        <span>Public Holiday</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-4 h-4 rounded-sm border-l-4 border-l-primary"></div>
        <span>School Term</span>
      </div>
    </div>
    
    <!-- Mobile: Single month view -->
    <div class="md:hidden">
      <CalendarPrimitive.Root
        type="single"
        weekdayFormat="short"
        class="rounded-md border p-3"
        bind:value={calendarValue}
        bind:placeholder={calendarPlaceholder}
      >
        {#snippet children({ months, weekdays })}
          <Calendar.Header class="flex justify-between items-center mb-2">
            <div class="font-medium">
              {monthFmt.format(calendarPlaceholder.toDate(getLocalTimeZone()))} {calendarPlaceholder.year}
            </div>
          </Calendar.Header>
          <Calendar.Months>
            {#each months as month}
              <Calendar.Grid>
                <Calendar.GridHead>
                  <Calendar.GridRow class="flex">
                    {#each weekdays as weekday}
                      <Calendar.HeadCell>
                        {weekday.slice(0, 2)}
                      </Calendar.HeadCell>
                    {/each}
                  </Calendar.GridRow>
                </Calendar.GridHead>
                <Calendar.GridBody>
                  {#each month.weeks as weekDates}
                    <Calendar.GridRow class="mt-2 w-full">
                      {#each weekDates as date}
                        <Calendar.Cell class={getCellClass(date)} {date} month={month.value}>
                          <Calendar.Day class={getDayClass(date)}>
                            {date.day}
                            {#if getCollectionsForDate(date).length > 0}
                              <div class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                            {/if}
                          </Calendar.Day>
                        </Calendar.Cell>
                      {/each}
                    </Calendar.GridRow>
                  {/each}
                </Calendar.GridBody>
              </Calendar.Grid>
            {/each}
          </Calendar.Months>
        {/snippet}
      </CalendarPrimitive.Root>
    </div>
    
    <!-- Desktop: Multi-month view -->
    <div class="hidden md:grid grid-cols-3 gap-4">
      {#each Array(monthsToShow) as _, i}
        {@const monthOffset = currentMonthOffset + i}
        {@const monthDate = today(getLocalTimeZone()).add({ months: monthOffset })}
        <div>
          <h4 class="text-sm font-medium mb-2">
            {monthFmt.format(monthDate.toDate(getLocalTimeZone()))} {monthDate.year}
          </h4>
          <CalendarPrimitive.Root
            type="single"
            weekdayFormat="short"
            class="rounded-md border p-3"
            placeholder={monthDate}
            fixedWeeks={true}
          >
            {#snippet children({ months, weekdays })}
              <Calendar.Months>
                {#each months as month}
                  <Calendar.Grid>
                    <Calendar.GridHead>
                      <Calendar.GridRow class="flex">
                        {#each weekdays as weekday}
                          <Calendar.HeadCell>
                            {weekday.slice(0, 2)}
                          </Calendar.HeadCell>
                        {/each}
                      </Calendar.GridRow>
                    </Calendar.GridHead>
                    <Calendar.GridBody>
                      {#each month.weeks as weekDates}
                        <Calendar.GridRow class="mt-2 w-full">
                          {#each weekDates as date}
                            <Calendar.Cell class={getCellClass(date)} {date} month={month.value}>
                              <Calendar.Day class={getDayClass(date)}>
                                {date.day}
                                {#if getCollectionsForDate(date).length > 0}
                                  <div class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                                {/if}
                              </Calendar.Day>
                            </Calendar.Cell>
                          {/each}
                        </Calendar.GridRow>
                      {/each}
                    </Calendar.GridBody>
                  </Calendar.Grid>
                {/each}
              </Calendar.Months>
            {/snippet}
          </CalendarPrimitive.Root>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Collection dates list -->
  <div class="mt-6">
    <h4 class="font-medium mb-3">Upcoming Collections</h4>
    <div class="space-y-2">
      {#if collections.length === 0}
        <p class="text-sm text-muted-foreground">No upcoming collections scheduled.</p>
      {:else}
        <!-- Group collections by month -->
        {@const groupedCollections = collections.reduce((acc, collection) => {
          const month = collection.dueDate.split(' ')[0];
          const year = collection.dueDate.split(' ')[1];
          const key = `${month} ${year}`;
          if (!acc[key]) acc[key] = [];
          acc[key].push(collection);
          return acc;
        }, {})}
        
        <!-- Display collections by month -->
        {#each Object.entries(groupedCollections) as [monthYear, monthCollections]}
          <div class="border rounded-md overflow-hidden">
            <div class="bg-muted px-3 py-2 font-medium text-sm">
              {monthYear}
            </div>
            <div class="divide-y">
              {#each monthCollections as collection}
                <div class="px-3 py-2 hover:bg-muted/50 transition-colors">
                  <div class="flex items-start justify-between">
                    <div>
                      <div class="font-medium text-sm">{collection.title}</div>
                      <div class="text-xs text-muted-foreground">{collection.description}</div>
                    </div>
                    <div class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      {collection.category}
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
  
  <!-- Collection tooltips -->
  <style>
    :global(.collection-due) {
      position: relative;
    }
    
    :global(.collection-due:hover::after) {
      content: attr(data-collection);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: black;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      white-space: nowrap;
      z-index: 50;
    }
    
    :global(.in-term) {
      border-left: 4px solid var(--primary);
    }
  </style>
</div> 