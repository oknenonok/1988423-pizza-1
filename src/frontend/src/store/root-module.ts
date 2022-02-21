import { Getters, Actions, Module, Mutations } from "vuex-smart-module";
import modules from "@/store/modules";
import {
  MAPPING_DOUGH,
  MAPPING_DOUGH_CAPTIONS,
  MAPPING_SIZE,
  MAPPING_SAUCE,
} from "@/common/constants";
import {
  IRawDough,
  IDough,
  IRawIngredient,
  IIngredient,
  IRawSauce,
  ISauce,
  IRawSize,
  ISize,
  IRawMisc,
  IMisc,
} from "@/common/types";
import api from "@/services/api.service";

export class RootState {
  rawDough: IRawDough[] = [];
  rawIngredients: IRawIngredient[] = [];
  rawSauces: IRawSauce[] = [];
  rawSizes: IRawSize[] = [];
  rawMisc: IRawMisc[] = [];
}

class RootGetters extends Getters<RootState> {
  /**
   * Виды теста
   * @returns {array}
   */
  get dough(): IDough[] {
    return this.state.rawDough.map((dough) => ({
      ...dough,
      value: MAPPING_DOUGH[dough.id],
      caption: MAPPING_DOUGH_CAPTIONS[dough.id],
    }));
  }

  /**
   * Ингредиенты
   * @returns {array}
   */
  get ingredients(): IIngredient[] {
    return this.state.rawIngredients.map((ingredient) => ({
      ...ingredient,
      value: ingredient.image.replace(/^.*\//, "").replace(".svg", ""),
    }));
  }

  /**
   * Соусы
   * @returns {array}
   */
  get sauces(): ISauce[] {
    return this.state.rawSauces.map((sauce) => ({
      ...sauce,
      value: MAPPING_SAUCE[sauce.id],
    }));
  }

  /**
   * Размеры
   * @returns {array}
   */
  get sizes(): ISize[] {
    return this.state.rawSizes
      .map((size) => ({
        ...size,
        value: MAPPING_SIZE[size.id],
      }))
      .sort((a, b) => (a.multiplier < b.multiplier ? -1 : 0));
  }

  /**
   * Дополнительные товары
   * @returns {array}
   */
  get misc(): IMisc[] {
    return this.state.rawMisc;
  }
}

class RootMutations extends Mutations<RootState> {
  setRawDough(rawDough: IRawDough[]) {
    this.state.rawDough = rawDough;
  }

  setRawIngredients(rawIngredients: IRawIngredient[]) {
    this.state.rawIngredients = rawIngredients;
  }

  setRawSauces(rawSauces: IRawSauce[]) {
    this.state.rawSauces = rawSauces;
  }

  setRawSizes(rawSizes: IRawSize[]) {
    this.state.rawSizes = rawSizes;
  }

  setRawMisc(rawMisc: IRawMisc[]) {
    this.state.rawMisc = rawMisc;
  }
}

class RootActions extends Actions<
  RootState,
  RootGetters,
  RootMutations,
  RootActions
> {
  /**
   * Подгрузить виды теста
   */
  async loadDough() {
    if (!this.state.rawDough.length) {
      try {
        const dough = await api.dough.query();
        this.commit("setRawDough", dough);
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * Подгрузить ингредиенты
   */
  async loadIngredients() {
    if (!this.state.rawIngredients.length) {
      try {
        const ingredients = await api.ingredients.query();
        this.commit("setRawIngredients", ingredients);
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * Подгрузить соусы
   */
  async loadSauces() {
    if (!this.state.rawSauces.length) {
      try {
        const sauces = await api.sauces.query();
        this.commit("setRawSauces", sauces);
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * Подгрузить размеры
   */
  async loadSizes() {
    if (!this.state.rawSizes.length) {
      try {
        const sizes = await api.sizes.query();
        this.commit("setRawSizes", sizes);
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * Подгрузить дополнительные товары
   */
  async loadMisc() {
    if (!this.state.rawMisc.length) {
      try {
        const misc = await api.misc.query();
        this.commit("setRawMisc", misc);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

export default new Module({
  state: RootState,
  getters: RootGetters,
  mutations: RootMutations,
  actions: RootActions,
  modules,
});
