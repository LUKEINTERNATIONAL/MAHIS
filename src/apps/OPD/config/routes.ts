import ConsultationPlan from "../views/ConsultationPlan.vue";
import Vitals from "../views/Vitals.vue";
import Dispensations from '../views/dispensation.vue'
import Enrollment from "../views/Enrollment.vue";
import Pharmacy from '../components/Pharmacy.vue'

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
import ClinicWithNIDsReport from "../components/reports/clinic/ClinicWithNIDsReport.vue";
import malaria_report from "../components/reports/moh/malaria_report.vue";

import MoHReports from "../views/MoHReports.vue";
import ClinicalReports from "../views/ClinicalReports.vue";
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
        path: '/IDSRWeekly',
        name: 'idsr_weekly',
        component: IDSRWeekly
    },
    {
        path: '/IDSRMonthly',
        name: 'idsr_monthly',
        component: IDSRMonthly,
    },
    {
        path: '/HMIS15',
        name: 'hmis_15',
        component: HMIS15,
    },
    {
        path: '/HMIS17',
        name: 'hmis_17',
        component: HMIS17,
    },
    {
        path: '/ClinicWithNIDsReport',
        name: 'clinic_with_nids',
        component: ClinicWithNIDsReport,
    },
    {
        path: '/malaria_report',
        name: 'moh_malaria',
        component: malaria_report,
    },
    {
        path: '/ClinicCasesSeen',
        name: 'clinic_cases_seen',
        component: ClinicCasesSeen,
    },
    {
        path: '/ClinicRegistrationReport',
        name: 'clinic_registration',
        component: ClinicRegistrationReport
    },
    {
        path: '/clinic_diagnosis',
        name: 'clinic_diagnosis',
        component: Diagnosis
    },
    {
        path: '/DiagnosisByAddress',
        name: 'clinic_diagnosis_by_address',
        component: DiagnosisByAddress
    },
    {
        path: '/DrugsReport',
        name: 'clinic_drugs_given',
        component: DrugsReport
    },
    {
        path: '/LaReport',
        name: 'clinic_la',
        component: LaReport
    },
    {
        path: '/MentalHealth',
        name: 'clinic_mental_health',
        component: MentalHealth
    },
    {
        path: '/MoHReports',
        name: 'MoHReports',
        component: MoHReports
    },
    {
        path: '/ClinicalReports',
        name: 'ClinicalReports',
        component: ClinicalReports
    },
];
