<template>
   <!-- Bouton permettant de creer le nouveau post en ouvrant un editeur de texte dans une fenetre en superposition-->
  <div class="newPost">
      <div class="newPost__create--btn" @click="visible = true">Ajouter un nouveau post</div>

    <transition name="fade">
      <div class="overlay" v-if="visible">
          <div class="form__wrapper">
            
            <form class="newPost__form" @submit.prevent="sendNewPost()">

                <label for="newPost__title">Titre</label>
                <input id="newPost__title" type="text" placeholder="Titre de votre publication" required>

                <label for="newPost__content">Contenu</label>
                <!-- code pour utiliser TinyMCE -->
                <editor
                    apiKey="g2t6107lmpvywz34zl2etz8ejsv16uh27aso90hoy0ixqghq"
                    v-model="content"
                    :init="{
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link',
                        'searchreplace visualblocks code fullscreen',
                        'print preview anchor insertdatetime media',
                        'paste code help wordcount table'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent | help'
                    }"
                >
                    <textarea id="newPost__content" placeholder="Contenu de la Publication"></textarea>
                </editor>
                

                <button id="newPost__btn" type="submit" >Publier</button>
                <span class="form__close"  @click="visible = false">Fermer</span>
            </form>
          </div>
      </div>
    </transition>

  </div>
</template>

<script>

import axios from 'axios';
import Editor from '@tinymce/tinymce-vue'


export default {
    name: 'NewPost',

    components: {
      editor: Editor
    },

    data(){
        return{
            visible: false,
            content: '',
        }
    },

    methods: {
        //fonction pour creer le nouveau post et l'envoyer dans la DB
        sendNewPost(){
            const title = document.getElementById("newPost__title").value;
            const content = this.content;

            console.log(content);

            axios.post(`${this.$apiUrl}/posts/`,
                    {
                        userId: this.$user.userId,
                        title,
                        content
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.$token}`
                        }
                    }
                )
                .catch((error) => {
                    if (error.response.status === 400) {
                        this.$swal('Une Erreur est survenue, les caractere speciaux sont interdit');
                    }  
                })

                .then( this.visible = false)
                .then(this.$root.$emit('Posts'));
        }
    }
}
</script>

<style scoped> 

    .newPost{
        padding: 10px 10px 0px 10px ;   
    }

    .newPost__create--btn{
        margin: 30px auto;
        padding: 10px;
        border-radius: 30px;
        background-color: rgb(255, 34, 34);
        color: white;
        max-width: 700px;
        min-width: 300px;
        font-size: 1.5rem;
        transition-duration: 0.2s;
        cursor: pointer;
    }

    .newPost__create--btn:hover{
        transform: scale(1.02);
    }

    .overlay{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(31, 30, 30, 0.678);
        z-index: 1;
    }

    .form__wrapper{
        box-sizing: border-box;
        background-color: white;
        display: flex;
        flex-direction: column;
        padding: 5%;
        width: 800px;
        height: 80%;
        border-radius: 30px;
    }

    .form__close{
        background-color: red;
        color: white;
        margin-top: 8%;
        padding: 3%;
        cursor: pointer;
        border-radius: 10px;
        font-weight: bold;
        font-size: 1rem;
        align-self: flex-end;
    }

    .newPost__form{
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    form input{
        font-size: 1.05rem;
        padding: 10px;
        margin-bottom: 15px;
        text-align: center;
        text-align: left;
        margin-bottom: 30px;    
    }

    form label{
        color: red;
        font-weight: bold;
        font-size: 1.3rem;
        margin-bottom: 10px;
    }

    #newPost__content{
        height: 200px;
        width: calc(100% - 20px);
        padding: 10px;
        resize: none;
        overflow-y: scroll;
    }

    #newPost__btn{
        margin-top: 20px;
        padding: 10px;
        font-size: 1.1rem;
        color: white;
        background-color: rgb(43, 42, 42);
        border: none;
        border-radius: 10px;
        transition-duration: 0.2s;
        cursor: pointer;
    }



    /*Code pour gerer la transition */
    .fade-enter__active, .fade-leave__active {
    transition: opacity .8s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }
</style>