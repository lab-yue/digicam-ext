(() => {
  setTimeout(() => {
    const [_, name, password, button] = document.querySelectorAll<
      HTMLInputElement
    >("input");

    if (name && name.value && password && password.value && button) {
      console.log("auto login 😎");
      button.click();
    }
  }, 100);
})();
