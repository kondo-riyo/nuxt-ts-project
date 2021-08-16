<template>
<div></div>
  <!-- <validation-provider
    v-slot="{ valid, errors }"
    :rules="rules"
    :name="fieldName"
    :custom-messages="errorMessages"
    :vid="vid"
    :mode="mode"
  >
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="grid-password"
    >
      {{ fieldName }}
    </label>
    <input
      v-model="innerValue"
      :name="fieldName"
      :placeholder="placeholder"
      :class="[
        'form-input mt-1 block w-full',
        { 'border-red-600': errors.length },
        { 'border-teal-600': valid },
      ]"
      :type="type"
      :pattern="pattern"
    />
    <p v-show="errors.length" class="absolute text-red-600 text-xs">
      {{ errors[0] }}
    </p>
  </validation-provider> -->
</template>

<script lang="ts">
// import { Component, Vue, Prop } from 'nuxt-property-decorator'

// @Component({
//   name: 'InputForm',
// })
// export default class InputForm extends Vue {
//   @Prop({ type: String, required: true })
//   private rules!: string

//   @Prop({ type: Object, required: true })
//   private errorMessages!: object

//   @Prop({ type: String, required: true })
//   private value!: string

//   @Prop({ type: String, required: true })
//   private fieldName!: string

//   @Prop({ type: String, default: '' })
//   private placeholder!: string

//   @Prop({ type: String, default: 'text' })
//   private type!: string

//   @Prop({ type: String, default: '' })
//   private vid!: string

//   @Prop({ type: String, default: 'eager' })
//   private mode!: string

//   @Prop({ type: String, default: '' })
//   private pattern!: string

//   get innerValue(): string {
//     return this.$props.value
//   }

//   set innerValue(val) {
//     this.$emit('input', val)
//   }
// }
</script>