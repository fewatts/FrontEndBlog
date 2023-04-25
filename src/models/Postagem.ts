import { Tema } from "./Tema";

export interface Postagem {
  link: string;
  id: number;
  titulo: string;
  texto: string;
  data: string;
  tema: Tema | null;
}