<template>

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
      <ion-row v-else>
        <ion-col size-xs="12" size-sm="6" size-md="4" size-lg="3" v-for="user in paginatedUsers" :key="user.userid">
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle>{{ user.roles.join(', ') }}</ion-card-subtitle>
              <ion-card-title>{{ user.firstName }} {{ user.lastName }}</ion-card-title>
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
                    <h3>Programs</h3>
                    <p>{{ user.programs.join(', ') }}</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>


  <ion-footer collapse="fade">
    <ion-row>
      <ion-col>
        <bottomNavBar
          v-if="showNavBar"
          style="margin-left: 20px; margin-right: 20px;"
          :totalItems="usersCopy.length"
          :currentPage="pagination.page"
          :itemsPerPage="pagination.itemsPerPage"
          @update:pagination="handlePaginationUpdate"
        />
      </ion-col>
    </ion-row>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, watch, onMounted } from 'vue';
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
} from '@ionic/vue';

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
  },
  props: {
    users: {
      type: Array as () => User[],
      required: true,
    },
  },
  setup(props) {
    const pagination = reactive({
      page: 1,
      itemsPerPage: 6
    });
    const usersCopy = ref([]) as any;
    const isLoading = ref(true);
    const error = ref('');

    const handlePaginationUpdate = ({ page, itemsPerPage }: { page: number, itemsPerPage: number }) => {
      pagination.page = page;
      pagination.itemsPerPage = itemsPerPage;
    };

    const paginatedUsers = computed(() => {
      const start = (pagination.page - 1) * pagination.itemsPerPage;
      const end = start + pagination.itemsPerPage;
      return props.users.slice(start, end);
    });

    const showNavBar = ref(false);

    watch(() => props.users, (newUsers) => {
      console.log('Users updated. Received users:', newUsers);
      isLoading.value = false;
      showNavBar.value = newUsers.length > 0;
      usersCopy.value = newUsers;
      
      if (newUsers.length === 0) {
        error.value = 'No users data received.';
      } else {
        error.value = '';
      }
    }, { immediate: true });

    onMounted(() => {
      console.log('Component mounted. Initial users:', props.users);
    });

    return {
      pagination,
      handlePaginationUpdate,
      paginatedUsers,
      users: props.users,
      showNavBar,
      usersCopy,
      isLoading,
      error,
    };
  }
});
</script>

<style scoped>
ion-card {
  margin-bottom: 1rem;
}

ion-card-content {
  padding-top: 0;
}

ion-list {
  padding: 0;
}

@media (max-width: 576px) {
  ion-card-title {
    font-size: 1.2rem;
  }
  
  ion-card-subtitle {
    font-size: 0.9rem;
  }
}
.dynamic-grid {
  max-height: calc(69vh - 1px);
  overflow: auto;
}
</style>