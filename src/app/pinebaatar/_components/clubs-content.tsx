"use client"

import { useState } from "react"
import { Clock, User, BookOpen, Users, Calendar, GraduationCap, Star, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

interface Club {
  id: number
  name: string
  schedule: string
  time: string
  instructor: string
  instructorImage: string
  topic: string
  description: string
  currentMembers: number
  maxMembers: number
  status: "Open" | "Full"
  enrolledStudents: string[]
}

const clubs: Club[] = [
  {
    id: 1,
    name: "Роботын клуб",
    schedule: "Даваа",
    time: "18:00–20:00",
    instructor: "Доктор Сара Чен",
    instructorImage: "/avatars/sarah.jpg",
    topic: "Автоном робот бүтээх",
    description: "Робот техникийн сонирхолтой ертөнцөд тавтай морил! Энэ клубт сурагчид роботын дизайн, программчлал, инженерчлэлийн суурь ойлголтуудыг эзэмшинэ. Arduino, Raspberry Pi болон төрөл бүрийн мэдрэгч ашиглан орчноо таньж, даалгавар гүйцэтгэдэг ухаалаг робот бүтээнэ. Инженерчлэл, программчлал, гарын ур дүйд сонирхолтой сурагчдад тохиромжтой.",
    currentMembers: 12,
    maxMembers: 20,
    status: "Open",
    enrolledStudents: ["STU001", "STU002", "STU003", "STU004", "STU005", "STU006", "STU007", "STU008", "STU009", "STU010", "STU011", "STU012"],
  },
  {
    id: 2,
    name: "Бүтээлч бичлэг",
    schedule: "Лхагва",
    time: "16:00–18:00",
    instructor: "Профессор Жэймс Миллер",
    instructorImage: "/avatars/james.jpg",
    topic: "Зохиол ба өгүүлэмж",
    description: "Үгээр дамжуулан бүтээлч сэтгэлгээгээ хөгжүүлээрэй! Энэхүү клуб нь өгүүллэг, яруу найраг, уран зохиолын бичлэгийн ур чадварыг хөгжүүлэхэд чиглэнэ. Дасгал, хамтын хэлэлцүүлэг, харилцан үнэлгээгээр дамжуулан сонирхолтой түүх, дүр бүтээхийг сурна.",
    currentMembers: 15,
    maxMembers: 15,
    status: "Full",
    enrolledStudents: ["STU013", "STU014", "STU015", "STU016", "STU017", "STU018", "STU019", "STU020", "STU021", "STU022", "STU023", "STU024", "STU025", "STU026", "STU027"],
  },
  {
    id: 3,
    name: "Мэтгэлцээний нийгэмлэг",
    schedule: "Баасан",
    time: "15:00–17:00",
    instructor: "Эмили Парк",
    instructorImage: "/avatars/emily.jpg",
    topic: "Илтгэх ур чадвар ба мэтгэлцээн",
    description: "Шүүмжлэлт сэтгэлгээ, олны өмнө ярих ур чадвараа хөгжүүлээрэй! Одоогийн үйл явдал, философи, академик сэдвээр мэтгэлцэж, судалгаа хийх, логик аргумент боловсруулах, өөрийн байр суурийг итгэлтэй илэрхийлэх чадварыг эзэмшинэ.",
    currentMembers: 8,
    maxMembers: 18,
    status: "Open",
    enrolledStudents: ["STU028", "STU029", "STU030", "STU031", "STU032", "STU033", "STU034", "STU035"],
  },
   {
    id: 4,
    name: "Мэтгэлцээний нийгэмлэг",
    schedule: "Баасан",
    time: "15:00–17:00",
    instructor: "Эмили Парк",
    instructorImage: "/avatars/emily.jpg",
    topic: "Илтгэх ур чадвар ба мэтгэлцээн",
    description: "Шүүмжлэлт сэтгэлгээ, олны өмнө ярих ур чадвараа хөгжүүлээрэй! Одоогийн үйл явдал, философи, академик сэдвээр мэтгэлцэж, судалгаа хийх, логик аргумент боловсруулах, өөрийн байр суурийг итгэлтэй илэрхийлэх чадварыг эзэмшинэ.",
    currentMembers: 8,
    maxMembers: 18,
    status: "Open",
    enrolledStudents: ["STU028", "STU029", "STU030", "STU031", "STU032", "STU033", "STU034", "STU035"],
  },
   {
    id: 5,
    name: "Мэтгэлцээний нийгэмлэг",
    schedule: "Баасан",
    time: "15:00–17:00",
    instructor: "Эмили Парк",
    instructorImage: "/avatars/emily.jpg",
    topic: "Илтгэх ур чадвар ба мэтгэлцээн",
    description: "Шүүмжлэлт сэтгэлгээ, олны өмнө ярих ур чадвараа хөгжүүлээрэй! Одоогийн үйл явдал, философи, академик сэдвээр мэтгэлцэж, судалгаа хийх, логик аргумент боловсруулах, өөрийн байр суурийг итгэлтэй илэрхийлэх чадварыг эзэмшинэ.",
    currentMembers: 8,
    maxMembers: 18,
    status: "Open",
    enrolledStudents: ["STU028", "STU029", "STU030", "STU031", "STU032", "STU033", "STU034", "STU035"],
  },
  

]

export function ClubsContent() {
  const [selectedClubId, setSelectedClubId] = useState<number>(1)
  const selectedClub = clubs.find((c) => c.id === selectedClubId) || clubs[0]

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 bg-[radial-gradient(circle_at_80%_15%,rgba(90,160,255,0.25),transparent_45%),radial-gradient(circle_at_15%_85%,rgba(120,255,200,0.18),transparent_55%),linear-gradient(135deg,#050c1f,#0b2b5c)]
 ">
      {/* Header Section */}
      <div className="flex items-end justify-between border-b pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-foreground">
            Клубууд
          </h2>
          <p className="mt-2 text-muted-foreground">Өөрийн ур чадвараа дараагийн түвшинд гарга</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted shadow-sm" />
            ))}
          </div>
          <span className="text-sm font-semibold text-primary">
            {clubs.filter((c) => c.status === "Open").length} нээлттэй клуб
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left Panel - Club List */}
        <div className="w-full space-y-4 lg:w-[400px] bg-transparent">
          {clubs.map((club) => (
            <div className=" bg-transparent">    <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={club.id}
              onClick={() => setSelectedClubId(club.id)}
              className={`relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all ${
                selectedClubId === club.id
                  ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {selectedClubId === club.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 top-0 h-full w-1.5 bg-primary" 
                />
              )}
              
              <div className="mb-4 flex items-start justify-between">
                <h3 className="max-w-[200px] text-lg font-bold leading-tight text-foreground">
                  {club.name}
                </h3>
                <span className={`rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                  club.status === "Open" ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {club.status === "Open" ? "Нээлттэй" : "Дүүрсэн"}
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">{club.schedule} • {club.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="truncate">{club.topic}</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold text-foreground">
                    {club.currentMembers}/{club.maxMembers} гишүүн
                  </span>
                </div>
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${(club.currentMembers / club.maxMembers) * 100}%` }}
                  />
                </div>
              </div>
            </motion.button></div>
        
          ))}
        </div>

        {/* Right Panel - Dynamic Details */}
        <div className="flex-1 space-y-6">
          <div className="relative min-h-[500px] rounded-3xl border border-border bg-card p-8 shadow-sm">
            
            {/* Header with Motion */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedClub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-transparent"
              >
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                        Premium Club
                      </span>
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-foreground">
                      {selectedClub.name}
                    </h1>
                  </div>
                  <ShieldCheck className="h-12 w-12 text-primary/20" />
                </div>

                <div className="mb-8 border-l-2 border-primary/30 pl-6">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">Зорилго</h4>
                  <p className="text-lg italic text-muted-foreground leading-relaxed">
                    "{selectedClub.description}"
                  </p>
                </div>

                {/* --- FOOTBALLER STYLE TEACHER SECTION --- */}
                <div className="relative mb-10 overflow-hidden rounded-2xl bg-secondary/20 p-1">
                  <motion.div
                    key={selectedClub.instructor}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="relative flex flex-col items-center gap-6 rounded-xl bg-background p-6 shadow-inner md:flex-row"
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 grayscale" 
                         style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                    
                    {/* Instructor Image Frame */}
                    <div className="relative">
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary via-blue-400 to-emerald-400 opacity-20 blur-md" />
                      <Avatar className="h-32 w-32 border-[6px] border-background shadow-2xl">
                        <AvatarImage src={selectedClub.instructorImage} className="object-cover transition-transform duration-700 hover:scale-110" />
                        <AvatarFallback className="bg-primary/10 text-3xl font-black text-primary">
                          {selectedClub.instructor.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                        <Star className="h-5 w-5 fill-current" />
                      </div>
                    </div>

                    {/* Instructor Info */}
                    <div className="relative z-10 flex-1 text-center md:text-left">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="mb-1 flex items-center justify-center gap-2 md:justify-start">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Үндсэн зааварлагч</span>
                        </div>
                        <h3 className="mb-2 text-4xl font-black italic uppercase tracking-tighter text-foreground leading-none">
                          {selectedClub.instructor}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                          <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="text-xs font-bold text-muted-foreground">PRO LICENSE</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="text-xs font-bold text-muted-foreground">TOP MENTOR</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Football Card Aesthetic Element */}
                    <div className="hidden h-24 w-px bg-border md:block" />
                    <div className="flex flex-col items-center px-4">
                      <span className="text-2xl font-black text-primary leading-none">10+</span>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">Жил</span>
                    </div>
                  </motion.div>
                </div>

                {/* Schedule & Members Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border bg-secondary/30 p-5">
                    <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                      <Calendar className="h-4 w-4 text-primary" /> Хичээлийн хуваарь
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-sm text-muted-foreground">Долоо хоногт</span>
                        <span className="text-sm font-bold">{selectedClub.schedule}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Үргэлжлэх цаг</span>
                        <span className="text-sm font-bold">{selectedClub.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border bg-secondary/30 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                        <Users className="h-4 w-4 text-primary" /> Одоо байгаа
                      </h4>
                      <span className="text-xs font-black text-primary">
                        {Math.round((selectedClub.currentMembers/selectedClub.maxMembers)*100)}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-background/50">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(selectedClub.currentMembers / selectedClub.maxMembers) * 100}%` }}
                        className="h-full bg-primary" 
                      />
                    </div>
                    <p className="mt-3 text-[10px] text-muted-foreground text-center font-medium">
                      Нийт {selectedClub.maxMembers} суудлаас {selectedClub.maxMembers - selectedClub.currentMembers} үлдсэн
                    </p>
                  </div>
                </div>

                {/* Enrolled Students Scroll */}
                <div className="mt-8">
                   <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Бүртгэгдсэн сурагчид</h4>
                   <ScrollArea className="h-fit w-full rounded-xl border border-dashed p-4">
                      <div className="flex flex-wrap gap-3">
                        {selectedClub.enrolledStudents.map((id) => (
                          <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            key={id} 
                            className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-xs font-bold shadow-sm"
                          >
                            <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center text-[8px] text-primary">ID</div>
                            {id}
                          </motion.div>
                        ))}
                      </div>
                   </ScrollArea>
                </div>

                {/* Action Button */}
                <div className="mt-8">
                  <Button 
                    size="lg"
                    className={`group relative w-full overflow-hidden py-8 text-xl font-black uppercase tracking-widest transition-all ${
                      selectedClub.status === "Open" 
                        ? "bg-primary hover:bg-primary/90 hover:scale-[1.01]" 
                        : "cursor-not-allowed bg-muted text-muted-foreground"
                    }`}
                    disabled={selectedClub.status === "Full"}
                  >
                    <span className="relative z-10">
                      {selectedClub.status === "Open" ? "Одоо нэгдэх" : "Суудал дүүрсэн"}
                    </span>
                    {selectedClub.status === "Open" && (
                      <motion.div 
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                    )}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}