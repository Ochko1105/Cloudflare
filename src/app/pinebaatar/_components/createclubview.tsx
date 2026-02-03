"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Settings2, 
  History, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  PencilLine, 
  Globe2, 
  Users2,
  CalendarDays,
  UserCheck,
  Timer,
  Layout,
  Check,
  AlertCircle,
  DropletIcon,
  MoveDownIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "lib/utils"


/**
 * --- TYPES ---
 */
interface ClubRequest {
  id: string;
  name: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

interface UserClub {
  id: string;
  name: string;
  members: number;
  category: string;
}

export const CreateClubCenter = () => {
  // --- STATES ---
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    goal: "",
    teacher: "",
    time: "",
    duration: "1:30"
  });

  // --- MOCK DATA ---
  const [requests] = useState<ClubRequest[]>([
    { id: "REQ-001", name: "Art & Design Hub", status: "pending", date: "2024.05.10" },
    { id: "REQ-002", name: "Cyber Security", status: "approved", date: "2024.04.15" },
    { id: "REQ-003", name: "Boxing Club", status: "rejected", date: "2024.03.20" },
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

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysCount = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const days = [];

    // Empty slots for previous month's days
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    // Days of the current month
    for (let d = 1; d <= daysCount; d++) {
      const date = new Date(year, month, d);
      const isPast = date < today;
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const isToday = today.toDateString() === date.toDateString();

      days.push(
        <button
          key={d}
          type="button"
          disabled={isPast}
          onClick={() => setSelectedDate(date)}
          className={cn(
            "h-10 w-10 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center",
            isPast ? "opacity-10 cursor-not-allowed" : "hover:bg-primary/20 text-white/80",
            isSelected ? "bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.5)]" : "bg-white/5",
            isToday && !isSelected && "border border-primary text-primary"
          )}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const handleEdit = (club: UserClub) => {
    setIsEditing(true);
    setFormData(prev => ({ ...prev, name: club.name }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6 lg:p-10 relative z-10">
      
      {/* HEADER SECTION */}
      <div className="mb-12 border-l-4 border-primary pl-6 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white italic">
            {isEditing ? "Клуб Засах" : "Клуб Нээх"}
          </h1>
          <p className="text-white/40 text-lg mt-2 font-medium italic">
            {isEditing ? "Клубын мэдээллээ шинэчилж, илүү хүчирхэг болго." : "Шинэ клуб эхлүүлэх хүсэлт болон хуваарь илгээх."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- LEFT SIDE: FORM & CALENDAR --- */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-3xl relative overflow-hidden group shadow-2xl"
          >
            <div className="relative z-10 space-y-10">
              
              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Globe2 size={12} /> Клубын нэр
                  </label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold italic" 
                    placeholder="Wizards Club..." 
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <UserCheck size={12} /> Хариуцах багш
                  </label>
                  <select 
                    value={formData.teacher}
                    onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                  >
                    <option value="" className="bg-[#050c1f]">Сонгох...</option>
                    <option value="bat" className="bg-[#050c1f]">Б.Бат (Ph.D)</option>
                    <option value="saraa" className="bg-[#050c1f]">Г.Сараа (Master)</option>
                    <option value="bold" className="bg-[#050c1f]">Д.Болд (Engineer)</option>
                  </select>
                </div>
              </div>

              {/* Goal TextArea */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Клубын зорилго</label>
                <textarea 
                  rows={2}
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" 
                  placeholder="Энэхүү клубын үндсэн зорилгыг тодорхойлно уу..." 
                />
              </div>

              {/* CALENDAR & TIME SECTION */}
              <div className="p-8 rounded-[2.5rem] bg-black/30 border border-white/5 space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                    <CalendarDays size={16} /> Өдөр ба Цаг сонгох
                  </h4>
                  {selectedDate && (
                    <div className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 italic">
                      Сонгосон: {selectedDate.toLocaleDateString('mn-MN')}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Monthly Calendar View */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                      <button type="button" onClick={() => handleMonthChange(-1)} className="text-white/40 hover:text-white transition-colors"><ChevronLeft size={20}/></button>
                      <span className="text-[11px] font-black text-white uppercase tracking-widest">
                        {currentMonth.toLocaleString('mn-MN', { month: 'long', year: 'numeric' })}
                      </span>
                      <button type="button" onClick={() => handleMonthChange(1)} className="text-white/40 hover:text-white transition-colors"><ChevronRight size={20}/></button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center">
                      {['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'].map(day => (
                        <div key={day} className="text-[9px] font-black text-white/20 uppercase py-2">{day}</div>
                      ))}
                      {renderCalendarDays()}
                    </div>
                  </div>

                  {/* Time and Duration Inputs */}
                  <div className="flex flex-col justify-center space-y-6 border-l border-white/5 pl-10">
                    <div className="space-y-2">
                      <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Орох Анги</p>
                      <div className="relative">
                        <select 
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary/50 appearance-none"
                        >
                          <option value="1:00" className="bg-[#050c1f]">301</option>
                          <option value="1:30" className="bg-[#050c1f]">302</option>
                          <option value="2:00" className="bg-[#050c1f]">303</option>
                        </select>
                        <MoveDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
                      </div>
                    </div>
                   <div className="space-y-2">
                      <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Эхлэх цаг</p>
                      <div className="relative">
                        <select 
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary/50 appearance-none"
                        >
                          <option value="1:00" className="bg-[#050c1f]">13:00</option>
                          <option value="1:30" className="bg-[#050c1f]">14:00</option>
                          <option value="2:00" className="bg-[#050c1f]">16:00</option>
                        </select>
                        <MoveDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Үргэлжлэх хугацаа</p>
                      <div className="relative">
                        <select 
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary/50 appearance-none"
                        >
                          <option value="1:00" className="bg-[#050c1f]">1:00 цаг</option>
                          <option value="1:30" className="bg-[#050c1f]">1:30 цаг</option>
                          <option value="2:00" className="bg-[#050c1f]">2:00 цаг</option>
                        </select>
                            <MoveDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
                      </div>
                    </div>

                    {!selectedDate && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                         <AlertCircle size={14} className="text-amber-500" />
                         <span className="text-[10px] text-amber-500/80 font-bold uppercase italic">Өдрөө сонгоно уу</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button className="flex-1 h-20 rounded-3xl bg-primary text-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/20 transition-all duration-300">
                  {isEditing ? "Өөрчлөлтийг хадгалах" : "Хүсэлт илгээх"}
                </Button>
                {isEditing && (
                  <Button 
                    onClick={() => {setIsEditing(false); setFormData({name:"", goal:"", teacher:"", time:"", duration:"1:30"})}}
                    variant="outline" 
                    className="h-20 px-8 rounded-3xl border-white/10 text-white hover:bg-white/5"
                  >
                    Цуцлах
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

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
                <button 
                  onClick={() => handleEdit(club)}
                  className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all shadow-inner"
                >
                  <Settings2 size={18} />
                </button>
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
                  
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                      req.status === "approved" ? "bg-emerald-500/10 text-emerald-500" :
                      req.status === "rejected" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                    )}>
                      {req.status}
                    </span>
                    <ChevronRight size={14} className="text-white/20 group-hover/item:translate-x-1 transition-transform" />
                  </div>
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
                <p className="text-[11px] text-white/40 leading-relaxed">
                  Календараас сонгосон өдөр болон цагийг админ сургуулийн ерөнхий хуваарьтай тулган шалгаж 24 цагийн дотор хариу илгээнэ.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};