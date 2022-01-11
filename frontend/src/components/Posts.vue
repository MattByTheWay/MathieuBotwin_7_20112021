<template>

    <div class="posts">
        <!-- Fait une boucle de création html avec les posts  -->
        <article class="post__container" v-for = "post in posts" :key="post.id">
            <router-link :to="{ name: 'Post', params: { id: post.id } }">
                <div class="post__header">
                    <span class="post__info">Posté le {{dateFormat(post.date)}} par {{post.prenom}} {{post.nom}}</span>
                    <!-- Vérifie si l'utilisateur a la possibilité de modifier le post  -->
                    <span class="post__modify" v-if="post.userId == $user.userId || $user.admin == 1">Modifier</span> 
                </div>  
                <h2 class="post__title">{{post.title}}</h2>
                <div class="post__content" v-html="characterLimit(post.content)"></div>
            </router-link>
        </article>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Posts',

    data(){
        return {
            posts: [],
            visible: false
        }
    },
    //agis une fois que nous somme dans le cycle de montage
    mounted() {
        if(localStorage.user != undefined){
            this.getAllPost();
        }

        //permet a la fonction d'être exporté
        this.$root.$on('Posts', () => {
            this.getAllPost();
        });
    },

    methods: {
        //fonction qui permet de recuperer tout les post depuis la db
        getAllPost(){
            axios.get(`${this.$apiUrl}/posts/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.posts = res.data;
            })
        },
        //permet de mettre en forme la character limit
        characterLimit(content){
            let text = content;
            const maxLength = 350;

            if(text.length > maxLength){
                return text.substring(0, maxLength - 3) + "...";
            }
            else{
                return text;
            }
        },
        //permet de mettre en forme la data
        dateFormat(date){
            const event = new Date(date);

            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

            return event.toLocaleDateString('fr-FR', options);
        }
    }
}
</script>

<style scoped>
    .posts{
        margin: 0 auto;
        padding: 20px;
        max-width: 800px;
    }

    .post__container{
        position: relative;
        padding: 20px 20px 20px 30px;
        margin-top: 30px;
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
        text-align: left;
         border-left: 5px solid red;
        border-right: 5px solid red;
        transition-duration: .1s;
    }

    .post__container:hover{
        box-shadow: 0px 0px 50px -7px rgba(0, 0, 0, 0.2);
    }

    .post__container h2{
        margin-top: 7px;
    }

    .post__header{
        display: flex;
        justify-content: space-between;
        color: rgb(0, 0, 0);
        font-size: .8rem;
    }

    .post__modify{
        color: rgb(219, 17, 17);
        font-size: 1rem;
        font-weight: bold;
    }

    .post__title{
        color: red;
    }

    .post__content{
        font-size: .9rem;
        word-break: break-all;
    }
</style>