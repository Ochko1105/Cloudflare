export function PrizesCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
      <div className="max-w-[60%]">
        <h3 className="text-2xl font-bold text-foreground">Win Prizes</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {"You can use the points you've collected to enter the lottery and win multiple rewards."}
        </p>
        <button className="mt-4 rounded-lg border border-border bg-secondary px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
          Participate
        </button>
      </div>

      {/* Decorative Image Placeholder */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2">
        <div className="relative h-40 w-40">
          {/* Badge decoration */}
          <div className="absolute right-8 top-0 h-20 w-20 rounded-lg bg-gradient-to-br from-green-400 to-teal-500 opacity-80 rotate-12" />
          <div className="absolute right-0 bottom-0 h-24 w-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-80" />
          <div className="absolute right-4 top-4 text-xs font-bold text-white bg-green-500 px-2 py-1 rounded rotate-12">
            1 of 10x
          </div>
          <div className="absolute right-2 bottom-8 text-[10px] font-mono text-white/80">
            No. 001
          </div>
        </div>
      </div>
    </div>
  )
}
