<script setup>
import { ref, computed } from 'vue';
import { allRows } from '@/composables/useSheet';
import RouteList from '@/components/RouteList.vue';
import RouteSearch from '@/components/RouteSearch.vue';

const headings = ref(null);
const result = ref([]);
const { data } = await allRows();

headings.value = data.value.values[0];
result.value = [...data.value.values];
result.value.splice(0, 1);

// Search Field
const searchQuery = ref('');
const filteredRoutes = computed(() => {
    return result.value.filter((item) =>
        item.some((field) =>
            field.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    );
});
</script>

<template>
    <div class="page">
        <RouteSearch @update:query="searchQuery = $event" />
        <RouteList :headings="headings" :result="filteredRoutes" />
    </div>
</template>

<style>
.container {}
</style>
