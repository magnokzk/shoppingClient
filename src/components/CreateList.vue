<script setup lang="ts">
  import { api } from '@/api/axios';
</script>

<template>
    <v-dialog v-model="showDialog" max-width="50%">
        <v-card>
            <v-card-title>
                <span class="text-h5">Criar lista</span>
            </v-card-title>

            <v-card-text>
                <v-tabs
                    v-model="tab"
                >
                    <v-tab value="one">Criar lista</v-tab>
                    <v-tab value="two" :disabled="isListEmpty">Adicionar itens</v-tab>
                </v-tabs>

                <v-window v-model="tab">
                    <v-window-item value="one">
                        <v-text-field label="Título" v-model="title" :disabled="!isListEmpty"/>
                        <v-textarea label="Descrição" v-model="description" :disabled="!isListEmpty"/>
                    </v-window-item>

                    <v-window-item value="two">
                        
                    </v-window-item>
                </v-window>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" flat @click.stop="showDialog=false">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import _ from 'underscore'

  export default {
    data() {
        return {
            tab         : '',
            title       : '',
            description : '',
            createdList : {},
            itemList    : []
        };
    },
    props: {
        openDialog: Boolean
    },
    methods: {
        clearData() {
            this.tab         = ''
            this.title       = ''
            this.description = ''
            this.createdList = {}
        },
        createList() {
            api.post('/list/create')
        }
    },
    computed: {
        showDialog: {
            get(): boolean {
                return this.openDialog;
            },
            set(value: Boolean) {
                if(!value){
                    this.$emit("closeModal", value);
                }
            }
        },
        isListEmpty() {
            return _.isEmpty(this.createdList)
        }
    }
}
</script>
