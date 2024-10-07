const isInsideElement = (elementClassOrId, mouseX, mouseY) => {
  const element = document.querySelector("." + elementClassOrId) || document.getElementById(elementClassOrId);
  const rect = element.getBoundingClientRect();
  return mouseX > rect.x &&
    mouseY > rect.y &&
    mouseX < (rect.x + rect.width) &&
    mouseY < (rect.y + rect.height);
}

const popNotification = (content) => {
  const element = document.getElementById("notification-content");
  const notElement = document.querySelector(".notification");
  element.innerHTML = content;
  notElement.style.right = "2px";

  setTimeout(() => {
    notElement.style.right = "-16rem";
  }, 3000);
}

export { isInsideElement, popNotification }