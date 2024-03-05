import obstetricDetails from "@/apps/LABOUR/views/obstetricDetails.vue";
import physicalExam from "@/apps/LABOUR/views/physicalExam.vue";
import continuousMonitoring from "@/apps/LABOUR/views/continuousMonitoring.vue";
import referral from "@/apps/LABOUR/views/referral.vue";

export default [
    {
        path: '/maternity/obstetric',
        name: 'obstetricDetails',
        component: obstetricDetails
    },
    {
        path: '/maternity/physicalExam',
        name: 'physicalExam',
        component: physicalExam
    },
    {
        path: '/maternity/continuousMonitoring',
        name: 'continuousMonitoring',
        component: continuousMonitoring
    },
    {
        path: '/maternity/referral',
        name: 'referral',
        component: referral
    },

]

