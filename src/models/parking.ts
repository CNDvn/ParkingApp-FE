import { User } from './user';

export interface Parking {
  id: string;
  name: string;
  address: string;
  openTime: string;
  closeTime: string;
  status: string;
  phoneNumber: string;
  business: Business;
  images: Image[];
  coordinates: Coordinates;
}
export interface Coordinates {
  latitude:  number;
  longitude: number;
}

export interface Image {
  url: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Business {
  id:   string;
    user: User;
}

export interface Role {
  id: string;
  name: string;
}
