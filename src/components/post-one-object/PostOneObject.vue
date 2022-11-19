<template>
    <div>
        <form @submit.prevent="sendNewobjectToApi" class="container">
            <h2 class="subtitle">Aqui, criamos um novo objeto e enviamos à API.</h2>
            <label for="title">Digite aqui o título desejado</label>
            <input type="text" name="title" required v-model="titleInput">
            <label for="content">Digite aqui o conteúdo desejado</label>
            <input type="text" name="content" required v-model="contentInput">
            <my-button :buttonText="buttonString" @buttonClick="sendNewObjectToApi"/>
            <p v-if="isRequestOk">Dados enviados com sucesso!</p>
            <p v-else-if="isRequestOk == false">Ocorreu um erro. Seus dados não foram postados!</p>
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
        async sendNewObjectToApi(){
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
                    setInterval(() => {
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

    .subtitle{
        @include subtitle-font;
    }

    @include text-font;
}
</style>