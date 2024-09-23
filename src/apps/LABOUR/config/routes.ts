import obstetricDetails from "@/apps/LABOUR/views/obstetricDetails.vue";
import continuousMonitoring from "@/apps/LABOUR/views/continuousMonitoring.vue";
import referral from "@/apps/LABOUR/views/referral.vue";
import deliveryDetails from "@/apps/LABOUR/views/deliveryDetails.vue";
import postnatalChecks from "@/apps/LABOUR/views/postnatalChecks.vue";
import end from "@/apps/LABOUR/views/end.vue";
import labourAssessment from "@/apps/LABOUR/views/labourAssessment.vue";
import labourHome from "@/apps/LABOUR/views/labourHome.vue";

export default [
    {
        path: '/labour/obstetric',
        name: 'obstetricDetails',
        component: obstetricDetails
    },
    {
        path: '/labour/labourAssessment',
        name: 'labourAssessment',
        component: labourAssessment
    },
    {
        path: '/labour/continuousMonitoring',
        name: 'continuousMonitoring',
        component: continuousMonitoring
    },
    {
        path: '/labour/referral',
        name: 'referral',
        component: referral
    },
    {
        path: '/labour/deliveryDetails',
        name: 'deliveryDetails',
        component: deliveryDetails
    },
    {
        path: '/labour/postnatalChecks',
        name: 'postnatalChecks',
        component: postnatalChecks
    },

    {
        path: '/labour/end',
        name: 'end',
        component: end
    },
    {
        path: '/labour/labourHome',
        name: 'labourHome',
        component: labourHome
    },

]

