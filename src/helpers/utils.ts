export const download = (filename: string, content: any) => {
  const element = document.createElement("a");

  const timeoffset = -32400000; // 日本のタイムゾーン＝＝(new Date()).getTimezoneOffset() * 60000;
  const time = new Date(Date.now() - timeoffset)
    .toISOString()
    .split(".")[0]
    .replace(/[ T:\.]/g, "-");

  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content),
  );
  element.setAttribute("download", time + "-" + filename);
  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
