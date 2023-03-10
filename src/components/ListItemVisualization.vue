<script setup lang="ts">
    import { api } from '../api/axios'
    import ItemExpansionPanels from './ItemExpansionPanels.vue';
    import CreateShareLink from './CreateSharelink.vue'
</script>

<template>
    <v-dialog v-model="showDialog" :max-width="setWidth" :persistent="true">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ getListDetails.title }}</span>
            </v-card-title>

            <v-card-text>
                <v-card>
                    <v-card-title width="100%">
                        Descrição 
                    </v-card-title>

                    <v-card-text class="text-justify">
                        {{ getListDetails.description }}
                    </v-card-text>
                </v-card>
            </v-card-text>

            <v-card-text>
                <v-card>
                    <v-card-title>Itens</v-card-title>
                    <v-card-text>
                        <ItemExpansionPanels
                            v-bind:list-items="getListItems"
                            @update-list="updateList()"
                        />
                    </v-card-text>
                </v-card>
            </v-card-text>

            <v-card-actions class="justify-end">
                <v-btn color="red" @click.stop="handleListDelete" v-if="getType === 1"> <v-icon icon="mdi-delete"/> </v-btn>
                <v-btn color="black" @click.stop="handleOpenShareDialog()" v-if="getType === 1"> <v-icon icon="mdi-share"/> </v-btn>
                <v-btn color="black" @click.stop="showDialog=false"> <v-icon icon="mdi-check"/> </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <CreateShareLink
        v-bind:open-dialog="openShareDialog"
        v-bind:list="listIdShare"
        @closeModal="handleCloseShareDialog()"
    />

    <v-snackbar
      v-model="snackBar.open"
      timeout="3000"
      :color="snackBar.color"
      location="right"
    >
      {{ snackBar.message }}

      <template v-slot:actions>
        <v-btn
          color="black"
          @click="snackBar.open = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script lang="ts">

    export default {
        data() {
            return {
                openShareDialog: false,
                listIdShare: -1 as number,
                snackBar: {
                    open: false,
                    message: '',
                    color: ''
                }
            }
        },
        props: {
            openDialog: Boolean,
            listDetails: Object,
            listItems: Array,
            type: Number
        },
        components: {
            ItemExpansionPanels,
            CreateShareLink
        },
        methods: {
            updateList() {
                this.$emit('update-list')
            },
            handleOpenShareDialog() {
                this.listIdShare = this.getListDetails.id
                this.openShareDialog = true
            },
            handleCloseShareDialog() {
                this.listIdShare = -1
                this.openShareDialog = false
            },
            handleListDelete() {
                api.delete('/list', {
                    data: this.getListDetails
                }).then(() => {
                    this.snackBar = {
                        open: true,
                        message: 'Lista removida com sucesso!',
                        color: 'green'
                    }
                    this.updateList()
                    this.$emit("close-modal")
                }).catch(() => {
                    this.snackBar = {
                        open: true,
                        message: 'Ops! Ocorreu um problema, tente novamente mais tarde.',
                        color: 'red'
                    }
                    this.$emit("close-modal")
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
            getListDetails(): any {
                return this.listDetails;
            },
            getListItems(): any {
                return this.listItems;
            },
            getType() {
                return this.type
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
