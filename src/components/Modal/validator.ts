interface ValidationResult {
    isValid: boolean;
    errors: { field: string, message: string }[];
}

export const useImmunizationSessionFieldsValidator = (
    sessionName: string,
    dateRange: Date[],
    selectedRepeatType: string,
    numberOfDays: number,
    selectedSessionType: string,
    selectedAssignees: string[]
): ValidationResult => {
    const errors: { field: string, message: string }[] = [];

    if (!sessionName.trim()) {
        errors.push({ field: 'sessionName', message: 'Session name is required.' });
    }

    if (dateRange.length !== 2) {
        errors.push({ field: 'dateRange', message: 'Date range is required.' });
    } else {
        const [startDate, endDate] = dateRange;
        if (startDate > endDate) {
            errors.push({ field: 'dateRange', message: 'Start date must be before end date.' });
        }
    }

    if (!selectedRepeatType) {
        errors.push({ field: 'repeatType', message: 'Repeat type is required.' });
    }

    if (selectedRepeatType !== "Never" && (!numberOfDays || numberOfDays < 1)) {
        errors.push({ field: 'numberOfDays', message: 'Number of days is required.' });
    }

    if (!selectedSessionType) {
        errors.push({ field: 'sessionType', message: 'Session type is required.' });
    }

    if (selectedAssignees.length === 0) {
        errors.push({ field: 'assignees', message: 'At least one assignee is required.' });
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}