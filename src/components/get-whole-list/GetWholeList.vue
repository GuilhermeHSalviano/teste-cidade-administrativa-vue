<template>
    <section class="container">
        <h2>Esta é uma lista com todos os dados obtidos da API, onde nossa primeira requisição é feita:</h2>
        <ul class="api-list">
            <li v-for="item in wholeList" :key="item.id">
                <div>
                    <p>Título: {{ item.title }}</p>
                    <p>Conteúdo: {{ item.content }}</p>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
import{requestTheWholeListFromApi} from '../../functions/functions.js'

export default {
    data(){
        return{
            wholeList: ''
        }
    },
    async created(){
        this.wholeList = await requestTheWholeListFromApi()
        
    }
}
</script>
<style scoped>
    
</style>