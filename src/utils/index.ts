import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import bImage from '../assets/burger.png';
import banner1 from '../assets/banner.png';
import banner2 from '../assets/banner2.png';

export const formatMoney = (number: number) => {
  const newFormat = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  });

  return newFormat.format(number);
};

export const formatDate = (date: Date | string, stringFormat: string) =>
  format(new Date(date), stringFormat, { locale: ptBr });

export const mainColor = '#FB9400';
// export const mainColor = '#6AB70A';
export const burgerImage = bImage;
export const bannerImage = banner1;
export const bannerImage2 = banner2;
