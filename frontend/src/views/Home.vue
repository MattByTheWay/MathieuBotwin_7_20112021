<template>
  <div class="home">
    <!-- On importe nos Components selon la conditions de connection de l'utilisateur -->
    <LoginForm v-if="!connected"/>

    <Header v-if="connected"/>
    <Posts v-if="connected"/>
    <NewPost v-if="connected"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue';
import Posts from '@/components/Posts.vue';
import Header from '@/components/Header.vue';
import NewPost from '@/components/NewPost.vue';

export default {
  name: 'Home',

  components: {
    LoginForm,
    Posts,
    Header,
    NewPost
  },

  data() {
    return{
      connected: true
    };
  },
  //a l'étape de creation vérifie si l'utilisateur est deja connecté
  created(){
    this.checkConnected()
  },

  methods: {
    checkConnected(){
      if(localStorage.user !== undefined){
        this.connected = true;
        console.log('Utilisateur connecté !');
      }
      else if(localStorage.user == undefined){
        this.connected = false;
        console.log('Utilisateur non connecté !');
      }
    }
  }
}
</script>
