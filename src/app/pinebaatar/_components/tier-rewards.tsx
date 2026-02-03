import { Lock, Plus } from "lucide-react"

const tiers = [
  { 
    tier: 2, 
    name: "Sticker spin", 
    unlocked: true,
    icon: "sticker",
    badges: [2, "plus", "gift"]
  },
  { 
    tier: 3, 
    name: "Hoodie", 
    unlocked: true,
    icon: "hoodie",
    badges: [3, "plus", "gift"]
  },
  { 
    tier: 4, 
    name: "Water bottle", 
    unlocked: false,
    icon: "bottle",
    badges: [4, "plus", "gift"]
  },
  { 
    tier: 5, 
    name: "Video lesson", 
    unlocked: true,
    icon: "video",
    badges: [5, "plus"]
  },
  { 
    tier: 6, 
    name: "Video lesson", 
    unlocked: false,
    icon: "video",
    badges: [6, "plus", "edit"]
  },
]

export function TierRewards() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Tier map rewards</h3>
        <a href="/rewards" className="text-sm text-muted-foreground hover:text-foreground">
          View all
        </a>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-3">
        {tiers.map((tier) => (
          <div key={tier.tier} className="text-center">
            <p className="text-xs text-muted-foreground mb-2">Tier {tier.tier} - {tier.name}</p>
            <div className={`relative aspect-square rounded-xl border ${tier.unlocked ? 'border-blue-500/50 bg-blue-500/10' : 'border-border bg-secondary'} flex items-center justify-center`}>
              {tier.unlocked ? (
                <div className="text-3xl">
                  {tier.icon === "sticker" && "🎨"}
                  {tier.icon === "hoodie" && "🧥"}
                  {tier.icon === "bottle" && "🍶"}
                  {tier.icon === "video" && "🎬"}
                </div>
              ) : (
                <Lock className="h-6 w-6 text-muted-foreground" />
              )}
              {tier.unlocked && (
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-[10px] text-white">✓</span>
                </div>
              )}
            </div>
            <div className="mt-2 flex items-center justify-center gap-1">
              {tier.badges.map((badge, i) => (
                <span 
                  key={i} 
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    typeof badge === 'number' 
                      ? 'bg-blue-500 text-white' 
                      : badge === 'plus' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-pink-500 text-white'
                  }`}
                >
                  {typeof badge === 'number' ? badge : badge === 'plus' ? <Plus className="h-3 w-3" /> : '✎'}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
