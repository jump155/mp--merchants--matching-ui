<template>
  <v-container flex>
    <h3>Units</h3>
    <br>
    <div v-if="units">
      <v-data-table
        :headers="headers"
        :items="units"
        class="elevation-1"
        hide-actions
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.full_name }}</td>
          <td class="text-xs-left">{{ props.item.options.join(', ') }}</td>
          <td class="text-xs-left">{{ props.item.replace }}</td>
          <td class="text-xs-left">
            <v-btn small outline color="success">edit unit</v-btn>
          </td>
        </template>
      </v-data-table>
      <v-btn outline color="success">ADD NEW UNIT</v-btn>
    </div>
    <div v-else>
    </div>
  </v-container>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'Units',
  data: () => ({
    headers: [
      { text: 'Name', value: 'full_name', sortable: false },
      { text: 'Options', value: 'options', sortable: false },
      { text: 'Replace token', value: 'replace', sortable: false },
      { text: 'Actions', sortable: false }
    ]
  }),
  methods: {
    ...mapActions({
      getUnits: 'units/getUnits'
    })
  },
  mounted () {
    this.getUnits()
  },
  computed: {
    units () {
      return this.$store.state.units.units
    }
  }
}
</script>

<style scoped>

</style>
