import obstetricDetails from "@/apps/LABOUR/views/obstetricDetails.vue";
import physicalExam from "@/apps/LABOUR/views/physicalExam.vue";
import continuousMonitoring from "@/apps/LABOUR/views/continuousMonitoring.vue";
import referral from "@/apps/LABOUR/views/referral.vue";
import deliveryDetails from "@/apps/LABOUR/views/deliveryDetails.vue";
import postnatalChecks from "@/apps/LABOUR/views/postnatalChecks.vue";
import end from "@/apps/LABOUR/views/end.vue";

export default [
    {
        path: '/labour/obstetric',
        name: 'obstetricDetails',
        component: obstetricDetails
    },
    {
        path: '/labour/physicalExam',
        name: 'physicalExam',
        component: physicalExam
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

]

