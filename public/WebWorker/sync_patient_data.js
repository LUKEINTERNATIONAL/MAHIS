const syncPatientDataService = {
    async getOfflineSavedPatientIds() {
        const patientRecords = await DatabaseManager.getOfflineData("patientRecords");
        const ids = [];
        await Promise.all(
            patientRecords.map(async (record) => {
                ids.push(record.serverPatientID);
            })
        );
        return ids;
    },
    async getPatientData() {
        const record = await ApiService.getData("/sync/patients", { ids: "" });
        console.log("🚀 ~ getPatientData ~ record:", record);
    },
};
