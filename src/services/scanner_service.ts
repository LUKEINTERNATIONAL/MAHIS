import { Barcode, BarcodeFormat, BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { alertController } from "@ionic/vue";

export class ScannerService {
    isSupported = false;
    barcodes: Barcode[] = [];

    constructor() {
        this.initialize();
    }

    private async initialize() {
        console.log("Checking if barcode scanning is supported...");
        const result = await BarcodeScanner.isSupported();
        this.isSupported = result.supported;
        const { supported } = await BarcodeScanner.isSupported();
        console.log("BarcodeScanner.isSupported() result:", supported);
        this.isSupported = supported;

        // if (this.isSupported) {
        await this.ensureGoogleBarcodeScannerModule();
        // }
    }

    private async ensureGoogleBarcodeScannerModule() {
        const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
        if (!available) {
            console.log("Google Barcode Scanner module is not available. Installing...");
            try {
                await BarcodeScanner.installGoogleBarcodeScannerModule();
                console.log("Google Barcode Scanner module installed successfully.");
            } catch (error) {
                console.error("Failed to install Google Barcode Scanner module:", error);
                await this.presentAlert("Installation Failed", "Failed to install Google Barcode Scanner module. Please try again later.");
            }
        }
    }

    async scan() {
        // if (!this.isSupported) {
        //     await this.presentAlert("Not Supported", "Barcode scanning is not supported on this device.");
        //     return;
        // }

        const granted = await this.requestPermissions();
        if (!granted) {
            await this.presentAlert("Permission Denied", "Please grant camera permission to use the Barcode and QRCode scanner.");
            return;
        }

        try {
            const { barcodes } = await BarcodeScanner.scan({
                formats: [
                    BarcodeFormat.QrCode,
                    BarcodeFormat.Code128,
                    BarcodeFormat.Code39,
                    BarcodeFormat.Code93,
                    BarcodeFormat.Codabar,
                    BarcodeFormat.DataMatrix,
                    BarcodeFormat.Ean13,
                    BarcodeFormat.Ean8,
                    BarcodeFormat.Itf,
                    BarcodeFormat.UpcA,
                    BarcodeFormat.UpcE,
                ],
            });
            this.barcodes.push(...barcodes);
            console.log("*******************", barcodes[barcodes.length - 1].rawValue);
            return barcodes[barcodes.length - 1].rawValue;
        } catch (error) {
            console.error("Error during scan:", error);
            await this.presentAlert("Scan Error", "An error occurred during the scan. Please try again.");
        }
    }

    async requestPermissions(): Promise<boolean> {
        const { camera } = await BarcodeScanner.requestPermissions();
        return camera === "granted" || camera === "limited";
    }

    async presentAlert(header: string, message: string): Promise<void> {
        const alert = await alertController.create({
            header,
            message,
            buttons: ["OK"],
        });
        await alert.present();
    }
}
