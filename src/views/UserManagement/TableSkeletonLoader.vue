<!-- TableSkeletonLoader.vue -->
<template>
    <div class="skeleton-wrapper">
        <!-- Search and Add User Bar -->
        <div class="search-bar">
            <div class="search-container">
                <div class="search-label skeleton-text"></div>
                <div class="search-chip"></div>
                <div class="add-button"></div>
            </div>
        </div>
        
        <!-- Cards Grid -->
        <div class="cards-grid">
            <div v-for="n in 6" :key="`card-${n}`" class="skeleton-card">
                <!-- Header with role and name -->
                <div class="card-header">
                    <div class="role-text small-skeleton"></div>
                    <div class="name-text large-skeleton"></div>
                </div>
                
                <!-- Card content -->
                <div class="card-content">
                    <div class="info-row" v-for="field in 4" :key="`field-${field}`">
                        <div class="label-skeleton"></div>
                        <div class="value-skeleton"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TableSkeletonLoader'
})
</script>

<style scoped>
.skeleton-wrapper {
    padding: 1rem;
    width: 100%;
}

.search-bar {
    margin-bottom: 2rem;
    padding: 0.5rem;
}

.search-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.search-label {
    width: 80px;
    height: 20px;
}

.search-chip {
    width: 120px;
    height: 32px;
    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    border-radius: 16px;
    animation: shimmer 1.5s infinite;
}

.add-button {
    width: 100px;
    height: 36px;
    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    border-radius: 4px;
    margin-left: auto;
    animation: shimmer 1.5s infinite;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
}

.skeleton-card {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #eee;
}

.card-header {
    margin-bottom: 1rem;
}

.small-skeleton {
    height: 14px;
    width: 140px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.large-skeleton {
    height: 20px;
    width: 180px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.label-skeleton {
    height: 16px;
    width: 80px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

.value-skeleton {
    height: 16px;
    width: 120px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

@media (max-width: 768px) {
    .cards-grid {
        grid-template-columns: 1fr;
    }
}
</style>