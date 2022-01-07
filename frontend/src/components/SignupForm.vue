<template>
    <div class="signup__component">
        <form @submit.prevent = signup()>

            <img src="/assets/img/groupomania-logo.png" alt="Groupomania logo">

            <nav><router-link to="/">Se connecter</router-link> | <router-link to="/signup" class="active__router">S'inscrire</router-link></nav>

            <label for="signup__email">Adresse Email :</label>
            <input id="signup__email" type="email" placeholder="Adresse Email" required>

            <label for="signup__prenom">Prenom :</label>
            <input id="signup__prenom" type="text" placeholder="Prenom" required>

            <label for="signup__nom">Nom :</label>
            <input id="signup__nom" type="text" placeholder="Nom" required>
            

            <label for="signup__password">Mot de passe :</label>
            <input id="signup__password" type="password" placeholder="Mot de passe" required>

            <label for="signup__password--verification">Vérification du mot de passe :</label>
            <input id="signup__password--verification" type="password" placeholder="Vérifier mot de passe" required>

            <div class="error__message">{{message}}</div>

            <button id="signup__btn" type="submit">S'inscrire</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SignupForm',

    data() {
        return {
            message: "",
        };
    },

    methods: {
        signup(){
            const nom = document.getElementById("signup__nom").value;
            const prenom = document.getElementById("signup__prenom").value;
            const password = document.getElementById("signup__password").value;
            const passwordVerif = document.getElementById("signup__password--verification").value;
            const email = document.getElementById("signup__email").value;

            if(password === passwordVerif){
                axios.post(`${this.$apiUrl}/auth/signup`,
                    {
                        nom,
                        prenom,
                        password,
                        email
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then(res => {
                    if(res.status === 201) {
                        
                        this.$swal('Compte Crée avec succès');
                        location.href = '/';
                        
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        this.message = "Email deja utilisé";
                    }  
                });
            }
            else if( password != passwordVerif){
                this.message = "Vérifier le mot de passe";
            }
            
        }
    }
}
</script>

<style scoped>
 .signup__component{
        max-width: 400px;
        margin: 80px auto;
    }

    .signup__img{
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

    #signup__btn{
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

    #signup__btn:hover{
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