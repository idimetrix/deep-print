import { dpb } from "..";

test("renders a single left child", () => {
  const str = "Node" + dpb("", [() => `foo`]);
  expect(str).toBe(
    `Node
← foo`,
  );
});

test("renders a single right child", () => {
  const str = "Node" + dpb("", [null, () => `foo`]);
  expect(str).toBe(
    `Node
→ foo`,
  );
});

test("renders one level of left and right children", () => {
  const str = "Node" + dpb("", [() => "left", () => "right"]);
  expect(str).toBe(
    `Node
← left
→ right`,
  );
});

test("renders two levels of left and right children", () => {
  const str =
    "Node" +
    dpb("", [
      (tab) => "left" + dpb(tab, [() => "left", () => "right"]),
      (tab) => "right" + dpb(tab, [() => "left", () => "right"]),
    ]);
  expect(str).toBe(
    `Node
← left
  ← left
  → right
→ right
  ← left
  → right`,
  );
});
