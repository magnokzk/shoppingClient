<script setup lang="ts">
  import MyItems from '../components/MyItems.vue'
</script>

<template>
      <v-card>
        <v-tabs
          v-model="tab"
          bg-color="blue"
          align-tabs="center"
        >
          <v-tab value="one">Minhas listas</v-tab>
          <v-tab value="two">Inscrições</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one">
              <MyItems/>
            </v-window-item>

            <v-window-item value="two">
              Two
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
</template>

<script lang="ts">
  export default{
    data(){
      return {
        tab: null
      }
    }
  }
</script>
