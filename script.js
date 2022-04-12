

// create the html elements in DOM 
var mainContainer = eleWithClassName("div","container");
    var headContainer = eleWithClassName("div","product_header");
        var headerTitle = eleWithValue("h1","MackupAPI - Hackathon");
        var searchTitle = eleWithValue("h4","");
            var dropDown = document.createElement("select");
                dropDown.setAttribute("type", "select");
                dropDown.setAttribute("id", "text");
                dropDown.length = 0;
                var defaultOption = document.createElement("option");
                defaultOption.text = "Choose Product Type";
                dropDown.add(defaultOption);
                dropDown.selectedIndex = 0;
                var inputArray = [];
                var outputArray = [];
                let option;
                populateDropDown();
            var searchButton = document.createElement("button");
                searchButton.addEventListener("click",MackupAPIfn);
                searchButton.setAttribute("type", "button");
                searchButton.setAttribute("class", "button");
                searchButton.innerHTML="Search";
        searchTitle.append(dropDown,searchButton);
    headContainer.append(headerTitle,searchTitle);
    var hr = document.createElement("hr");
    var productListContainer = eleWithClassName("div","product_section");
mainContainer.append(headContainer,hr);
document.body.append(mainContainer);


// function to display the filtered product list from the JSON data
function productDisplay(res1){
    //create the product diplay container 
    var product = eleWithClassName("div","product");
        var productLink = CreateAandImgTag("a","href",res1.product_link);
            var panelBody = eleWithClassName("div","panel-body");
                var prdImgContainer = eleWithClassName("div","product_image");
                    var prdImage = CreateAandImgTag("img","src",res1.image_link);
                prdImgContainer.append(prdImage);
                var prdDetails = eleWithClassName("div","product_details");
                    var pProduct = document.createElement("p");
                    // pProduct.innerHTML = `<span class="bold">Product Name: </span>${res1.name}`;
                    pProduct.innerHTML = `<span class="bold">${res1.name}</span>`;

                    var pBrand = document.createElement("p");
                    // pBrand.innerHTML = `<span class="bold">Brand: </span>${res1.brand}`;
                    pBrand.innerHTML = `<span>${res1.brand}</span>`;
                    
                    var pDescription = document.createElement("p");
                    pDescription.setAttribute("id","description");
                    // pDescription.innerHTML = `<span class="bold">Description: </span>${res1.description}`;
                    pDescription.innerHTML = `<span>${res1.description}</span>`;

                    var pPrice = document.createElement("p");
                    // pPrice.innerHTML = `<span class="bold">Price: $</span>${res1.price}`;
                    pPrice.innerHTML = `<span class="bold">$${res1.price}</span>`;

                prdDetails.append(pProduct,pBrand,pPrice,pDescription);
             panelBody.append(prdImgContainer,prdDetails);
        productLink.append(panelBody);
    product.append(productLink);
    productListContainer.append(product);
    mainContainer.append(productListContainer);
    document.body.append(mainContainer);
}

// function to create element with class name
function eleWithClassName(elementname,attrname){
    let ele = document.createElement(elementname);
    ele.className = attrname;
    return ele;
}

// function to crete element with value
function eleWithValue(elementname,value){
    let ele = document.createElement(elementname);
    ele.innerHTML = value;
    return ele;
}
//function to create element with attribute type  and value
function CreateAandImgTag(elementname,attr1,attr2){
    let ele = document.createElement(elementname);
    ele.setAttribute(attr1,attr2);
    return ele;
}

//------------------------------------------------------------------------------------------------------
//                              Reference for populate dropDown
//
//https://www.geeksforgeeks.org/how-to-get-all-unique-values-remove-duplicates-in-a-javascript-array/
// https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json
//
//---------------------------------------------------------------------------------------------------------  


// function to populate the dropdown selector with product type from the JSON data 
async function populateDropDown() {
    try {
        let res = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json`);
        var res1 = await res.json();
    } catch (error) {
        alert(`Fetch error : ${error.message}`);
    }
    
    for (let i = 0; i < res1.length; i++) {
        inputArray.push(res1[i].product_type);
    }
    outputArray = Array.from(new Set(inputArray))
    // console.log(outputArray);

    for(let i = 0; i < outputArray.length; i++) {
        option = document.createElement('option');
        option.text = outputArray[i];
        dropDown.add(option);
        // console.log(input)
    }
}

// function to fetch the MackupAPI JSON data from the selected product type
async function MackupAPIfn() { 
    try {
        let cc = document.getElementById("text").value;
        let res = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${cc}`);
        var res1 = await res.json();
    } catch (error) {
        alert(`Fetch error : ${error.message}. Try again.`);
    }
    productListContainer.innerHTML ="";
    // console.log(res1);
    for(let i = 0; i <res1.length;i++) {
        productDisplay(res1[i]);
    }
}

