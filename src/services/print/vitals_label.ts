export function print_vitals(label: any, patient: any) {
    label.drawText("Visit: 14/Jan/2025 06:00 - 14/Jan/2025 06:00", { fontSize: 4 });
    label.drawLine(20, 60, 800, 2);
    label.drawText("Vitals at 06:00", { fontSize: 4 });
    label.drawText("Temperature (c): 37.0,Blood oxygen saturation: 98.0", { fontSize: 3 });
    label.drawText("___________________________________________________", { fontSize: 3 });
    return label;
}
