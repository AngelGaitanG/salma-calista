export interface Note {
  id?: string;          // ID de Parse
  text: string;         // Contenido de la nota
  color?: string;       // Color hexadecimal o CSS (por ejemplo "#ffcc00")
  createdAt?: Date;     // Fecha de creación
  updatedAt?: Date;     // Fecha de última actualización
}
