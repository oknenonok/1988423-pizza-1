import isNew from "@/common/helpers/isNew";
import { NEW_ID_PREFIX } from "@/common/constants";

describe("isNew", () => {
  it("test isNew", () => {
    expect(isNew(15)).toBeFalsy();
    expect(isNew(`${NEW_ID_PREFIX}1`)).toBeTruthy();
  });
});
