<template>
    <div>
      <h2>Subscribe Page</h2>
      <div v-if="!subscribed">
        <label>Publisher Name:</label>
        <input type="text" v-model="publisherName" required>
        <button @click="subscribeToPublisher">Subscribe</button>
      </div>
      <div v-if="subscribed">
        <h3>Listening to: {{ publisherName }}</h3>
        <ul>
          <li v-for="(event, index) in events" :key="index">
            <div>{{ event.name }}</div>
            <div>{{ event.description }}</div>
            <button @click="joinEvent(event)">Join Event</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        publisherName: '',
        subscribed: false,
        events: [],
      };
    },
    methods: {
      async subscribeToPublisher() {
        if (!this.publisherName) {
          alert('Please enter a publisher name');
          return;
        }
        
        const token = localStorage.getItem('jwtToken'); // JWT tokeni localStorage'dan al
  
        try {
          const response = await axios.post(
            'http://localhost:3000/event/subscribe',
            { publisher: this.publisherName },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.events = response.data.events;
          this.subscribed = true;
        } catch (error) {
          console.error('Error subscribing to publisher:', error);
          alert('Error subscribing to publisher');
        }
      },
      async joinEvent(event) {
        const token = localStorage.getItem('jwtToken'); // JWT tokeni localStorage'dan al
  
        try {
          const response = await axios.post(
            'http://localhost:3000/event/join',
            { eventId: event.id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log('Joined event:', response.data);
          // Handle success message or navigate to joined event page
        } catch (error) {
          console.error('Error joining event:', error);
          alert('Error joining event');
        }
      },
    },
  };
  </script>
  
  <style>
  /* İstediğiniz şekilde stiller ekleyebilirsiniz */
  </style>
  