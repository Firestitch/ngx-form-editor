export function clickOutsideElement(event: any, targetElement: Element): boolean {
  const { top, right, bottom, left } = targetElement.getBoundingClientRect();

  let clientX = 0;
  let clientY = 0;

  if (event.touches) {
    const touch = event.touches[0];
    clientX = touch.clientX;
    clientY = touch.clientY;
  } else {
    clientX = event.clientX;
    clientY = event.clientY;
  }

  return clientX < left || clientX > right || clientY < top || clientY > bottom;
}
