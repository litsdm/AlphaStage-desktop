export type Game = {
  _id: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  description: string,
  img: string,
  backgroundImg: string,
  galleryLinks: Array<string>,
  videoLinks: Array<string>,
  playCount: number,
  availableOn: {
    windows: boolean,
    macOS: boolean
  },
  releaseDate: ?Date,
  macBuildURL: ?string,
  winBuildURL: ?string,
  macFilename: ?string,
  winFilename: ?string,
  winExe: string,
  isPrivate: boolean
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
