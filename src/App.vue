<template>
	<div>
		<header class="header-content">
			<h1 class="title">Exemplo de CRUD básico</h1>
		</header>
		<get-one-object :wholeList="list"/>
		<post-one-object @thereIsANewObject="reload"/>
		<get-whole-list :key="newObjectInList" @rerenderingTheList="reload" @emittingList="sendListToGetOneObjectComponent" />
	</div>
</template>
<script>
import GetWholeList from '../src/components/get-whole-list/GetWholeList.vue'
import GetOneObject from '../src/components/get-one-object/GetOneObject.vue'
import PostOneObject from '../src/components/post-one-object/PostOneObject.vue'

export default {
	components:{
		GetWholeList,
		GetOneObject,
		PostOneObject
	},
	data(){
		return{
			newObjectInList: 0,
			list: []
		}
	},
	methods:{
		reload(){
			this.newObjectInList++
		},
		sendListToGetOneObjectComponent(list){
			this.list = list
		}
	}
}
</script>

<style lang="scss" >
@import '@/assets/reset-mixin.scss';
@import '@/assets/general-styles.scss';
@include reset;

.header-content{
	align-items: center;
	display: flex;
	justify-content: center;
	height: 10vh;
	width: 100%;
	h1{
		@include title-font;
	}
}

</style>
