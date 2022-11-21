<template>
    <div>
        <form class="container" @submit.prevent="requestDataById">
            <div class="container__box">
                <h2 class="subtitle">Aqui, fazemos uma requisição para um ID específico</h2>
                <label for="requisitionId">Digite aqui o ID desejado</label>
                <input class="box__input" type="number" name="requisitionId" required v-model="inputData">
                <my-button :buttonText="buttonString" @buttonClick="requestDataById"/>
            </div>
            <ul class="container__list">
                <p>ID's à disposição:</p>
                <li v-for="item in wholeList" :key="item.id">{{ item.id }}</li>
            </ul>
            <div class="container__messages">
                <transition name="messages">
                    <div v-if="isRequestOk" class="messages">
                        <p>Título: {{ dataFromRequest.title }}</p>
                        <p>Conteúdo: {{ dataFromRequest.content }}</p>
                    </div>
                    <span v-else-if="isRequestOk === false" class="warning">A requisição falhou ou seu ID pode ser inválido.</span>
                </transition>
            </div>
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
                if(response.status != 200){
                    console.log('A requisição falhou!')
                    this.isRequestOk = false
                    setTimeout(() => {
                        this.isRequestOk = undefined
                    }, 3000)
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
            .catch(err => {
                console.log('Houve um problema de conexão! ' + err)
                this.isRequestOk = false
                setTimeout(() => {
                    this.isRequestOk = undefined
                }, 3000)
                this.inputData = ''
                return
            } )
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
    @include text-font;

    .container__box{
        display: flex;
        flex-direction: column;

        .subtitle{
            @include subtitle-font;
        }

        label, input{
            margin: 10px 0 10px 0;
        }

        .box__input{
            width: 4rem;
        }
    }

    .container__list{
        margin: 10px 0 10px 0;
    }

    .container__messages{ 
        display: flex;
        flex-direction: column;
        justify-content: center;  
        height: 40px;
        width: 100%;
        
        .messages{
            height: 2rem;
        }

        .messages-enter-active, .messages-leave-active{
            opacity: 100;
            transition-property: all;
            transition-duration: 1.5s;
        }

        .messages-enter-to, .messages-leave-from{
            opacity: 100;
        }

        .messages-enter-from, .messages-leave-to{
            opacity: 0;
        }

        .warning{
            @include warning;
        }
    }    
}

</style>