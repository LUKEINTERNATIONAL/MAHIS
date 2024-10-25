<template>

</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, IonMenu, IonInput, IonPopover } from "@ionic/vue";
import { defineComponent, ref } from "vue";


export default defineComponent({
    name: "Menu",
    components: {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonInput,
        IonPopover,
    },
    data() {
        return {
            test: '',
        };
    },
    setup() {
        return {  };
    },
    computed: {
        // ...mapState(useInvestigationStore, ["investigations"])
    },
    watch: {
        
    },
    async mounted() {

    },
    methods: {
        
    },
})
</script>

<style scoped>
    
</style>