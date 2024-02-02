export class CreateEventDto {
  name: string;
  description: string;
  category: string;
  artists: string[];
  participants: number;
  date: string;
  city: string;
  country: string;
  location: string;
  price: string;
  image: string;
  user: string;
}
