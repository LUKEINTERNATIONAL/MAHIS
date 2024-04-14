import postnatalDetails from "@/apps/PNC/views/postnatalDetails.vue";
import postnatalWardMonitoring from "@/apps/PNC/views/postnatalWardMonitoring.vue";
import postnatalBabyStatus from "@/apps/PNC/views/postnatalBabyStatus.vue";
import postnatalVisit from "@/apps/PNC/views/postnatalVisit.vue";
import dischargeWoman from "@/apps/PNC/views/dischargeWoman.vue";
import pncEnd from "@/apps/PNC/views/pncEnd.vue";

export default [
    {
        path: '/pnc/postnatalDetails',
        name: 'postnatalDetails',
        component: postnatalDetails
    },
    {
        path: '/pnc/postnatalWardMonitoring',
        name: 'postnatalWardMonitoring',
        component: postnatalWardMonitoring
    }, {
        path: '/pnc/babyStatus',
        name: 'postnatalBabyStatus',
        component: postnatalBabyStatus
    }, {
        path: '/pnc/postnatalVisit',
        name: 'postnatalVisit',
        component: postnatalVisit
    }, {
        path: '/pnc/dischargeWoman',
        name: 'dischargeWoman',
        component: dischargeWoman
    }, {
        path: '/pnc/pncEnd',
        name: 'pncEnd',
        component: pncEnd
    },


]

