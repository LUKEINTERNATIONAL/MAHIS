import EIPMReport from "@/apps/Immunization/components/Reports/EIPMReport.vue";
import OverDueReport from "@/apps/Immunization/components/Reports/OverDueReport.vue";
import EIR_Report from "@/apps/Immunization/components/Reports/EIR_Report.vue";
import AEFIReport from "@/apps/Immunization/components/Reports/AEFIReport.vue";
import AEFIReportTemplate from "@/apps/Immunization/components/Reports/AEFIReportTemplate.vue";
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
    },
    {
        path: "/AEFIReportTemplate",
        name: "AEFIReportTemplate",
        component: AEFIReportTemplate,
    },
    {
        path: "/OverDueReport",
        name: "OverDueReport",
        component: OverDueReport
    }
];
