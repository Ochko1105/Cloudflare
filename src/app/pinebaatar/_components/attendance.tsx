import { Flame } from "lucide-react"

const weekDays = [
  { day: 30, label: "FRI", active: false },
  { day: 31, label: "SAT", active: false },
  { day: 1, label: "SUN", active: false },
  { day: 2, label: "MON", active: false },
  { day: 3, label: "TUE", active: true, current: true },
]

export function Attendance() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Attendance</h3>
        <a href="/attendance" className="text-sm text-muted-foreground hover:text-foreground">
          View all
        </a>
      </div>

      <div className="mt-4 flex items-center gap-4">
        {/* Streak Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
          <Flame className="h-6 w-6 text-orange-400" />
        </div>

        {/* Streak Info */}
        <div>
          <div className="text-2xl font-bold text-foreground">0 Day</div>
          <div className="text-sm text-muted-foreground">Attendance streak</div>
        </div>

        {/* Calendar Days */}
        <div className="ml-auto flex items-center gap-2">
          {weekDays.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center rounded-lg px-2.5 py-1.5 ${
                item.current 
                  ? "bg-blue-500 text-white" 
                  : "text-muted-foreground"
              }`}
            >
              <span className="text-sm font-medium">{item.day}</span>
              <span className="text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
