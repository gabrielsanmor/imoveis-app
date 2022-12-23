import { Anexo } from "./anexo.model";

export interface Imovel{
  id?: number;
  exibicao?: string;
  descricao?: string;
  area?: number;
  logradouro?: string;
  valor_compra?: number;
  valor_venda?: number;
  imagens: Anexo[]
}

export interface ImovelIn{
  id?: number;
  exibicao?: string;
  descricao?: string;
  area?: number;
  logradouro?: string;
  valor_compra?: number;
  valor_venda?: string;
  imagens: Anexo[]
}
