<template>
  <page-split>
    <page-header
      :title="metadata.title"
      subtitle="The All In Bits team."
      slot="header"
      type="split">
    </page-header>
    <ni-section>
      <div class="people">
        <card-person
          group="aib"
          v-for="person in ppl('aib')"
          :key="person.slug"
          :person="person">
        </card-person>
      </div>
    </ni-section>
  </page-split>
</template>

<script>

import CardPerson from './CardPerson'
import NiSection from '../NiSection'
let PageHeader
let PageSplit
if (process.env.VUE_ENV === 'client') {
  PageHeader = require('@nylira/vue-page-header')
  PageSplit = require('@nylira/vue-page-split')
}

export default {
  name: 'page-about',
  asyncData ({ store }) {
    return store.dispatch('getAllPeople')
  },
  components: {
    CardPerson,
    NiSection,
    PageSplit,
    PageHeader
  },
  data () {
    return {
      metadata: {
        title: 'About',
        desc: 'The current All In Bits team.'
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
    },
    meta () {
      return [
        { n: 'description', c: this.metadata.desc },
        { n: 'twitter:title', c: this.metadata.title },
        { n: 'twitter:description', c: this.metadata.desc },
        { p: 'og:title', c: this.metadata.title },
        { p: 'og:description', c: this.metadata.desc }
      ]
    }
  },
  methods: {
    ppl (tag) {
      return this.$store.state.peopleList==''?[]:this.$store.state.peopleList.filter(p => p.groups[tag])
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../styles/variables.styl'
.people
  max-width 1024px

@media screen and (min-width: 768px)
  .people
    display flex
    flex-flow row wrap

    .person-wrapper
      flex 0 0 50%

@media screen and (min-width: 1280px)
  .people
    margin 0 auto
    .person-wrapper
      flex 0 0 33.333%
</style>
