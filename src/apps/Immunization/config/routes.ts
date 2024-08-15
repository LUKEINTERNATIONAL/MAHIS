import EIPMReport from "@/apps/Immunization/components/Reports/EIPMReport.vue";
import EIR_Report from "@/apps/Immunization/components/Reports/EIR_Report.vue";
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
    }
];
