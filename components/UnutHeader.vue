<template>
    <img src="@/public/logo.png" />
    <h3>UNUT SNACKS TRANSPORTATION</h3>
    <span>2302 Foster Ave, Wheeling, IL 60090, Phone: 800-369-9394</span>
    <div>
        <span>Settlement Code Number 19</span>
        <span>Truck Number 01</span>
        <span>Driver ID 01</span>
        <span>461 WINSLOW WAY LAKE IN THE HILLS, IL 60156</span>
        <span>{{ driverName }}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    driverName: String
});
</script>
