import { Barcode, BarcodeFormat, BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { alertController } from "@ionic/vue";

export class ScannerService {
    private isSupported = false;
    private barcodes: Barcode[] = [];
    private scanListener: any;
    private isTorchOn = false;
    private currentZoomRatio = 1.0;
    private minZoomRatio = 1.0;
    private maxZoomRatio = 1.0;

    constructor() {
        this.initialize();
    }

    private async initialize() {
        console.log("Checking if barcode scanning is supported...");
        const { supported } = await BarcodeScanner.isSupported();
        console.log("BarcodeScanner.isSupported() result:", supported);
        this.isSupported = supported;

        await this.ensureGoogleBarcodeScannerModule();
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
                formats: this.getSupportedFormats(),
            });
            this.barcodes.push(...barcodes);
            console.log("*******************", barcodes[barcodes.length - 1].rawValue);
            return barcodes[barcodes.length - 1].rawValue;
        } catch (error) {
            console.error("Error during scan:", error);
            await this.presentAlert("Scan Error", "An error occurred during the scan. Please try again.");
        }
    }

    async startScan(initialZoomRatio: number = 3.6): Promise<Barcode[]> {
        const granted = await this.requestPermissions();
        if (!granted) {
            await this.presentAlert("Permission Denied", "Please grant camera permission to use the Barcode and QRCode scanner.");
            return [];
        }

        return new Promise((resolve, reject) => {
            try {
                this.scanListener = BarcodeScanner.addListener("barcodeScanned", (result: any) => {
                    const scannedBarcodes = result.barcode.displayValue; // Assuming barcodes are here
                    this.barcodes = scannedBarcodes;
                    console.log("Scanned barcode:", scannedBarcodes);
                    this.stopScan();
                    resolve(this.barcodes); // Resolve the promise with the scanned barcodes
                });

                BarcodeScanner.startScan({
                    formats: this.getSupportedFormats(),
                })
                    .then(async () => {
                        const { zoomRatio: minZoom } = await BarcodeScanner.getMinZoomRatio();
                        const { zoomRatio: maxZoom } = await BarcodeScanner.getMaxZoomRatio();
                        this.minZoomRatio = minZoom;
                        this.maxZoomRatio = maxZoom;
                        this.currentZoomRatio = Math.max(this.minZoomRatio, Math.min(initialZoomRatio, this.maxZoomRatio));

                        await this.prepareScanningUI();
                        await this.setZoomRatio(this.currentZoomRatio);
                    })
                    .catch((error) => {
                        console.error("Error starting scan:", error);
                        this.restoreUI();
                        reject(error); // Reject promise if starting the scan fails
                    });
            } catch (error) {
                console.error("Error during scanning:", error);
                reject(error);
            }
        });
    }

    async setZoomRatio(zoomRatio: number) {
        try {
            this.currentZoomRatio = Math.max(this.minZoomRatio, Math.min(zoomRatio, this.maxZoomRatio));
            await BarcodeScanner.setZoomRatio({ zoomRatio: this.currentZoomRatio });

            // Update zoom slider value
            const zoomSlider = document.querySelector(".zoom-slider") as HTMLInputElement;
            if (zoomSlider) {
                zoomSlider.value = this.currentZoomRatio.toString();
            }
        } catch (error) {
            console.error("Error setting zoom ratio:", error);
        }
    }

    async stopScan() {
        try {
            if (this.scanListener) {
                await this.scanListener.remove();
            }

            await BarcodeScanner.stopScan();

            // Turn off torch if it's on
            if (this.isTorchOn) {
                await this.toggleTorch();
            }

            this.restoreUI();
        } catch (error) {
            console.error("Error stopping scan:", error);
        }
    }

    async toggleTorch() {
        try {
            const { available } = await BarcodeScanner.isTorchAvailable();
            if (!available) {
                console.log("Torch is not available on this device");
                return;
            }

            if (this.isTorchOn) {
                await BarcodeScanner.disableTorch();
            } else {
                await BarcodeScanner.enableTorch();
            }
            this.isTorchOn = !this.isTorchOn;

            // Update torch button UI
            const torchBtn = document.querySelector(".torch-btn") as HTMLElement;
            if (torchBtn) {
                torchBtn.classList.toggle("torch-on", this.isTorchOn);
            }
        } catch (error) {
            console.error("Error toggling torch:", error);
        }
    }

    private async prepareScanningUI() {
        const body = document.querySelector("body");
        if (body) {
            body.classList.add("barcode-scanner-active");

            // Hide all elements except the scanning UI
            const elements = body.children;
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i] as HTMLElement;
                if (!element.classList.contains("scanning-ui")) {
                    element.style.display = "none";
                }
            }

            // Create and add scanning UI if it doesn't exist
            if (!document.querySelector(".scanning-ui")) {
                const scanningUI = document.createElement("div");
                scanningUI.className = "scanning-ui";
                scanningUI.innerHTML = `
                    <div class="scanning-overlay">
                        <div class="scanning-frame"></div>
                        <button class="torch-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M12 18c-3.3 0-6-2.7-6-6 0-1.8.8-3.4 2-4.5V4c0-.6.4-1 1-1h6c.6 0 1 .4 1 1v3.5c1.2 1.1 2 2.7 2 4.5 0 3.3-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
                            </svg>
                        </button>
                        <input type="range" class="zoom-slider" min="${this.minZoomRatio}" max="${this.maxZoomRatio}" step="0.1" value="${this.currentZoomRatio}">
                        <button class="stop-scanning-btn">Stop Scanning</button>
                    </div>
                `;
                body.appendChild(scanningUI);

                // Add event listener to stop scanning button
                const stopBtn = scanningUI.querySelector(".stop-scanning-btn");
                if (stopBtn) {
                    stopBtn.addEventListener("click", () => this.stopScan());
                }

                // Add event listener to torch button
                const torchBtn = scanningUI.querySelector(".torch-btn");
                if (torchBtn) {
                    torchBtn.addEventListener("click", () => this.toggleTorch());
                }

                // Add event listener to zoom slider
                const zoomSlider = scanningUI.querySelector(".zoom-slider") as HTMLInputElement;
                if (zoomSlider) {
                    zoomSlider.addEventListener("input", (event) => {
                        const newZoomRatio = parseFloat((event.target as HTMLInputElement).value);
                        this.setZoomRatio(newZoomRatio);
                    });
                }
            }

            // Check if torch is available
            const { available } = await BarcodeScanner.isTorchAvailable();
            const torchBtn = document.querySelector(".torch-btn") as HTMLElement;
            if (torchBtn) {
                torchBtn.style.display = available ? "flex" : "none";
            }
        }
    }
    private restoreUI() {
        const body = document.querySelector("body");
        if (body) {
            body.classList.remove("barcode-scanner-active");

            // Restore all hidden elements
            const elements = body.children;
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i] as HTMLElement;
                if (element.style.display === "none") {
                    element.style.display = "";
                }
            }

            // Remove scanning UI
            const scanningUI = document.querySelector(".scanning-ui");
            if (scanningUI) {
                scanningUI.remove();
            }
        }
    }

    async requestPermissions(): Promise<boolean> {
        const { camera } = await BarcodeScanner.requestPermissions();
        return camera === "granted" || camera === "limited";
    }

    private async presentAlert(header: string, message: string): Promise<void> {
        const alert = await alertController.create({
            header,
            message,
            buttons: ["OK"],
        });
        await alert.present();
    }

    private getSupportedFormats(): BarcodeFormat[] {
        return [
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
        ];
    }

    // Getter for barcodes if needed externally
    getBarcodes(): Barcode[] {
        return this.barcodes;
    }

    // Method to clear barcodes if needed
    clearBarcodes() {
        this.barcodes = [];
    }
}
