<template>
    <button class="my-button" @click.self="clickButton">{{ buttonText }}</button>
</template>
<script>
export default {
    props: {
        buttonText:{
            type: String
        }
    },
    methods:{
        clickButton(){
            this.$emit('buttonClick')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/my-button-mixin.scss";

.my-button{
    @include my-button;
}
</style>