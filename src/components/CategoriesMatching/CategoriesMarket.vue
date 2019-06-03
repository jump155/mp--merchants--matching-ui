<template>
  <v-container flex>
    <v-card flat>
      <v-toolbar
        card
        color="gray lighten-4"
      >
        <v-icon>mdi-silverware</v-icon>
        <v-toolbar-title>Market Categories Matching</v-toolbar-title>
      </v-toolbar>

      <v-layout>
        <v-flex xs5 >
          <v-card-actions>
            <v-layout row wrap>
              <v-flex xs2>
                <br>
                <v-btn
                  outline
                  color="success"
                  @click="tree = []"
                >
                  +
                </v-btn>
              </v-flex>
              <v-flex xs2>
                <v-switch
                  color="success"
                  v-model="show_samples"
                  label="Примеры товаров"
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-card-actions>
          <v-card-text >
            <v-treeview
              :items="tree"
              :active.sync="active"
              item-key="_id"
              item-text="name"
              return-object
              activatable
              active-class="green lighten-5 green--text"
              selected-color="indigo"
              open-on-click
              selectable
              expand-icon="arrow_drop_down"
              on-icon="mdi-bookmark"
              off-icon="mdi-bookmark-outline"
              indeterminate-icon="mdi-bookmark-minus"
            >
            </v-treeview>
          </v-card-text>
        </v-flex>

        <v-divider vertical></v-divider>

        <v-flex
          xs7
        >
          <br>
          <v-toolbar
            v-if="active[0]"
                card
                color="green lighten-5 green--text"
              >
            <v-toolbar-title>{{ active[0]['name'] }}</v-toolbar-title>
          </v-toolbar>
          <div v-else>
            Выберите категрию
          </div>
          <v-card-text>
            <div v-for="company in category_data">
              <br>
              <v-toolbar
                card
                color="gray lighten-4"
              >
                <v-toolbar-title>
                  <v-img
                    :src="img_host.concat('logo?competitor=', company.company_id)"
                    height="20px"
                    width="50px"
                  ></v-img>
                  {{ company.company_name }}
                </v-toolbar-title>
              </v-toolbar>
              <v-layout wrap>
                <v-flex xs12 v-for="category in company.categories">
                  <v-card-title primary-title>
                    <div>
                      <h3 class="grey--text">{{ category.category_name }}</h3>
                    </div>
                  </v-card-title>
                  <v-layout row wrap v-if="show_samples">
                    <v-flex
                      v-for="(product, i) in category.products"
                      v-bind:key="i"
                      xs3
                      d-flex
                    >
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-img
                            :src="img_host.concat('image?matching_id=', product.matching_id)"
                            height="70px"
                            width="90px"
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <span style="font-size: smaller">{{ product.title }}</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <div v-else></div>
                </v-flex>
              </v-layout>
            </div>
            <v-scroll-x-transition
              group
              hide-on-leave
            >
              {{ category_data }}
            </v-scroll-x-transition>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>

    </v-card>
  </v-container>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'CategoriesMarket',
  data: () => ({
    isLoading: false,
    // tree: [],
    active: [],
    data: {},
    show_samples: false
  }),
  methods: {
    ...mapActions({
      getMatchingCategoryTree: 'categories/getMatchingCategoryTree',
      getMatchingCategoryData: 'categories/getMatchingCategoryData',
      getUnusedCategories: 'categories/getUnusedCategories'
    })
  },
  computed: {
    tree () {
      return this.$store.state.categories.matching_category_tree
    },
    category_data () {
      return this.$store.state.categories.matching_category_data
    },
    img_host () {
      return this.$store.state.categories.host.concat('image_library/')
    },
    unused_categories () {
      return this.$store.state.categories.unused_categories
    }
  },
  mounted () {
    this.getMatchingCategoryTree()
    this.getUnusedCategories()
  },
  watch: {
    active (val) {
      if (val.length > 0) {
        this.getMatchingCategoryData(val[0]['_id'])
      }
    }
  }
}

</script>

<style scoped>

</style>
