<template>
  <page-split class="PageOffices">
    <page-header
      :title="metadata.title"
      :subtitle="metadata.desc"
      type="split"
      slot="header">
    </page-header>
    <card-office :offices="$store.state.allOffices">
    </card-office>
  </page-split>
</template>

<script>

  import CardOffice from './CardOffice'
  import NiSection from '../NiSection'
  let PageHeader
  let PageSplit
  if (process.env.VUE_ENV === 'client') {
    PageHeader = require('@nylira/vue-page-header')
    PageSplit = require('@nylira/vue-page-split')
  }
  export default {
    name: 'PageOffices',
    asyncData ({ store }) {
      return store.dispatch('getAllOffices')
    },
    components: {
      NiSection,
      PageHeader,
      PageSplit,
      CardOffice
    },
    data () {
      return {
        metadata: {
          title: 'Offices',
          desc: 'All In Bits, Inc. has offices in San Francisco, Toronto, and Berlin.'
        }
      }
    },
    head: {
      title () {
        return {
          inner: this.metadata.title,
          separator: '-',
          complement: 'All In Bits, Inc.'
        }
      }
    }
  }
</script>

