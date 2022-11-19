<template>
    <section class="container">
        <h2>Esta é uma lista com todos os dados obtidos da API, onde nossa primeira requisição é feita:</h2>
        <ul class="api-list">
            <li v-for="item in wholeList" :key="item.id">
                <div>
                    <p>Título: {{ item.title }}</p>
                    <p>Conteúdo: {{ item.content }}</p>
                    <my-button :buttonText="deleteButton" @buttonClick="deleteObjectFromApi(item.id)"/>
                    <my-button :buttonText="updateButton" @buttonClick="updateButtonClicked = item.id"/>
                    <div v-if="updateButtonClicked == item.id">
                        <label for="title">Digite aqui o novo título desejado</label>
                        <input type="text" name="title" required v-model="titleInput">
                        <label for="content">Digite aqui o novo conteúdo desejado</label>
                        <input type="text" name="content" required v-model="contentInput">
                        <my-button :buttonText="sendUpdatedDataButton" />
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
import{requestTheWholeListFromApi} from '../../functions/functions.js'
import Button from '../common-components/Button.vue'

export default {
    components:{
        'myButton': Button
    },
    data(){
        return{
            wholeList: '',
            deleteButton: 'Excluir',
            updateButton: 'Editar',
            updateButtonClicked: false,
            sendUpdatedDataButton: 'Enviar',

        }
    },
    async created(){
        this.wholeList = await requestTheWholeListFromApi()
        
    },
    methods:{
        async deleteObjectFromApi(id){
            const deleteObject = await fetch(`http://142.93.251.239/api/v1/posts/${id}`, {method: 'DELETE'})
            this.$forceUpdate()
            if(deleteObject == 200) console.log('deu certo')
        },
        updateDataFromApi(){
            
        }
    }
}
</script>
<style scoped>
    
</style>