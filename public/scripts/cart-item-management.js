const cartForms = document.querySelectorAll(".cart-item-management");

async function updateCartItem(event) {
    event.preventDefault();
    const form = event.target;
    const productId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
    const quantity = form.querySelector('input').value;
    
    let response;
    try {
        response = await fetch("/cart/items", {
            method: "PATCH",
            body: JSON.stringify({
                productId: productId,
                quantity: quantity,
                _csrf: csrfToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        alert("something is wrong i can feel it")
        return;
    }
    // console.log(response)
    if (!response.ok) {
        alert("something is wrong i can feel it")
        return;
    }
    const responseData = await response.json();

    console.log(responseData.updatedItemData.newTotalprice);

    if (responseData.updatedItemData.updatedItemPrice == 0) {
        form.parentElement.parentElement.remove();
        
        const totalPriceElement = form.parentElement.querySelector('.cart-item-price');
        totalPriceElement.textContent = responseData.updatedItemData.updatedItemPrice;
        const cartTotalPriceElement = document.getElementById('cart-total-price');
        cartTotalPriceElement.textContent = 0;
    }
    else {
        const totalPriceElement = form.parentElement.querySelector('.cart-item-price');
        totalPriceElement.textContent = responseData.updatedItemData.updatedItemPrice;

        const cartTotalPriceElement = document.getElementById('cart-total-price');
        cartTotalPriceElement.textContent = responseData.updatedItemData.newTotalprice;
    }


    const cartBadges = document.querySelectorAll(".nav-items .badge");
    for (const cartBadge of cartBadges) {
        cartBadge.textContent = responseData.updatedItemData.newTotalQuantity
    }

}

for (const cartForm of cartForms) {
    cartForm.addEventListener('submit', updateCartItem)
}