import { Tema } from "./Tema";

export interface Postagem {
  link: ReactNode;
  id: number;
  titulo: string;
  texto: string;
  data: string;
  tema: Tema
}