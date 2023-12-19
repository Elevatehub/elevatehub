<template>
  <div class="form-outline mb-3">
    <v-text-field :type="pattern" style="height: 45px" :disabled="disables" hide-details="auto" clearable
      :prepend-icon="icons" :variant="variants" v-model="models" :rules="rules" :label="labels"></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'InputView',
  inheritAttrs: false, // Prevents the default behavior of binding all attributes to the root element
  props: {
    'label': String,
    'model': String,
    'pattern': String,
    'icon': String,
    'disable': Boolean,
    'variant': String
  },
  data() {
    return {
      models: this.model,
      labels: this.label,
      patterns: this.pattern,
      icons: this.icon,
      disables: this.disable,
      variants: this.variant,
      rules: [
        value => {
          if (value) {
            return true
          }
          return `Opss Masukkan ${this.labels}`
        },
      ],
    }
  },
  watch: {
    label(newVal) {
      this.labels = newVal
    },
    model(newVal) {
      this.models = newVal
    },
    disable(newVal) {
      this.disables = newVal
    }
  }
}
</script>
