"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Settings2, 
  History, 
  Clock, 
  PencilLine, 
  Check,
} from "lucide-react"

import { cn } from "lib/utils"
import { ClubRequest, FormData, UserClub } from "@/lib/type"
import { ClubForm } from "./ClubForm"

export const CreateClubCenter = () => {
  // --- STATES ---
  const [isEditing, setIsEditing] = useState(false);
  // Multi-date сонголтод зориулж массив болгов
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [formData, setFormData] = useState<any>({
    name: "",
    goal: "",
    teacher: "",
    time: "13:00",
    duration: "1:30",
    studentEmail: "",
    room: "301",
    maxStudents: "",
    repeat: "none" // Давтамж тохиргоог нэмэв
  });

  // --- MOCK DATA ---
  const [requests] = useState<ClubRequest[]>([
    { id: "REQ-001", name: "React challenge", status: "pending", date: "2024.05.10" },
    { id: "REQ-002", name: "Cyber Security", status: "approved", date: "2024.04.15" },
    { id: "REQ-003", name: "Javascript Club", status: "rejected", date: "2024.03.20" },
  ]);

  const [myClubs] = useState<UserClub[]>([
    { id: "CLUB-1", name: "Leet Code Club", members: 15, category: "Technology" }
  ]);

  // --- CALENDAR LOGIC ---
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleMonthChange = (offset: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  // Өдөр сонгох болон хасах (Toggle) функц
  const toggleDate = (date: Date) => {
    const exists = selectedDates.find(d => d.toDateString() === date.toDateString());
    if (exists) {
      setSelectedDates(selectedDates.filter(d => d.toDateString() !== date.toDateString()));
    } else {
      setSelectedDates([...selectedDates, date].sort((a, b) => a.getTime() - b.getTime()));
    }
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysCount = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    for (let d = 1; d <= daysCount; d++) {
      const date = new Date(year, month, d);
      const isPast = date < today;
      // Массив дотроос хайж шалгах
      const isSelected = selectedDates.some(sd => sd.toDateString() === date.toDateString());
      const isToday = today.toDateString() === date.toDateString();

      days.push(
        <button
          key={d}
          type="button"
          disabled={isPast}
          onClick={() => toggleDate(date)}
          className={cn(
            "h-10 w-10 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center",
            isPast ? "opacity-10 cursor-not-allowed" : "hover:bg-primary/20 text-white/80",
            isSelected ? "bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.5)]" : "bg-white/5",
            isToday && !isSelected && "border border-primary text-primary"
          )}
        >
          {d}
          {isSelected && (
            <motion.div 
              layoutId="calendar-dot"
              className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full border-2 border-[#0b2b5c]" 
            />
          )}
        </button>
      );
    }
    return days;
  };

  const handleSubmit = () => {
    console.log("Submitting Data:", { ...formData, selectedDates });
    // Энд API дуудах логик орно
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6 lg:p-10 relative z-10">
      
      {/* HEADER SECTION */}
      <div className="mb-12 border-l-4 border-primary pl-6">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-white italic">
          Клуб Нээх Хүсэлт Илгээх
        </h1>
        <p className="text-white/40 text-lg mt-2 font-medium italic">
          Шинэ клуб нээх хүсэлт болон хуваарь илгээх.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- LEFT SIDE: FORM & CALENDAR --- */}
        <ClubForm 
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          selectedDates={selectedDates} // Шинэчлэгдсэн массив
          setSelectedDates={setSelectedDates}
          currentMonth={currentMonth}
          handleMonthChange={handleMonthChange}
          renderCalendarDays={renderCalendarDays}
        />

        {/* --- RIGHT SIDE: HISTORY & TIPS --- */}
        <div className="lg:col-span-5 space-y-8">
          
          <section className="space-y-4">
            <h3 className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-white/40">
              <PencilLine size={16} /> Миний Клубууд
            </h3>
            {myClubs.map((club) => (
              <motion.div 
                whileHover={{ x: 5 }}
                key={club.id} 
                className="group flex items-center justify-between p-6 rounded-[2rem] bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 backdrop-blur-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
                    {club.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-white italic">{club.name}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{club.members} Гишүүд • {club.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          <section className="space-y-4">
            <h3 className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-white/40">
              <History size={16} /> Илгээсэн хүсэлтүүд
            </h3>
            <div className="space-y-3">
              {requests.map((req) => (
                <div key={req.id} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group/item">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-2 w-2 rounded-full shadow-[0_0_8px]",
                      req.status === "approved" ? "bg-emerald-500 shadow-emerald-500" :
                      req.status === "rejected" ? "bg-red-500 shadow-red-500" : "bg-amber-500 shadow-amber-500"
                    )} />
                    <div>
                      <h5 className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">{req.name}</h5>
                      <p className="text-[9px] text-white/30 font-black uppercase tracking-tighter">{req.date} • {req.id}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                    req.status === "approved" ? "bg-emerald-500/10 text-emerald-500" :
                    req.status === "rejected" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                  )}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* System Tip */}
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Clock size={120} />
            </div>
            <div className="flex gap-4 relative z-10">
              <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                <Check className="h-5 w-5 text-blue-400" />
              </div>
              <div className="space-y-2">
                <p className="text-xs text-white/70 leading-relaxed font-bold uppercase tracking-widest">Хуваарь баталгаажуулалт</p>
                <p className="text-[11px] text-white/40 leading-relaxed italic">
                  Систем таны сонгосон олон өдрүүдийн давхцлыг шалгаж байна.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};