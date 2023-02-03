

let shop = document.getElementById("shop") 

 

// let shopItemsData = [
//     {
//        id :"aa1",
//        name : "Casual Shirt",
//        price : "45",
//        desc: "loremfbfdnfljdfnvljhdsfbgvjhdsfn",
//        img: "images/img-1.jpg"
//     },
//     { 
//       id :"aa2",
//       name : "office shirt",
//       price : "55",
//       desc: "loremfbfdnfljdfnvljhdsfbgvjhdsfn",
//       img: "images/img-2.jpg"
//    },
//     {
//       id :"aa3",
//       name : "T-Shirt",
//       price : "25",
//       desc: "loremfbfdnfljdfnvljhdsfbgvjhdsfn",
//       img: "images/img-3.jpg"
//     },
//     {
//        id :"aa4",
//       name : "Men's Suit",
//       price : "200",
//       desc: "loremfbfdnfljdfnvljhdsfbgvjhdsfn",
//       img: "images/img-4.jpg"
//     }
//    ];

let basket = JSON.parse(localStorage.getItem("data")) || []



let generateShop =()=> {
    return (shop.innerHTML = shopItemsData
        .map((x)=>{
            let {id,name,price,desc,img} = x //HOW IS THIS DONE //! USING DESTRUCTURING

            let search = basket.find((x) => x.id === id) || []

            // console.log(id) // ! RETURNS THE ID VALUE AND TYPEOF IS STRING

        return (` <div id=product-id${id} class="item">
        <img width="220" height = "146px" src=${img} alt="" srcset="">
        <div class="details">
            <h3>${name}</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick = "decrement(${id})" class="bi bi-dash"></i>
                    
                    <div id=${id} class="quantity">${search.item === undefined ? 0: search.item}</div>  

                    <i onclick = "increment(${id})" class="bi bi-plus"></i>
                </div>
            </div>
        </div>
    </div>`)
    }).join("")) // USING .JOIN() TO REMOVE COMMA ??

}

// ! ID TILL HERE IN THE ABOVE (CLASS QUANTITY) IS AN OBJECT

generateShop();



// ! WHILE PASSING THE ID IN THE FUNCTON BELOW WE PASSED AN OBJECT.
// ! SO IT WILL PRING THE WHOLE ELEMENT CONTAINING THE DIV 
// ! SelectedItem.id WILL ACCESS THE ID PROPERTY



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

localStorage.setItem("data", JSON.stringify(basket))




}

// ! MAKING A SEARCH FUNCTION TO CHECK WHETHER THE ID EXISTS OR NOT, THE ONLY WE WILL INCREMENT HTE NUMBER

let update = (id)=> {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item)
        document.getElementById(id).innerHTML = search.item

        calculation()
}


let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    console.log(basket.map((x) => x.item))
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) =>x+y,0)
}

calculation();






















