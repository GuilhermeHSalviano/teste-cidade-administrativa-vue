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
export default {
    data(){
        return{
            wholeList: ''
        }
    },
    created(){
        fetch('http://142.93.251.239/api/v1/posts/')
        .then(response => response.json())
        .then(objectResponse => this.wholeList = objectResponse)
    }
}
</script>
<style scoped>
    
</style>