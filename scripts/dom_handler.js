const DOMHandler = (() => ({
  render: (element) => {
    const container = document.querySelector(element);
    container.innerHTML = element.render();
    element.addEventListeners;
  },
}))();

export default DOMHandler;
