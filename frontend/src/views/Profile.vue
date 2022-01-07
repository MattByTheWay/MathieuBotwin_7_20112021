<template>
    <div class="Profile">
        <LoginForm v-if="!connected"/>

        <Header v-if="connected"/>

        <UserProfile v-if="connected"/>
        <UserPosts v-if="connected"/>
        <!-- Permet a l'utilisateur de supprimer son compte-->
        <div class="UserProfile__delete" @click="deleteUser()">Supprimer le compte</div>
    </div>
</template>

<script>
import axios from 'axios';
import LoginForm from '@/components/LoginForm.vue';
import Header from '@/components/Header.vue';
import UserProfile from '@/components/UserProfile.vue';
import UserPosts from '@/components/UserPosts.vue';

export default {
    name: 'Profile',

    components: {
        LoginForm,
        Header,
        UserProfile,
        UserPosts
  },

  data() {
    return{
      connected: true
    };
  },

   created(){
    this.checkConnected()
  },

  methods: {
    
    deleteUser(){
      const userId = this.$user.userId;

      axios.delete(`${this.$apiUrl}/auth/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
          }
      )
      .then(localStorage.removeItem('user'))
      .then(location.href = "/");
    }

  },
    checkConnected(){
      if(localStorage.user !== undefined){
        this.connected = true;
        console.log('Utilisateur connecté !');
      }
      else if(localStorage.user == undefined){
        this.connected = false;
        console.log('Utilisateur non connecté !');
      }
    },
  }

</script>

<style scoped>
  .UserProfile__delete{
      color: white;
      margin-bottom: 30px;
      font-size: 24px;
      border-radius: 20px;
      padding: 8px;
      width: 300px;
      margin: 0 auto;
      font-weight: bold;
      background-color: red;
      cursor: pointer;
    }
</style>