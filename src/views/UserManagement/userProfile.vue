<template>
    <editUserModal :is_open="showModal" :user_id="user_id" @close-popoover="modalClosed" />
</template>
<script lang="ts">
    import { defineComponent } from "vue";
    import editUserModal from "./editUserModal.vue";
    import { useUserStore } from "@/stores/userStore";
    import { mapState } from "pinia";
    import { Service } from "@/services/service";

    export default defineComponent({
        components: {
            editUserModal
        },
        data() {
            return {
                isPopooverOpen: false,
                user_id: Service.getUserID(),
            }
        },
        computed: {
            ...mapState(useUserStore, ["showUserProfileEdit"]),
        },
        props: ["showModal"],
        methods: {
            modalClosed() {
                this.$emit("closePopoover", false);
            }
        }
    })
</script>
<style scoped>
</style>