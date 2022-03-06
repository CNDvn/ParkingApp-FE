export interface User {
  id: string;
  firstName: string;
  lastName: string;
  DOB: string;
  status: string;
  username: string;
  phoneNumber: string;
  email: string;
  address: string;
  avatar: string;
  customer: null;
  business: Business;
  role: Role;
  fullName: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Business {}

export interface Role {
  id: string;
  name: string;
}
