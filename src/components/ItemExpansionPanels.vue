<script setup lang="ts">
  import { api } from '@/api/axios';
  import _ from 'underscore'
</script>

<template>
    <v-expansion-panels class="mb-1">
        <v-expansion-panel
            v-if="getListItems.length > 0"
            v-for="item in getListItems"
            :key="item.id"
        >
            <v-expansion-panel-title expand-icon="mdi-menu-down" disable-icon-rotate>
                {{ item.name }}
                <template v-slot:actions="{ expanded }">
                    <v-btn 
                        size="x-small"
                        :color="item.checked? (!expanded ? 'green' : ''): (!expanded ? 'red' : '')" 
                        :icon="item.checked? (expanded ? 'mdi-pencil' : 'mdi-check'): (expanded ? 'mdi-pencil' : 'mdi-close')"
                    />
                </template>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
                <v-row no-gutters>
                    <v-col
                        class="pa-1"
                        cols="12"
                        lg="9"
                        md="9"
                        sm="12"
                        xs="12"
                    >
                        <v-card class="pa-2" height="100%" min-height="200px" v-if="!editionEnabled">
                            {{ item.description }}
                        </v-card>
                        <v-textarea 
                            label="Modo edição ativado" v-else 
                            v-model="descriptionEdit"
                            variant="solo"
                            auto-grow
                        />
                        <v-btn 
                            v-if="editionEnabled"
                            prepend-icon="mdi-pencil"
                            variant="outlined"
                            color="success"
                            @click="updateItem(item)"
                        >
                            Salvar
                        </v-btn>
                    </v-col>
                    <v-col
                        class="pl-5"
                        cols="12"
                        lg="3"
                        md="3"
                        sm="12"
                        xs="12"
                    >
                        <v-switch 
                            label="Concluído" 
                            color="green" 
                            v-model="item.checked"
                            :disabled="editionEnabled"
                            @change="updateItem(item)"
                        />
                        <v-switch label="Editar" 
                            color="blue" 
                            v-model="editionEnabled"
                            @change="handleEditArea(item)"
                        />
                    </v-col>
                </v-row>
            </v-expansion-panel-text>
        </v-expansion-panel>

        <v-card v-else width="100%" style="text-align: center;">
            <h2 class="pa-10">Lista vazia</h2>
        </v-card>
    </v-expansion-panels>
    <v-snackbar
      v-model="toggleSnackbar"
      timeout="3000"
      color="red"
    >
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn
          color="black"
          @click="toggleSnackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script lang="ts">
    export default { 
        data() {
            return{
                editionEnabled: false,
                descriptionEdit: '',
                toggleSnackbar: false,
                snackbarText: 'Ops! Um erro ocorreu, tente novamente.',
            }
        },
        props: {
            listItems: Array
        },
        methods: {
            async updateItem(item:any) {
                const backupItem = item
                api.put('/item/update', (
                    this.editionEnabled? 
                        {
                            ...item, 
                            description: this.descriptionEdit
                        } :  item))
                    .then((res) => {
                        item.description    = res.data.description
                        item.checked        = res.data.checked
                        this.editionEnabled = false
                        this.$emit("update-list")
                    })
                    .catch(() => {
                        item = backupItem
                        this.toggleSnackbar = true
                    })
            },
            warning(item:any) {
                const originalItem = _.findWhere(this.getListItems, {id: item.id})
                item.checked = originalItem.checked

                alert('Não é possível alterar o estado em modo de edição')
            },
            handleEditArea(item:any) {
                if(this.editionEnabled){
                    this.descriptionEdit = item.description
                    return
                }
                this.descriptionEdit = ''
            }
        },
        computed: {
            getListItems():any {
                return this.listItems
            }
        }
    }
</script>