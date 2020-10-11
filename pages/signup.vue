<template>
    <v-content>
        <v-container>
            <v-row justify="center" class="mt-10">
                <v-col cols="8" offset="2">
                    <v-card class="pt-10">
                        <h1 class="brand-header text-center">
                            <span class="fa fa-sign-in"></span> Create an
                            account
                        </h1>

                        <div class="form-group">
                            <label>Email:</label>
                            <v-text-field v-model="email" name="email" />
                        </div>
                        <div class="form-group">
                            <label>Password:</label>
                            <v-text-field
                                v-model="password"
                                type="password"
                                name="password"
                            />
                        </div>
                        <p
                            class="errorMessage"
                            v-for="(message, index) in errorMessages"
                            :key="index"
                        >
                            {{ message }}
                        </p>
                        <v-btn @click="submit" block class="login-button">
                            Create Account
                        </v-btn>

                        <hr />
                        <p>
                            Already have an account? Log in
                            <a href="/login"> here</a>
                        </p>
                        <p>Or go <a href="/">Home</a>.</p>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
@Component({})
export default class Signup extends Vue {
    email: string | null = null;
    password: string | null = null;
    errorMessages = [] as string[];
    async submit() {
        const { email, password } = this;
        console.log("firing", email, password);
        try {
            const response = await axios.post("/signup", {
                email,
                password
            });
            console.log("response: ", response);
            if (response.data.status === 200) {
                this.$router.push({
                    name: "dashboard"
                });
            } else {
                this.errorMessages = response.data.messages;
                console.log("firinginsiedethe else", this.errorMessages);
            }
        } catch (error) {
            this.errorMessages = [
                "There has been an error with your request. Please try again."
            ];
            console.log("error: ", error);
        }
    }
}
</script>

<style lang="scss" scoped>
.login-button {
    background: rgb(153, 35, 35) !important;
    color: white;
}
.v-card {
    padding: 20px;
    margin-top: 75px;
}
.v-btn {
    margin-bottom: 20px;
}
.v-text-field {
    margin-top: 0;
    padding-top: 0;
}
.brand-header {
    color: rgba(0, 0, 0, 0.7) !important;
}
</style>
