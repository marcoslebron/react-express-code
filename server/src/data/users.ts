export interface User {
  [key: string]: unknown;
  name: string;
  id: number;
  department: string;
  dateHired: Date;
}

// export const users = [
//   {
//     name: 'Jorn',
//     id: 0,
//   }, {
//     name: 'Markus',
//     id: 3,
//   }, {
//     name: 'Andrew',
//     id: 2,
//   }, {
//     name: 'Ori',
//     id: 4,
//   }, {
//     name: 'Mike',
//     id: 1,
//   }
// ];

export const users = [{
  name: 'Jorn',
  id: 0,
  department: 'IT',
  dateHired: new Date('2022-09-02T16:27:24.999Z')
}, {
  name: 'Markus',
  id: 3,
  department: 'HR',
  dateHired: new Date('2023-01-24T16:27:24.999Z')
}, {
  name: 'Andrew',
  id: 2,
  department: 'HR',
  dateHired: new Date('2022-03-22T16:27:24.999Z')
}, {
  name: 'Ori',
  id: 4,
  department: 'FINANCE',
  dateHired: new Date('2019-07-04T16:27:24.999Z')
}, {
  name: 'Mike',
  id: 1,
  department: 'IT',
  dateHired: new Date('2010-12-16T16:27:24.999Z')
}];