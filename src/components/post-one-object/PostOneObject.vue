<template>
    <div>
        <form @submit.prevent="sendNewObjectToApi" class="container">
            <h2 class="subtitle">Aqui, criamos um novo objeto e enviamos à API.</h2>
            <label for="title">Digite aqui o título desejado</label>
            <input type="text" name="title" required v-model="titleInput">
            <label for="content">Digite aqui o conteúdo desejado</label>
            <input type="text" name="content" required v-model="contentInput">
            <my-button :buttonText="buttonString" @buttonClick="sendNewObjectToApi"/>
            <transition name="messages">
                <p v-if="isRequestOk" class="successful-message">Dados enviados com sucesso!</p>
                <p v-else-if="isRequestOk == false" class="warning">Ocorreu um erro. Seus dados não foram postados!</p>
            </transition>
        </form>
    </div>
</template>
<script>
import Button from '../common-components/Button.vue'

export default {
    components:{
        myButton: Button
    },
    data(){
        return{
            buttonString: 'Enviar objeto',
            titleInput: '',
            contentInput:'',
			isRequestOk: undefined
        }
    },
    methods:{
        sendNewObjectToApi(){
			fetch(`http://142.93.251.239/api/v1/posts/`, {
				method: 'POST',
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					title: this.titleInput,
					content: this.contentInput
				})
			})
			.then(response => {
				if(response.status == 200){
					this.isRequestOk = true
                    setInterval(() => {
                        this.isRequestOk = undefined
                    }, 3000)
					this.$emit('thereIsANewObject')
				} else{
					this.isRequestOk = false
                    setTimeout(() => {
                        this.isRequestOk = undefined
                    }, 3000)
				}
			})
            this.titleInput = ''
            this.contentInput = ''
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/general-styles.scss";

.container{
    @include blocks-of-requisitions;
    display: flex;
    flex-direction: column;
    height: 17rem;
    justify-content: flex-start;

    .subtitle{
        @include subtitle-font;
    }

    @include text-font;

    label, input, my-button{
        margin: 10px 0 10px 0;
    }

    input{
        width: 15rem;
    }

    .warning{
        @include warning;
        height: 1rem;
        white-space: nowrap;
        width: min-content;        
    }

    .successful-message{
        @include successful-message;
        height: 1rem;
        white-space: nowrap;
        width: min-content;
    }

    .messages{
        height: 1rem;
    }

    .messages-enter-active, .messages-leave-active{
        height: 1rem;
        opacity: 100;
        transition-property: opacity;
        transition-duration: 1.5s;
    }

    .messages-enter-to, .messages-leave-from{
        height: 1rem;
        opacity: 100;
    }

    .messages-enter-from, .messages-leave-to{
        opacity: 0;
    }
}
</style>