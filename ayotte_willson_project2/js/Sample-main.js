$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addItem').on('pageinit', function(){
    delete $.validator.methods.date;
    var myForm = $('#apartmentForm'),
        apartmenterrorslink = $('#apartmenterrorslink')
        ;

        myForm.validate({
        invalidHandler: function(form, validator){
            apartmenterrorslink.click();
            var html = "";
            for(var key in validator.submitted){
                var label = $('label[for^="'+ key +'"]').not('[generated]');
                var legend = label.closest('fieldset').find('ui-controlgroup-label');
                var fieldName = legend.length ? legend.text() : label.text();
                html += '<li>'+ fieldName +'</li>';
            };
            $("#apartmentFormErrors p").html(html);
        },
        submitHandler: function(){
            var data = myForm.serializeArray();
            storeData();
            }
        });

    //any other code needed for addItem page goes here


});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autoFillApartments = function (){
        for(var n in json){
            var id = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        } 
};

var getData = function(){
    if(localStorage.length === 0){
    alert("There are no Apartments saved in Local Storage so defualt data was added.");
    autoFillApartments();
    }
    var makeList = $('<div>');
    $('#showData').append(makeList)
    for (var i = 0, len = localStorage.length; i < len; i++) {
        
            var makeLi = $('<li>').css('background','black');
            var linksLi = $('<li>');
            makeList.append(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(localStorage.getItem(key));
            var makeSubList = $('<ul>');
            makeLi.append(makeSubList);
            getImage(obj.aptType[1], makeSubList);
        for (var n in obj) {
            var makeSubLi = $('<li>')
            makeSubList.append(makeSubLi);
            var optSubText = $('<p>' + obj[n][0]+" "+obj[n][1] + '</p>').appendTo(makeLi);
            makeSubLi.html(optSubText);
            makeSubList.append(linksLi);
        }
        makeItemLinks(localStorage.key(i), linksLi);
    }

    // var makeDiv = $('<div>').attr('items');
    // var makeList = $('<ul>').appendTo(makeDiv);
    // $('#showData').append(makeDiv);
    // $('#items').css('display','block');
    // for(var i=0, len=localStorage.length; i<len;i++){
    //     var makeLi = $('<li>').append(makeDiv);
    //     var linksLi = $('<li>');
    //     var key = localStorage.key(i);
    //     var value = localStorage.getItem(key);
    // }

};

var getImage = function (catName, makeSubList) {
        var imageLi = $("<li>");
        makeSubList.append(imageLi);
        var newImage = $("<img>");
        var setSrc = newImage.attr("src", "images/" + catName + ".png");
        imageLi.append(newImage);
 
    };

var editItem = function () {
        // Grab the data from our local storage.
        var key = $(this).attr('key');
        var item = JSON.parse(localStorage.getItem(key));
        console.log(key);
        console.log(localStorage)
        var submitButton = $('#submit')
        // Show the form

        // popluate the form feilds with current localStorage values.
        $('#aptType').val(item.aptType[1]);
        $('#aptNum').val(item.aptNum[1]);
        $('#aptSize').val(item.aptSize[1]);
        $('#vacDate').val(item.vacDate[1]);
        $('#rdyDate').val(item.rdyDate[1]);
        $('#isWhiteLock').val(item.isWhiteLock[1]);
        $('#isPower').val(item.isPower[1]);
        $('#condition').val(item.condition[1]);
        $('#comments').val(item.comments[1]);

        // Remove the initial listener from the input 'save contact' button.
        submitButton.off('click');
        // Change Submit Button value to Confirm Button
        $('#submit').val('Confirm Changes');
        var editSubmit = $('#submit');
        // Save the key value established in this function as a property of the editSubmit event
        // so we can use that value when we save the data we edited.
        ////editSubmit.addEventListener("click", validate);
        window.location.reload();
        editSubmit.key = this.key;
};

var makeItemLinks = function (key, linksLi) {
    // add edit single item link
        var editLink = $('<li>')
                        .attr('data-role','button')
                        .text('Edit Apartment')
                        .css('padding-top','10px')
                        .attr('key',key)
                        .on('click', editItem)
                        editLink.key = key;
                        editLink.appendTo(linksLi);
        ;


    // Add delete single item Link
        var deleteLink = $('<li>')
                        .attr('data-role','button')
                        .text('Delete Apartment')
                        .css('padding-top','10px')
                        .attr('this', key)
                        .on('click', deleteItem)
                        deleteLink.key = key;
                        deleteLink.appendTo(linksLi);
        ;
};      


var storeData = function (key){
        // If there is not key this means this is a brand new item and need a new key.
        if(!key){
            var id = Math.floor(Math.random()*10000001);    
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
        $('#showData').listview('refresh');
        //window.location.reload();
}; 

console.log(localStorage);



var deleteItem = function (){
    var ask = confirm("Are you sure you want to delete this Apartment?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Apartment was deleted!");
            window.location.reload();
        } else {
            alert("Apartment was not deleted.");
    }   
};
					
var clearLocal = function(){
    if (localStorage.length === 0) {
        alert("You have not saved any Apartments to the Database.");
    } else {
        var caution = confirm ("This action will erase all of your Apartmnets. This cannot be undone.");
            if (caution){
                localStorage.clear();
                alert("All Apartments have been deleted.");
                window.location.reload();
                return false;  
            } else {
               alert("Delete has been canceled."); 
            }
    }
};

    // REMOVED FOR WEEK TWO
    //$( '#displayLink' ).on( 'click', getData );

    $( '#clearLink'   ).on( 'click', clearLocal );
    $( '#addNew'      ).on( 'click', '#addItem' )//.css('display','none');  FIX THIS SO IT TAKES ME BACK TO FORMPAGE

// $('<li><a href="#">New Link</a></li>').appendTo('#nav');
// $.mobile.changePage('#searchResult');


// Calling external Saved Data
$.ajax({
    url: "xhr/data.json",
    type: "GET",
    dataType: "json",
    success: function(result){
        console.log(result, "Hurray it works!!");
        // here you will add code to display in the DOM
    },
    error: function(result){
        console.log(result, "Did not Work");
    }
});

// Refresh listview
// $('#myList').listview('refresh');

// Dynamic refresh listview
// var cahngePage = function(pageId){
//     $('#'+ pageId).trigger('pageinit');
//     $.mobile.changePage($('#' + pageId),
//         {transition:"slide"});
// };