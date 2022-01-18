import axios from "@/plugins/axios";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }

  async runQuery(method, url, params = null) {
    const { data } = await axios[method](url, params);
    return data;
  }
}

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  async login(params) {
    return await this.runQuery("post", "login", params);
  }

  async logout() {
    return await this.runQuery("delete", "logout");
  }

  async loadData() {
    return await this.runQuery("get", "whoAmI");
  }
}

export class ListApiService extends BaseApiService {
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  async query() {
    return await this.runQuery("get", this.#resource);
  }
}

export class CrudApiService extends ListApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  async post(entity) {
    return await this.runQuery("post", this.#resource, entity);
  }

  async put(entity) {
    return await this.runQuery("put", `${this.#resource}/${entity.id}`, entity);
  }

  async delete(id) {
    return await this.runQuery("delete", `${this.#resource}/${id}`);
  }
}