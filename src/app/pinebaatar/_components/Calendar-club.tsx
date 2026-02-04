"use client"

import React, { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CalendarDays, ChevronLeft, ChevronRight, 
  DoorOpen, Clock, Timer, UserPlus2, MoveDownIcon,
  RotateCcw, X, RotateCcw as ResetIcon 
} from 'lucide-react'
import { cn } from 'lib/utils'

interface LogisticsSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  currentMonth: Date;
  handleMonthChange: (offset: number) => void;
  renderCalendarDays: () => React.ReactNode;
}

export const LogisticsSection = ({
  formData,
  setFormData,
  selectedDates,
  setSelectedDates,
  currentMonth,
  handleMonthChange,
  renderCalendarDays
}: LogisticsSectionProps) => {

  // --- LOGIC: Рекуррент өдрүүдийг тооцоолох ---
  const calculateRecurrence = useCallback((baseDates: Date[], mode: string, monthDate: Date) => {
    if (baseDates.length === 0 || mode === 'none') return baseDates;

    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sourceDates = [...baseDates].sort((a, b) => a.getTime() - b.getTime());
    const firstSelectedDate = sourceDates[0];
    const weekDays = Array.from(new Set(sourceDates.map(d => d.getDay())));

    const newDates: Date[] = [];
    const tempDate = new Date(year, month, 1);

    while (tempDate.getMonth() === month) {
      if (tempDate >= today) {
        if (mode === 'weekly' && weekDays.includes(tempDate.getDay())) {
          newDates.push(new Date(tempDate));
        } 
        else if (mode === 'biweekly' && weekDays.includes(tempDate.getDay())) {
          const diffDays = Math.ceil(Math.abs(tempDate.getTime() - firstSelectedDate.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays % 14 === 0) newDates.push(new Date(tempDate));
        } 
        else if (mode === 'monthly' && tempDate.getDate() === firstSelectedDate.getDate()) {
          newDates.push(new Date(tempDate));
        }
      }
      tempDate.setDate(tempDate.getDate() + 1);
    }
    return newDates;
  }, []);

  useEffect(() => {
    if (formData.repeat !== 'none' && selectedDates.length > 0) {
      const updated = calculateRecurrence(selectedDates, formData.repeat, currentMonth);
      const currentTimes = JSON.stringify(selectedDates.map(d => d.getTime()).sort());
      const updatedTimes = JSON.stringify(updated.map(d => d.getTime()).sort());
      if (currentTimes !== updatedTimes && updated.length > 0) {
        setSelectedDates(updated);
      }
    }
  }, [formData.repeat, currentMonth, calculateRecurrence]);

  const removeDate = (dateToRemove: Date) => {
    setSelectedDates(selectedDates.filter(date => date.getTime() !== dateToRemove.getTime()));
  };

  const handleReset = () => {
    setSelectedDates([]);
    setFormData({ ...formData, repeat: 'none' });
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-black/30 border border-white/5 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
          <CalendarDays size={16} /> Хуваарь ба Логистик
        </h4>
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-bold text-emerald-400 italic">
            {selectedDates.length > 0 ? `${selectedDates.length} өдөр сонгосон` : "Өдрөө сонгоно уу"}
          </div>
          <button 
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
            title="Reset"
          >
            <ResetIcon size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT: Calendar */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <button type="button" onClick={() => handleMonthChange(-1)} className="text-white/40 hover:text-white transition-colors">
                <ChevronLeft size={20} />
              </button>
              <span className="text-[11px] font-black text-white uppercase tracking-widest">
                {currentMonth.toLocaleString('mn-MN', { month: 'long', year: 'numeric' })}
              </span>
              <button type="button" onClick={() => handleMonthChange(1)} className="text-white/40 hover:text-white transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'].map(day => (
                <div key={day} className="text-[9px] font-black text-white/20 uppercase py-2">{day}</div>
              ))}
              {renderCalendarDays()}
            </div>
          </div>

          {/* Selected Dates Badges */}
          <div className="flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {selectedDates.sort((a,b) => a.getTime() - b.getTime()).map((date) => (
                <motion.span
                  key={date.getTime()}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-bold"
                >
                  {date.toLocaleDateString('mn-MN', { month: 'short', day: 'numeric' })}
                  <X 
                    size={12} 
                    className="cursor-pointer hover:text-white transition-colors" 
                    onClick={() => removeDate(date)}
                  />
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: Logistics Details */}
        <div className="flex flex-col justify-center space-y-6 border-l border-white/5 pl-10">
          
          <SelectField 
            label="Давтамж" icon={<RotateCcw size={12}/>} 
            value={formData.repeat} 
            onChange={(val: any) => setFormData({...formData, repeat: val})}
            options={[
              {l: "Зөвхөн сонгосон өдрүүдэд", v:"none"}, 
              {l: "Долоо хоног бүр", v:"weekly"}, 
              {l: "2 долоо хоног тутам", v:"biweekly"},
              {l: "Сар бүр", v:"monthly"}
            ]}
          />

          <SelectField 
            label="Орох Анги" icon={<DoorOpen size={12}/>} 
            value={formData.room} 
            onChange={(val: any) => setFormData({...formData, room: val})}
            options={["301", "302", "303"]}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <SelectField 
              label="Эхлэх цаг" icon={<Clock size={12}/>} 
              value={formData.time} 
              onChange={(val: any) => setFormData({...formData, time: val})}
              options={["13:00", "14:00", "15:00", "16:00"]}
            />

            <SelectField 
              label="Үргэлжлэх" icon={<Timer size={12}/>} 
              value={formData.duration} 
              onChange={(val: any) => setFormData({...formData, duration: val})}
              options={[
                {l: "1:00 цаг", v:"1:00"}, 
                {l: "1:30 цаг", v:"1:30"}, 
                {l: "2:00 цаг", v:"2:00"}
              ]}
            />
          </div>

          <div className="space-y-2">
            <p className={cn(
              "text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors duration-300",
              Number(formData.maxStudents) > 20 ? "text-red-500" : "text-white/40"
            )}>
              <UserPlus2 size={12} /> Сурагчдын тоо 
              <span className={Number(formData.maxStudents) > 20 ? "text-red-500/50" : "text-white/20"}>
                (Макс 20)
              </span>
            </p>
            <div className="relative">
              <input 
                type="number"
                value={formData.maxStudents}
                onChange={(e) => setFormData({...formData, maxStudents: e.target.value})}
                className={cn(
                  "w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-300",
                  Number(formData.maxStudents) > 20 ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-primary/50"
                )}
                placeholder="Жишээ: 15"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SelectField = ({ label, icon, value, onChange, options }: any) => (
  <div className="space-y-2">
    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
      {icon} {label}
    </p>
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary/50 appearance-none cursor-pointer"
      >
        {options.map((opt: any) => (
          <option key={opt.v || opt} value={opt.v || opt} className="bg-[#050c1f]">
            {opt.l || opt}
          </option>
        ))}
      </select>
      <MoveDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
    </div>
  </div>
)