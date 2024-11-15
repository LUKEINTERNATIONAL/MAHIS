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
import { UserService } from "@/services/user_service";
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
        const user_data = ref([]);
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
            try {
                isLoading.value = true;
                const userData = await UserService.getAllUsers();
                user_data.value = userData.map((item: any) => ({
                    username: item.username,
                    label: item.username,
                    value: item.user_id,
                    other: item,
                }));

                _items_.value = userData.map((item: any) => ({
                    userId: item.user_id,
                    username: item.username,
                    roles: userRolesStr(item.roles),
                    programs: userProgramsStr(item.programs),
                    gender: item.person.gender,
                    status: item.deactivated_on,
                    firstName: userFirstname(item.person.names),
                    lastName: userLastname(item.person.names),
                }));
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                isLoading.value = false;
            }
            
        }

        function userRolesStr(items: any) {
            return items.map((item: any) => item.role);
        }

        function userFirstname(items: any) {
            return items.length > 0 ? items[items.length - 1].given_name : "";
        }

        function userLastname(items: any) {
            return items.length > 0 ? items[items.length - 1].family_name : "";
        }

        function userProgramsStr(items: any) {
            return items.map((item: any) => item.name);
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
