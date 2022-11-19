<template>
	<div>
		<header class="header-content">
			<h1 class="title">Como é feito um CRUD?</h1>
		</header>
		<get-whole-list :key="newObjectInList" @rerenderingTheList="reload" />
		<get-one-object/>
		<post-one-object @thereIsANewObject="reload"/>
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
			newObjectInList: 0
		}
	},
	methods:{
		reload(){
			this.newObjectInList++
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
