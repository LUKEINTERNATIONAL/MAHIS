import { ref, onMounted, onBeforeUnmount, type Ref } from "vue";

export function useWindowSize() {
    const screenWidth = ref(window.innerWidth);
    const screenHeight = ref(window.innerHeight);

    const updateSize = () => {
        screenWidth.value = window.innerWidth;
        screenHeight.value = window.innerHeight;
    };

    onMounted(() => {
        window.addEventListener("resize", updateSize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener("resize", updateSize);
    });

    return {
        screenWidth,
        screenHeight,
    };
}

// Types for better TypeScript support
interface WindowSize {
    screenWidth: Ref<number>;
    screenHeight: Ref<number>;
}
