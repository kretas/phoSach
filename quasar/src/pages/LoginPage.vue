<template>
  <div>
    <div class="loginBg"></div>
    <div class="container row justify-center items-center" style="height: 100vh">
      <q-card class="card3d cardGlass" style="width:300px">
        <q-tabs v-model="tab" dense active-color="black" indicator-color="accent" align="justify"
          narrow-indicator>
          <q-tab name="login" label="Sign In" noCaps class="q-pt-md" />
          <q-tab name="register" label="Sign Up" noCaps class="q-pt-md" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login" class="q-pa-lg">
            <p class="text-center text-overline">Login with your existing account</p>
            <q-form @submit="signIn()" class="text-center">
              <q-input v-model="email" label="Email" type="email" filled color="accent" required />
              <q-input v-model="password" label="Password" type="password" color="accent" filled />
              <q-btn :disabled="!email || !password" type="submit" label="Sign In" color="primary"
                class="q-my-md q-px-lg q-py-sm rounded" no-caps style="border-radius: 15px" />
            </q-form>
            <q-spinner v-if="loading" color="accent" size="3em" :thickness="2" />
            <p v-if="errorLogin !== ''" class="text-body1 text-center">{{ errorLogin }}</p>
            <p v-if="submitted" class="text-body1">{{ submitted }}</p>
          </q-tab-panel>

          <q-tab-panel name="register" class="q-pa-lg">
            <p class="text-center text-overline">Create a new User account</p>
            <q-form @submit="signUp()" class="text-center">
              <q-input v-model="email" label="Email" type="email" filled color="accent" required />
              <q-input v-model="password" label="Password" type="password" filled color="accent" />
              <q-input v-model="confirmPassword" label="Confirm Password" color="accent" type="password" filled />
              <q-btn :disabled="!email || !password || password !== confirmPassword" type="submit" label="Sign Up"
                color="primary" class="q-my-md q-px-lg q-py-sm rounded" no-caps style="border-radius: 15px" />
            </q-form>
            <q-spinner v-if="loading" color="accent" size="3em" :thickness="2" />
            <p v-if="errorRegister" class="text-body1 text-center">{{ errorRegister }}</p>
            <p v-if="submitted" class="text-body1">{{ submitted }}</p>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

import { useAuthStore } from "stores/auth";
const authStore = useAuthStore();


const email = ref("ebie.ltd@proton.me");
const tab = ref("login");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const errorLogin = ref("");
const errorRegister = ref("");
const submitted = ref("");

const signUp = async () => {
  try {
    const res = await authStore.signUp(email.value, password.value);
    if (res) {
      router.push('/dashboard')
    }
  } catch (e) {
    console.error(e);
    errorRegister.value = e
  }
};

const signIn = async () => {
  try {
    const res = await authStore.signIn(email.value, password.value);
    if (res) {
      router.push('/dashboard')
    }
  } catch (e) {
    console.error(e);
    errorLogin.value = 'Error Signing In'
  }
};
onMounted(() => { });
</script>
<style scoped>
.loginBg {
  position: absolute;
  height: 100%;
  width: 100%;
  background: url('bg/saigon-skyline.jpg') no-repeat center center fixed;
  background-size: 105%;
  background-position: 0% 50%;
  filter: blur(5px) brightness(0.80);
  animation: moveBackground 60s linear infinite;
}

@keyframes moveBackground {
  0% {
    background-position: 0% 50%;
    background-size: 105%;
  }

  50% {
    background-position: 80% 50%;
    background-size: 120%;
  }

  100% {
    background-position: 0% 50%;
    background-size: 105%;
  }
}
</style>
