const addCartBtns = document.querySelectorAll("#cards button");
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');


async function addNewItem(event) {
    const buttonElement = event.target;
    const productId = buttonElement.dataset.productid;
    const csrftoken = buttonElement.dataset.csrf;
    let response;
    try {
        response = await fetch('/cart/additem', {
            method: 'POST',
            body: JSON.stringify({
                productId: productId,
                _csrf: csrftoken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        alert('Something is wrong i can feel it 😣');
        return;
    }

    if (!response.ok) {
        alert('Something is wrong i can feel it 😣');
        return;
    }
    const responseData = await response.json();
    console.log(responseData)
    const newTotalQuantity = responseData.newTotalItems
    for (const cartBadgeElement of cartBadgeElements) {
        cartBadgeElement.textContent = newTotalQuantity;
    }
}


for (const addCartBtn of addCartBtns) {
    addCartBtn.addEventListener('click', addNewItem)
}
