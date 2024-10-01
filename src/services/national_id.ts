import { ScannerService } from "@/services/scanner_service";

export async function scannedData() {
    const scannerService = new ScannerService();

    try {
        const barcodes = await scannerService.startScan(3.6);
        if (barcodes.length > 0) {
            return barcodes;
        } else {
            console.log("No barcodes scanned.");
        }
    } catch (error) {
        console.error("Error during scanning:", error);
    } finally {
        scannerService.clearBarcodes();
    }
}
export async function extractDetails(inputString: string) {
    {
        try {
            const parts = inputString.split("~");
            const idNumber = parts[5];
            const dob = parts[9];
            const sex = parts[8].charAt(0);
            const lastName = parts[4];
            const nameParts = parts[6].split(",");
            const firstName = nameParts[0].trim(); // First name is the first part
            const middleName = nameParts[1] ? nameParts[1].trim() : "";
            return {
                idNumber,
                sex,
                dob,
                firstName,
                middleName,
                lastName,
            };
        } catch (error) {
            return "";
        }
    }
}
