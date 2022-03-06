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
    user: User;
}
export interface Image {
    url: string;
}

export interface Coordinates {
    latitude:  number;
    longitude: number;
}

export interface ParkingSlot {
    id:           string;
    locationName: string;
    status:       string;
}
