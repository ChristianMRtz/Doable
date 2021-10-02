const DOMHandler = (() => ({
  render: (element) => {
    const container = document.querySelector('.js-content');
    container.innerHTML = element.render();
    element.addEventListeners();
  },
}))();

export default DOMHandler;
