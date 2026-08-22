export default async function choiceBoardScenario(a, b) {
  await a.getByRole("button", { name: "Walk and talk" }).click();
  await b.getByText("Walk and talk").waitFor({ timeout: 10_000 });

  await a
    .getByRole("button", { name: /Walk and talk 0 picks/ })
    .click();
  await b
    .getByRole("button", { name: /Walk and talk 1 pick/ })
    .click();
  await a.getByText("2 picks").waitFor({ timeout: 10_000 });
  await a.waitForTimeout(1_000);
}
