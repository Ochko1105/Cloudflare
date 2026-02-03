import { Heart } from "lucide-react"

export function UserProfileCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800">
          <Heart className="h-8 w-8 text-blue-300" fill="currentColor" />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Ц. Оч-Эрдэнэ</h3>
            <span className="text-sm text-muted-foreground">~62 remaining</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-full bg-blue-500 px-2.5 py-0.5 text-xs font-medium text-white">
              8 level
            </span>
            <span className="text-sm text-foreground">
              5392<span className="text-muted-foreground">/5330XP</span>
            </span>
          </div>
        </div>
      </div>

      {/* XP Earning Opportunities */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-foreground">XP earning opportunities</h4>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Submit project</span>
            <span className="text-foreground">100XP</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Fill survey</span>
            <span className="text-foreground">100XP</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Class attendance</span>
            <span className="text-foreground">~20XP per day</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Competitions</span>
            <span className="text-foreground">~400XP total</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">NPS</span>
            <span className="text-foreground">~100XP per time</span>
          </div>
        </div>
      </div>

      {/* Seasonal Statistics Button */}
      <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
        Seasonal statistics
      </button>
    </div>
  )
}
