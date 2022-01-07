<template>
    <div class="login__component">
        
        <img class="login__img" src="/assets/img/groupomania-logo.png" alt="Groupomania-logo">

        <nav><router-link to="/" class="active__router">Connexion</router-link> | <router-link to="/signup">S'inscrire</router-link></nav>
        <!-- Appelle la fonction login a la submission du formulaire-->
        <form @submit.prevent = login()>

            <label for="login__email">Adresse Email :</label>
            <input id="login__email" type="text" placeholder="Adresse Email" required>
            
            <label for="login__password">Mot de passe :</label>
            <input id="login__password" type="password" placeholder="Mot de passe" required>

            <div class="error__message">{{message}}</div>

            <button id="login__btn" type="submit">Connexion</button>

        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginForm',

    data() {
        return {
            message: "",
        };
    },

    methods: {

        login(){
            const email = document.getElementById("login__email").value;
            const password = document.getElementById("login__password").value;

            axios.post(`${this.$apiUrl}/auth/login`,
                {
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                // permet a firefox de passer outre le cache
                location.reload();
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    this.message = "Utilisateur non reconnu, veuillez créer un compte ou vérifier votre saisie";
                }
                if (error.response.status === 401) {
                    this.message = "mot de passe invalide";
                }
                if (error.response.status === 500) {
                    this.message = "Erreur serveur, veuillez retenter plus tard";
                }
            });
        }
    }
}
</script>

<style scoped>
    .login__component{
        max-width: 400px;
        margin: 80px auto;
    }

    .login__img{
        width: 100%;
    }

    nav{
        font-size: 1rem;
        margin: 20px;
    }

    .active__router{
        color: rgb(255, 113, 113);
        font-weight: bold;
    }

    form{
        display: flex;
        flex-direction: column;
    }

    form label{
        color: rgba(0, 0, 0, .5);
        margin: 10px;
        
    }

    form input{
        font-size: 1.05rem;
        padding: 10px;
        margin-bottom: 15px;
        text-align: center;
    }

    #login__btn{
        padding: 10px;
        color: white;
        background-color: rgb(43, 42, 42);
        width: 50%;
        margin: 0 auto;
        text-align: center;
        border-radius: 10px;
        transition-duration: 0.3s;
        cursor: pointer;
    }

    #login__btn:hover{
        transform: scale(1.025);
    }

    .error__message{
        background-color: rgba(255, 43, 43, 0.582);
        border-radius: 10px;
        margin-bottom: 2%;
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