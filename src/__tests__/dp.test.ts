import { dp } from "..";

test("renders a single child node", () => {
  const str = "Node" + dp("", [() => `foo`]);

  expect(str).toBe(
    `Node
└─ foo`,
  );
});

test("renders two children node", () => {
  const str = "Node" + dp("", [() => `foo`, () => `bar`]);

  expect(str).toBe(
    `Node
├─ foo
└─ bar`,
  );
});

test("renders two levels of nodes", () => {
  const str =
    "Node" + dp("", [() => `foo`, (tab) => `bar` + dp(tab, [() => `baz`])]);

  expect(str).toBe(
    `Node
├─ foo
└─ bar
   └─ baz`,
  );
});

test("renders two levels of nodes, with double tree line", () => {
  const str =
    "Node" +
    dp("", [
      (tab) => `foo` + dp(tab, [() => `baz`]),
      (tab) => `bar` + dp(tab, [() => `baz`]),
    ]);

  expect(str).toBe(
    `Node
├─ foo
│  └─ baz
└─ bar
   └─ baz`,
  );
});

test("family tree example", () => {
  const str =
    "Me" +
    dp("", [
      (tab) =>
        `Father` +
        dp(tab, [
          (tab) =>
            `Grandfather` +
            dp(tab, [() => `Great-grandfather`, () => `Great-grandmother`]),
          () => `Grandmother`,
        ]),
      (tab) => `Mother` + dp(tab, [() => `Grandfather`, () => `Grandmother`]),
    ]);

  expect("\n" + str).toBe(
    `
Me
├─ Father
│  ├─ Grandfather
│  │  ├─ Great-grandfather
│  │  └─ Great-grandmother
│  └─ Grandmother
└─ Mother
   ├─ Grandfather
   └─ Grandmother`,
  );
});

test("can add a blank line", () => {
  const str =
    "start" + dp("", [(tab) => "line 1", () => "", (tab) => "line 2"]);

  expect("\n" + str).toBe(
    `
start
├─ line 1
├─
└─ line 2`,
  );
});

test("can produce wide tabs", () => {
  const str =
    "Array" +
    dp("", [
      (tab) =>
        "[5]: Object" +
        dp(tab + " ".repeat("[5]: ".length), [
          (tab) => "item 1",
          (tab) => "item 2",
        ]),
    ]);

  expect("\n" + str).toBe(
    `
Array
└─ [5]: Object
        ├─ item 1
        └─ item 2`,
  );
});

test('last child is angle, when end of list is "null"', () => {
  const str =
    "Array" +
    dp("", [
      (tab) => "[0]:" + dp(tab + " ", [(tab) => "item 1", null]),
      null,
      null,
    ]);

  expect("\n" + str).toBe(
    `
Array
└─ [0]:
    └─ item 1`,
  );
});
