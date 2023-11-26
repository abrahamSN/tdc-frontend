import { create } from "zustand";

import { User, UserState } from "../config/types.config";

import * as userDto from "../dtos/user.dto";

const useUserStore = create<UserState>((set) => {
  const storedToken = localStorage.getItem("tokenData");
  const initTokenData = storedToken ? JSON.parse(storedToken) : "";

  return {
    alertTitle: "",
    alertMessage: "",
    isModalOpen: false,
    selectedUser: null,
    users: [],
    openModal: (user: any) => {
      set({ isModalOpen: true, selectedUser: user });
    },
    closeModal: () => {
      set({ isModalOpen: false, selectedUser: null });
    },
    getUsers: async () => {
      try {
        const res = await userDto.getUsers(initTokenData);

        set({ users: res.data.data });
      } catch (err: any) {
        set({
          alertTitle: err.message,
          alertMessage: err.response.data.message,
        });
      }
    },
    getUsersById: (id: string) => set({ users: [] }),
    storeUser: async (data: Partial<User>) => {
      try {
        const res = userDto.createUser(initTokenData, data);
      } catch (err: any) {
        set({
          alertTitle: err.message,
          alertMessage: err.response.data.message,
        });
      }
    },
    updateUser: async (id: string, data: Partial<User>) => {
      try {
        await userDto.updateUser(initTokenData, id, data);

        const res = await userDto.getUsers(initTokenData);

        set({ users: res.data.data });
      } catch (err: any) {
        set({
          alertTitle: err.message,
          alertMessage: err.response.data.message,
        });
      }
    },
    deleteUser: async (id: string) => {
      try {
        await userDto.deleteUser(initTokenData, id);

        const res = await userDto.getUsers(initTokenData);

        set({ users: res.data.data });
      } catch (err: any) {
        set({
          alertTitle: err.message,
          alertMessage: err.response.data.message,
        });
      }
    },
  };
});

export default useUserStore;
