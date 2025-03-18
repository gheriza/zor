export interface Service {
    id: string;
    title: string;
    description: string;
    image: string;
    location: string;
    price: number;
    rating?: number;
    isNew?: boolean;
  }
  