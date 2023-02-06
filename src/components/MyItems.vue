<script setup lang="ts">
  import { api } from '@/api/axios';
  import ListItemVisualization from './ListItemVisualization.vue';
  import CreateList from './CreateList.vue'
</script>

<template>
  <v-container v-if="lists.length > 0">
    <v-row no-gutters>
      <v-col
        class="pa-2"
        cols="12"
        sm="12"
        md="6"
        xl="4"
      >
        <v-card height="84px" class="d-flex justify-center align-center" variant="outlined" @click="handleOpenListCreation()">
          <v-icon
            icon="mdi-plus-circle"
            size="x-large"
          />
        </v-card>
      </v-col>
      <v-col
        v-for="item, index in lists" 
        class="pa-2"
        :key="index"
        cols="12"
        sm="12"
        md="6"
        xl="4"
      >
        <v-card class="pa-3" @click.stop="handleOpenDialog(item)">
          <h2>{{ item.title }}</h2>
          <h4>{{ item.description }}</h4>
          <p>Criada por: {{ item.user.firstName }} {{ item.user.lastName }}</p>
        </v-card>
      </v-col>
    </v-row>

    <ListItemVisualization 
      v-bind:open-dialog="openDialog" 
      v-bind:list-details="dialogList"
      v-bind:list-items="dialogItems"
      @closeModal="handleCloseDialog()"
    />

    <CreateList
      v-bind:open-dialog="openListCreation"
      @closeModal="handleOpenListCreation()"
    />


  </v-container>

  <v-container v-else>
    <v-card class="pa-3">
      <h1>Nenhuma lista encontrada</h1>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import _ from 'underscore'

  export default {
    data(){
      return {
        lists: [] as any[],
        dialogList: {},
        dialogItems: [],
        openDialog: false,
        openListCreation: false
      }
    },
    async beforeMount() {
      await api.get('/list')
        .then((res) => {
          this.lists = res.data
        })
        .catch(console.log)
    },
    components: {
        ListItemVisualization,
        CreateList
    },
    methods: {
      handleOpenDialog(item:any) {
        this.openDialog = true,
        this.dialogList = item
        this.dialogItems = item.items
      },
      handleCloseDialog() {
        this.openDialog = false,
        this.dialogList = {}
        this.dialogItems = []
      },
      handleOpenListCreation() {
        this.openListCreation = !this.openListCreation
      },
      createListDialog() {
        alert("caiu")
      },
      getListItems(item:any) {
        return item.items
      },
      getUncheckedItemsInList(item:any) {
        return (_.countBy(item, (val) => {
          return !(val.checked)
        })).true
      }
    }
  }
</script>
