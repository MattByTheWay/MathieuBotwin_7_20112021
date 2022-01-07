<template>
    <div class="onePost">
        <div class="onePost__wrapper" v-if="!modify">
            <h2 class="onePost__title">{{this.post.title}}</h2>
            <h3 class="onePost__info">Posté le {{dateFormat(post.date)}}</h3>
            <div class="onePost__content" v-html="this.post.content"></div>
        </div>

        <div class="modify__wrapper" v-if="modify">
            <label for="modify__title">Modifier le titre :</label>
            <input type="text" id="modify__title" v-model="this.post.title">

            <label for="modify__content">Modifier le contenu :</label>
            <editor 
                :initialValue="this.post.content"
                apiKey="g2t6107lmpvywz34zl2etz8ejsv16uh27aso90hoy0ixqghq"
                v-model="modifiedContent"
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
                <textarea id="modify__content" v-model="this.post.content"></textarea>
            </editor>
        </div>
        <!-- Les differentes conditions d'autorisation et boutton-->
        <button v-if="authorized && !modify" @click="modify = true">Modifier/Supprimer</button>
        <button v-if="modify" @click="modify = false">Annuler</button>
        <button v-if="modify" @click="modifyOnePost()">Publier les modifications</button>
        <button v-if="modify" class="delete__btn" @click="deleteOnePost()">Supprimer le post</button>
    </div>
    
</template>

<script>
import axios from 'axios';
import Editor from '@tinymce/tinymce-vue';

export default {
    name: 'OnePost',

    components: {
      editor: Editor
    },

    data(){
        return{
            modifiedContent: '',
            post: [],
            authorized: false,
            modify: false
        }
    },

    mounted(){
        this.getOnePost();
    },

    methods: {
        dateFormat(date){
            const event = new Date(date);

            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

            return event.toLocaleDateString('fr-FR', options);
        },
        getOnePost(){
            const postId = this.$route.params.id;
            
            axios.get(`${this.$apiUrl}/posts/${postId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.post = res.data[0];

                if(this.$user.userId === this.post.userId || this.$user.admin == 1){
                    this.authorized = true;
                 }

                else{
                    this.authorized = false;
                }
            })
        },

        deleteOnePost(){
            const postId = this.$route.params.id;
            
            axios.delete(`${this.$apiUrl}/posts/${postId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(location.href = "/");
        },

        modifyOnePost(){
            const postId = this.$route.params.id;
            const title = document.querySelector('#modify__title').value;
            const content = this.modifiedContent;
            
            axios.put(`${this.$apiUrl}/posts/${postId}`,
                {
                    postId,
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
            .then(location.href = "/");
        },
    }
}
</script>

<style scoped>
    /* CSS de la selection de post */
    .onePost__wrapper{
        margin: 50px auto 30px auto;
        padding: 30px;
        max-width: 800px;
        text-align: left;
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
         border-left: 5px solid red;
        border-right: 5px solid red;
    }

    .onePost__title {
        margin: 0;
        color: red;
        font-size: 2rem;
    }

    .onePost__content{
        margin-top: 20px;
    }

    /*CSS de la boite de modif */

    .modify__wrapper{
        display: flex;
        flex-direction: column;
        margin: 50px auto;
        padding: 30px;
        max-width: 800px;
        text-align: left;
        box-shadow: 0px 0px 50px -7px rgba(0,0,0,0.1);
        border-bottom: solid red 5px;
    }

    #modify__title {
        margin: 0;
        margin-bottom: 20px;
        color: red;
        font-size: 2rem;
    }

    #modify__content{
        margin-top: 20px;
        height: 200px;
        width: calc(100% - 22px);
        padding: 10px;
        resize: none;
        overflow-y: scroll;
    }

    .onePost button{
        margin-top: 20px;
        padding: 10px;
        font-size: 1.1rem;
        color: white;
        background-color: rgb(43, 42, 42);
        border: none;
        border-radius: 10px;
        transition-duration: 0.2s;
        cursor: pointer;
        margin: 0px 20px 50px 20px;
    }

    .delete__btn{
        background-color: red !important;
    }

    label{
        font-size: 0.8rem;
        font-weight: bold;
        color: rgb(109, 109, 109);
        text-align: left;
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }
</style>