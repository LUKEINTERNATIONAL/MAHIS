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
        if (parts[0] == "03") {
            try {
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
        } else if (parts[0] == "04") {
            try {
                const idNumber = parts[1];
                const birthID = parts[2];
                const dob = parts[4];
                const sex = parts[5];
                const nameParts = parts[3].split(" ");
                const MotherNameParts = parts[7].split(" ");
                const FatherNameParts = parts[9].split(" ");

                let firstName = "";
                let lastName = "";
                let middleName = "";

                let MotherFirstName = "";
                let MotherLastName = "";
                let MotherMiddleName = "";

                let FatherFirstName = "";
                let FatherLastName = "";
                let FatherMiddleName = "";
                if (nameParts.length > 3) {
                    firstName = nameParts[0];
                    lastName = nameParts[2];
                    middleName = nameParts[1];
                } else {
                    firstName = nameParts[0];
                    lastName = nameParts[1];
                }

                if (MotherNameParts.length > 3) {
                    MotherFirstName = MotherNameParts[0];
                    MotherLastName = MotherNameParts[2];
                    MotherMiddleName = MotherNameParts[1];
                } else {
                    MotherFirstName = MotherNameParts[0];
                    MotherLastName = MotherNameParts[1];
                }

                if (FatherNameParts.length > 3) {
                    FatherFirstName = FatherNameParts[0];
                    FatherLastName = FatherNameParts[2];
                    FatherMiddleName = FatherNameParts[1];
                } else {
                    FatherFirstName = FatherNameParts[0];
                    FatherLastName = FatherNameParts[1];
                }

                return {
                    idNumber,
                    sex,
                    dob,
                    firstName,
                    middleName,
                    lastName,
                    birthID,
                    MotherFirstName,
                    MotherLastName,
                    MotherMiddleName,
                    FatherFirstName,
                    FatherLastName,
                    FatherMiddleName,
                };
            } catch (error) {
                return "";
            }
        }
    }
}
