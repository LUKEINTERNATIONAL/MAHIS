import ConsultationPlan from "../views/ConsultationPlan.vue";
import Vitals from "../views/Vitals.vue";
import Dispensations from '../views/dispensation.vue'
import Enrollment from "../views/Enrollment.vue";
import Pharmacy from '../components/Pharmacy.vue'

import reports from "@/apps/OPD/views/reports.vue";
import ClinicCasesSeen from "../components/reports/clinic/ClinicCasesSeen.vue";
import ClinicRegistrationReport from "../components/reports/clinic/ClinicRegistrationReport.vue";
import Diagnosis from "../components/reports/clinic/Diagnosis.vue";
import DiagnosisByAddress from "../components/reports/clinic/DiagnosisByAddress.vue";
import DrugsReport from "../components/reports/clinic/DrugsReport.vue";
import LaReport from "../components/reports/clinic/LaReport.vue";
import MentalHealth from "../components/reports/clinic/MentalHealth.vue";

import IDSRMonthly from "../components/reports/moh/IDSR/IDSRMonthly.vue";
import IDSRWeekly from "../components/reports/moh/IDSR/IDSRWeekly.vue";
import HMIS15 from "../components/reports/moh/HMIS/HMIS15.vue";
import HMIS17 from "../components/reports/moh/HMIS/HMIS17.vue";
import { Component } from "ionicons/dist/types/stencil-public-runtime";
export default [
    {
        path: "/OPDConsultationPlan",
        name: "OPDConsultationPlan",
        component: ConsultationPlan,
    },
    {
        path: "/OPDVitals",
        name: "OPDVitals",
        component: Vitals,
    },
    {
        path: "/OPDEnrollment",
        name: "OPDEnrollment",
        component: Enrollment,
    },
    {
        path: '/dispensation',
        name: 'Dispensation',
        component: Dispensations
    },
    {
        path: '/pharmacy',
        name: 'Pharmacy',
        component: Pharmacy
    },
    {
        path: '/reports',
        name: 'Reports',
        component: reports
    },

    {
        path: '/IDSRWeekly',
        name: 'IDSRWeekly',
        component: IDSRWeekly
    },
    {
        path: '/IDSRMonthly',
        name: 'IDSRMonthly',
        component: IDSRMonthly,
    },
    {
        path: '/HMIS15',
        name: 'HMIS15',
        component: HMIS15,
    },
    {
        path: '/HMIS17',
        name: 'HMIS17',
        component: HMIS17,
    },
    {
        path: '/ClinicCasesSeen',
        name: 'ClinicCasesSeen',
        component: ClinicCasesSeen,
    },
    {
        path: '/ClinicRegistrationReport',
        name: 'ClinicRegistrationReport',
        component: ClinicRegistrationReport
    },
    {
        path: '/clinic_diagnosis',
        name: 'clinic_diagnosis',
        component: Diagnosis
    },
    {
        path: '/DiagnosisByAddress',
        name: 'DiagnosisByAddress',
        component: DiagnosisByAddress
    },
    {
        path: '/DrugsReport',
        name: 'DrugsReport',
        component: DrugsReport
    },
    {
        path: '/LaReport',
        name: 'LaReport',
        component: LaReport
    },
    {
        path: '/MentalHealth',
        name: 'MentalHealth',
        component: MentalHealth
    },
];
