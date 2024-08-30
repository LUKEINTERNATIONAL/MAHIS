<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRegistrationStore } from "@/stores/RegistrationStore";
import { modifyFieldValue, modifyRadioValue } from "@/services/data_helpers";
import { mapState, mapActions } from "pinia";

export default defineComponent({
    name: "Menu",
    data() {
        return {
            isMobile: false as any,
            extractedDetails: {} as any,
        };
    },
    mounted() {},
    computed: {
        ...mapState(useRegistrationStore, ["personInformation"]),
    },
    methods: {
        async setPersonInformation(extractedDetails: any) {
            modifyFieldValue(this.personInformation, "nationalID", "value", extractedDetails.idNumber);
            modifyFieldValue(this.personInformation, "firstname", "value", extractedDetails.firstName);
            modifyFieldValue(this.personInformation, "middleName", "value", extractedDetails.middleName || "");
            modifyFieldValue(this.personInformation, "lastname", "value", extractedDetails.lastName);
            modifyFieldValue(this.personInformation, "birthdate", "value", extractedDetails.dob);
            modifyRadioValue(this.personInformation, "gender", "selectedValue", extractedDetails.sex);
            console.log("🚀 ~ setPersonInformation ~ extractedDetails.firstName:", extractedDetails.firstName);
            console.log("🚀 ~ setPersonInformation ~ this.personInformation:", this.personInformation);
        },
    },
});
</script>
