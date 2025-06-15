<template>
	<v-app>
		<NavBar />

		<v-main>
			<slot />
		</v-main>

		<AppFooter />
	</v-app>
</template>
<script setup lang="ts">
import NavBar from '~/components/common/NavBar.vue';
import AppFooter from '~/components/common/AppFooter.vue';

</script>
