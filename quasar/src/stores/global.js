import { defineStore } from "pinia";
//import { api } from "boot/axios";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    current: {
      page: "Dashboard",
    },
    projects: [],
    users: [],
    logs: []
  }),
  actions: {
    userDetail(userId) {
      console.log(this.users.find(user => user.uuid === userId));
      return this.users.find(user => user.uuid === userId);
    },
    async loadData() {
      const response = await fetch("/dummy/projects.json");
      const data = await response.json();
      this.projects = data;

      const response2 = await fetch("/dummy/log.json");
      const logs = await response2.json();
      this.logs = logs;

      const response3 = await fetch("/dummy/users.json");
      const users = await response3.json();
      this.users = users;
    }
  }
});
