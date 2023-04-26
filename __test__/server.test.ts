import { assertEquals } from "./deps.ts";

Deno.test("server.ts", async (t) => {
  await t.step("it does nothing", () => {
    assertEquals(true, true);
  });
});
