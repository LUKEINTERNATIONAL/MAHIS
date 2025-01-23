<template>
    <ion-page>
        <NavigationMenu />
        <ion-content :fullscreen="true">
            <TableSkeletonLoader v-if="isLoading" />
            <usersTemplate
                v-else 
                :items="_items_"
                :search_fields="search_fields_"
                @reload="getUsers"
                @close-modal="closeModal"
            />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { chevronBackOutline } from "ionicons/icons";
import { IonContent, IonPage, IonRow, IonCol, IonIcon } from "@ionic/vue";
import Toolbar from "@/components/Toolbar.vue";
import usersTemplate from "@/components/usersTemplate.vue";
import NavigationMenu from "@/apps/Immunization/components/Reports/NavigationMenu.vue";
import router from "@/router";
import { ref, onMounted } from "vue";
import { EIRreportsStore } from "@/apps/Immunization/stores/EIRreportsStore";
import TableSkeletonLoader from './TableSkeletonLoader.vue';

export default defineComponent({
    name: "Users",
    components: {
        IonContent,
        IonPage,
        IonRow,
        IonCol,
        IonIcon,
        Toolbar,
        usersTemplate,
        NavigationMenu,
        TableSkeletonLoader,
    },
    setup() {
        const isPopooverOpen = ref(false);
        const isLoading = ref(true);
        const search_fields_ = ref([
            {
                value: "username",
                name: "username",
                selected: true,
            },
        ]) as any;
        const user_id = ref("");
        const _items_ = ref<[]>([]);

        onMounted(async () => {
            initNavData();
            await getUsers();
        });

        async function getUsers() {
            isLoading.value = false;
        }

        function closeModal(data: any) {
            if (data == false) {
                setTimeout(() => {
                    getUsers();
                }, 500);
            }
        }


        function nav(url: string) {
            router.push(url);
        }

        function initNavData() {
            const store = EIRreportsStore();
            store.setNavigationPayload("Manage Users", true, false, "/", "home", "");
        }

        return {
            isPopooverOpen,
            user_id,
            _items_,
            search_fields_,
            nav,
            chevronBackOutline,
            initNavData,
            getUsers,
            isLoading,
            closeModal,
        };
    },
    watch: {
        $route: {
            async handler(data) {
                if (data.name == "users") this.initNavData();
                await this.getUsers();
            },
            deep: true,
        },
    },
});
</script>

<style scoped>
.back_profile {
    display: flex;
    justify-content: space-between;
    width: 140px;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    margin: 1%;
}

.text-container {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.content-container {
    overflow: auto;
}

.hide-overflow {
    overflow: hidden;
}
</style>
