interface BarcodeOptions {
    type?: number;
    narrowBar?: number;
    wideBar?: number;
    height?: number;
    readable?: boolean;
}
export class ZebraLabel {
    private commands: string[];
    private currentY: number; // Track the current Y position
    private startX: number; // Base X position
    private lineSpacing: number; // Default spacing between lines

    constructor(startX: number = 35, startY: number = 30, lineSpacing: number = 30) {
        this.commands = ["N"]; // Start new label
        this.currentY = startY;
        this.startX = startX;
        this.lineSpacing = lineSpacing;
    }

    setLabelFormat(width: number = 801, height: number = 329, gap: number = 26): void {
        this.commands.push(`q${width}`); // Label width
        this.commands.push(`Q${height},${gap}`); // Label height and gap
        this.commands.push("ZT"); // Print direction (standard top)
    }

    drawText(text: string, options: { fontSize?: number } = {}): void {
        const fontSize = options.fontSize ?? 3;
        this.commands.push(`A${this.startX},${this.currentY},0,${fontSize},1,1,N,"${text}"`);
        this.currentY += this.lineSpacing; // Move down for next text
    }
    drawBarcode(x: number, y: number, barcodeValue: string, options: BarcodeOptions = {}): void {
        const type = options.type ?? 1; // Default barcode type (Code 128)
        const narrowBar = options.narrowBar ?? 5;
        const wideBar = options.wideBar ?? 15;
        const height = options.height ?? 120;
        const readable = options.readable ? "B" : "N"; // Show human-readable text

        this.commands.push(`B${x},${y},0,${type},${narrowBar},${wideBar},${height},${readable},"${barcodeValue}"`);
    }
    drawLine(width: number, thickness: number): void {
        this.commands.push(`LO${this.startX - 15},${this.currentY},${width},${thickness}`);
        this.currentY += this.lineSpacing; // Move down after drawing a line
    }

    generateLabel(): string {
        this.commands.push("P1"); // Print 1 copy
        return this.commands.join("\n");
    }
}
