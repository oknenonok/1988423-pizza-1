import { NavigationGuardNext, Route } from "vue-router";
import { Store } from "vuex";

export interface IRawDough {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface IDough extends IRawDough {
  value: string;
  caption: string;
}

export interface IRawIngredient {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface IIngredient extends IRawIngredient {
  value: string;
}

export interface IRawSauce {
  id: number;
  name: string;
  price: number;
}

export interface ISauce extends IRawSauce {
  value: string;
}

export interface IRawSize {
  id: number;
  name: string;
  image: string;
  multiplier: number;
}

export interface ISize extends IRawSize {
  value: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  phone: string;
}

export interface IRawMisc {
  id: number;
  name: string;
  image: string;
  price: number;
}

export type IMisc = IRawMisc;

export interface INewAddress {
  name: string;
  street: string;
  building: string;
  flat: string;
  comment: string;
  userId?: string;
}

export interface IAddress extends INewAddress {
  id: number | string;
}

export interface IOrder {
  id: number;
  phone: string;
  userId: string | null;
  addressId: number | null;
  address?: {
    id: number | string | null;
    street: string;
    building: string;
    flat: string;
    comment: string;
  } | null;
  orderAddress?: IAddress;
  orderPizzas: IOrderPizza[];
  orderMisc: IOrderMisc[];
}

export interface INewOrder {
  phone: string;
  userId: string | null;
  address?: {
    id: number | string | null;
    street: string;
    building: string;
    flat: string;
    comment: string;
  } | null;
  pizzas: IOrderPizza[];
  misc: IOrderMisc[];
}

export interface IOrderPizzaIngredient {
  quantity: number;
  ingredientId: IIngredient["id"];
}

export interface IOrderPizza {
  name: string;
  quantity: number;
  sauceId: ISauce["id"] | undefined;
  doughId: IDough["id"] | undefined;
  sizeId: ISize["id"] | undefined;
  ingredients: IOrderPizzaIngredient[];
}

export interface IOrderMisc {
  quantity: number;
  miscId: number;
}

export interface ILocalOrder {
  id: number;
  phone: string;
  userId: string | null;
  addressId: number | null;
  orderAddress?: IAddress;
  orderPizzas: ILocalOrderPizza[];
  orderMisc: ILocalOrderMisc[];
  price: number;
}

export interface ILocalOrderPizzaIngredient extends IOrderPizzaIngredient {
  price: number;
}

export interface ILocalOrderPizza extends IOrderPizza {
  sauce: ISauce | undefined;
  dough: IDough | undefined;
  size: ISize | undefined;
  ingredients: ILocalOrderPizzaIngredient[];
  price: number;
}

export interface ILocalOrderMisc extends IOrderMisc {
  price: number;
}

export interface IMiddlwareContext {
  next: NavigationGuardNext<Vue>;
  store: Store<any>;
  from: Route;
  to: Route;
  nextMiddleware?: NavigationGuardNext<Vue>;
}

export interface IMiddlwareCallParams extends IMiddlwareContext {
  nextMiddleware: NavigationGuardNext<Vue>;
}

export type FMiddleware = (params: IMiddlwareCallParams) => void;

export interface INotification {
  id: number;
  text: string;
  type: string;
}

export interface IAuthCredentials {
  email: string;
  password: string;
}

export interface ICartItem {
  name: string;
  sauce: ISauce | undefined;
  dough: IDough | undefined;
  size: ISize | undefined;
  ingredients: ICartIngredient[];
  id: number;
  quantity: number;
  price: number;
}

interface IWithQuantity {
  quantity: number;
}

export interface ICartIngredient extends IWithQuantity, IIngredient {}
export interface ICartMisc extends IWithQuantity, IMisc {}

export interface ILoginResult {
  token: string;
}
