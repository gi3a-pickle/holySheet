<template>
    <table>
        <thead>
            <tr>
                <th v-for="col in headings" :key="col" v-html="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in result" :key="index">
                <td v-for="cell in row" :key="cell">{{ cell }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    headings: {
        type: Array,
        required: true
    },
    result: {
        type: Array,
        required: true
    }
});
</script>