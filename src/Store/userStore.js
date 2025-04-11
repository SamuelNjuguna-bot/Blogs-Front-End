import { create } from "zustand";
import { persist } from "zustand/middleware";

function userStore(set) {
  return {
    user: null,

    setUserInformation: (userdata) => {
      set({ user: userdata });
    },

    removeUser: () => {
      set({ user: null });
    },
  };
}

const user_Data = create(userStore, { name: "userStore" });
export default user_Data;
