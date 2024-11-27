import obstetricDetails from "@/apps/LABOUR/views/obstetricDetails.vue";
import continuousMonitoring from "@/apps/LABOUR/views/continuousMonitoring.vue";
import referral from "@/apps/LABOUR/views/referral.vue";
import deliveryDetails from "@/apps/LABOUR/views/deliveryDetails.vue";
import postnatalChecks from "@/apps/LABOUR/views/postnatalChecks.vue";
import end from "@/apps/LABOUR/views/end.vue";
import labourAssessment from "@/apps/LABOUR/views/labourAssessment.vue";
import LabourHome from "@/apps/LABOUR/views/LabourHome.vue";

export default [
    {
        path: '/obstetric',
        name: 'obstetricDetails',
        component: obstetricDetails
    },
    {
        path: '/labourAssessment',
        name: 'labourAssessment',
        component: labourAssessment
    },
    {
        path: '/continuousMonitoring',
        name: 'continuousMonitoring',
        component: continuousMonitoring
    },
    {
        path: '/labourReferral',
        name: 'referral',
        component: referral
    },
    {
        path: '/labourDeliveryDetails',
        name: 'deliveryDetails',
        component: deliveryDetails
    },
    {
        path: '/postnatalChecks',
        name: 'postnatalChecks',
        component: postnatalChecks
    },

    {
        path: '/labourEnd',
        name: 'end',
        component: end
    },
    {
        path: '/labourHome',
        name: 'LabourHome',
        component: LabourHome
    },

]

