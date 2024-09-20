<template>
    <div class="pagination-container" :class="{ 'mobile': isMobileView }">
      <div class="pagination-controls">
        <div class="items-per-page">
          <label for="itemsPerPage">Items per page:</label>
          <select id="itemsPerPage" v-model="localItemsPerPage" @change="updatePagination">
            <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="pagination-info">
          Showing {{ startItem }} - {{ endItem }} of {{ totalItems }}
        </div>
        <div class="page-nav">
          <label for="currentPage">Page</label>
          <select id="currentPage" v-model="localCurrentPage" @change="updatePagination">
            <option v-for="page in totalPages" :key="page" :value="page">
              {{ page }}
            </option>
          </select>
          of {{ totalPages }}
        </div>
      </div>
      <div class="navigation-buttons">
        <button @click="previousPage" :disabled="localCurrentPage === 1" class="nav-button prev" aria-label="Previous page">
          &lt;
        </button>
        <button @click="nextPage" :disabled="localCurrentPage === totalPages" class="nav-button next" aria-label="Next page">
          &gt;
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, watch, onMounted, onUnmounted } from 'vue';
  
  interface PaginationUpdateEvent {
    page: number;
    itemsPerPage: number;
  }
  
  export default defineComponent({
    name: 'bottomNavBar',
    props: {
      totalItems: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      },
      itemsPerPage: {
        type: Number,
        required: true
      }
    },
    emits: ['update:pagination'],
    setup(props, { emit }) {
      const localCurrentPage = ref(props.currentPage);
      const localItemsPerPage = ref(props.itemsPerPage);
      const itemsPerPageOptions = [10, 20, 30, 50];
      const isMobileView = ref(false);
  
      const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / localItemsPerPage.value)));
      const startItem = computed(() => props.totalItems === 0 ? 0 : (localCurrentPage.value - 1) * localItemsPerPage.value + 1);
      const endItem = computed(() => Math.min(localCurrentPage.value * localItemsPerPage.value, props.totalItems));
  
      watch(() => props.currentPage, (newValue) => {
        localCurrentPage.value = newValue;
      });
  
      watch(() => props.itemsPerPage, (newValue) => {
        localItemsPerPage.value = newValue;
      });
  
      const updatePagination = () => {
        emitUpdate();
      };
  
      const previousPage = () => {
        if (localCurrentPage.value > 1) {
          localCurrentPage.value--;
          emitUpdate();
        }
      };
  
      const nextPage = () => {
        if (localCurrentPage.value < totalPages.value) {
          localCurrentPage.value++;
          emitUpdate();
        }
      };
  
      const emitUpdate = () => {
        emit('update:pagination', {
          page: localCurrentPage.value,
          itemsPerPage: localItemsPerPage.value
        } as PaginationUpdateEvent);
      };
  
      const checkMobileView = () => {
        isMobileView.value = window.innerWidth <= 768;
      };
  
      onMounted(() => {
        checkMobileView();
        window.addEventListener('resize', checkMobileView);
      });
  
      onUnmounted(() => {
        window.removeEventListener('resize', checkMobileView);
      });
  
      return {
        localCurrentPage,
        localItemsPerPage,
        itemsPerPageOptions,
        totalPages,
        startItem,
        endItem,
        updatePagination,
        previousPage,
        nextPage,
        isMobileView
      };
    }
  });
  </script>
  
  <style scoped>
  .pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f8f8;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    font-size: 14px;
  }
  
  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .items-per-page, .pagination-info, .page-nav {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    font-size: 14px;
  }
  
  .navigation-buttons {
    display: flex;
    gap: 10px;
  }
  
  .nav-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .nav-button:hover:not(:disabled) {
    background-color: #45a049;
  }
  
  .nav-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .prev {
    margin-right: 5px;
  }
  
  .next {
    margin-left: 5px;
  }
  
  /* Mobile layout */
  .pagination-container.mobile {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  
  .pagination-container.mobile .pagination-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .pagination-container.mobile .items-per-page,
  .pagination-container.mobile .pagination-info,
  .pagination-container.mobile .page-nav {
    width: 100%;
    justify-content: space-between;
  }
  
  .pagination-container.mobile .navigation-buttons {
    justify-content: space-between;
    width: 100%;
  }
  
  .pagination-container.mobile .nav-button {
    flex: 1;
  }
  
  /* Adjustments for very small screens */
  @media (max-width: 480px) {
    .pagination-container {
      padding: 10px;
      font-size: 12px;
    }
  
    .pagination-container.mobile .items-per-page,
    .pagination-container.mobile .pagination-info,
    .pagination-container.mobile .page-nav {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
  
    .pagination-container.mobile select {
      width: 100%;
      font-size: 12px;
    }
  
    .nav-button {
      font-size: 16px;
      padding: 3px 8px;
    }
  }
  </style>