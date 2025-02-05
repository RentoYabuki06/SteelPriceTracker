export type MaterialData = {
  id: string;
  name: string;
  data: {
    date: string;
    price: number;
  }[];
};

export type MaterialPriceResponse = {
  materials: {
    id: number;
    name: string;
    prices: {
      date: string;
      priceMin: number;
      priceMax: number;
      location: string;
      unit: string;
    }[];
  }[];
}; 