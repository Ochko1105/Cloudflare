export function AcademicCalendar() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Academic Calendar</h3>
        <a href="/calendar" className="text-sm text-muted-foreground hover:text-foreground">
          View all
        </a>
      </div>

      <div className="mt-6">
        {/* Timeline */}
        <div className="relative">
          {/* Dates */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>06.09</span>
            <span>12.22</span>
            <span>02.20</span>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 w-full rounded-full bg-secondary">
            <div className="absolute left-0 top-0 h-2 w-[70%] rounded-full bg-green-500" />
            
            {/* Start Point */}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 border-4 border-background">
                <span className="text-white text-xs font-bold">P</span>
              </div>
            </div>

            {/* Middle Point - Internship */}
            <div className="absolute left-[70%] top-1/2 -translate-y-1/2 -translate-x-1/2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 border-4 border-background">
                <span className="text-white text-xs">📅</span>
              </div>
            </div>

            {/* End Point */}
            <div className="absolute -right-1 top-1/2 -translate-y-1/2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary border-4 border-background">
                <span className="text-muted-foreground text-xs">◯</span>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
            <div className="flex flex-col items-start">
              <span className="h-4 border-l border-dashed border-muted-foreground ml-3" />
              <span>Class starts</span>
            </div>
            <div className="flex flex-col items-center">
              <span>Internship starts</span>
            </div>
            <div className="flex flex-col items-end">
              <span>Class ends</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
