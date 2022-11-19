<template>
    <section class="container">
        <h2 class="subtitle">Esta é uma lista com todos os dados obtidos da API. A cada mudança da API, a lista é automaticamente atualizada</h2>
        <ul class="api-list">
            <li v-for="item in wholeList" :key="item.id" class="api-list__item">
                <div :key="rerenderElement" class="item__content">
                    <p>Título: {{ item.title }}</p>
                    <p>Conteúdo: {{ item.content }}</p>
                    <my-button :buttonText="deleteButton" @buttonClick="deleteObjectFromApi(item.id)"/>
                    <my-button :buttonText="updateButton" @buttonClick="updateButtonClicked = item.id"/>
                    <div v-if="updateButtonClicked == item.id">
                        <label for="title">Digite aqui o novo título desejado</label>
                        <input type="text" name="title" required v-model="newTitleInput">
                        <label for="content">Digite aqui o novo conteúdo desejado</label>
                        <input type="text" name="content" required v-model="newContentInput">
                        <my-button :buttonText="sendUpdatedDataButton" @buttonClick="sendUpdatedDataToApi(item.id)"/>
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
            newTitleInput: '',
            newContentInput:''

        }
    },
    async created(){
        this.wholeList = await requestTheWholeListFromApi()
        this.$emit('emittingList', this.wholeList)
        
    },
    methods:{
        async deleteObjectFromApi(id){
            const deleteObject = await fetch(`http://142.93.251.239/api/v1/posts/${id}`, {method: 'DELETE'})
            if(deleteObject.status == 204){
                console.log('A requisição foi um sucesso')
                this.$emit('rerenderingTheList')
            } 
        },
        async sendUpdatedDataToApi(id){
            const updateData = await fetch(`http://142.93.251.239/api/v1/posts/${id}`, {
                method: 'PUT',
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: this.newTitleInput,
                    content: this.newContentInput
                })
            })
            if(updateData.status == 200) this.$emit('rerenderingTheList')
        }
    }
}
</script>
<style scoped lang="scss">
@import '@/assets/general-styles.scss';

    .container{
        @include blocks-of-requisitions;
        .subtitle{
            @include subtitle-font;
        }

        .api-list{
            display: flex;
            flex-wrap: wrap;
            font-family: 'Open Sans', sans-serif;
            margin: 1rem 0 1rem 0;

            .api-list__item{
                display: flex;
                margin: 1rem 0 1rem 0;
                width: 100%;

                .item__content{
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }

    
</style>