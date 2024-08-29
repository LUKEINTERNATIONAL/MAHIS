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
        const parts = inputString.split("~");
        const idNumber = parts[1].slice(6, 14).trim();
        const dob = parts[9];
        const sex = parts[8].charAt(0);
        const lastName = parts[4];
        const firstName = parts[6];
        const middleName = parts[7];
        return {
            idNumber,
            sex,
            dob,
            firstName,
            middleName,
            lastName,
        };
    }
}
