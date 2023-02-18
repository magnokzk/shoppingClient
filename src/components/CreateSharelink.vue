<script setup lang="ts">
  import { api } from '@/api/axios';
</script>

<template>
    <v-dialog v-model="showDialog" :max-width="setWidth" :persistent="true">
        <v-card>
            <v-card-title>
                <span class="text-h5">Gerar link para compartilhamento</span>
            </v-card-title>

            <v-card-text v-if="!generated">
                Ao aceitar, você estará gerando um link de compartilhamento onde você forenecerá acesso desta lista a outras pessoas.
            </v-card-text>
            <v-card-text v-else>
                Link gerado com sucesso! Agora você pode passar esse link para seus amigos terem acesso a lista que você criou.
                Eles poderão editar e completar itens, mas não poderão recompartilhar nem editar a lista.
                Este link não é reutilizável.
                <v-card variant="tonal" class="pa-5 mt-5" @click="copyLink()">
                    <v-icon icon="mdi-content-copy"></v-icon> {{ generatedToken }} 
                </v-card>
            </v-card-text>

            <v-card-actions class="justify-end" v-if="!generated">
                <v-btn color="red" flat @click.stop="handleClose">Cancelar</v-btn>
                <v-btn color="green" flat @click.stop="handleAccept">Aceitar</v-btn>
            </v-card-actions>
            <v-card-actions class="justify-end" v-else>
                <v-btn color="black" flat @click.stop="handleClose">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import _ from 'underscore'

  export default {
    data() {
        return {
            generated: false,
            showCopyIcon: false,
            generatedToken: ''
        };
    },
    props: {
        openDialog: Boolean,
        list: Number
    },
    methods: {
        copyLink() {
            navigator.clipboard.writeText(this.generatedToken);
        },
        updateList() {
            this.$emit('update-list')
        },
        handleClose() {
            this.$emit('close-modal')
        },
        async handleAccept() {
            await api.post('/share/create', {
                list_id: this.getListId
            }).then((res) => {
                console.log(res)
                this.generatedToken = (window.location.origin + this.$route.path + `?token=${res.data.token}`)
                this.generated = true
            }).catch((err) => {
                console.log(err)
                alert('Não foi possível gerar o compartilhamento. Tente novamente mais tarde!')
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
        getListId():number {
            return this.list as number
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
