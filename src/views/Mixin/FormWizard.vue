<script lang="ts">
import Wizard from "form-wizard-vue3";

export default {
    name: "App",
    components: {
        Wizard,
    },
    data() {
        return {
            currentTabIndex: 0,
        };
    },
    mounted() {
        this.addHeaderAboveList();
    },
    methods: {
        onChangeCurrentTab(index: any, oldIndex: any) {
            console.log(index, oldIndex);
            this.currentTabIndex = index;
        },
        onTabBeforeChange() {
            if (this.currentTabIndex === 0) {
                console.log("First Tab");
            }
            console.log("All Tabs");
        },
        wizardCompleted() {
            console.log("Wizard Completed");
        },
        addHeaderAboveList() {
            const formWizards = document.getElementsByClassName("form-wizard-vue fw-vertical fw-overflow-scroll");
            if (formWizards.length === 0) {
                console.error("No form wizard found");
                return;
            }
            const formWizard = formWizards[0];

            const ulElements = formWizard.getElementsByClassName("fw-body-list");
            if (ulElements.length === 0) {
                console.error("No ul element found");
                return;
            }
            const ulElement = ulElements[0];

            const titleLi = document.createElement("li");
            titleLi.textContent = "The Consultation Plan";
            titleLi.style.textAlign = "center";
            titleLi.style.fontWeight = "700";
            titleLi.style.fontSize = "18px";
            titleLi.style.flexGrow = "0.08";

            ulElement.insertBefore(titleLi, ulElement.firstChild);
        },
    },
    computed: {
        // nextButtonOptions() {
        //     return this.currentTabIndex === 2
        //         ? {
        //               text: "test",
        //               icon: "check",
        //               hideIcon: true, // default false but selected for sample
        //               hideText: false, // default false but selected for sample
        //               disabled: true,
        //           }
        //         : { disabled: false };
        // },
    },
};
</script>
