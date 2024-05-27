<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { allRows } from '@/composables/useSheet';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const route = useRoute();
const driverName = ref(route.params.name);
const headings = ref(null);
const result = ref([]);
const { data } = await allRows();

headings.value = data.value.values[0];
result.value = data.value.values.slice(1);

const driverRoutes = ref(result.value.filter(row => row[2] === driverName.value));

const startDate = ref('');
const endDate = ref('');

const filteredRoutes = ref([]);

const filterRoutesByDate = () => {
    if (startDate.value && endDate.value) {
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);
        filteredRoutes.value = driverRoutes.value.filter(row => {
            const date = new Date(row[0]);
            return date >= start && date <= end;
        });
    } else {
        filteredRoutes.value = driverRoutes.value;
    }
};

// Watch for changes in the date inputs
watch([startDate, endDate], filterRoutesByDate);

const generateReport = async () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const element = document.getElementById('report-content');
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 595.28; // A4 width in pt
    const pageHeight = 841.89; // A4 height in pt
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    doc.save(`report_${driverName.value}.pdf`);
};

// Initialize the filtered routes on mount
onMounted(() => {
    filterRoutesByDate();
});
</script>

<template>
    <div class="container">
        <h1>Driver: {{ driverName }}</h1>
        <div>
            <label for="start-date">Start Date: </label>
            <input type="date" id="start-date" v-model="startDate" />
            <label for="end-date">End Date: </label>
            <input type="date" id="end-date" v-model="endDate" />
        </div>
        <button @click="generateReport">Generate Report PDF</button>
        <div id="report-content">
            <img src="/logo.png" />
            <h3>UNUT SNACKS TRANSPORTATION</h3>
            <span>2302 Foster Ave, Wheeling, IL 60090, Phone: 800-369-9394</span>
            <div>
                <span>Settlement Code Number 19</span>
                <span>Truck Number 01</span>
                <span>Driver ID 01</span>
                <span>461 WINSLOW WAY LAKE IN THE HILLS, IL 60156</span>
                <span>{{ driverName }}</span>
            </div>
            <RouteList :headings="headings" :result="filteredRoutes" />

        </div>
    </div>
</template>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: sans-serif;
}

button {
    margin: 10px 0;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}

#report-content {
    margin-top: 20px;
}

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