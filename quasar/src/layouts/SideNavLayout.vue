<template>
  <q-layout view="lHh lpr lFf">

    <q-header reveal class="bg-white text-black">
      <q-toolbar class="q-py-lg">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <span class="text-h4">{{ $t(global.current.page) }}</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left">
      <div class="logo flex items-center">
        <img src="logo.png"/>
        <span class="text-h5 q-ml-md">{{ $t('title') }}</span>
      </div>
      <div class="text-center">
        <q-avatar size="6rem">
          <img :src="'users/'+auth.user.id + '.jpg'" style="object-fit: cover" />
        </q-avatar>
        <p class="text-caption q-mt-md q-mb-none">Welcome, {{ auth.user.role }}</p>
        <p class="text-h6">{{ auth.user.fname }} {{ auth.user.lname }}</p>

      </div>
      <div class="q-pt-lg">
        <div v-for="item in sideNav" :key="item.to">
          <q-btn @click="$router.push(`/${item.to}`)" noCaps :color="item.name === global.current.page ? 'primary' : 'black'" flat>{{ $t(item.label) }}</q-btn>
        </div>
    </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="bg-transparent">
      <a href="">{{ $t('footer.support') }}</a>
    </q-footer>

  </q-layout>
</template>

<script>
import { useAuthStore } from "stores/auth";
import { useGlobalStore } from "stores/global";
const auth = useAuthStore();
const global = useGlobalStore();
export default {
  data() {
    return {
      leftDrawerOpen: false,
      sideNav: [
        {
          icon: 'fa-solid fa-gauge',
          name: "Dashboard",
          label: 'nav.dashboard',
          to: '/'
        },
        {
          icon: 'fa-solid fa-gauge',
          name: "Projects",
          label: 'nav.projects',
          to: '/projects'
        },
        {
          icon: 'fa-solid fa-gauge',
          name: "Profile",
          label: 'nav.profile',
          to: '/profile'
        }
      ]
    };
  },
  computed: {
    global() {
      return { current: global.current };
    },
    auth() {
      return { user: auth.user };
    },
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  },
}
</script>
<style scoped type="text/scss">
.logo{
  margin: 1rem 2rem;
  height: 6rem;
  position: relative;
  img {
    height: 4rem;
    width: auto;
    object-fit: contain;
    position: relative;
  }

}
</style>

