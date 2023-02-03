
let label = document.getElementById("label")
let ShoppingCart = document.getElementById("shopping-cart")





let basket = JSON.parse(localStorage.getItem("data")) || []

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    console.log(basket.map((x) => x.item))
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

calculation();





let generateCartItems = () => {
    if (basket.length !== 0) {
        return (ShoppingCart.innerHTML = basket
            .map((x) => {
                //  console.log(x)
                let { id, item } = x

                let search = shopItemsData.find((y) => y.id === id) || []

                //! IT WILL RUN IF THE CART HAS SOME ITEMS IN IT
                //! THE MAP METHOD WILL TARGET ALL THE DATA ONE BY ONE
                //! AND WILL THAN RUN THE SIDE FUNCTION

                return `                                            
        <div class = "cart-item">
           <img width="100" src="${search.img}" />
           <div class= "details">

                <div class="title-price-x">
                    <h4 class= "title-price">
                    <p> ${search.name}</p>
                    <p class="cart-item-price"> $ ${search.price}</p>
                    </h4>
                    <i onclick = "removeItem(${id})"class="bi bi-x-lg"></i>
               </div>  
                    <div class="buttons">
                    <i onclick = "decrement(${id})" class="bi bi-dash"></i>
                    
                    <div id=${id} class="quantity">${item}</div>  

                    <i onclick = "increment(${id})" class="bi bi-plus"></i>
               </div>
                <h3>$ ${item*search.price}</h3>
           </div>
        </div>              
        `
            }).join(""))
    }
    else {
        ShoppingCart.innerHTML = ` `
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back To Home</button>
        </a>
        `;

    }
};

generateCartItems();


let increment = (id)=> {            // ! PASSING ID AS AN ARGUMENT, PARAMETERS TAKES THE VALUE , GIVES THE VALUE
    let selectedItem = id           // ! IN THE TEXT CODE
    // console.log(selectedItem) 
    // console.log(selectedItem.id)     // ?? SELECTEDITEM.ID RETURNS THE ID VALUE


  // ! USING ARRAY FIND METHOD
  // ! THE FIND METHOD WILL LOOP OVER THE BASKET ARRAY AND WILL RETURN UNDEFINED DUE TO EMPTY ELEMETS IN THE ARRAY
  // ! THE OUR IF CONDITION WILL BE SATISFIED AND THEN THE FIRST ITEM OR OBJECT WILL BE ADDED TO THE BASKET ARRAY 

    
    let search = basket.find((x) => x.id === selectedItem.id);  

    console.log(typeof(search)) 

    if(search === undefined) {
         
        basket.push({
        id : selectedItem.id,
        item : 1
         })
    
     

    }else{
        console.log(search.id);
        search.item += 1;     // !  HOW THIS THING IS WORKING
    }

    // localStorage.setItem("data", JSON.stringify(basket)) // ! CONVERTING THE BASKET ARRAY TO STRING USING JSON.STRINGIFY
    

// console.log(basket)   

update(selectedItem.id);

generateCartItems();

localStorage.setItem("data", JSON.stringify(basket)) // ! CONVERTING THE BASKET ARRAY TO STRING USING JSON.STRINGIFY


}



let decrement = (id)=> {
    let selectedItem = id 
    let search = basket.find((x) => x.id === selectedItem.id);  

    // console.log(typeof(search)) 

    if(search === undefined) return

    else if(search.item === 0) return; //! ENDING THE PROCESS WHEN THE ITEM BECOMES 0
    
    else{
        search.item -= 1; 
}

// localStorage.setItem("data", JSON.stringify(basket))

// ! IN THE STATEMENT BELOW WE ARE REMOVING OBJECT WITH 0 ITEM IN IT , FILTER METHOD WILL RETURN US ONLY THE OBJECT
// ! WHICH HAVE ITEM QUANTITY IN IT



// ! PUTTING LOCAL STORAGE AT THE BOTTOM SO THAT ALL THE CHANGES MADE ABOVE ARE STORED IN LOCAL STORAGE.


// console.log(basket) 

update(selectedItem.id);

basket = basket.filter((x) => x.item != 0);

generateCartItems();

localStorage.setItem("data", JSON.stringify(basket))




}


let update = (id)=> {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item)
        document.getElementById(id).innerHTML = search.item

        calculation();
        ToatlAmount();
}


let removeItem =(id)=> {
    let selectedItem = id
    basket = basket.filter((x)=> x.id !== selectedItem.id ) //!WILL RETURN US THE OBJECT WHOSE ID WILL NOT BE EQUAL TO 
                                                         //! THE SELECTED ID AND AS SUCH WE WILL GET THE THREE OBJECTS
    generateCartItems();
    ToatlAmount()
    calculation();
    localStorage.setItem("data", JSON.stringify(basket))

}


let ToatlAmount = ()=>{
    if(basket.length != 0) {
        let amount = basket.map((x)=>{
            let { item, id } = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return item * search.price;
        }).reduce((x,y)=>x+y,0)
        label.innerHTML = `
        <h2> Total Bill : $ ${amount} </h2>
        <button class = "checkout">Checkout</button>
        <button onclick = "clearCart()"class = "removeAll">Clear Cart</button>
        `
        
    } else return
   };

ToatlAmount();


let clearCart = () => {
    basket = []
    generateCartItems();
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))

}














































































