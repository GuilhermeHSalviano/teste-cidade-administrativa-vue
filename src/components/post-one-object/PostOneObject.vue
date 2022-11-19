<template>
    <form @submit.prevent="sendNewObjectToApi">
        <h2>Aqui, criamos um novo objeto e enviamos à API.</h2>
        <label for="title">Digite aqui o título desejado</label>
        <input type="text" name="title" required v-model="titleInput">
        <label for="content">Digite aqui o conteúdo desejado</label>
        <input type="text" name="content" required v-model="contentInput">
        <my-button :buttonText="buttonString" @buttonClick="sendNewObjectToApi" />
    </form>
</template>
<script>
import Button from '../common-components/Button.vue'

async function howManyItensInApi(){
    const response = await fetch('http://142.93.251.239/api/v1/posts/')
    const responseObject = await response.json()
    return responseObject.length

}

export default {
    components:{
        myButton: Button
    },
    data(){
        return{
            buttonString: 'Enviar objeto',
            titleInput: '',
            contentInput:''
        }
    },
    methods:{
        async sendNewObjectToApi(){
           const teste = await howManyItensInApi()
           console.log(teste)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>