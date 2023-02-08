<script setup lang="ts">
  import { api } from '@/api/axios';
  import ItemExpansionPanels from './ItemExpansionPanels.vue';
</script>

<template>
    <v-dialog v-model="showDialog" :max-width="setWidth" :persistent="true">
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
                        <v-text-field label="Título" v-model="listInputTitle" :disabled="!isListEmpty"/>
                        <v-textarea label="Descrição" v-model="listInputDescription" :disabled="!isListEmpty"/>
                        <v-btn class="mb-2" color="green" @click="createList" v-if="isListEmpty" prepend-icon="mdi-content-save">Criar</v-btn>
                    </v-window-item>

                    <v-window-item value="two">
                        <v-text-field label="Nome" v-model="itemInputName"/>
                        <v-textarea label="Descrição" v-model="itemInputDescription"/>
                        <v-btn class="mb-5" color="green" width="100%" @click="insertItem" prepend-icon="mdi-plus" :disabled="isInsertDisabled">Inserir</v-btn>

                        <ItemExpansionPanels
                            v-if="itemList.length > 0"
                            v-bind:list-items="itemList"
                            @update-list="updateList()"
                        />
                    </v-window-item>
                </v-window>
            </v-card-text>

            <v-card-actions class="justify-end">
                <v-btn color="black" flat @click.stop="handleClose">{{isListEmpty? 'Fechar' : 'Finalizar'}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import _ from 'underscore'

  export default {
    data() {
        return {
            tab                  : '',
            listInputTitle       : '',
            listInputDescription : '',
            itemInputName        : '',
            itemInputDescription : '',
            createdList          : {} as List,
            itemList             : [] as Item[]
        };
    },
    props: {
        openDialog: Boolean
    },
    methods: {
        clearData() {
            this.tab                  = ''
            this.listInputTitle       = ''
            this.listInputDescription = ''
            this.createdList          = {} as List
            this.itemList             = [] as Item[]
            this.clearItemInputs()
        },
        clearItemInputs() {
            this.itemInputName        = ''
            this.itemInputDescription = ''
        },
        createList() {
            api.post('/list/create', {
                title: this.listInputTitle,
                description: this.listInputDescription
            },
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then((res:any) => {
                this.createdList = res.data
                this.tab = 'two'
                this.updateList()
            })
        },
        insertItem(){
            api.post('/item/create', {
                list_id: this.createdList.id,
                name: this.itemInputName,
                description: this.itemInputDescription
            },
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then((res:any) => {
                this.itemList.push(res.data)
                this.clearItemInputs()
                this.updateList()
            })
        },
        updateList() {
            this.$emit('update-list')
        },
        handleClose() {
            this.showDialog=false
            _.delay(this.clearData, '200')
        }
    },
    components: {
        ItemExpansionPanels
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
        isListEmpty() {
            return _.isEmpty(this.createdList)
        },
        isInsertDisabled() {
            return (this.itemInputName == '' || this.itemInputDescription == '')
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
