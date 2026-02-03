import { BarChart3 } from "lucide-react"

const leaderboardData = [
  { rank: 1, name: "3D", points: "20693.1 PT", color: "bg-yellow-400" },
  { rank: 2, name: "3B", points: "1139.4 PT", color: "bg-gray-300" },
  { rank: 3, name: "3E", points: "1077.4 PT", color: "bg-orange-400" },
]

export function Leaderboard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-green-400" />
          <h3 className="font-semibold text-foreground">IG Leaderboard</h3>
        </div>
        <a href="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground">
          View all
        </a>
      </div>

      <div className="mt-4 space-y-3">
        {leaderboardData.map((item) => (
          <div key={item.rank} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`flex h-6 w-6 items-center justify-center rounded-full ${item.color} text-xs font-bold text-black`}>
                {item.rank}
              </span>
              <span className="text-sm font-medium text-foreground">{item.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">{item.points}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
