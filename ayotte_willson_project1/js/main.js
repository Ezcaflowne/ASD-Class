$('#home').on('pageinit', function(){
        //code needed for home page here
});

$(document).on('pageinit', function(){

        var myForm = $( '#apartmentForm' );
            myForm.validate({
            invalidHandler: function( form, validator ) {
            },
            submitHandler: function() {
            storeData();
        }
    });

    //any other code needed for addItem page goes here
    $( '#displayData' ).on( 'click', getData );
    $( '#clearData'   ).on( 'click', clearLocal );
    $( '#addNew'      ).on( 'click', windowReload );

});

// Get Data //
var getData = function (){
            toggleControls("on");
        if(localStorage.length === 0){
            alert("There are no Apartments saved in Local Storage so defualt data was added.");
            autoFillApartments();
        }
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        $('#showData').append(makeDiv)
        //document.body.appendChild(makeDiv);
        $('items').style.display = "block";
        for(var i=0, len=localStorage.length; i<len;i++){
            var makeli = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            // Convert the string from local storage value back to an object by using JSON.parse
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            getImage(obj.aptType[1], makeSubList);
            for(var n in obj){
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi); // Create edit and delete button or links for each item in local storage
        }
};

// Clear Data //

var clearLocal = function(){
    if(localStorage.length === 0) {
        alert("You have not saved any Apartments to the Database.");
    } else {
        localStorage.clear();
        alert("All Apartments have been deleted.");
        window.location.reload();
        return false;
    }
};

// Reload/Clear // 

var windowReload = function (){
    window.location.reload();
    return false;
};

// Auto Fill //

var autoFillApartments = function (){
        // The actual JSON Object data required for this to work is coming from out json.js file, which is loaded from out .html page.
        // Store the JSON Object into Local Storage.
        for(var n in json){
            var id = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        } 
};

// Save Data //

var storeData = function (key){
        // If there is not key this means this is a brand new item and need a new key.
        if(!key){
            var id              = Math.floor(Math.random()*10000001);    
        } else {
            // Set the id to the existing key we are editing so that it will save over the data.
            // The key is the same key thats been passed along from the editSubmit event handler
            // to the validate function, and then passed here, into the storeData function.
            id = key;
        }
        
        // Gather up all our form field values and stred in an object
        // Object properties contain an array with the form label and input values.
        // getCheckboxPower();
        // getCheckboxWhite();
        var item                = {};
            item.aptType        = ["Apartment Type:", $("#aptType").val()];
            item.aptNum         = ["Apartment Number:", $("#aptNum").val()];
            item.aptSize        = ["Apartment Size:", $("#aptSize").val()];
            item.vacDate        = ["Vacate:", $("#vacDate").val()];
            item.rdyDate        = ["Ready:", $("#rdyDate").val()];
            item.isWhiteLock    = ["Whitelock:", $("#isWhiteLock").val()];
            item.isPower        = ["Power:", $("#isPower").val()];
            item.condition      = ["Condition:", $("#condition").val()];
            item.comments       = ["Comments:", $("#comments").val()];
        // Save data into localStorage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Apartment is Saved!");
};
