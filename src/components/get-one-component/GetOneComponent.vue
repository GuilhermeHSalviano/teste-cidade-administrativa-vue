<template>
     <form class="container" @submit.prevent="requestDataById">
        <h2>Aqui fazemos uma requisição para um ID específico</h2>
        <label for="requisitionId">Digite aqui o ID desejado</label>
        <input type="number" name="requisitionId" required v-model="inputData">
        <my-button :buttonText="buttonString" @buttonClick="requestDataById"/>
    </form>
    <div v-if="isRequestOk">
        <p>Título: {{ dataFromRequest.title }}</p>
        <p>Conteúdo: {{ dataFromRequest.content }}</p>
    </div>
    <div v-else-if="isRequestOk === false">
        <p>A requisição falhou. Digite um ID válido.</p>
    </div>
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
            inputData: '',
            isRequestOk: undefined
        }
    },
    methods:{
        requestDataById(){
            fetch(`http://142.93.251.239/api/v1/posts/${this.inputData}`)
            .then(response => {
                if(response.status === 404){
                    console.log('requisição falhou')
                    this.isRequestOk = false
                    return
                } else{
                    return response.json()
                }
            })
            .then(responseObject => {
                this.isRequestOk = true
                this.dataFromRequest = responseObject
                this.inputData = ''
            })
            .catch(err => console.log(err))
        }
    }
}
</script>
<style lang="scss" scoped>

</style>