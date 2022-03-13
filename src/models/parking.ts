import { User } from './user';

export interface Parking {
    id:           string;
    name:         string;
    address:      string;
    openTime:     string;
    closeTime:    string;
    status:       string;
    phoneNumber:  string;
    business:     Business;
    images:       Image[];
    parkingSlots: ParkingSlot[];
    coordinates:  Coordinates;
}

export interface Business {
    id:           string;
    user: User;
}
export interface Image {
    url: string;
}

export interface Coordinates {
    latitude:  number;
    longitude: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Business {
  id: string;
  user: User;
}

export interface ParkingSlot {
    id:           string;
    locationName: string;
    status:       string;
}

export interface Status {
  status: string;
}
