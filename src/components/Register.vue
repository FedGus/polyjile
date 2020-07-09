<template>
  <div class="item">
    <div class="item-header">
      <h3>Регистрация</h3>
    </div>
    <div class="item-content">
    <div class="error" v-if="error">{{error.message}}</div>
    <form @submit.prevent="pressed">
      <div class="field-group">
        <label>E-mail</label>
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="field-group">
        <label>Пароль</label>
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <div class="field-group">
      <button type="submit">Register</button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    pressed() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace({ name: "dashboard" });
        })
        .catch(error => (this.error = error));
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 18px;
}
</style>