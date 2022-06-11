<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <Page
      :title="title"
      :seo-title="seotitle"
      :crumbs="false"
      :hero="true"
      :head="{ title, meta }"
      search
      no-head
    >
      <h1 class="mb-10 text-h2 text-center">
        Empower your sales and marketing teams
      </h1>

      <UseCases class="mb-8" />

      <div v-for="(name, index) in products" :key="index">
        <v-divider v-if="index" class="my-8 my-sm-10" />

        <Product :name="name" :mirror="index % 2 !== 0" />
      </div>

      <template #footer>
        <Logos apps />
      </template>
    </Page>
  </div>
</template>

<script>
import Logos from '~/components/Logos.vue'
import Page from '~/components/Page.vue'
import Product from '~/components/Product.vue'
import UseCases from '~/components/UseCases.vue'
import meta from '~/assets/json/meta.json'
import { analytics } from '../plugins/firebase'
import { logEvent } from 'firebase/analytics'

export default {
  components: {
    Logos,
    Page,
    UseCases,
    Product,
  },

  mounted() {
    // firebase ana
    // log event when a page is loaded
    logEvent(analytics, 'page_view', {
      page_path: this.$route.path,
      page_title: this.$route.meta.title,
    })
  },

  data() {
    return {
      title: meta.hero.title,
      seotitle: 'Find out what websites are built with',
      products: Object.keys(meta).filter((name) => meta[name].feature),
      meta: 'Find out the technology stack of any website. Create lists of websites and contacts by the technologies they use.',
    }
  },
}
</script>
