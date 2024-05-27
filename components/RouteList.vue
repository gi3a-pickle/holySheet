<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    headings: Array,
    result: Array
});
</script>

<template>
    <table>
        <thead>
            <tr>
                <th v-for="col in headings" :key="col" v-html="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in result" :key="index">
                <td>{{ row[0] }}</td>
                <td>{{ row[1] }}</td>
                <td>
                    <NuxtLink :to="`/driver/${row[2]}`">{{ row[2] }}</NuxtLink>
                </td>
                <td>{{ row[3] }}</td>
                <td>{{ row[4] }}</td>
                <td>{{ row[5] }}</td>
                <td>{{ row[6] }}</td>
                <td>{{ row[7] }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style>
table {
    border-collapse: collapse;
}

thead {
    background: #f0f0f0;
    text-transform: uppercase;
}

tr {
    border-bottom: 1px solid #444;
}

th,
td {
    padding: 4px 8px;
    border-left: 1px solid #444;
    border-right: 1px solid #444;
}
</style>
