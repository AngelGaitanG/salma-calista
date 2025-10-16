export interface Note {
  id?: string;          // ID de Parse
  text: string;         // Contenido de la nota
  color?: string;       //  Nombre no hexadecimal como: Amarillo
  createdAt?: Date;     // Fecha de creación
  updatedAt?: Date;     // Fecha de última actualización
}
