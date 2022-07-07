import { createContext, ReactElement, useState } from 'react';
import { IProducts } from '../interfaces/products';

interface IBagContext {
  product: IProducts;
  amount: number;
}

interface IBagProvider {
  children: ReactElement;
}

type BagContextProps = {
  bagProps: IBagContext[];
  addBagItems: (item: IProducts, amountItems: number) => void;
  removeBagItems: (item: IProducts) => void;
};

export const BagContext = createContext<BagContextProps>({
  bagProps: [],
  addBagItems: (item: IProducts, amountItems: number) => {},
  removeBagItems: (item: IProducts) => {},
});

export const BagContextProvider: React.FC<IBagProvider> = ({ children }) => {
  const [bagProps, setBagProps] = useState<IBagContext[]>([]);

  const addBagItems = (item: IProducts, amountItems: number) => {
    const bagItem = bagProps.find((bag) => bag.product.id == item.id);
    if (!bagItem) {
      setBagProps([
        ...bagProps,
        {
          product: item,
          amount: amountItems,
        },
      ]);
    } else {
      setBagProps(
        bagProps.map((bag) => {
          if (bag.product.id == item.id) {
            return { ...bag, amount: amountItems };
          }
          return bag;
        })
      );
    }
  };

  const removeBagItems = (item: IProducts) => {
    setBagProps(bagProps.filter((bag) => bag.product.id != item.id));
  };

  return (
    <BagContext.Provider value={{ bagProps, addBagItems, removeBagItems }}>
      {children}
    </BagContext.Provider>
  );
};
