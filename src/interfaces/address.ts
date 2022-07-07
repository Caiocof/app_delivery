export interface IAddress {
  id?: number;
  user_id?: number;
  cep?: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complements?: string;
}
