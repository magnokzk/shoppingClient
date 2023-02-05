<template>
    <v-form v-on:submit.prevent="submit">
        <v-container>
            <v-row>
                <v-text-field
                    v-model="email"
                    label="email"
                />
            </v-row>

            <v-row>
                <v-text-field
                    v-model="password"
                    label="password"
                    type="password"
                />
            </v-row>

            <v-row>
                <v-btn
                    class="mr-10 ml-10"
                    type="submit"
                >
                    Entrar
                </v-btn>

                <v-btn @click="handleReset" class="ml-10 mr-10">
                    Limpar
                </v-btn>
            </v-row>
        </v-container>
    </v-form>
    <form @submit.prevent="submit">
        
    </form>
</template>

<script lang="ts">
    import { api } from '../api/axios'

    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            async submit() {
                await api.post('/login', {
                    email: this.email,
                    password: this.password
                }).then((res) => {
                    localStorage.setItem('token', res.data?.token)
                    this.$router.push({name: 'home'})
                }).catch((err) => {
                    console.log('error: ', err)
                })
                console.log(this.email, this.password)
            },
            handleReset() {
                this.email      = ''
                this.password   = ''
            }
        }
    }
</script>