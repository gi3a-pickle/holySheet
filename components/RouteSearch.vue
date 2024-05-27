<template>
    <input type="text" v-model="localQuery" @input="updateQuery" placeholder="Search" />
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update:query']);
const localQuery = ref('');

function updateQuery() {
    emit('update:query', localQuery.value);
}
</script>

<style>
input {
    padding: 10px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
}
</style>