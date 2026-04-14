"use client"
import { BookAIcon, School, Users } from "lucide-react";


export const navigationByRole = {
  owner: [
    {
      title: "Gestión del Colegio",
      url: "#",
      icon: <School />,
      isActive: true,
      items: [
        { title: "Información", url: "inicio/" },
        { title: "Configuración", url: "#" },
      ],
    },
    {
      title: "Usuarios",
      url: "#",
      icon: <Users />,
      isActive: true,
      items: [
        { title: "Administradores", url: "usuarios/administradores" },
        { title: "Profesores", url: "usuarios/profesores" },
        { title: "Invitaciones", url: "usuarios/invitar" },
      ],
    },
  ],

  admin: [
    {
      title: "Académico",
      url: "#",
      icon: <BookAIcon />,
      isActive: true,
      items: [
        { title: "Cursos", url: "#" },
        { title: "Materias", url: "#" },
      ],
    },
  ],

  teacher: [
    {
      title: "Mis Clases",
      url: "#",
      icon: <School />,
      isActive: true,
      items: [{ title: "Cursos", url: "#" }],
    },
  ],
};
