<template>
    <v-content>
        <v-container>
            <v-card>
                <h1 class="brand-header">
                    <span class="fa fa-sign-in"></span> Login
                </h1>
                <!-- show any messages that come back with authentication -->
                <!-- <% if (message.length > 0) { %>
                <div class="alert alert-danger"><%= message %></div>
                <% } %> -->

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
                <v-btn @click="submit">
                    Login
                </v-btn>

                <hr />
                <p>Need an account? <a href="/signup">Signup</a></p>
                <p>Or go <a href="/">home</a>.</p>
            </v-card>
        </v-container>
    </v-content>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
@Component({})
export default class Login extends Vue {
    email: string | null = null;
    password: string | null = null;
    errorMessages = [] as string[];
    async submit() {
        const { email, password } = this;
        console.log("firing", email, password);
        try {
            const response = await axios.post("/login", {
                email,
                password
            });
            console.log("response: ", response.data);
            if (response.status === 200) {
                this.$router.push({
                    name: "dashboard"
                });
            } else {
                this.errorMessages = response.data.messages;
                console.log("firinginsiedethe else", this.errorMessages);
            }
        } catch (error) {
            this.errorMessages = [
                "You have entered an incorrect username/password.  Please try again."
            ];
            console.log("error: ", error);
        }
    }
}
</script>

<style lang="scss" scoped></style>
