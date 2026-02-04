import { Club } from "./type";

export const clubs: Club[] = [
  {
    id: 1,
    name: "React ",
    schedule: "Даваа, Лхагва",
    time: "18:00–20:00",
    class: "401",
    instructors: [
      { name: "Доктор Сара Чен", image: "/avatars/sarah.jpg", role: "Үндсэн багш" },
     
    ],
    topic: "Modern Frontend Development",
    description: "React-ийн үндсэн ойлголтууд болох JSX, Components, Props болон State-ийг практик дээр тулгуурлан сурна. Бодит төсөл дээр ажиллах боломж.",
    currentMembers: 12,
    maxMembers: 20,
    status: "Open",
    enrolledStudents: ["STU001", "STU002", "STU003", "STU004", "STU005", "STU012"],
  },
  {
    id: 2,
    name: "Javascript Master",
    schedule: "Мягмар, Пүрэв",
    time: "19:00–21:00",
    class: "302",
    instructors: [
       { name: "Б.Бат-Эрдэнэ", image: "/avatars/bat.jpg", role: "Ментор" },
      { name: "А.Ану", image: "/avatars/anu.jpg", role: "Туслах багш" }
    ],
    topic: "ES6+ ба Deep Dive JS",
    description: "Javascript-ийн ахисан түвшний ойлголтууд болох Closure, Prototypes, ба Asynchronous програмчлалыг гүнзгийрүүлэн судална.",
    currentMembers: 15,
    maxMembers: 15,
    status: "Full",
    enrolledStudents: ["STU013", "STU014", "STU015", "STU027"],
  },
  {
    id: 3,
    name: "Custom Hook Logic",
    schedule: "Баасан",
    time: "15:00–17:00",
    class: "405",
    instructors: [
      { name: "Эмили Парк", image: "/avatars/emily.jpg", role: "React Expert" },
      { name: "Т.Тэмүүлэн", image: "/avatars/temuulen.jpg", role: "Frontend Dev" },
      
    ],
    topic: "Reusability & Performance",
    description: "Өөрийн Custom hook-ийг хэрхэн зөв бичих, кодоо яаж дахин ашиглах боломжтой болгох талаарх туршлага солилцох клуб.",
    currentMembers: 8,
    maxMembers: 18,
    status: "Open",
    enrolledStudents: ["STU028", "STU029", "STU030", "STU035"],
  },
  {
    id: 4,
    name: "Next.js Framework",
    schedule: "Бямба",
    time: "10:00–14:00",
    class: "Lab 1",
    instructors: [
      { name: "Марк Сукер", image: "/avatars/mark.jpg", role: "Fullstack Dev" },
      { name: "Б.Хонгор", image: "/avatars/khongor.jpg", role: "Architect" }
    ],
    topic: "Server Side Rendering",
    description: "App Router, Server Components болон SEO-д ээлтэй вэбсайт бүтээх арга техникүүдийг суралцана.",
    currentMembers: 10,
    maxMembers: 25,
    status: "Open",
    enrolledStudents: ["STU050", "STU051", "STU052"],
  },
  {
    id: 5,
    name: "UI/UX Design for Devs",
    schedule: "Ням",
    time: "14:00–16:00",
    class: "Studio 2",
    instructors: [
      { name: "Линди Жо", image: "/avatars/lindy.jpg", role: "Art Director" },
      { name: "С.Энхжин", image: "/avatars/enkhjin.jpg", role: "Product Designer" }
    ],
    topic: "Figma to React",
    description: "Хөгжүүлэгч хүнд байх ёстой дизайны мэдрэмж, Figma-г хэрхэн React код руу алдаагүй хөрвүүлэх талаар сурна.",
    currentMembers: 5,
    maxMembers: 12,
    status: "Open",
    enrolledStudents: ["STU080", "STU081"],
  }
];
