<template>
  <div class="container">
    <ion-grid class="dynamic-grid">
      <ion-row v-if="error">
        <ion-col size="12" class="ion-text-center">
          <ion-text color="danger">
            <p>{{ error }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row v-else-if="isLoading">
        <ion-col size="12" class="ion-text-center">
          <ion-spinner name="circular"></ion-spinner>
          <p>Loading users...</p>
        </ion-col>
      </ion-row>
      <ion-row v-else-if="paginatedUsers.length === 0">
        <ion-col size="12" class="ion-text-center">
          <p>No users found.</p>
        </ion-col>
      </ion-row>
      <ion-row v-else class="user-cards-row">
        <ion-col size-xs="12" size-sm="6" size-md="4" size-lg="3" v-for="user in paginatedUsers" :key="user.userId">
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle>
                <ion-icon :icon="personCircleOutline" size="small" style="margin-bottom: -3px;"></ion-icon>
                {{ user.roles.join(', ') }}
              </ion-card-subtitle>
              <ion-card-title>
                {{ user.firstName }} {{ user.lastName }}
                <ion-icon @click="openUserProfile(user.userId)" :icon="createOutline" size="small" class="edit-icon"></ion-icon>
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
                    <p>{{ user.programs.join(', ') }}</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>

  <ion-footer collapse="fade">
    <ion-row>
      <ion-col style="flex: none; max-width: 100%">
        <bottomNavBar
          v-if="showNavBar"
          style="margin-left: 20px; margin-right: 20px;"
          :totalItems="filteredUsers.length"
          :currentPage="pagination.page"
          :itemsPerPage="pagination.itemsPerPage"
          @update:pagination="handlePaginationUpdate"
        />
      </ion-col>
    </ion-row>
  </ion-footer>

  <editUserModal 
    :is_open="isPopooverOpen" 
    :user_id="user_id" 
    @close-popoover="modalClosed" 
  />
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, watch, onMounted } from 'vue';
import editUserModal from "../views/UserManagement/editUserModal.vue";
import bottomNavBar from "@/apps/Immunization/components/bottomNavBar.vue";
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
} from '@ionic/vue';
import { personCircleOutline, createOutline, appsOutline } from 'ionicons/icons';

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
  name: 'UserCardList',
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
    }
  },
  setup(props) {
    const isPopooverOpen = ref(false);
    const pagination = reactive({
      page: 1,
      itemsPerPage: 6
    });
    const isLoading = ref(true);
    const error = ref('');
    const user_id = ref("") as any;

    const filteredUsers = computed(() => {
      if (!props.filterValue) return props.users;
      return props.users.filter(user => 
        user.username.toLowerCase().includes(props.filterValue.toLowerCase()) ||
        user.firstName.toLowerCase().includes(props.filterValue.toLowerCase()) ||
        user.lastName.toLowerCase().includes(props.filterValue.toLowerCase())
        // user.lastName.toLowerCase().includes(props.filterValue.toLowerCase()) ||
        // user.userId.toLowerCase().includes(props.filterValue.toLowerCase())
      );
    });

    const paginatedUsers = computed(() => {
      const start = (pagination.page - 1) * pagination.itemsPerPage;
      const end = start + pagination.itemsPerPage;
      return filteredUsers.value.slice(start, end);
    });

    const showNavBar = computed(() => filteredUsers.value.length > 0);

    const handlePaginationUpdate = ({ page, itemsPerPage }: { page: number, itemsPerPage: number }) => {
      pagination.page = page;
      pagination.itemsPerPage = itemsPerPage;
    };

    watch(() => props.users, (newUsers) => {
      isLoading.value = false;
      if (newUsers.length === 0) {
        error.value = 'No users data received.';
      } else {
        error.value = '';
      }
    }, { immediate: true });

    watch(() => props.filterValue, () => {
      pagination.page = 1; // Reset to first page when filter value changes
    });

    onMounted(() => {
      // 
    });

    const openUserProfile = (userId: string) => {
      isPopooverOpen.value = true;
      user_id.value = userId;
    };

    const modalClosed = () => {
      isPopooverOpen.value = false;
    };

    return {
      filteredUsers,
      pagination,
      handlePaginationUpdate,
      paginatedUsers,
      showNavBar,
      isLoading,
      error,
      personCircleOutline,
      createOutline,
      appsOutline,
      openUserProfile,
      user_id,
      isPopooverOpen,
      modalClosed,
    };
  },
});
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.dynamic-grid {
  max-height: calc(69vh - 1px);
  overflow: auto;
}

.user-cards-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

ion-card {
  min-width: 250px;
  width: 37%;
  margin-right: auto;
}

ion-card-content {
  padding: 16px;
}

ion-card-title, ion-card-subtitle, ion-label h3, ion-label p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-cards-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

@media (min-width: 768px) {
  ion-col {
    flex: 0 0 calc(50% - 20px);
    max-width: calc(50% - 20px);
  }
}

@media (min-width: 1024px) {
  ion-col {
    flex: 0 0 calc(33.333% - 20px);
    max-width: calc(33.333% - 20px);
  }
}

@media (min-width: 1200px) {
  ion-col {
    flex: 0 0 calc(25% - 20px);
    max-width: calc(25% - 20px);
  }
}

ion-list {
  padding: 0;
}

.edit-icon {
  float: right;
  color: #5c6ac4;
  cursor: pointer;
}

@media (max-width: 576px) {
  ion-card-title {
    font-size: 1.2rem;
  }
  
  ion-card-subtitle {
    font-size: 0.9rem;
  }
}

/* Center grid contents on larger screens */
@media (min-width: 1024px) {
  .container {
    padding: 0;
  }

  .user-cards-row {
    justify-content: center;
  }

  ion-col {
    flex: 0 0 calc(25% - 20px);
    max-width: calc(25% - 20px);
    margin-right: auto;
    margin-left: 10px;
  }
}
</style>