import { Car } from 'lucide-react';

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  fuelEconomy: string;
  horsepower: number;
  image: string;
  rating: number;
}

const fallbackImage = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

const generateVehicles = (count: number): Vehicle[] => {
  const makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia', 'Volkswagen', 'BMW', 'Mercedes-Benz'];
  const models = ['Sedan', 'SUV', 'Truck', 'Hatchback', 'Coupe', 'Minivan', 'Crossover', 'Wagon', 'Convertible', 'Electric'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    make: makes[Math.floor(Math.random() * makes.length)],
    model: `${models[Math.floor(Math.random() * models.length)]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
    year: 2020 + Math.floor(Math.random() * 5),
    price: 20000 + Math.floor(Math.random() * 60000),
    fuelEconomy: `${20 + Math.floor(Math.random() * 20)}/${25 + Math.floor(Math.random() * 20)}`,
    horsepower: 150 + Math.floor(Math.random() * 300),
    image: `https://source.unsplash.com/featured/?${makes[Math.floor(Math.random() * makes.length)]},car`,
    rating: 3 + Math.random() * 2,
  }));
};

export const vehicles = generateVehicles(100);

export const getVehicleImage = (url: string) => {
  return new Promise<string>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(fallbackImage);
    img.src = url;
  });
};