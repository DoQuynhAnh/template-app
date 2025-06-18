/* eslint-disable @typescript-eslint/no-explicit-any */

export interface AppState {
  profile: any;

  token: string | undefined;

  loadingApp: boolean;
}


export type TagComment = {
  id: number;
  content: string;
};
