const defaultOptions = {
  name: "新規プリセット",
  q1: "1",
  q2: "5",
  q3: "8",
  q4: "12",
  text1: "特にありません",
  text2: "特にありません",
  after: "0",
};
// @ts-ignore
const params = window.injectedProps;
const preset = params ? params : defaultOptions;
const selectorAnswers = [preset.q1, preset.q2, preset.q3, preset.q4];
const textboxs = document.querySelectorAll("textarea");
const next = document.querySelector(".btnNext");
const selectors = Array.from(document.querySelectorAll("input"));

if (textboxs) {
  textboxs[0].textContent = preset.text1;
  textboxs[1].textContent = preset.text2;
}

if (selectors.length) {
  selectorAnswers.map((i) => selectors[parseInt(i, 10)].click());
}

if (preset.after !== "0") {
  // @ts-ignore
  next.click();
}
