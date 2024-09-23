<template>
  <ion-grid class="dynamic-grid">
    <ion-row>
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
import { defineComponent, reactive, computed, ref, watch } from 'vue';
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
    const usersCopy = ref([]) as any

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
      showNavBar.value = newUsers.length > 0;
      usersCopy.value = props.users
      console.log('Users updated. Total users:', newUsers.length, 'Show nav bar:', showNavBar.value);
    }, { immediate: true });

    return {
      pagination,
      handlePaginationUpdate,
      paginatedUsers,
      users: props.users,
      showNavBar,
      usersCopy
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
  max-height: calc(69vh - 1px); /* Adjust the 100px as necessary */
  overflow: auto;
}
</style>