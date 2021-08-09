<template>
  <div class="w-input-wrapper">
    <div class="w-input-container">
      <div class="w-input__box">
        <input
          v-model.number="value"
          class="w-input__input"
          type="text"
          maxlength="1"
          :disabled="disabled"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    answer: {
      type: Number,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0,
    },
    totalAnswer: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      value: null,
    }
  },
  watch: {
    answer: {
      handler() {
        const vm = this
        vm.value = vm.answer
      },
      immediate: true,
    },
    value: {
      handler() {
        const vm = this
        const regex = /[0-9]/
        const found = vm.totalAnswer.find((e) => e === vm.value)
        if (!regex.test(vm.value) || found) {
          vm.value = null
        }
        vm.$emit('changeAnswer', { answer: vm.value, index: vm.index })
      },
      immediate: false,
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.w-input {
  &__box {
    border: solid 0.4rem #333;
    border-radius: 0.3rem;
    width: 10rem;
    height: 10rem;
  }

  &__input {
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    border: none;
    box-sizing: border-box;
    font-size: 8rem;
    text-align: center;
    font-family: BalsamiqSans-Regular, sans-serif;
    outline: none;
  }
}
</style>
