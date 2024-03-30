export type Session = {
  user: {
    pkValue: number;
    nicknameValue: string;
    oauthIdValue: string;
    oauthProviderValue: string;
    imageUrlValue: string;
  };
  expires: string;
  accessToken: string;
};
