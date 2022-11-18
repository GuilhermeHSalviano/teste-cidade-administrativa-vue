<template>
     <form class="container" @submit.prevent="requestDataById">
        <h2>Aqui fazemos uma requisição para um ID específico</h2>
        <label for="requisitionId">Digite aqui o ID desejado</label>
        <input type="number" name="requisitionId" required v-model="inputData">
        <my-button :buttonText="buttonString" @buttonClick="requestDataById"/>
    </form>
</template>
<script>
import Button from "../common-components/Button.vue"
export default {
    components:{
         myButton: Button
    },
    data(){
        return{
            buttonString: 'Buscar pelo ID',
            dataFromRequest: '',
            inputData: ''
        }
    },
    methods:{
        requestDataById(event){
            event.preventDefault()

            fetch(`http://142.93.251.239/api/v1/posts/${this.inputData}`)
            .then(response => {
                if(!response.ok){
                    console.log('requisição falhou')
                } else{
                    return response.json()
                }
            })
            .then(responseObject => {
                this.dataFromRequest = responseObject
                this.inputData = ''
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>