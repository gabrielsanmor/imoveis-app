import { Imovel } from "./imovel.model";

export interface ImoveisResult{
  count:number;
  previous?:string;
  next?:string;
  results:Imovel[];
}
