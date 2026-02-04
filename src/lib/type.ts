export interface ClubRequest {
  id: string;
  name: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

export interface UserClub {
  id: string;
  name: string;
  members: number;
  category: string;
}

export interface FormData {
  name: string;
  goal: string;
  teacher: string;
  time: string;
  duration: string;
  studentEmail: string;
  room: string;
  maxStudents: string;
}
export interface Instructor {
  name: string
  image: string
  role: string
}

export interface Club {
  id: number
  name: string
  schedule: string
  time: string
  class: string
  instructors: Instructor[] 
  topic: string
  description: string
  currentMembers: number
  maxMembers: number
  status: "Open" | "Full"
  enrolledStudents: string[]
  isEnrolled?: boolean 
  bannedUntil?: number; 
}

export interface ClubCardProps {
  club: Club & { isEnrolled?: boolean; bannedUntil?: number };
  isSelected: boolean;
  onClick: (id: number) => void;
}