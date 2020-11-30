import { createStore } from "vuex";
import { dbPlayers, dbPlays } from "../assets/database";
const audio = new Audio(
  "http://soundbible.com/mp3/Door%20Buzzer-SoundBible.com-1567875395.mp3"
);
audio.preload = "auto";
const state = {
  game: {
    name: null,
    timeLeft: 0,
    gameOn: false,
    team1: {
      name: "Equipe1",
      score: 0,
      players: []
    },
    team2: {
      name: "Equipe2",
      score: 0,
      players: []
    },
    bench: {
      players: []
    },
    plays: [] /*{
            ts: date,
            timeleft: Number,
            player: String,
            action:String
            actionTExt:String
            team: String,
            }
*/
  },

  timer: null,
  settings: {
    allPlayers: [
      //must come from database
    ],
    gameDuration: 10,
    actionButtons: [
      {
        actionText: "Cesta de 2",
        action: "FGM"
      },
      {
        actionText: "Cesta de 3",
        action: "3PM"
      },
      {
        actionText: "Assistência",
        action: "AST"
      },
      {
        actionText: "Falta",
        action: "FOU"
      },
      {
        actionText: "Rebote",
        action: "REB"
      }
    ]
  }
};
const getters = {
  getTeamName: (state) => (team) => {
    return state.game[team].name;
  },
  getTeamScores: (state) => {
    let plays = state.game.plays;
    return plays.reduce(
      function (acc, play) {
        if (play.action === "FGM") {
          acc[play.team] += 2;
        } else if (play.action === "3PM") {
          acc[play.team] += 3;
        }
        return acc;
      },
      { team1: 0, team2: 0 }
    );
  },
  game: (state) => {
    return state.game;
  }
};
const mutations = {
  ADD_PLAYERS_TO_BENCH(state, payload) {
    let newBench = state.game.bench.players.concat(payload);
    state.game.bench.players = newBench;
  },
  FILL_PLAYERS(state, payload) {
    //console.log(payload);
    state.settings.allPlayers = payload;
  },
  ADD_PLAY(state, obj) {
    state.game.plays.unshift(obj);
  },
  UPDATE_LIST(state, obj) {
    state.game[obj.team].players = obj.value;
  },
  CHANGE_TEAM_NAME(state, obj) {
    state.game[obj.team].name = obj.name;
  },
  CLOCKTICK(state) {
    state.game.timeLeft--;
  },
  CLOCKSTART(state, timer) {
    console.log("clockStart");
    state.timer = timer;
    state.game.gameOn = true;
  },
  GAMESTART(state, timer) {
    console.log("gameStart");
    state.timer = timer;
    state.game.gameOn = true;
    state.game.name = new Date().toISOString();
  },
  CLOCKSTOP(state) {
    clearInterval(state.timer);
    state.timer = null;
    state.game.gameOn = false;
  },
  KILLTIMER(state) {
    clearInterval(state.timer);
    state.timer = null;
  },
  ENDGAME(state) {
    state.game.gameOn = false;
    state.game.name = null;
  },
  CLOCKRESET(state) {
    state.game.timeLeft = state.settings.gameDuration;
    state.game.plays.length = 0;
  }
};

const actions = {
  createPlayer({ commit, dispatch }, payload) {
    //console.log(payload);
    return dbPlayers.put(payload); //returns a promise
  },
  getPlayers({ commit }) {
    return dbPlayers.allDocs({ include_docs: true }).then((result) => {
      let docs = result.rows.map(function (row) {
        return row.doc;
      });
      commit("FILL_PLAYERS", docs);
      return Promise.resolve(docs);
    });
  },
  addPlay({ commit }, payload) {
    dbPlays
      .put(payload)
      .then(() => {
        commit("ADD_PLAY", payload);
      })
      .catch((err) => console.error(err));
  },
  clockStart({ commit, state }) {
    var timer = setInterval(function () {
      if (state.game.timeLeft > 0) {
        commit("CLOCKTICK");
      } else {
        // kill timer
        commit("KILLTIMER");
        //play sound
        console.log("sound start");
        audio.play();
        console.log("sound end");
        // wait 5s and comit ENDGAME
        setTimeout(() => {
          commit("ENDGAME");
        }, 5000);
      }
    }, 1000);
    if (state.game.timeLeft === state.settings.gameDuration) {
      commit("GAMESTART", timer);
    } else {
      commit("CLOCKSTART", timer);
    }
  },
  clockStop({ commit }) {
    commit("CLOCKSTOP");
  },
  clockReset({ commit }) {
    commit("CLOCKRESET");
  }
};

export const store = createStore({
  state,
  getters,
  mutations,
  actions
});
