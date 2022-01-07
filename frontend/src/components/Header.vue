<template>

    <div class="header">
        <router-link to='/'>
        <h1>
            <img class ="header__img" src="/assets/img/groupomania-logo-header.png" alt="Groupomania logo">
        </h1>
        </router-link>

        <nav>
            <router-link to='/profile'>
                <div>Mon Profil</div>
            </router-link>
            <div id="disconnect-btn" @click = disconnect()>Se déconnecter</div>
        </nav>
    </div> 

</template>

<script>
export default {
    name: 'Header',

    methods: {
        disconnect(){
            localStorage.removeItem('user');
            location.href = "/";
        }
    }
}
</script>

<style scoped>
    .header{
        align-items: center;
        padding: 5px 40px 5px 40px;
        border-bottom: 5px solid red;
        box-shadow: 0px 1px 11px 1px rgba(0,0,0,0.3);
        display: flex;
        justify-content: space-between;
    }

    .header__img{
        height: auto;
        width: 200px;
    }

    nav{
        display: flex;
    }

    nav div{
        margin-left: 30px;
        font-weight: bold;
        cursor: pointer;
        transition-duration: .2s;
    }

    nav div:hover{
        color: rgb(255, 80, 80);
    }

    @media (max-width: 670px) {
        .header{
            flex-direction: column;
            padding: 30px 20px 20px 20px;
        }
    }
</style>