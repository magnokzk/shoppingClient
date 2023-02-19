<template>
    <v-sheet :max-width="setWidth" class="mx-auto">
        <v-card class="d-flex justify-center">
            <div class="text-h3 pa-5">ShoppingList</div>
        </v-card>
        <v-card class="pa-5 mt-5">
            <v-form v-on:submit.prevent="submit">
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                v-model="email"
                                label="Email"
                            />
                        </v-col>

                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                v-model="password"
                                label="Senha"
                                type="password"
                            />
                        </v-col>

                        <v-col
                            cols="12"
                        >
                            <v-btn
                                type="submit"
                                width="100%"
                            >
                                Entrar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>

        <v-card class="pa-5 mt-5">
            <v-container>
                <v-row>
                    <v-col>
                        <v-btn width="100%" @click="redirectTo('register')">
                            Realizar cadastro
                        </v-btn>
                    </v-col>

                    <v-col>
                        <v-btn width="100%">
                            Mais informações
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
    import { api } from '../api/axios'
    import _ from 'underscore'

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
                }).then(async (res) => {
                    api.defaults.headers.Authorization = res.data?.token
                    localStorage.setItem('token', res.data?.token)
                    this.redirectTo('home')
                }).catch((err) => {
                    console.log('error: ', err)
                })
            },
            redirectTo(routeName:string) {
                this.$router.push({name: routeName})
            },
            handleReset() {
                this.email      = ''
                this.password   = ''
            }
        },
        computed: {
            setWidth():string {
                if(this.$vuetify.display.xxl) {
                    return '25%'
                }
                if(this.$vuetify.display.md) {
                    return '50%'
                }
                if(this.$vuetify.display.mobile) {
                    return '100%'
                }
                return '50%'
            }
        }
    }
</script>