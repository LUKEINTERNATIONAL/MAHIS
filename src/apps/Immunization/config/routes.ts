
import EIPMReport from "@/apps/Immunization/components/Reports/EIPMReport.vue"
import ReportTable from "@/apps/Immunization/components/Reports/ReportTable.vue";
import { Component } from "ionicons/dist/types/stencil-public-runtime";
export default [
    {
        path: "/EIPMReport",
        name: "EIPMReport",
        component: EIPMReport,
    },
    {
        path: "/EIPMReport",
        name: "EIPMReport1",
        Component: ReportTable
    }
];
