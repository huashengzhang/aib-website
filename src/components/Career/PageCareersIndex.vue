<template>
  <page-split class="page-careers-index">
    <page-header
      title="Careers"
      subtitle="Join us at All In Bits to build and improve <a href='https://cosmos.network'>Cosmos</a> and Tendermint.<br><br>Jobs here are constantly updated. If your specialty is unlisted, we encourage you to still apply."
      type="split"
      slot="header">
    </page-header>
    <ni-section v-if="technical.length > 0">
      <div slot="title">Technical Positions</div>
      <card-career v-for="c in technical" :key="c.id" :career="c"></card-career>
    </ni-section>
    <ni-section v-if="operations.length > 0">
      <div slot="title">Operations Positions</div>
      <card-career v-for="c in operations" :key="c.id" :career="c"></card-career>
    </ni-section>
    <ni-section v-if="community.length > 0">
      <div slot="title">Community Positions</div>
      <card-career v-for="c in community" :key="c.id" :career="c"></card-career>
    </ni-section>
  </page-split>
</template>

<script>

import { union, orderBy } from 'lodash'
import CardCareer from './CardCareer'
import NiSection from '../NiSection'
let PageHeader
let PageSplit
if (process.env.VUE_ENV === 'client') {
  PageHeader = require('@nylira/vue-page-header')
  PageSplit = require('@nylira/vue-page-split')
}

export default {
  name: 'page-careers-index',
  asyncData ({ store }) {
    return store.dispatch('getAllCareers')
  },
  components: {
    CardCareer,
    NiSection,
    PageHeader,
    PageSplit
  },
  computed: {
    tags () {
      let tags = []
      this.careers.map(function (career) {
        tags = union(tags, career.tags)
      })
      return tags
    },
    technical () {
      return this.careers.filter(c => c.area === 'technical' && c.weight !== 0)
    },
    operations () {
      return this.careers.filter(c => c.area === 'operations' && c.weight !== 0)
    },
    community () {
      return this.careers.filter(c => c.area === 'community' && c.weight !== 0)
    },
    careers () {
      let orderedCareers = orderBy(this.$store.state.allCareers, ['title'], ['asc'])
      return orderedCareers

      /*
      let activeTag = this.activeTag

      if (activeTag === 'all') {
        return orderedCareers
      } else {
        return orderedCareers.filter(career => career.tags.includes(activeTag))
      }
      */
    }
  },
  data () {
    return {
      activeTag: 'all'
    }
  },
  mounted () {
    document.title = 'Careers - All In Bits, Inc.'
  }
}
</script>


<style scoped lang="stylus">
@require '../../styles/variables.styl'

.page-careers-index
  .tags
    margin-top 1rem
    text-align center
    max-width 40*x
    display flex
    flex-flow row wrap

  .tag
    font-size 0.75*x
    background lighten(bc, 50%)
    color dim
    margin-right 0.25*x
    margin-bottom 0.25*x
    padding 0.25*x 0.5*x

    cursor pointer

    background hsla(0,0,0,25%)
    color #fff
    &.active
      background darken(acolor,25%)

@media screen and (min-width: 768px)
  .page-careers-index
    .tag
      font-size x

@media screen and (min-width: 1024px)
  .page-careers-index
    .tags
      justify-content flex-start
</style>
