import EIPMReport from "@/apps/Immunization/components/Reports/EIPMReport.vue";
import EIR_Report from "@/apps/Immunization/components/Reports/EIR_Report.vue";
import AEFIReport from "@/apps/Immunization/components/Reports/AEFIReport.vue";
export default [
    {
        path: "/EIPMReport",
        name: "EIPMReport",
        component: EIPMReport,
    },
    {
        path: "/EIRReport",
        name: "EIRReport",
        component: EIR_Report,
    },
    {
        path: "/AEFIReport",
        name: "AEFIReport",
        component: AEFIReport,
    }
];
