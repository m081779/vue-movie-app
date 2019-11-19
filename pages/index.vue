<template>
    <div class="container">
        <div class="text-center" id="previewBox">
            <p>
                THE FOLLOWING <span class="previewBold">PREVIEW</span> HAS BEEN
                APPROVED FOR
            </p>
            <p><span class="previewBold">APPROPRIATE AUDIENCES</span></p>
            <P>BY THE MOTION PICTURE ASSOCIATION OF AMERICA, INC.</P>
            <br />
            <p>THE FILM ADVERTISED HAS BEEN RATED</p>
            <div class="ratingBox">
                <div class="previewRating">L</div>
                <div class="ratingButtons">
                    <div class="ratingLogin previewBold">
                        <a href="/login" class="">LOGIN</a>
                    </div>

                    <div class="ratingSignup">
                        NOT HAVING AN ACCOUNT REQUIRES YOU TO
                        <a href="/signup" class="signupBold">SIGN UP</a>
                    </div>
                </div>
                <div class="ratingText">
                    WATCHA-DA-MOVIE, VIEWER DISCRETION ADVISED
                </div>
                <!-- <a href="/auth/facebook" class="btn btn-primary"><span class="fa fa-facebook"></span> Login with Facebook</a> -->
            </div>
            <div class="website">
                <a href="https://marco-principio.herokuapp.com/" target="_blank"
                    >www.marcoprincipio.com</a
                >
            </div>
            <div class="github">
                <a href="https://github.com/m081779" target="_blank"
                    >https://github.com/m081779</a
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
    mounted() {
        const setDynamicCss = () => {
            let parent = document.querySelector(
                    ".ratingButtons"
                ) as HTMLElement,
                preview = document.querySelector(
                    ".previewRating"
                ) as HTMLElement,
                child1 = document.querySelector(".ratingLogin") as HTMLElement,
                child2 = document.querySelector(".ratingSignup") as HTMLElement,
                totalWidth = parent.offsetWidth,
                previewWidth = preview.offsetWidth;
            [child1, child2].forEach(
                child => (child.style.width = `${totalWidth - previewWidth}px`)
            );
        };
        window.onload = setDynamicCss() as any;
        window.addEventListener("resize", setDynamicCss);
    },
})
export default class Index extends Vue {}
</script>

<style></style>
