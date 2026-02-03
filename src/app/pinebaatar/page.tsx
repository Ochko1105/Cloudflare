"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  LayoutGrid, 
  Search, 
  Filter, 
  Trophy, 
  GraduationCap, 
  Briefcase, 
  Settings,
  LayoutDashboard
} from "lucide-react"

import { ClubsContent } from "./_components/clubs-content"
import { DashboardHeader } from "./_components/header"
import { DashboardSidebar } from "./_components/siderbar" // Sidebar-аа зөв замтай эсэхийг шалгаарай
import { Button } from "@/components/ui/button"
import { CreateClubCenter } from "./_components/createclubview"

/**
 * --- DYNAMIC CONTENT VIEWS ---
 * Цэс бүрт харагдах агуулгуудыг энд тодорхойлно.
 */
const AcademicView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 text-white">
    <GraduationCap className="h-12 w-12 text-primary mb-4" />
    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Академик Сургалт</h2>
    <p className="text-white/50 mt-2 font-medium">Таны хичээлийн явц болон дүнгийн мэдээлэл энд харагдана.</p>
    <div className="grid grid-cols-3 gap-6 mt-10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-40 rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
          <div className="h-2 w-12 bg-primary/40 rounded-full mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-2/3 bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
)



const CareerResources = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 text-white">
    <Briefcase className="h-12 w-12 text-emerald-400 mb-4" />
    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Карьер Хөгжил</h2>
    <p className="text-white/50 mt-2">Ажлын байр болон дадлагын боломжууд.</p>
  </motion.div>
)

/**
 * --- MAIN DASHBOARD COMPONENT ---
 */
export default function Dashboard() {
  // Төлөв: Аль label/view идэвхтэй байгааг хадгална
  const [activeView, setActiveView] = useState<string>("Join Club")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // View солих функц
  const renderContent = () => {
    switch (activeView) {
      case "Join Club": return <ClubsContent />
      case "Create Club": return <CreateClubCenter />
      case "Courses":
      case "Academic": return <AcademicView />
      case "Resources": return <CareerResources />
      case "Active": return <div className="p-10 text-white font-black italic text-4xl">ACTIVE CHALLENGES</div>
      default: return <ClubsContent />
    }
  }

  return (
    <div className="min-h-screen bg-[#050c1f] selection:bg-primary selection:text-white">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(90,160,255,0.15),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(120,255,200,0.1),transparent_55%)]" />
        {/* Star Particles */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.2, 1] }}
              transition={{ duration: Math.random() * 5 + 3, repeat: Infinity }}
              className="absolute h-0.5 w-0.5 rounded-full bg-white/40"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Sidebar - onViewChange props дамжуулна */}
      <DashboardSidebar 
        currentActive={activeView} 
        onViewChange={(label) => setActiveView(label)} 
      />

      {/* Main Layout Area */}
      <div className="pl-64 relative z-10 flex flex-col min-h-screen">
        <DashboardHeader />
       
        {/* Navigation Indicator Bar */}
   

        {/* Dynamic Main Content Container */}
        <main className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="w-full h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Minimal Footer */}
        {/* <footer className="px-10 py-6 border-t border-white/5 flex justify-between items-center opacity-40">
           <p className="text-[10px] font-bold text-white uppercase tracking-widest">© 2026 Space Portal - All Rights Reserved</p>
           <div className="flex gap-4">
              <div className="h-1 w-8 bg-primary rounded-full" />
              <div className="h-1 w-4 bg-white/20 rounded-full" />
           </div>
        </footer> */}
      </div>
    </div>
  )
}