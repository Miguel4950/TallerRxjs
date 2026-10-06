export interface UserAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
}

export interface UserCompany {
  department: string;
  name: string;
  title: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  university?: string;
  address?: UserAddress;
  company?: UserCompany;
  role?: string;
}

export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
