<template>
    <div class="container">
        <div class="text-center" id="previewBox">
            <h1>Dashboard</h1>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
    // mounted() {
    //     const setDynamicCss = () => {
    //         let parent = document.querySelector(
    //                 ".ratingButtons"
    //             ) as HTMLElement,
    //             preview = document.querySelector(
    //                 ".previewRating"
    //             ) as HTMLElement,
    //             child1 = document.querySelector(".ratingLogin") as HTMLElement,
    //             child2 = document.querySelector(".ratingSignup") as HTMLElement,
    //             totalWidth = parent.offsetWidth,
    //             previewWidth = preview.offsetWidth;
    //         [child1, child2].forEach(
    //             child => (child.style.width = `${totalWidth - previewWidth}px`)
    //         );
    //     };
    //     window.onload = setDynamicCss() as any;
    //     window.addEventListener("resize", setDynamicCss);
    // }
})
export default class Dashboard extends Vue {}
</script>

<style></style>
