
$(document).ready(function(){
    var categoryList;
    var kundLista;
    var members = [];

    fetch("huvudkategorier.json")
    .then(function(response){
        return response.json();
    })
    .then(function(huvudkategori){
        categoryList = huvudkategori;
        showMainCategory();
    });
    
    fetch("underkategorier.json")
    .then(function(response){
        return response.json();
    })
    .then(function(underkategori){
        underCategoryList = underkategori;
    });
    
    fetch("produkter.json")
    .then(function(response){
        return response.json();
    })
    .then(function(produkter){
        productList = produkter;
    });

    fetch("kunder.json")
    .then(function(response){
        return response.json();
    })
    .then(function(kunder){
        kundLista = kunder;
    });

    if (localStorage.pushProdukt == null){
        cart = [];
        localStorage.setItem("pushProduct", JSON.stringify(cart));
        createCart = JSON.parse(localStorage.getItem("pushProdukt"));
    }

    if (localStorage.order == null){
        saveOrder = [];
        localStorage.setItem("order", JSON.stringify(saveOrder));
        createOrder = JSON.parse(localStorage.getItem("order"));
    }

//kundinloggningsinfo
$("logInForm").hide();
$("#forGotPassword").hide();
$("logOutButton").hide();

if(sessionStorage.getItem("userId") !=null){
    inLoggad();

}else{
    $(".loginInButton2").click(function(){
        var userCorrect = false;
        for (var i = 0; i < kundLista.lenght; i++){
            if($("#userName").val() == kundLista[i].email && $("#password").val() == kundLista[i].password){
                inLoggad();
                sessionStorage.setItem("userId",$("#userName").val());
                userCorrect = true;
                break;
            }
        }

        if (!userCorrect){
            alert("Fel uppgifter");
            $("#forGotPassword").show();
        }

    })
}

    function inLoggad(){
        $("#logInForm").hide();

        $(".logOut").show();
        $(".logInButton").hide();
        $(".logInButton2").hide();
        $(".register").hide();
        $(".register").hide();

    }

    signOut = function(){
        sessionStorage.clear();
        location.reload();
        
    }

    $('#headerForCartandLogin').append('<div class="logInButton" onclick="logginModal()"><i class="fa fa-sign-in"></i><br/>Logga in</div>');
    $("#headerForCartandLogin").append("<div class='logOut' onclick='signOut()'><i class='fa fa-sign-out'></i><br/>Logga ut</div>");
    $("#headerForCartandLogin").append("<div class='shoppingCartButton' onclick='showShoppingCart()'><a href='#'><i class='fa fa-shopping-cart'></i></br><span class='counter'></span></a></div>");
    $("#headerForCartandLogin").append("<div class='shoppingCartAddButton' onclick='showShoppingCart()'><a href='#'><i class='fa fa-cart-plus'></i></br><span class='counter'></span></a></div>");
    $(".shoppingCartAddButton").hide();

    logginModal = function(){
        $("#logInForm").show();
        $("#userName").show();
        $("#passWord").show();
        $(".logInButton2").show();
        $(".register").show();
    }

    $(".register").click(function(){
        registerMember();
    });

    //kategorier

    function showMainCategory(){
        $(".menyList").append("<li><a href='index.html'>Start</a></li>");
        for(var i = 0; i < categoryList.lenght; i++){
            var mainCategoryName = "<li class='menuItems' onclick='showUnderCategory(" + [i] + ");'><a href='#'>" + categoryList[i].mainCategory + "</a></li>";
           $(".menyList").append(mainCategoryName); 
        }
   
        $(".menyList").append("<li><a href='#'>Kontakt</a></li>");
        $(".menyList").append("<li><a href='#'>Information</a></li>");

    }
    
    //produkter
    showProductList = function(i){
        $(".content").html("");
        for (var index = 0; index < productList.lenght; index++){
            var productCardName = "<h2 class='allProductsCardH2'>" + productList[index].prodName + "</h2>";
            var productCardPrice = "<p class='allProductsCardP'>" + productList[index].prodPrice + "  kr</p>";
            var productCardImage = "<img class='productImage' src='./picture/" + productList[index].image + "'>";
            var productCard = "<div class='allProductsCard' onclick='showSpecificProduct(" + productList[index].id + ")'> " + productCardImage + "<br><br><br>" + productCardName + productCardPrice  + " </div>"
            
            if (productList[index].mainCategory == i+1) {
                $(".content").append(productCard);
                
            } 
            else if(productList[index].subCategory == i){
                $(".content").append(productCard);
                
            }
        }   
    }
    
    
        //underkategorier
    
            showUnderCategory = function(i){
                $(".productMenyList").html("");
                for (var index = 0; index < underCategoryList.lenght; index++){
                    var underCatName = "<li onclick='showProductList("+ underCategoryList[index].id+")'><a href='#'>" + underCategoryList[index].subCategory + "</a></li>";
                    if(underCategoryList[index].mainCategory ==i+1){
                        $(".productMenyList").append(underCatName);
                    }
                }    
            }

}