<template>

    <div class="UserPost">
        <!-- Fait une boucle et genere le code selon les posts lié a l'id de l'utilisateur -->
        <div  v-for= "post in posts" :key="post.id">

            <router-link :to="{ name: 'Post', params: { id: post.id } }">

                <div class="UserPost__content">
                  <span class="UserPost__title"> {{post.title}} </span>
                  <span class="UserPost__info"> Posté le {{dateFormat(post.date)}} </span>
                </div> 

            </router-link>
        </div>

    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'UserPosts',

    data(){
        return{
            posts: []
        }
    },
    // agis une fois monted dans le cycle et permet d'utiliser la fonction pour recuperer les post lié a l'utilisateur
    mounted(){
        this.getUserPosts();
    },

    methods: {

        dateFormat(date){
            const event = new Date(date);

            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

            return event.toLocaleDateString('fr-FR', options);
        },

        getUserPosts(){
            const userId = this.$user.userId;
            
            axios.get(`${this.$apiUrl}/posts/user${userId}/posts`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => this.posts = res.data)
        }
    }

}
</script>

<style scoped>
    .UserPost{
        margin: 30px auto;
        max-width: 800px;
    }

    .UserPost__content{
        padding: 20px 20px 20px 30px;
        border-left: 5px solid red;
        border-right: 5px solid red;
        margin-top: 20px;
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
        text-align: left;
        transition-duration: .1s;
    }

    .UserPost__content:hover{
        box-shadow: 0px 0px 50px -7px rgba(0, 0, 0, 0.2);
    }

    .UserPost__title {
        font-weight: bold;
    }

    .UserPost__info {
        display: flex;
        margin-top: 2%;
    }
</style>