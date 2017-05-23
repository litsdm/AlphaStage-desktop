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

export type Feedback = {
  good: string,
  better: string,
  best: string,
  overallUX: string,
  gameId: string,
  sender: string
};

export type Gameplay = {
  s3URL: string,
  cloudfrontURL: string,
  key: string
};

export type DownloadArgs = {
  id: string,
  filename: string,
  url: string,
  name: string,
  img: string,
  fullname: string,
  winExe: string
};
