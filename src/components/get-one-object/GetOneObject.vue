<template>
    <div>
        <form class="container" @submit.prevent="requestDataById">
            <h2 class="subtitle">Aqui, fazemos uma requisição para um ID específico</h2>
            <label for="requisitionId">Digite aqui o ID desejado</label>
            <input type="number" name="requisitionId" required v-model="inputData">
            <my-button :buttonText="buttonString" @buttonClick="requestDataById"/>
            <ul>
                <p>ID's à disposição:</p>
                <li v-for="item in wholeList" :key="item.id">{{ item.id }}</li>
            </ul>
            <div v-if="isRequestOk">
                <p>Título: {{ dataFromRequest.title }}</p>
                <p>Conteúdo: {{ dataFromRequest.content }}</p>
            </div>
            <span v-else-if="isRequestOk === false">A requisição falhou. Digite um ID válido</span>
        </form>
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
            if(this.inputData == '') return
            
            fetch(`http://142.93.251.239/api/v1/posts/${this.inputData}`)
            .then(response => {
                if(response.status === 404){
                    console.log('A requisição falhou!')
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
            .catch(err => console.log('Houve um problema de conexão!' + err))
        }
    },
    props:{
        wholeList:[]
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/general-styles.scss";

.container{
    @include blocks-of-requisitions;

    .subtitle{
        @include subtitle-font;
    }

    @include text-font;
}

</style>