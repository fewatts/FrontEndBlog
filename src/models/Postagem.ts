import { Tema } from "./Tema";
import { Usuario } from "./Usuario";

export interface Postagem {
  link: string;
  id: number;
  titulo: string;
  texto: string;
  data: string;
  tema?: Tema | null;
  usuario?: Usuario | null;
}