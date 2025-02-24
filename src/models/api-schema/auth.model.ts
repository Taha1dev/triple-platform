/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoginResponseSchema {
  id: string
  fname: string
  rating: number
  lname: string
  email: string
  data: any[]
  image: string
  portfolio: any[]
  city: string[]
  country: string
  contact_number: string
  dob: string
  token: string
}
interface Token {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  portfolio: any[];
  password: string;
  contact_number: string;
  dob: string;
  rating: number;
  city: any[];
  data: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  OTP: string;
  forgot_password_OTP: string;
  login_token: string;
  image: string;
}

export interface UpdateProfileResponse {
  status: number;
  data: number;
  message: string;
  token: Token;
}

