<template>
  <header>
    <h1>
      Speed Typer
    </h1>
  </header>
  <main>
    <div class="pre-container">
      <a href="https:/www.google.com"><i class="fas fa-backward"></i>Leave</a>
      <div class="time">
        <p><i class="fas fa-stopwatch"></i>0:{{ time }}</p>
        <!-- <p>{{ country }}</p> -->
      </div>
    </div>
    <div class="container">
      <span
        v-for="(word, index) in words"
        :key="index"
        :class="{ red: word.wrong, green: word.correct, pending: word.pending }"
      >
        {{ word.text }} {{ " " }}
      </span>
      <input
        type="text"
        @keydown.enter="containWord($event)"
        @click="countdown"
        :value="inputValue"
      />
    </div>

    <div class="container-score">
      <p class="score" v-show="showScore" :score="score">
        Score : {{ score }} / {{ this.words.length }}
      </p>
      <p class="highscore" v-if="showHighscore">Highscore : {{ highscore }}</p>
    </div>
    <button v-if="showScore" @click="playAgain">Play again</button>
    <button class="start" v-if="startGame" @click="start">Play</button>
  </main>
</template>

<script>
const defaultWords = [
  "template",
  "react",
  "javascript",
  "babel",
  "gsap",
  "html",
  "css",
  "bootstrap",
  "pug",
  "tailwind",
  "bulma",
  "graphql",
  "mysql",
  "java",
  "python",
  "codedamn",
  "misko",
  "belko",
  "je",
  "kral",
  "cool",
  "movie",
  "film",
  "cinema",
  "word",
  "english",
  "drink",
].map((word) => {
  return {
    text: word,
    correct: false,
    wrong: false,
    pending: true,
  };
});

export default {
  name: "App",
  data() {
    return {
      words: defaultWords,
      inputValue: "",
      index: 0,
      score: 0,
      showScore: false,
      time: 30,
      highscore: 0,
      showHighscore: false,
      startGame: true,
    };
  },
  methods: {
    start() {
      this.startGame = false;
      //   if (this.time > 0) {
      //     setInterval(() => {
      //       this.time--;
      //     }, 1000);
      //   }
    },

    containWord(e) {
      const value = e.target.value;
      e.target.value = "";
      if (this.words[this.index].text === "") {
        return;
      }

      if (this.words[this.index].text === value) {
        this.words[this.index].correct = true;
        this.words[this.index].pending = false;
        this.index++;
        this.score++;
      } else {
        this.words[this.index].wrong = true;
        this.words[this.index].pending = false;
        this.index++;
      }

      if (this.index === this.words.length) {
        this.showScore = true;
        this.showHighscore = true;
        if (this.score > this.highscore) {
          this.highscore = this.score;
          localStorage.setItem("highscore", this.highscore);
        }
      }
    },
    playAgain() {
      this.showScore = false;
      this.showHighscore = false;
      this.index = 0;
      this.score = 0;
      this.words.forEach((word) => {
        word.correct = false;
        word.correct = false;
        word.wrong = false;
        word.pending = true;
      });
    },
  },
  mounted() {
    this.showHighscore = false;
    this.highscore = localStorage.getItem("highscore");
  },
};
</script>

<style>
::selection {
  color: orangered;
  background-color: transparent;
}
body {
  background-color: #1c1d23;
}
.fas {
  margin: 0 5px;
  font-size: 15px;
}
.fa-stopwatch {
  color: #ffa500;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1c1d23;
}

.red {
  color: #ff0000;
}
.green {
  color: #32cd32;
}
.pending {
  font-weight: normal;
  color: #808080;
}
ul {
  list-style: none;
  display: inline-block;
  padding: 0;
}
header h1 {
  font-family: Arial Black;
  letter-spacing: 2px;
  font-size: 35px;
  background: linear-gradient(to right, #ffff00, #ff0000);
  background-size: 100%;
  -webkit-background-clip: text;
  -webkit-text-stroke: 3px transparent;
}
span {
  margin: 0;
  padding: 0;
  font-weight: bold;
  color: #808080;
  letter-spacing: 0.8px;
  font-size: 18px;
  text-align: start;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
}
main {
  margin: 0 5%;
}
.container {
  padding: 40px 20px;
  background-color: #2b2b2e;
  line-height: 26px;
}
.pre-container {
  height: 40px;
  background-color: #27272a;
  border-radius: 5px 5px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 20px;
}
.container-score {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.container-score p {
  color: #fff;
  font-weight: bold;
  font-size: 25px;
  color: #ffa12d;
}
.container-score p:last-of-type {
  font-weight: normal;
}
.pre-container :is(a, p) {
  text-transform: uppercase;
  text-decoration: none;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: #f6ad55;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.pre-container p:last-of-type {
  color: white;
}

.time {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.time p {
  margin: 0 10px;
}
input:active,
input:focus {
  outline: none;
  border: none;
  border-bottom: 2px solid #ffa6009c;
}
input {
  border: none;
  border-bottom: 2px solid #ffa60094;
  outline: none;
  padding: 10px;
  caret-color: red;
  width: 90%;
  background-color: rgba(30, 30, 33, 0.233);
  color: #fff;
  letter-spacing: 1px;
  text-align: center;
  margin-top: 40px;
  font-size: 20px;
  padding: 5px;
}
@media screen and (max-width: 400px) {
  main {
    margin: 0;
  }
  .container span {
    line-height: 22px;
    font-size: 16px;
  }
  .pre-container a,
  .pre-container p {
    font-size: 14px;
  }
  .container-score p {
    font: 20px sans-serif;
  }
  .container-score {
    flex-direction: column;
  }
}
button {
  all: unset;
  font-size: 15px;
  color: orangered;
  padding: 15px 20px;
  border-radius: 5px;
  border: 1px solid orangered;
  cursor: pointer;
  transition: all 100ms;
}
button:hover {
  transform: scale(1.02);
  /* border: 2px solid orangered; */
}
.start {
  margin-top: 50px;
  font: 25px sans-serif;
  padding: 20px 45px;
}
</style>
