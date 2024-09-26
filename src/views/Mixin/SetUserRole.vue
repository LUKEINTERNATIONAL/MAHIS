<script lang="ts">
import { defineComponent } from "vue";
import { Service } from "@/services/service";
export default defineComponent({
    data: () => ({
        userRole: "" as any,
        ready: false,
        userRoleSettings: {} as any,
    }),
    watch: {
        $route: {
            async handler(route: any) {
                this.userRole = Service.getUserRoles();
              const programID=Service.getProgramID()
              if (this.userRole == "Lab" && programID==14) {
                    this.userRoleSettings = {
                        url: "patientProfile",
                        btnName: "Back to profile",
                        stepperTitle: "Laboratory",
                    };
                } else {
                    this.userRoleSettings = {
                        url: "OPDvitals",
                        btnName: "Back to vitals",
                        stepperTitle: "The consultation plan",
                    };
                }

              if(programID==12){
                this.userRoleSettings={
                  url:"ANCHome",
                  btnName:"Back to home"
                }
              }
            },
            immediate: true,
            deep: true,
        },
    },
});
</script>
