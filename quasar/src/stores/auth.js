import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    tenant: process.env.TENANT,
    user: {
      email: null,
      id: null,
      role: null,
    },
    online: false,
  }),
  getters: {},
  actions: {
    async hello() {
      try {
        const res = await api.get("/public/hello");
        this.offline = true;
      } catch (error) {
        this.online = false;
      }
    },
    async verifyToken() {
      try {
        const res = await api.get("/auth/check", {
          withCredentials: true,
        });
        this.token = res.data.token;
        this.user.email = res.data.email;
        this.user.id = res.data.id;
        this.user.role = res.data.role;
        return this.token;
      } catch (error) {
        this.token = null;
      }
    },
    async logout() {
      try {
        const res = await api.get("/auth/logout", { withCredentials: true });
        if (res.status === 200) {
          localStorage.removeItem("token");
          this.token = null;
          this.user.email = null;
          this.user.id = null;
          this.user.role = null;
          document.cookie =
            "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          return true;
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async signUp(email, password) {
      try {
        const res = await api.post(
          "/tenant/auth",
          {
            tenantId: this.tenant,
            email: email,
            password: password,
            action: "register",
          },
          {
            withCredentials: true,
          }
        );
        this.token = res.data.token;
        localStorage.setItem("token", this.token);
        const check = await this.verifyToken();
        if (check) {
          return true;
        }
      } catch (error) {
        throw ("Error signing up:", error.response.data.error);
      }
    },
    async signIn(email, password) {
      try {
        console.log("login", email, this.tenant);
        const res = await api.post(
          "/tenant/auth",
          {
            tenantId: this.tenant,
            email: email,
            password: password,
            action: "login",
          },
          {
            withCredentials: true,
          }
        );
        console.log(res);
        this.token = res.data.token;
        localStorage.setItem("token", this.token);
        const check = await this.verifyToken();
        if (check) {
          return true;
        }
      } catch (error) {
        throw error;
      }
    },
  },
});
