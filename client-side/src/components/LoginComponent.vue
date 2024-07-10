<template>
    <div>
      <h2>Login Page</h2>
      <form @submit.prevent="login">
        <label>Email:</label>
        <input type="email" v-model="email" required>
        <label>Password:</label>
        <input type="password" v-model="password" required>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post(
            'http://localhost:3000/auth/login',
            {
              email: this.email,
              password: this.password
            }
          );

          console.log(response.data);
  
          if (response.data) {
            localStorage.setItem('jwtToken', response.data);
            this.$router.push('/subscribe'); // Yönlendirme işlemi
          } else {
            alert('Login failed. Please check your credentials.');
          }
        } catch (error) {
          console.error('Login error:', error);
          alert('An error occurred while logging in.');
        }
      }
    }
  };
  </script>
  
  <style>
  /* İstediğiniz şekilde stiller ekleyebilirsiniz */
  </style>
  