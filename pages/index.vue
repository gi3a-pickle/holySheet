<script setup>
import { ref } from 'vue';
import { allRows } from '@/composables/useSheet';
import { jsPDF } from 'jspdf';

const headings = ref(null);
const result = ref([]);
const { data } = await allRows();

headings.value = data.value.values[0];
result.value = [...data.value.values];
console.log(result);
result.value.splice(0, 1);

const generateReport = (row) => {
    const doc = new jsPDF();
    const startX = 10;
    let startY = 10;

    doc.setFontSize(12);
    doc.text('AKYL Statement Report', startX, startY);
    startY += 10;

    doc.text(`Date: ${new Date().toLocaleDateString()}`, startX, startY);
    startY += 10;

    doc.text('Report Data:', startX, startY);
    startY += 10;

    for (let i = 0; i < row.length; i++) {
        if (headings.value[i]) {
            doc.text(`${headings.value[i]}: ${row[i]}`, startX, startY);
            startY += 10;
        }
    }

    // Add more detailed information similarly
    doc.text('Additional Details:', startX, startY);
    startY += 10;
    doc.text('START DROP AMOUNT:', startX, startY);
    startY += 10;
    doc.text('5/14/2024 - $2,400.00', startX, startY);
    startY += 10;
    doc.text('5/16/2024 - $1,803.00', startX, startY);
    startY += 10;
    doc.text('5/18/2024 - $1,700.00', startX, startY);
    startY += 10;
    doc.text('5/21/2024 - $3,500.00', startX, startY);
    startY += 10;

    doc.text('Total: $9,403.00', startX, startY);
    startY += 10;

    // Continue to add other relevant sections as needed

    doc.save(`report_${row[0]}.pdf`);
};
</script>

<template>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th v-for="col in headings" :key="col" v-html="col"></th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="col in result" :key="col">
                    <td>{{ col[0] }}</td>
                    <td>{{ col[1] }}</td>
                    <td>{{ col[2] }}</td>
                    <td>{{ col[3] }}</td>
                    <td>{{ col[4] }}</td>
                    <td>{{ col[5] }}</td>
                    <td>{{ col[6] }}</td>
                    <td>{{ col[7] }}</td>
                    <td>
                        <button @click="generateReport(col)">Report</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
.container {
    display: flex;
    justify-content: center;
    font-family: sans-serif;
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

img {
    max-width: 100px;
    border-radius: 8px;
}
</style>
