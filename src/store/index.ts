// @ts-ignore
import { createStore } from "vuex";
import covidModule from "./covidModule";
import type { CovidState } from "../types";

export interface RootState {
  covid: CovidState;
}

export default createStore({
  modules: {
    covid: covidModule,
  },
});
