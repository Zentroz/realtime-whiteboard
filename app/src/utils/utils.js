const isInsideElement = (elementClassOrId, mouseX, mouseY) => {
  const element = document.querySelector("." + elementClassOrId) || document.getElementById(elementClassOrId);
  const rect = element.getBoundingClientRect();
  return mouseX > rect.x &&
    mouseY > rect.y &&
    mouseX < (rect.x + rect.width) &&
    mouseY < (rect.y + rect.height);
}

export { isInsideElement }