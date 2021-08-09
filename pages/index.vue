import Scroll from '@/components/Scroll';
<template>
  <div class="page home-wrapper">
    <div class="home-container">
      <div class="home">
        <div class="result-container">
          <div class="result__title">RESULT</div>
          <div class="result">
            <span>{{ result.A }}A</span>
            <span>{{ result.B }}B</span>
          </div>
        </div>
        <div class="w-input-layout">
          <Winput
            v-for="(item, index) in 4"
            :key="index"
            :disabled="disabled"
            :total-answer="answer"
            :answer="answer[index]"
            :index="index"
            @changeAnswer="changeAnswer"
          />
        </div>
        <div class="button__container">
          <div class="button button__clear" @click="clear">CLEAR</div>
          <div class="button button__send" @click="checkAnswer">OK</div>
        </div>
        <div class="history__container">
          <div class="history__title">HISTORY</div>
          <div class="history__list">
            <div
              v-for="(item, index) in history"
              :key="index"
              class="history__item"
            >
              <span>{{ item.answer }}</span>
              <span>{{ item.result }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      question: [null, null, null, null],
      answer: [null, null, null, null],
      history: [],
      result: {
        A: 0,
        B: 0,
      },
    }
  },
  mounted() {
    const vm = this
    vm.randomQuestion()
  },
  methods: {
    changeAnswer(data) {
      const vm = this
      vm.$set(vm.answer, data.index, data.answer)
    },
    randomQuestion() {
      const vm = this
      const random = (max, min) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }

      const getRandomNumber = () => {
        return random(9, 0)
      }

      let number = getRandomNumber()

      vm.question.forEach((e, index, arr) => {
        if (!index) {
          arr[index] = number
        } else {
          while (vm.question.includes(number)) {
            number = getRandomNumber()
          }
          arr[index] = number
        }
      })
    },
    // 檢查答案
    checkAnswer() {
      /*
      * 判斷規則:
        1.已知四個數字皆不會重複
      */

      const vm = this
      const questionAIndexArr = []
      const questionBIndexArr = []
      // 檢查A數量
      const checkA = () => {
        vm.question.forEach((e, index) => {
          if (e === vm.answer[index]) {
            questionAIndexArr.push(index)
          }
        })
      }
      // 檢查B數量 => 去掉 已為A的欄位
      const checkB = () => {
        vm.question.forEach((e, index) => {
          const foundA = questionAIndexArr.includes(index)
          if (!foundA) {
            const foundB = vm.answer.includes(e)
            if (foundB) {
              questionBIndexArr.push(index)
            }
          }
        })
      }

      if (vm.answer.includes(null)) {
        return
      }
      // 先檢查A的數量，再檢查B的數量
      checkA()
      checkB()
      vm.result.A = questionAIndexArr.length
      vm.result.B = questionBIndexArr.length

      if (vm.result.A === 4 && vm.result.B === 0) {
        window.alert('答對!')
        vm.disabled = true
      } else {
        vm.disabled = false
      }
      // 紀錄這次的答案
      vm.record()
    },
    // 紀錄歷史答案
    record() {
      const vm = this
      vm.history.push({
        answer: vm.answer.join(''),
        result: `${vm.result.A}A${vm.result.B}B`,
      })
    },
    // 清除目前input的value
    clear() {
      const vm = this
      vm.answer = [null, null, null, null]
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem 0;
}

.w-input-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 3rem;
}

.result {
  min-height: 5rem;
  font-size: 5rem;
  text-align: center;

  &__title {
    color: #333;
    font-size: 5rem;
  }
}

.history {
  &__container {
    position: absolute;
    top: 0;
    right: 0;
    width: 15rem;
    background-color: #f5d41c;
    border: solid 0.3rem #333;
    border-radius: 0.4rem;
  }

  &__title {
    background-color: #ddc01a;
    width: 100%;
    text-align: center;
    font-size: 2rem;
    letter-spacing: 0.5rem;
    border-bottom: solid 0.2rem #333;
  }

  &__list {
    width: 100%;
    height: 15rem;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__item {
    margin: 0.5rem 0 0 0;
    font-size: 1.5rem;
    letter-spacing: 0.3rem;
    text-align: center;
    &:not(:last-child) {
      border-bottom: solid 0.2rem #333;
    }
  }
}

.button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border-radius: 0.3rem;
  letter-spacing: 0.3rem;
  padding: 1rem 5rem;
  border-style: solid;
  border-width: 0.4rem;
  transition: 0.45s;

  &__send {
    color: #2afd00;
    background-color: #333;
    border-color: #2afd00;
    text-shadow: 0 0 0.3rem #fff, 0 0 0.4rem #2afd00;

    &:hover {
      color: #333;
      background-color: #2afd00;
    }
  }

  &__clear {
    color: #ee894e;
    background-color: #333;
    border-color: #ee894e;
    text-shadow: 0 0 0.3rem #fff, 0 0 0.4rem #ee894e;

    &:hover {
      color: #333;
      background-color: #ee894e;
    }
  }

  &__container {
    display: flex;
    justify-content: center;
    gap: 0 3rem;
  }
}

@media screen and (max-width: 840px) {
  .w-input-layout {
    /deep/ .w-input {
      &__box {
        width: 8rem;
        height: 8rem;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .home {
    gap: 3rem 0;
  }
  .button {
    font-size: 1rem;
    padding: 1rem 0 1rem 0;
    border-width: 0.2rem;
    width: 100%;

    &:first-child {
      margin-bottom: 1rem;
    }

    &__container {
      width: 100%;
      display: block;
    }
  }

  .result {
    min-height: 2rem;
    font-size: 2rem;

    &__title {
      font-size: 2rem;
    }
  }

  .history {
    &__container {
      margin: 0 auto;
      position: relative;
      width: 10rem;
      border: solid 0.3rem #333;
    }

    &__title {
      font-size: 1rem;
    }

    &__list {
      height: 10rem;
    }

    &__item {
      font-size: 0.8rem;
      &:not(:last-child) {
        border-bottom: solid 0.1rem #333;
      }
    }
  }

  .w-input-layout {
    gap: 0 2rem;

    /deep/ .w-input {
      &__box {
        width: 3rem;
        height: 3rem;
        border-width: 0.2rem;
      }

      &__input {
        font-size: 2rem;
        padding: 0 0.3rem;
      }
    }
  }
}
</style>
