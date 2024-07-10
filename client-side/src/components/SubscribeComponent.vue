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
          <div>Event Name:  {{ event.name }}</div>
          <div>Event Description:  {{ event.description }}</div>
          <div>Event Date:  {{ event.Date }}</div>
          <button @click="joinEvent(event)">Join Event</button>
        </li>
        
      </ul>

        <button @click="goToSubscribePage">Go Back to Subscribe Page</button>
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
          this.subscribed = true;
          console.log('Subscribed to', this.publisherName);
          console.log(response);
          
          var event = {
            name: response.data.name,
            description: response.data.description,
            Date: response.data.Date
          }

          this.events.push(event)
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
          { eventName: event.name,
            pubName: this.publisherName
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Joined event:', response.data);
        alert("Successfuly joiner the event")
        // Handle success message or navigate to joined event page
      } catch (error) {
        console.error('Error joining event:', error);
        alert('Error joining event');
      }
    },
    goToSubscribePage() {
      this.$router.push('/subscribe'); // Router ile /subscribe sayfasına yönlendirme
    },
  }};
  </script>
  
  <style>
  /* İstediğiniz şekilde stiller ekleyebilirsiniz */
  </style>
  