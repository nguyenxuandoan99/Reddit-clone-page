export interface LoginResponse{
  authenticationToken: string ;
  refreshToKen : string;
  expiresAt : Date;
  username : string;
}
