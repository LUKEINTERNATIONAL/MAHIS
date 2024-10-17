import postnatalDetails from "@/apps/PNC/views/postnatalDetails.vue";
import postnatalWardMonitoring from "@/apps/PNC/views/postnatalWardMonitoring.vue";
import postnatalBabyStatus from "@/apps/PNC/views/postnatalBabyStatus.vue";
import postnatalVisit from "@/apps/PNC/views/postnatalVisit.vue";
import dischargeWoman from "@/apps/PNC/views/dischargeWoman.vue";
import pncEnd from "@/apps/PNC/views/pncEnd.vue";
import home from "@/apps/PNC/views/home.vue";

export default [
    {
        path: '/postnatalDetails',
        name: 'postnatalDetails',
        component: postnatalDetails
    },
    {
        path: '/postnatalWardMonitoring',
        name: 'postnatalWardMonitoring',
        component: postnatalWardMonitoring
    }, {
        path: '/babyStatus',
        name: 'postnatalBabyStatus',
        component: postnatalBabyStatus
    }, {
        path: '/postnatalVisit',
        name: 'postnatalVisit',
        component: postnatalVisit
    }, {
        path: '/dischargeWoman',
        name: 'dischargeWoman',
        component: dischargeWoman
    }, {
        path: '/pncEnd',
        name: 'pncEnd',
        component: pncEnd
    },
    {
        path: '/pnc/home',
        name: 'home',
        component: home
    },


]

