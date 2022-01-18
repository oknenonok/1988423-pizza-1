import resources from "@/common/enums/resources";
import {
  AuthApiService,
  CrudApiService,
  ListApiService,
} from "@/services/api.service";

export default (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.DOUGH]: new ListApiService(resources.DOUGH, notifier),
    [resources.INGREDIENTS]: new ListApiService(resources.INGREDIENTS, notifier),
    [resources.SAUCES]: new ListApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new ListApiService(resources.SIZES, notifier),
    [resources.MISC]: new ListApiService(resources.MISC, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};
