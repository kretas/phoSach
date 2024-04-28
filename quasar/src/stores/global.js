import { defineStore } from "pinia";
//import { api } from "boot/axios";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    current: {
      page: "Dashboard",
    },
    projects: []
  }),
  actions: {
    async loadData() {
      const response = await fetch("/dummy/projects.json");
      const data = await response.json();
      this.projects = data;
    }
  }
});
