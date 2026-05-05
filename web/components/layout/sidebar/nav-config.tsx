"use client"
import { BookAIcon, School, Users } from "lucide-react";

const academicNavigation = {
  title: "Académico",
  url: "#",
  icon: <BookAIcon />,
  isActive: true,
  items: [
    { title: "Materias", url: "academico/materias" },
    { title: "Cursos", url: "academico/cursos" },
    { title: "Asignaciones", url: "academico/asignaciones" },
  ],
};

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
    academicNavigation,
  ],

  admin: [
    academicNavigation,
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
