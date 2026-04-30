export interface LoginPayload {
  user_name: string;
  password: string;
}

export interface LoginResponse {
  authToken: string;
  user: {
    _id: string;
    user_name: string;
  };
}
