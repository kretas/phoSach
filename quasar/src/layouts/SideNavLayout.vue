<template>
  <q-layout view="lHh lpr lFf">

    <q-header reveal class="bg-white text-black border-bottom">
      <q-toolbar class="q-px-lg q-py-md">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <span class="text-h6 q-mb-none">{{ $t(global.current.page) }}</span>
        </q-toolbar-title>
        <div class="flex items-center q-gutter-md">
          <span class="text-body2">{{ auth.user.role }}, {{ auth.user.fname }} {{ auth.user.lname }}</span>
          <q-avatar size="3rem">
            <img :src="'users/'+auth.user.id + '.jpg'" style="object-fit: cover" />
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" class="border-right">
      <div class="logo flex items-center q-my-md q-mx-lg">
        <img src="logo.png"/>
        <span class="text-h5 q-ml-md text-bold text-secondary" style="letter-spacing: 4px">{{ $t('title') }}</span>
      </div>
      <div class="text-center q-pa-lg">
        <q-avatar size="6rem">
          <img :src="'users/'+auth.user.id + '.jpg'" style="object-fit: cover" />
        </q-avatar>
        <p class="text-caption q-mt-md q-mb-none">Welcome, {{ auth.user.role }}</p>
        <p class="text-h6">{{ auth.user.fname }} {{ auth.user.lname }}</p>

      </div>
      <div>
        <div v-for="item in sideNav" :key="item.to">
          <q-btn @click="$router.push(`/${item.to}`)" noCaps :color="item.name === global.current.page ? 'primary' : 'black'" flat>{{ $t(item.label) }}</q-btn>
        </div>
    </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="bg-transparent q-pt-lg">
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
  height: 3rem;
  position: relative;
  img {
    height: 3rem;
    width: auto;
    object-fit: contain;
    position: relative;
  }

}
</style>

