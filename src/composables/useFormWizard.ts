import { ref, onMounted, nextTick } from "vue";

export const useFormWizard = () => {
    const currentTabIndex = ref("") as any;

    const onChangeCurrentTab = (index: number, oldIndex: number) => {
        if (index % 1 === 0) currentTabIndex.value = index;
        else currentTabIndex.value = 0;
    };

    const onTabBeforeChange = () => {
        if (currentTabIndex.value === 0) {
            console.log("First Tab");
        }

        console.log("All Tabs");
    };

    const addHeaderAboveList = () => {
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
    };

    const changeBtnIconPosition = () => {
        nextTick(() => {
            const button = document.querySelector(".fw-footer-left .fw-btn");
            console.log("🚀 ~ changeBtnIconPosition ~ button:", button);

            if (!button) return;

            const span = button.querySelector("span");
            const icon = button.querySelector("i");

            if (!span || !icon) return;

            button.removeChild(span);
            button.removeChild(icon);

            button.appendChild(icon);
            button.appendChild(span);
        });
    };

    // Initialize on component mount
    onMounted(() => {
        addHeaderAboveList();
    });

    // Optional: computed ref if needed
    // const nextButtonOptions = computed(() => {
    //     return currentTabIndex.value === 2
    //         ? {
    //             text: "test",
    //             icon: "check",
    //             hideIcon: true,
    //             hideText: false,
    //             disabled: true,
    //         }
    //         : { disabled: false };
    // });

    return {
        currentTabIndex,
        onChangeCurrentTab,
        onTabBeforeChange,
        changeBtnIconPosition,
        addHeaderAboveList,
    };
};
