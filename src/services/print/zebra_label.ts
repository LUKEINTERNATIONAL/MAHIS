interface BarcodeOptions {
    type?: number;
    narrowBar?: number;
    wideBar?: number;
    height?: number;
    readable?: boolean;
}

interface TextOptions {
    fontSize?: number;
    maxWidth?: number;
    charactersPerLine?: number;
    alignment?: "left" | "center" | "right";
    rotation?: 0 | 90 | 180 | 270;
    fontType?: string;
}

interface LabelDimensions {
    width: number;
    height: number;
    gap: number;
}

export class ZebraLabel {
    private commands: string[];
    private currentY: number;
    private startX: number;
    private lineSpacing: number;
    private labelDimensions?: LabelDimensions;

    constructor(startX: number = 35, startY: number = 10, lineSpacing: number = 28) {
        if (startX < 0 || startY < 0 || lineSpacing < 0) {
            throw new Error("Position and spacing values must be positive numbers");
        }
        this.commands = ["N"];
        this.currentY = startY;
        this.startX = startX;
        this.lineSpacing = lineSpacing;
    }

    setLabelFormat(width: number = 801, height: number = 329, gap: number = 20): void {
        if (width <= 0 || height <= 0 || gap < 0) {
            throw new Error("Label dimensions must be positive numbers");
        }
        this.labelDimensions = { width, height, gap };
        this.commands.push(`q${width}`);
        this.commands.push(`Q${height},${gap}`);
        this.commands.push("ZT");
    }

    private sanitizeText(text: string): string {
        // Escape special characters and quotes
        return text.replace(/["\\]/g, "\\$&").replace(/[\x00-\x1F\x7F-\x9F]/g, ""); // Remove control characters
    }

    private calculateTextPosition(text: string, options: TextOptions, lineWidth: number): number {
        if (!options.alignment || options.alignment === "left") {
            return this.startX;
        }

        const availableWidth = this.labelDimensions?.width ?? 801;
        if (options.alignment === "center") {
            return this.startX + (availableWidth - lineWidth) / 2;
        }
        return this.startX + (availableWidth - lineWidth);
    }

    private calculateCharsPerLine(fontSize: number): number {
        const fontSizeMap: Record<number, number> = {
            1: 47,
            2: 47,
            3: 47,
            4: 47,
            5: 47,
        };

        if (!(fontSize in fontSizeMap)) {
            throw new Error(`Unsupported font size: ${fontSize}. Valid sizes are 1-5.`);
        }

        return fontSizeMap[fontSize];
    }

    drawText(text: string, options: TextOptions = {}): void {
        if (!text) {
            return;
        }

        const { fontSize = 2, charactersPerLine = this.calculateCharsPerLine(fontSize), rotation = 0, alignment = "left", fontType = "1" } = options;

        const sanitizedText = this.sanitizeText(text);
        const words = sanitizedText.split(" ");
        let currentLine = "";
        let lines: string[] = [];

        // Process words into lines
        for (const word of words) {
            if (currentLine.length + word.length + 1 <= charactersPerLine) {
                currentLine += (currentLine ? " " : "") + word;
            } else {
                if (currentLine) {
                    lines.push(currentLine);
                }
                currentLine = word;
            }
        }
        if (currentLine) {
            lines.push(currentLine);
        }

        // Draw each line with proper positioning
        for (const line of lines) {
            const xPos = this.calculateTextPosition(line, options, line.length * (fontSize * 2));
            this.commands.push(`A${xPos},${this.currentY},${rotation},${fontSize},1,${fontType},N,"${line}"`);
            this.currentY += this.lineSpacing;
        }

        // Validate if text fits within label height
        // if (this.labelDimensions && this.currentY > this.labelDimensions.height) {
        //     throw new Error("Text exceeds label height");
        // }
    }

    drawBarcode(x: number, y: number, barcodeValue: string, options: BarcodeOptions = {}): void {
        if (!barcodeValue) {
            throw new Error("Barcode value cannot be empty");
        }

        if (x < 0 || y < 0) {
            throw new Error("Barcode position must use positive coordinates");
        }

        const { type = 1, narrowBar = 5, wideBar = 15, height = 120, readable = false } = options;

        const readableFlag = readable ? "B" : "N";

        // Validate barcode fits within label
        if (this.labelDimensions) {
            if (x + barcodeValue.length * wideBar > this.labelDimensions.width) {
                throw new Error("Barcode exceeds label width");
            }
            if (y + height > this.labelDimensions.height) {
                throw new Error("Barcode exceeds label height");
            }
        }

        this.commands.push(`B${x},${y},0,${type},${narrowBar},${wideBar},${height},${readableFlag},"${barcodeValue}"`);
    }

    drawLine(width: number, thickness: number): void {
        if (width <= 0 || thickness <= 0) {
            throw new Error("Line width and thickness must be positive numbers");
        }

        // Validate line fits within label
        if (this.labelDimensions && this.startX + width > this.labelDimensions.width) {
            throw new Error("Line exceeds label width");
        }

        this.commands.push(`LO${this.startX - 15},${this.currentY},${width},${thickness}`);
        this.currentY += this.lineSpacing;
    }

    reset(): void {
        this.commands = ["N"];
        this.currentY = 30;
    }

    generateLabel(): string {
        if (this.commands.length <= 1) {
            throw new Error("Label is empty");
        }
        this.commands.push("P1");
        return this.commands.join("\n");
    }
}
