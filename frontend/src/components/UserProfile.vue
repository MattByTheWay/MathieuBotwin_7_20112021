<template>

    <div class="UserProfile">
        <div class="UserProfile__info">
            <span class="UserProfile__name">{{this.$user.nom}}</span> <span>{{this.$user.prenom}}</span>
        </div>

        <h3>Vos posts :</h3>
    </div>

</template>

<script>
export default {
    name: 'UserProfile',

  methods: {
  }
}
</script>

<style scoped>

    .UserProfile__name {
        margin-right: 1%;
    }

    .UserProfile__info{
        margin: 50px auto;
        max-width: 800px;
    }

    .UserProfile__info span {
        font-size: 2rem;
    }

   
</style>