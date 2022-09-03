export type getZermeloTokenResponse = ZermeloTokenResponse;

export interface ZermeloTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
