<script setup lang="ts">
  import { api } from '@/api/axios';
  import ListItemVisualization from './ListItemVisualization.vue';
  import CreateList from './CreateList.vue'
</script>

<template>
  <v-container :max-width="setWidth">
    <v-row no-gutters>
      <v-col
        v-if="getType === 1"
        class="pa-2"
        cols="12"
        sm="12"
        md="6"
        xl="4"
      >
        <v-card height="84px" class="d-flex justify-center align-center rounded-ts-xl" variant="outlined" @click="handleOpenListCreation()">
          <v-icon
            icon="mdi-plus-circle"
            size="x-large"
          />
        </v-card>
      </v-col>
      <v-col
        v-for="item in visibleLists" 
        class="pa-2"
        :key="item.id"
        cols="12"
        sm="12"
        md="6"
        xl="4"
      >
        <v-card class="pa-3 rounded-ts-xl bg-blue" @click.stop="handleOpenDialog(item)">
          <h2>{{ item.title }}</h2>
          <h4 class="text-truncate" width="100%">
            {{ item.description }}
          </h4>
          <p>Criada por: {{ item.user.firstName }} {{ item.user.lastName }}</p>
        </v-card>
      </v-col>
    </v-row>

    <v-pagination
      v-if="lists.length > 0 "
      v-model="pagination.page"
      :length="paginationLength"
      :total-visible="pagination.totalVisible"
    />

    <ListItemVisualization 
      v-bind:open-dialog="openDialog" 
      v-bind:list-details="dialogList"
      v-bind:list-items="dialogItems"
      v-bind:type="getType"
      @update-list="fetchData()"
      @closeModal="handleCloseDialog()"
    />

    <CreateList
      v-bind:open-dialog="openListCreation"
      @update-list="fetchData()"
      @close-modal="handleOpenListCreation()"
    />

  </v-container>
</template>

<script lang="ts">
  import _ from 'underscore'

  export default {
    data(){
      return {
        lists: [] as List[],
        dialogList: {},
        dialogItems: [],
        openDialog: false,
        openListCreation: false,
        pagination: {
          length: 2,
          page: 1,
          totalVisible: 5,
          perPage: 14
        }
      }
    },
    async beforeMount() {
      await this.fetchData()
    },
    components: {
        ListItemVisualization,
        CreateList
    },
    props: {
      type: Number
    },
    methods: {
      async fetchData() {
        await api.get((this.type === 1? '/list': '/list/shared'))
        .then((res) => {
          this.lists = res.data
        })
        .catch(console.log)
      },
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
    },
    computed: {
      visibleLists () {
        return this.lists.slice((this.pagination.page - 1)* this.pagination.perPage, this.pagination.page* this.pagination.perPage)
      },
      paginationLength() {
        return Math.ceil(this.lists.length / this.pagination.perPage)
      },
      getType() {
        return this.type
      },
      setWidth():string {
        if(this.$vuetify.display.xxl) {
            return '45%'
        }
        if(this.$vuetify.display.md) {
            return '85%'
        }
        if(this.$vuetify.display.mobile) {
            return '100%'
        }
        return '60%'
      }
    }
  }
</script>
