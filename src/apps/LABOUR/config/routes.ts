import obstetricDetails from "@/apps/LABOUR/views/obstetricDetails.vue";
import physicalExam from "@/apps/LABOUR/views/physicalExam.vue";

export default [
    {
        path: '/labourAndDelivery/obstetric',
        name: 'obstetricDetails',
        component: obstetricDetails
    }, {
        path: '/labourAndDelivery/physicalExam',
        name: 'physicalExam',
        component: physicalExam
    },

]

