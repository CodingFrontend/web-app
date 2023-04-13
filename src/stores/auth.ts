import { defineStore, createPinia, setActivePinia } from "pinia";

setActivePinia(createPinia());

import AuthDataService from "@/api/services/AuthDataService";

import router from "@/router";

import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

import type { LoginApiResponseData } from "@/types/LoginApi";
import type { LoginApiPayload } from "@/types/LoginApi";

export interface AuthState {
  user: LoginApiResponseData | null;
  loading: boolean;
  isAuth: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem("user")),
    isAuth: JSON.parse(localStorage.getItem("isAuth")),
    loading: false,
  }),

  getters: {
    userName: (state) => state.user && state.user.name,
    isAdmin: (state) => state.user && state.user.role === "admin",
  },

  actions: {
    async login(params: LoginApiPayload) {
      this.loading = true;

      try {
        await AuthDataService.login(params).then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("isAuth", JSON.stringify(true));
          this.user = response.data;
          this.isAuth = true;
          router.push({ name: "home" });
        });
      } catch (error) {
        notify({
          title: "Ошибка!",
          text: "Неверный логин/пароль",
          type: "error",
          duration: 3000,
        });
      } finally {
        this.loading = false;
      }
    },

    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("isAuth");
      router.push("/auth");
    },
  },
});
