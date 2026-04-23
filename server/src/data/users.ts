export interface User {
  [key: string]: unknown;
  name: string;
  id: number;
}

export const users = [
  {
    name: 'Jorn',
    id: 0,
  }, {
    name: 'Markus',
    id: 3,
  }, {
    name: 'Andrew',
    id: 2,
  }, {
    name: 'Ori',
    id: 4,
  }, {
    name: 'Mike',
    id: 1,
  }
];