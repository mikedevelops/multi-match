import { Vector2 } from "../../src/Vector/Vector2";

describe("Vector", () => {
  describe("fromTo", () => {
    test("Should iterate between 2 vectors", () => {
      const callback = jest.fn();

      Vector2.fromTo(Vector2.zero(), new Vector2(1, 1), callback);

      expect(callback.mock.calls).toHaveLength(4);
      expect(callback.mock.calls[0][0]).toEqual(Vector2.zero());
      expect(callback.mock.calls[1][0]).toEqual(new Vector2(1, 0));
      expect(callback.mock.calls[2][0]).toEqual(new Vector2(0, 1));
      expect(callback.mock.calls[3][0]).toEqual(new Vector2(1, 1));
    });
  });

  describe("lerp", () => {
    test("Should lerp between 2 points", () => {
      const a = new Vector2(1, 1);
      const b = new Vector2(2, 2);

      console.log(Vector2.lerp(a, b, 0.16));
    });
  });
});
