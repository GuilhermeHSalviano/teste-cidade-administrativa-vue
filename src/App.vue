<template>
	<div>
		<header class="header-content">
			<h1 class="title">Como é feito um CRUD?</h1>
		</header>
		<get-whole-list/>
		<get-one-component/>
	</div>
</template>
<script>
import GetWholeList from '../src/components/get-whole-list/GetWholeList.vue'
import GetOneComponent from '../src/components/get-one-component/GetOneComponent.vue'

export default {
	components:{
		GetWholeList,
		GetOneComponent
	}
}
</script>

<style lang="scss" >
@import '@/assets/reset-mixin.scss';
@include reset;

.header-content{
	height: 30vh;
	text-align: center;
	width: 100%;

	
}

</style>
