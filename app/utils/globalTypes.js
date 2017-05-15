export type Game = {
  _id: string,
  name: string
};

export type NewUser = {
  email: string,
  username: string,
  password: string,
  isDeveloper: boolean
};

export type Credentials = {
  email: string,
  password: string
};
