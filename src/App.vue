<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <h1>first (automatic request)</h1>

    <div v-if="first.isLoading">Loading ...</div>
    <div v-else-if="first.error">{{ first.error }}</div>
    <div>
      <ul>
        <li>{{ first.result }}</li>
      </ul>
    </div>

    <h1>second (request)</h1>
    <button @click="makeSecondRequest" v-if="!second.error && !second.result">
      Make second request
    </button>

    <div v-if="second">
      <div v-if="second.isLoading">Loading ...</div>
      <div v-else-if="second.error">
        <div>error</div>
        <button @click="second.retry">try again</button>
      </div>
      <div v-else>
        <button @click="second.retry">try again</button>
        {{ second.retry_attemps }}
        <ul>
          <li v-for="item in second.result" :key="item.id">{{ item }}</li>
        </ul>
      </div>
    </div>

    <h1>third (request fail)</h1>
    <button @click="makeThirdRequest" v-if="!third">Make third request</button>

    <div v-if="third">
      <div v-if="third.isLoading">Loading ...</div>
      <div v-if="third.error && !third.isLoading">
        <div v-if="third.retry_attempts < 3">
          <div>{{ third.error }}</div>
          <button @click="third.retry">try again</button>
        </div>
        <div v-else>
          <h4>
            É, parece que hoje você está sem sorte, descanse e tente novamente
            mais tarde ;)
          </h4>
        </div>
      </div>
      <div v-else>{{ third.result }}</div>
      <code>{{ third }}</code>
    </div>
  </div>
</template>

<script>
import useAsync from "@/services/use-async";
import { getTodo, getAllTodos } from "@/services/todos.service";

export default {
  data: () => ({
    second: false,
    third: false,
  }),

  setup() {
    const first = useAsync(getTodo, { id: 4 });
    return { first };
  },

  methods: {
    makeSecondRequest: async function () {
      this.second = useAsync(getAllTodos);
    },

    makeThirdRequest: async function () {
      this.third = useAsync(getTodo, { id: 0 } );
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
