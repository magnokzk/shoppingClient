<script setup lang="ts">
  import { api } from '@/api/axios';
</script>

<template>
    <v-dialog v-model="showDialog" :max-width="setWidth" :persistent="true">
        <v-card>
            <v-card-title>
                <span class="text-h5">Aceitar compartilhamento de lista</span>
            </v-card-title>

            <v-card-text>
                Ao aceitar, você estará ganhando permissões para visualizar e editar a lista de XX
            </v-card-text>

            <v-card-actions class="justify-end">
                <v-btn color="red" flat @click.stop="handleClose">Cancelar</v-btn>
                <v-btn color="green" flat @click.stop="handleAccept">Aceitar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import _ from 'underscore'

  export default {
    data() {
        return {
            
        };
    },
    props: {
        openDialog: Boolean,
        token: String
    },
    methods: {
        updateList() {
            this.$emit('update-list')
        },
        handleClose() {
            this.$emit('close-modal')
        },
        async handleAccept() {
            await api.post('/share/accept', {
                token: this.getToken
            }).then((res) => {
                console.log(res)
                this.handleClose()
            }).catch((err) => {
                console.log(err)
                alert('Não foi possível aceitar o compartilhamento. Tente novamente mais tarde!')
                this.handleClose()
            })
        }
    },
    computed: {
        showDialog: {
            get(): boolean {
                return this.openDialog;
            },
            set(value: Boolean) {
                if(!value){
                    this.$emit("close-modal", value);
                }
            }
        },
        getToken():any {
            return this.token
        },
        setWidth():string {
            if(this.$vuetify.display.xxl) {
                return '35%'
            }
            if(this.$vuetify.display.md) {
                return '65%'
            }
            if(this.$vuetify.display.mobile) {
                return '100%'
            }
            return '50%'

        }
    }
}
</script>
