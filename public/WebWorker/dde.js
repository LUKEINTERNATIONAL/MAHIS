const ddeService = {
    async setDDEIds() {
        const dde = await DatabaseManager.getOfflineData("dde");
        if (!dde || dde[0].ids.length == 0) {
            const dde_ids = await ApiService.getData("/dde/patients/sync_npids?count=10&program_id=33");
            if (dde_ids && Object.keys(dde_ids).length > 0) {
                await DatabaseManager.overRideRecord("dde", {
                    ids: dde_ids.npids,
                });
            }
            return dde_ids;
        } else {
            return dde[0].ids;
        }
    },
};
