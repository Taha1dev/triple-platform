/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoginResponseSchema {
  id: string
  fname: string
  rating: number
  lname: string
  email: string
  data: any[]
  portfolio: any[]
  city: string[]
  country: string
  contact_number: string
  dob: string
  token: string
  [key: string]: any;
}
// export const getDefaultUserSchema = () => {
//   return {
//     id: '',
//     fname: '',
//     rating: 0,
//     lname: '',
//     email: 'string',
//     data: [],
//     portfolio: [],
//     city: [],
//     country: '',
//     contact_number: '',
//     dob: ''
//   }
// }