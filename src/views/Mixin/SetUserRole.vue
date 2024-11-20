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
              const programID=Service.getProgramID();
              const programName=Service.getProgramName();
              if (this.userRole == "Lab" && programID==14) {
                    this.userRoleSettings = {
                        url: "home",
                        btnName: "Back to home",
                        stepperTitle: "Laboratory",
                    };
                }

              if(programID==14 && this.userRole!='Lab'){
                    this.userRoleSettings = {
                        url: "OPDvitals",
                        btnName: "Back to vitals",
                        stepperTitle: "The consultation plan",
                    };
                }

              if(programID==12){
                this.userRoleSettings={
                  url:"contact",
                  btnName:"Back"
                }
              }

              if(programName=="LABOUR AND DELIVERY PROGRAM"){
                this.userRoleSettings={
                  url:"labour/labourHome",
                  btnName:"Back to home"
                }
              }


              if(programName=="PNC PROGRAM"){
                this.userRoleSettings={
                  url:"pnc/home",
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