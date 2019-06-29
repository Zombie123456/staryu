<template>
  <div>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        ></v-card-title>

        <v-card-text class="memo">
          {{ event.memo }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialog: !this.event.is_active || false
    }
  }
}
</script>

<style scoped>
.memo {
  word-break: break-all;
}
</style>
