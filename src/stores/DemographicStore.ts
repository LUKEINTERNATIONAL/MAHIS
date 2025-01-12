import { defineStore } from "pinia";
import { getOfflineRecords } from "@/services/offline_service";
import { buildPatientRecord } from "@/services/buildingPatientRecord";

export const useDemographicsStore = defineStore("demographicStore", {
    state: () => ({
        patient: {} as any,
    }),
    actions: {
        async setRecord(data: any) {
            this.patient = data;
        },
        getPatient() {
            return this.patient;
        },
        async setPatientRecord(item: any) {
            if (item?.ID) {
                const data = await this.getOfflinePatientData(item?.ID);
                if (data) {
                    await this.setRecord(data);
                } else await this.setRecord(item);
            } else {
                const patientID = this.getPatientIdentifier(item, 3);
                const patientRecord: any = await this.getOfflinePatientData(patientID);
                if (patientRecord) {
                    await this.setRecord(patientRecord);
                } else {
                    await this.setRecord(await buildPatientRecord(item));
                }
            }
        },
        async getPatientIdentifier(identifiers: any, id: any) {
            if (identifiers) {
                return identifiers.patient_identifiers
                    .filter((identifier: any) => identifier.identifier_type === id)
                    .map((identifier: any) => identifier.identifier)
                    .join(", ");
            } else {
                return "";
            }
        },
        async getOfflinePatientData(patientID: any) {
            if (patientID) {
                return await getOfflineRecords("patientRecords", { whereClause: { ID: await patientID } }).then((data: any) => data?.[0]);
            }
            return null;
        },
    },
    persist: true,
});
