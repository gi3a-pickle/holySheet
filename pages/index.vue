<script setup>
import { ref } from 'vue';
import { allRows } from '@/composables/useSheet';

const headings = ref(null);
const result = ref([]);
const { data } = await allRows();

headings.value = data.value.values[0];
result.value = [...data.value.values];

result.value.splice(0, 1);
</script>

<template>
    <table>
        <thead>
            <tr>
                <th v-for="col in headings" :key="col" v-html="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="col in result" :key="col">
                <td>{{ col[0] }}</td>
                <td>{{ col[1] }}</td>
                <td>
                    <NuxtLink :to="`/driver/${col[2]}`">{{ col[2] }}</NuxtLink>
                </td>

                <td>{{ col[3] }}</td>
                <td>{{ col[4] }}</td>
                <td>{{ col[5] }}</td>
                <td>{{ col[6] }}</td>
                <td>{{ col[7] }}</td>
            </tr>
        </tbody>
    </table>
</template>
<style>
.container {}
</style>