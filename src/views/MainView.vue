<script setup lang="ts">
  import MyItems from '../components/MyItems.vue'
  import AcceptSharedList from '../components/AcceptSharedList.vue'
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
              <MyItems
                v-bind:type="1"
              />
            </v-window-item>

            <v-window-item value="two">
              <MyItems
                v-bind:type="2"
              />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
      <AcceptSharedList
        v-bind:open-dialog="openShareAcceptDialog"
        v-bind:token="shareAcceptToken"
        @closeModal="closeAcceptedShare()"
      />
</template>

<script lang="ts">
  export default{
    data(){
      return {
        tab: null,
        openShareAcceptDialog: false,
        shareAcceptToken: ''
      }
    },
    created() {
      const tokenShareParam = this.$route.query.token as string
      if(tokenShareParam) {
        this.shareAcceptToken = tokenShareParam
        this.openShareAcceptDialog = true
      }
    },
    methods: {
      closeAcceptedShare() {
        this.openShareAcceptDialog = false
        this.shareAcceptToken = ''
        this.$router.replace('/')
      }
    },
    components: {
      AcceptSharedList
    }
  }
</script>
