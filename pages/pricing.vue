<template>
  <div>
    <Page :title="title" no-head>
      <h1 class="text-center mt-n2 mb-6">{{ title }}</h1>

      <Pricing :billing="annually ? 'annually' : 'monthly'" />

      <v-card v-if="!isSignedIn" class="mt-4 mb-6">
        <v-card-title class="subtitle-2 justify-center">
          Try Wappalyzer for free
        </v-card-title>
        <v-card-text class="text-center">
          <div style="max-width: 600px; margin: 0 auto">
            <p>
              Get 50 free credits every month to spend on technology lookups,
              email verifications and website alerts. Free samples for any lead
              list.
            </p>
          </div>

          <v-btn
            color="primary"
            class="mt-1 mb-2"
            large
            depressed
            @click="signInDialog = true"
            >Sign up free</v-btn
          >
        </v-card-text>
      </v-card>

      <small class="text--disabled">
        <nuxt-link to="/contact/">Contact us</nuxt-link> for tailored plans.
        Discounted plans available for startups, education and nonprofits.<br />
        Credits included in plans expire after 60 days.<br />
        Prices are in United States dollars.
      </small>

      <v-row justify="center" class="mt-10 mb-12">
        <v-col cols="12" sm="6" class="d-flex">
          <v-card id="usage" width="100%" height="100%">
            <v-card-title>Credit usage</v-card-title>
            <v-card-text class="px-0">
              <p class="px-4 mb-2">
                Credits can be spent on any product, including lead lists,
                technology lookups and APIs.
              </p>

              <v-simple-table>
                <thead>
                  <tr>
                    <th width="40%">Product</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="{ name, to, units } in creditsPerUnit" :key="name">
                    <td>
                      <nuxt-link :to="to">
                        {{ name }}
                      </nuxt-link>
                    </td>
                    <td>
                      {{
                        units
                          .map(({ per, credits }) => `${credits} per ${per}`)
                          .join(' or ')
                      }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card id="credits" width="100%" height="100%">
            <v-card-title>Credit pricing</v-card-title>
            <v-card-text class="px-0">
              <p class="px-4">
                Additional credits can be purchased at tiered pricing. For
                example, the price for 1,000 credits is

                <code>(100 x $0.20) + (400 x $0.05) + (500 x $0.03) = $55</code
                >.
              </p>

              <v-simple-table class="mb-4" outlined dense>
                <thead>
                  <tr>
                    <th width="50%">Credits</th>
                    <th>Price per credit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(tier, index) in Object.keys(creditTiers)"
                    :key="index"
                  >
                    <td>
                      <small>
                        {{
                          formatNumber(
                            index
                              ? parseInt(
                                  Object.keys(creditTiers)[index - 1],
                                  10
                                ) + 1
                              : 1
                          )
                        }}
                        {{
                          index === Object.keys(creditTiers).length - 1
                            ? '+'
                            : `- ${formatNumber(parseInt(tier, 10))}`
                        }}
                      </small>
                    </td>
                    <td>
                      <small>
                        {{
                          formatCurrency(creditTiers[tier] / 100, 'USD', true)
                        }}
                      </small>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>

              <v-divider />

              <v-card-title class="subtitle-2">Calculator</v-card-title>
              <v-card-text class="pb-0">
                <v-row class="align-center">
                  <v-col class="flex-grow-1 flex-shrink-0 pr-0">
                    <v-form @submit.prevent="submit">
                      <v-text-field
                        v-model="credits"
                        label="Credits"
                        placeholder="1000"
                        hide-details
                        outlined
                        dense
                      >
                        <template v-slot:append>
                          <v-chip
                            color="primary lighten-1 primary--text"
                            label
                            small
                          >
                            Price:
                            {{
                              formatCurrency(
                                creditsToCents(parseInt(credits, 10)) / 100
                              )
                            }}
                          </v-chip>
                        </template>
                      </v-text-field>
                    </v-form>
                  </v-col>
                  <v-col class="flex-grow-0 flex-shrink-1">
                    <v-btn to="/credits/" style="height: 40px" text>
                      <v-icon left>
                        {{ mdiAlphaCCircle }}
                      </v-icon>
                      Buy credits
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-card style="max-width: 800px; margin: 0 auto" class="mb-14">
        <v-card-title>Take a tour</v-card-title>

        <v-card-text>
          <Vimeo id="651847462" height="600px" />
        </v-card-text>
      </v-card>

      <v-card style="max-width: 800px; margin: 0 auto" class="mb-14">
        <v-card-title class="px-6">Frequently asked questions</v-card-title>
        <v-card-text class="px-0">
          <Faqs topic="pricing" />
        </v-card-text>
      </v-card>

      <div class="mt-12 pa-8 text-center">
        <v-btn to="/contact/" color="primary" depressed x-large>
          Contact us to book a demo
        </v-btn>
      </div>

      <template #footer>
        <Logos />
      </template>
    </Page>

    <v-dialog v-model="signInDialog" max-width="400px">
      <SignIn mode-sign-up />
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mdiAlphaCCircle } from '@mdi/js'

import Page from '~/components/Page.vue'
import Pricing from '~/components/Pricing.vue'
import Logos from '~/components/Logos.vue'
import Faqs from '~/components/Faqs.vue'
import Vimeo from '~/components/Vimeo.vue'
import SignIn from '~/components/SignIn.vue'
import { creditsPerUnit, creditTiers } from '~/assets/json/pricing.json'

export default {
  components: {
    Page,
    Pricing,
    Logos,
    Faqs,
    Vimeo,
    SignIn,
  },
  computed: {
    ...mapState({
      isSignedIn: ({ user }) => user.isSignedIn,
    }),
  },
  data() {
    return {
      title: 'Pricing',
      annually: false,
      creditsPerUnit,
      creditTiers,
      credits: 1000,
      signInDialog: false,
      mdiAlphaCCircle,
    }
  },
  mounted() {
    const { billing } = this.$route.query

    if (billing) {
      this.annually = billing === 'annually'

      this.$router.replace(this.$route.path)
    }
  },
}
</script>
