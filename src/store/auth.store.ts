import { create } from "zustand";

import { AuthState } from "../config/types.config";

import * as authDto from "../dtos/auth.dto";

const useAuthStore = create<AuthState>((set) => {
  const storedAuthStatus = localStorage.getItem("isAuthenticated");
  const storedToken = localStorage.getItem("tokenData");
  const initIsAuthData = storedAuthStatus
    ? JSON.parse(storedAuthStatus)
    : false;
  const initTokenData = storedToken ? JSON.parse(storedToken) : "";

  return {
    isAuthenticated: initIsAuthData,
    tokenData: initTokenData,
    alertTitle: "",
    alertMessage: "",
    signIn: async (email: string, password: string) => {
      try {
        const res = await authDto.signIn(email, password);

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("tokenData", JSON.stringify(res.data.token));
        set({ isAuthenticated: true });
      } catch (err: any) {
        set({
          alertTitle: err.message,
          alertMessage: err.response.data.message,
        });
      }
    },
    signUp: async (
      name: string,
      email: string,
      password: string,
      password_confirmation: string
    ) => {
      try {
        const res = await authDto.signUp(
          name,
          email,
          password,
          password_confirmation
        );

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("tokenData", JSON.stringify(res.data.token));
        set(() => ({ isAuthenticated: true }));
      } catch (err: any) {
        set({ alertTitle: err.message, alertMessage: err.response.data.message });
      }
    },
    signOut: async () => {
      try {
        await authDto.signOut(initTokenData);

        localStorage.setItem("isAuthenticated", "false");
        localStorage.setItem("tokenData", "");
        set(() => ({ isAuthenticated: false }));
      } catch (err: any) {
        console.log(err);

        set({ alertTitle: err.message, alertMessage: err.response.data.message });
      }
    },
  };
});

export default useAuthStore;
