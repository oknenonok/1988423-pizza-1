import axios from "@/plugins/axios";
import {
  IRawDough,
  IRawIngredient,
  IRawSauce,
  IRawSize,
  IRawMisc,
  IAddress,
  INewAddress,
  IOrder,
  IAuthCredentials,
  IUser,
  INewOrder,
  ILoginResult,
} from "@/common/types";

class BaseApiService<ParamsType> {
  async runQuery(
    method: "get" | "post" | "put" | "delete",
    url: string,
    params: ParamsType | undefined = undefined
  ) {
    const { data } = await axios[method](url, params);
    return data;
  }
}

export class AuthApiService extends BaseApiService<IAuthCredentials> {
  async login(params: IAuthCredentials): Promise<ILoginResult> {
    return await this.runQuery("post", "login", params);
  }

  async logout() {
    return await this.runQuery("delete", "logout");
  }

  async loadData(): Promise<IUser> {
    return await this.runQuery("get", "whoAmI");
  }
}

class BaseRestApiService<ListType, ListTypeNew> extends BaseApiService<
  ListType | ListTypeNew
> {
  protected resource;

  constructor(resource: string) {
    super();
    this.resource = resource;
  }

  async query(): Promise<ListType[]> {
    return await this.runQuery("get", this.resource);
  }
}

export class ListApiService<ListType> extends BaseRestApiService<
  ListType,
  ListType
> {}

export class CrudApiService<
  ListType extends { id: string | number },
  ListTypeNew
> extends BaseRestApiService<ListType, ListTypeNew> {
  async post(entity: ListTypeNew): Promise<ListType> {
    return await this.runQuery("post", this.resource, entity);
  }

  async put(entity: ListType) {
    return await this.runQuery("put", `${this.resource}/${entity.id}`, entity);
  }

  async delete(id: string | number) {
    return await this.runQuery("delete", `${this.resource}/${id}`);
  }
}

interface IService {
  auth: AuthApiService;
  addresses: CrudApiService<IAddress, INewAddress>;
  dough: ListApiService<IRawDough>;
  ingredients: ListApiService<IRawIngredient>;
  sauces: ListApiService<IRawSauce>;
  sizes: ListApiService<IRawSize>;
  misc: ListApiService<IRawMisc>;
  orders: CrudApiService<IOrder, INewOrder>;
}

const result: Readonly<IService> = {
  auth: new AuthApiService(),
  addresses: new CrudApiService<IAddress, INewAddress>("addresses"),
  dough: new ListApiService<IRawDough>("dough"),
  ingredients: new ListApiService<IRawIngredient>("ingredients"),
  sauces: new ListApiService<IRawSauce>("sauces"),
  sizes: new ListApiService<IRawSize>("sizes"),
  misc: new ListApiService<IRawMisc>("misc"),
  orders: new CrudApiService<IOrder, INewOrder>("orders"),
};

export default result;
