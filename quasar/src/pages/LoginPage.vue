<template>
  <q-page class="container">
    <div class="q-my-md">
      <p class="text-h5 text-center">Premium Skins 10% off</p>
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-4" v-for="(card, index) in cardsAmount" :key="index">
        <q-card class="my-card" bordered style="border-radius: 15px">
          <q-img src="https://www.pcgamesn.com/wp-content/sites/pcgamesn/2024/01/league-of-legends-lol-yasuo-skin-old-forseen-season-14.jpg" />
          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="place"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                Yasua Old Master
              </div>
              <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                <q-icon name="place" />
                250 ft
              </div>
            </div>

            <q-rating v-model="stars" :max="5" size="32px" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              10 $・ League of Legends
            </div>
            <div class="text-caption text-grey">
              Old man Yasuo never fails to kill
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat color="red">
              Order
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div style="margin: 2rem;padding:2rem;background: #eee;box-shadow:5px 5px 20px 5px black;border-radius:25px;margin-bottom:5rem">
      <div class="row q-col-gutter-md">
        <div class="col-12 text-center">
          <h1>welcome</h1>
          <p class="text-body1">Please Login or Signup</p>
        </div>
        <div class="col-12">
        <q-input outlined v-model="email" label="Email"/>
        </div>
        <div class="col-12">
          <q-input outlined v-model="password" label="password" />
        </div>
        <div class="col-12 text-center">
          {{ email }}
          <q-btn @click="login(email, password)" color="teal">
            <q-icon left size="3em" name="map" />
            <div>Login</div>
          </q-btn>
        </div>
        <div class="col-7 text-right">
          <q-btn color="primary" label="Sign up" />
        </div>
        <div class="col-5">
          <a href="#">Forgot password?</a>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default {
  name: 'IndexPage',
  data() {
    return {
      cardsAmount: 3,
      email: "",
      password: ""
    }
  },
  methods: {
    login(email, password) {
      console.log(email)
      alert('login', email, password)
      console.log('login', email, password)
    }
  }
}
</script>
