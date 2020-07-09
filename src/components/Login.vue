<template>
<div class="item">
  <div class="item-header">
    <h3>Вход</h3>
  </div>
  <div class="item-content">
    <form @submit.prevent="pressed">
      <div class="field-group">
        <label>Логин</label>
        <input type="text" placeholder="login" v-model="email" />
      </div>
      <div class="field-group">
        <label>Пароль</label>
        <input type="password" placeholder="password" v-model="password" />
      </div>
      <div class="field-group">
      <button>Login</button>
      </div>
    </form>
    <div class="error" v-if="error">{{error.message}}</div>
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
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          console.log(data);
          this.$router.replace({ name: "dashboard" });
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>

<style scoped>
div {
  color: inherit;
}

.error {
  color: red;
}

</style>