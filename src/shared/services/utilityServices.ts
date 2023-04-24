
/**
 * @name scrollToElementAfterBackClick
 * @description method to restore the scroll after hiiting the back button
*/
const scrollToElementAfterBackClick = () => {
    const clickedId = (parseInt(localStorage.getItem("clickedId") as string));
    const isClicked = localStorage.getItem("isClicked") as string
    const currentView = localStorage.getItem("currentView") as string
    if (isClicked === "yes") {
        if (currentView === "list") {
            document.getElementById(`row-${clickedId}`)?.scrollIntoView();
        }
        if (currentView === "grid") {
            document.getElementById(`card-${clickedId}`)?.scrollIntoView();
        }
    }
}
/**
 * @name findFirstElementInViewPort
 * @param elements array from which first element in the viewport is to be found
 * @returns first element in the viewport
 */
const findFirstElementInViewPort = (elements: any) =>
    Array.prototype.find.call(
        elements,
        element => element.getBoundingClientRect().y >= 192 // header offset
    );

const utilityServices = {
    scrollToElementAfterBackClick,
    findFirstElementInViewPort,
}

export default utilityServices;