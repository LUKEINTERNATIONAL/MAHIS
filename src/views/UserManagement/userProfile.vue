<template>
    <editUserModal :is_open="showModal" :user_id="user_id" @close-popoover="modalClosed" />
</template>
<script lang="ts">
    import { defineComponent } from "vue";
    import editUserModal from "./editUserModal.vue";
    import { useUserStore } from "@/stores/userStore";
    import { mapState } from "pinia";

    export default defineComponent({
        components: {
            editUserModal
        },
        data() {
            return {
                isPopooverOpen: false,
                user_id: this.getUser_Id(),
            }
        },
        computed: {
            ...mapState(useUserStore, ["showUserProfileEdit", "user_ID"]),
        },
        watch: {
            user_ID: {
                handler() {
                    this.user_id = this.getUser_Id();
                },
                deep: true,
            },
        },
        props: ["showModal"],
        methods: {
            modalClosed() {
                this.$emit("closePopoover", false);
            },
            getUser_Id() {
                const store = useUserStore();
                return store.getUserId()
            },
        }
    })
</script>
<style scoped>
</style>