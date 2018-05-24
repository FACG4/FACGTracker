const selector = attribute => document.querySelector(attribute);
const creator = (element, parent, content, classes, id) => {
  const newElement = document.createElement(element);
  if (content) newElement.textContent = content;
  if (id) newElement.setAttribute('id', id);
  if (classes) newElement.setAttribute('class', classes);
  if (parent) return parent.appendChild(newElement);
  return newElement;
};
const replacor = (element, oldElement, parent, content, classes, id) => {
  const newElement = document.createElement(element);
  if (content) newElement.textContent = content;
  if (classes) newElement.setAttribute('class', classes);

  if (parent) {
    return parent.replaceChild(newElement, oldElement);
  }
  return newElement;
};
