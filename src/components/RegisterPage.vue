<template>
    <v-sheet :max-width="setWidth" class="mx-auto">
        <v-card class="d-flex justify-center">
            <div class="text-h3 pa-5">Cadastro</div>
        </v-card>
        <v-card class="pa-5 mt-5">
            <v-form v-on:submit.prevent="submit">
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                variant="outlined"
                                v-model="firstName"
                                label="Nome"
                            />
                        </v-col>

                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                variant="outlined"
                                v-model="lastName"
                                label="Sobrenome"
                            />
                        </v-col>

                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                variant="outlined"
                                v-model="email"
                                label="Email"
                                type="email"
                            />
                        </v-col>

                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                variant="outlined"
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
                                Registrar-se
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
                        <v-btn width="100%" @click="redirectTo('login')">
                            Realizar login
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
    import { api } from '../api/axios'

    export default {
        data() {
            return {
                firstName: '',
                lastName : '',
                email    : '',
                password : ''
            }
        },
        methods: {
            async submit() {
                await api.post('/register', {
                    firstName: this.firstName,
                    lastName : this.lastName,
                    email    : this.email,
                    password : this.password
                }).then(() => {
                    this.redirectTo('login')
                    this.handleReset()
                }).catch((err) => {
                    console.log('error: ', err)
                })
            },
            redirectTo(routeName:string) {
                this.$router.push({name: routeName})
            },
            handleReset() {
                this.firstName = ''
                this.lastName  = ''
                this.email     = ''
                this.password  = ''
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