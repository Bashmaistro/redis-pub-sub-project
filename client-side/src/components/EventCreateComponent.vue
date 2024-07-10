<!-- EventCreateComponent.vue -->
<template>
    <div>
      <h2>Create Event</h2>
      <form @submit.prevent="createEvent">
        <label>Name:</label>
        <input type="text" v-model="name" required>
        <label>Description:</label>
        <input type="text" v-model="description" required>
        <label>Date:</label>
        <input type="text" v-model="Date" required>
        <button type="submit">Create Event</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        description: '',
        Date: ''
      };
    },
    methods: {
      async createEvent() {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please login first');
          this.$router.push('/auth/login');
          return;
        }
  
        try {
          const response = await fetch('http://localhost:3000/event/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              name: this.name,
              description: this.description,
              Date: this.Date
            })
          });
          const data = await response.json();
          if (response.ok) {
            alert('Event created successfully!');
            this.name = '';
            this.description = '';
            this.date = '';
          } else {
            alert(`Failed to create event: ${data.message}`);
          }
        } catch (error) {
          console.error('Error creating event:', error);
          alert('An error occurred while creating the event.');
        }
      }
    }
  };
  </script>
  
  <style>
  /* İstediğiniz şekilde stiller ekleyebilirsiniz */
  </style>