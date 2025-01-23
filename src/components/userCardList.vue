<template>
  <div class="container">
    <ion-grid class="dynamic-grid">
      <!-- Error Message -->
      <ion-row v-if="error">
        <ion-col size="12" class="ion-text-center">
          <ion-text color="danger">
            <p>{{ error }}</p>
          </ion-text>
        </ion-col>
      </ion-row>

      <!-- Loading Spinner -->
      <ion-row v-else-if="isLoading">
        <ion-col size="12" class="ion-text-center">
          <ion-spinner name="circular"></ion-spinner>
          <p>Loading users...</p>
        </ion-col>
      </ion-row>

      <!-- No Users Found -->
      <ion-row v-else-if="_items_.length === 0">
        <ion-col size="12" class="ion-text-center">
          <p>No users found.</p>
        </ion-col>
      </ion-row>

      <!-- User Cards -->
      <ion-row v-else class="user-cards-row">
        <ion-col
          size-xs="12"
          size-sm="6"
          size-md="4"
          size-lg="3"
          v-for="user in _items_"
          :key="user.userId"
        >
          <ion-card class="user-card">
            <ion-card-header>
              <ion-card-subtitle>
                <ion-icon :icon="personCircleOutline" size="small" style="margin-bottom: -3px;"></ion-icon>
                {{ user.roles.join(", ") }}
              </ion-card-subtitle>
              <ion-card-title>
                {{ user.firstName }} {{ user.lastName }}
                <ion-icon
                  @click="openUserProfile(user.userId)"
                  :icon="createOutline"
                  size="small"
                  class="edit-icon"
                ></ion-icon>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-list>
                <ion-item>
                  <ion-label>
                    <h3>User ID</h3>
                    <p>{{ user.userId }}</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h3>Username</h3>
                    <p>{{ user.username }}</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h3>Gender</h3>
                    <p>{{ user.gender }}</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h3>
                      <ion-icon :icon="appsOutline" size="small" style="margin-bottom: -3px;"></ion-icon>
                      Programs
                    </h3>
                    <p>{{ user.programs.join(", ") }}</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>

    <!-- Edit User Modal -->
    <editUserModal
      :is_open="isPopooverOpen"
      :user_id="user_id"
      @close-popoover="softModalClosed"
      @save="modalClosed"
    />

    <!-- Footer -->
    <ion-footer class="sticky-footer">
      <ion-row>
        <ion-col size="12" style="max-width: 100%;">
          <bottomNavBar
            :totalItems="totalCount"
            :currentPage="pagination.page"
            :itemsPerPage="pagination.itemsPerPage"
            @update:pagination="handlePaginationUpdate"
          />
        </ion-col>
      </ion-row>
    </ion-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, watch, onMounted } from "vue";
import editUserModal from "../views/UserManagement/editUserModal.vue";
import bottomNavBar from "@/apps/Immunization/components/bottomNavBar.vue";
import { UserService } from "@/services/user_service";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonFooter,
  IonSpinner,
  IonText,
  IonIcon,
} from "@ionic/vue";
import { personCircleOutline, createOutline, appsOutline } from "ionicons/icons";

interface User {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  roles: string[];
  programs: string[];
}

export default defineComponent({
  name: "UserCardList",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    bottomNavBar,
    IonFooter,
    IonSpinner,
    IonText,
    IonIcon,
    editUserModal,
  },
  props: {
    users: {
      type: Array as () => User[],
      required: true,
    },
    filterValue: {
      type: String,
      required: true,
    },
    search: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isPopooverOpen = ref(false);
    const pagination = reactive({
      page: 1,
      itemsPerPage: 10,
    });
    const isLoading = ref(true);
    const error = ref("");
    const user_id = ref("");
    const _items_ = ref<User[]>([]);
    const totalCount = ref(0);

    // Fetch users on mount
    onMounted(() => {
      getUsers();
    });

    watch(
      () => props.search,
      (newValue, oldValue) => {
        getUsers();  
      }
    );

    // Fetch users function
    const getUsers = async () => {
      try {
        isLoading.value = true;
        const userData = await UserService.getAllUsers(pagination.page, pagination.itemsPerPage, props.search);
        totalCount.value = userData.count;

        // Transform data
        _items_.value = userData.results.map((item: any) => ({
          userId: item.user_id,
          username: item.username,
          roles: userRolesStr(item.roles),
          programs: userProgramsStr(item.programs),
          gender: item.person.gender,
          status: item.deactivated_on,
          firstName: userFirstname(item.person.names),
          lastName: userLastname(item.person.names),
        }));
      } catch (err) {
        error.value = "Failed to fetch users. Please try again later.";
        console.error("Error fetching users:", err);
      } finally {
        isLoading.value = false;
      }
    };

    // Filter users based on filterValue
    const filteredUsers = computed(() => {
      if (!props.filterValue) return _items_.value;
      return _items_.value.filter(
        (user) =>
          user.username.toLowerCase().includes(props.filterValue.toLowerCase()) ||
          user.firstName.toLowerCase().includes(props.filterValue.toLowerCase()) ||
          user.lastName.toLowerCase().includes(props.filterValue.toLowerCase())
      );
    });

    // Handle pagination update
    const handlePaginationUpdate = ({ page, itemsPerPage }: { page: number; itemsPerPage: number }) => {
      pagination.page = page;
      pagination.itemsPerPage = itemsPerPage;
      getUsers(); // Fetch new data when pagination changes
    };

    // Open user profile
    const openUserProfile = (userId: string) => {
      isPopooverOpen.value = true;
      user_id.value = userId;
    };

    // Close modal
    const modalClosed = () => {
      isPopooverOpen.value = false;
      emit("reload", isPopooverOpen.value);
    };

    // Soft close modal
    const softModalClosed = () => {
      isPopooverOpen.value = false;
    };

    // Helper functions
    const userRolesStr = (items: any) => items.map((item: any) => item.role);
    const userFirstname = (items: any) => (items.length > 0 ? items[items.length - 1].given_name : "");
    const userLastname = (items: any) => (items.length > 0 ? items[items.length - 1].family_name : "");
    const userProgramsStr = (items: any) => items.map((item: any) => item.name);

    return {
      filteredUsers,
      pagination,
      handlePaginationUpdate,
      isLoading,
      error,
      personCircleOutline,
      createOutline,
      appsOutline,
      openUserProfile,
      user_id,
      isPopooverOpen,
      modalClosed,
      softModalClosed,
      _items_,
      totalCount,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height of the parent */
  padding: 16px; /* Add some padding */
}

.dynamic-grid {
  flex: 1; /* Take up remaining space */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 8px; /* Add some padding */
}

.user-cards-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Add gap between cards */
  justify-content: flex-start;
}

.user-card {
  width: 100%; /* Full width of the column */
  height: 100%; /* Full height of the column */
  margin: 0; /* Remove default margin */
}

ion-card-content {
  padding: 16px;
}

ion-card-title,
ion-card-subtitle,
ion-label h3,
ion-label p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.edit-icon {
  float: right;
  color: #5c6ac4;
  cursor: pointer;
}

.sticky-footer {
  position: sticky;
  bottom: 0;
  background: white; /* Match the background color */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10; /* Ensure footer is above other content */
}

/* Responsive adjustments */
@media (max-width: 576px) {
  ion-col {
    flex: 0 0 100%; /* Full width on small screens */
    max-width: 100%;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  ion-col {
    flex: 0 0 calc(50% - 16px); /* Two columns on medium screens */
    max-width: calc(50% - 16px);
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  ion-col {
    flex: 0 0 calc(33.333% - 16px); /* Three columns on larger screens */
    max-width: calc(33.333% - 16px);
  }
}

@media (min-width: 1024px) {
  ion-col {
    flex: 0 0 calc(25% - 16px); /* Four columns on extra-large screens */
    max-width: calc(25% - 16px);
  }
}
</style>