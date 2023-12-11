export const DRUG_FREQUENCIES: Array<{label: string; code: string; value: number; [x: string]: any}> = [
    { label : "ONCE A DAY (OD)", code : "OD", value : 1 },
    { label : "TWICE A DAY (BD)", code : "BD", value : 2 },
    { label : "THREE TIMES A DAY (TDS)", code : "TDS", value : 3 },
    { label : "FOUR TIMES A DAY (QID)", code : "QID", value : 4 },
    { label : "FIVE TIMES A DAY (5X/D)", code : "5X/D", value : 5 },
    { label : "SIX TIMES A DAY (Q4HRS)", code : "Q4HRS", value : 6 },
    { label : "IN THE MORNING (QAM)", code : "QAM", value : 1 },
    { label : "ONCE A DAY AT NOON (QNOON)", code : "QNOON", value : 1 },
    { label : "IN THE EVENING (QPM)", code : "QPM", value : 1 },
    { label : "ONCE A DAY AT NIGHT (QHS)", code : "QHS", value : 1 },
    { label : "EVERY OTHER DAY (QOD)", code : "QOD", value : 0.5 },
    { label : "ONCE A WEEK (QWK)", code : "QWK", value : 0.14 },
    { label : "ONCE A MONTH", code : "ONCE A MONTH", value : 0.03 },
    { label : "TWICE A MONTH", code : "TWICE A MONTH", value : 0.071 },
    { label : "Unknown", code : "Unknown", value : 0 }
  ]