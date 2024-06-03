import { ref } from 'vue';
import * as XLSX from 'xlsx';

export function useFileHandler(driverName) {
    const headings = ref([]);
    const result = ref([]);
    const driverRoutes = ref([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

            // Debugging line: Print the whole worksheet data
            console.log("Worksheet Data:", worksheet);

            // Extract the header row to find the indexes of the relevant columns
            const headers = worksheet[1]; // Assuming the second row contains headers
            const cardDescriptionIndex = headers.indexOf('Card Description');
            const trxDateIndex = headers.indexOf('Trx Date');
            const fuelIndex = headers.indexOf('Fuel');

            // Debugging line: Print the indexes of the relevant columns
            console.log("Indexes - Card Description:", cardDescriptionIndex, "Trx Date:", trxDateIndex, "Fuel:", fuelIndex);

            // Extracting only the needed fields and filtering by driver name
            let relevantData = worksheet.slice(2).map(row => ({
                cardDescription: row[cardDescriptionIndex],
                trxDate: row[trxDateIndex],
                fuel: row[fuelIndex]
            })).filter(row => row.cardDescription && row.cardDescription.toLowerCase().includes(driverName.value.trim().toLowerCase()));

            // Debugging line: Print the filtered data before sorting
            console.log("Filtered Data Before Sorting:", relevantData);

            // Sort the filtered data by trxDate in ascending order
            relevantData = relevantData.sort((a, b) => new Date(a.trxDate) - new Date(b.trxDate));

            // Debugging line: Print the filtered and sorted data
            console.log("Filtered and Sorted Data:", relevantData);

            if (relevantData.length > 0) {
                headings.value = ['Card Description', 'Trx Date', 'Fuel'];
                result.value = relevantData.map(row => [row.cardDescription, row.trxDate, row.fuel]);
                driverRoutes.value = result.value;
            } else {
                console.warn("No relevant data found for the specified driver name.");
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return {
        headings,
        result,
        driverRoutes,
        handleFileUpload
    };
}