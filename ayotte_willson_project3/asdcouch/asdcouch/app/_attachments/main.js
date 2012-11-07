$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	


// Calling external Saved Data
// $.ajax({
//     url: "xhr/data.json",
//     type: "GET",
//     dataType: "json",
//     success: function(result){
//         console.log(result, "Hurray it works!!");
//         // here you will add code to display in the DOM
//     },
//     error: function(result){
//         console.log(result, "Did not Work");
//     }
// });

$( '#couchData' ).on('pageinit', function(){

	 $( '#couchJsonButton' ).on( 'click', function () {
		$('#viewCouchData').empty();
       $.ajax( {
           url: '_views/apt',
           type: 'GET',
           dataType: 'json',
           success:function ( result ) {
				console.log(result);
               $.each( result.rows, function( home, apt ){
               	console.log(apt.value.aptType);
               	var aptType      = apt.value.aptType;
               	var aptNum       = apt.value.aptNum;
               	var aptSize      = apt.value.aptSize;
               	var vacDate      = apt.value.vacDate;
               	var rdyDate      = apt.value.rdyDate;
               	var isWhiteLock  = apt.value.isWhiteLock;
               	var isPower      = apt.value.isPower;
               	var condition    = apt.value.condition;
               	var comments     = apt.value.comments;
                  
					//console.log(aptType);
                   $( ' ' + 
					'<div class="apt">' +
					'<p>' + aptType[0]       + " " + aptType[1] +
					'<br>' + aptNum[0]       + " " + aptNum[1] + 
					'<br>' + aptSize[0]      + " " + aptSize[1] + 
					'<br>' + vacDate[0]      + " " + vacDate[1] +
					'<br>' + rdyDate[0]      + " " + rdyDate[1] +
					'<br>' + isWhiteLock[0]  + " " + isWhiteLock[1] +
					'<br>' + isPower[0]      + " " + isPower[1] +
					'<br>' + condition[0]    + " " + condition[1] +
					'<br>' + comments[0]     + " " + comments[1] + '</p>' +
					'</div>'
					).appendTo( '#viewCouchData' );
               });
			},
            error: function(result){
            console.log(result, "Did not Work");
            }
        });
    });
});


// REMOVED FOR WEEK 3
// $( '#remoteData' ).on('pageinit', function(){

    // Calling data.json
    // $( '#jsonButton' ).on( 'click', function () {
    //     $('#viewData').empty();
    //     $.ajax( {
    //         url: 'xhr/data.json',
    //         type: 'GET',
    //         dataType: 'json',
    //         success:function ( result ) {
    //             console.log(result, "It Works");
    //             for ( var i = 0, len = result.apartments.length; i < len; i++ ) {
    //                 var item = result.apartments[i];
    //                 //console.log(item);
    //                 $( ' ' + 
    //                 '<div class="apartment">'       +
    //                 '<p>'  + item.aptType[0]        + " " + item.aptType[1] +
    //                 '<br>' + item.aptNum[0]         + " " + item.aptNum[1] + 
    //                 '<br>' + item.aptSize[0]        + " " + item.aptSize[1] + 
    //                 '<br>' + item.vacDate[0]        + " " + item.vacDate[1] +
    //                 '<br>' + item.rdyDate[0]        + " " + item.rdyDate[1] +
    //                 '<br>' + item.isWhiteLock[0]    + " " + item.isWhiteLock[1] +
    //                 '<br>' + item.isPower[0]        + " " + item.isPower[1] +
    //                 '<br>' + item.condition[0]      + " " + item.condition[1] +
    //                 '<br>' + item.comments[0]       + " " + item.comments[1] + '</p>' +
    //                 '</div>'
    //                 ).appendTo( '#viewData' );
    //             }
    //         },
    //         error: function(result){
    //         console.log(result, "Did not Work");
    //         }
    //     });
    // });
    
//     // Calling data.xml
//     $( '#xmlButton' ).on( 'click', function() {
//         $('#viewData').empty();
//         $.ajax( {
//             url: 'xhr/data.xml',
//             type: 'GET',
//             dataType: 'xml',
//             success:function ( result ) {
//                 console.log(result, "It Works!");
//                 $(result).find('item').each(function(){
//                     var aptType     = $(this).find('aptType').text();
//                     var aptNum      = $(this).find('aptNum').text();
//                     var aptSize     = $(this).find('aptSize').text();
//                     var vacDate     = $(this).find('vacDate').text();
//                     var rdyDate     = $(this).find('rdyDate').text();
//                     var isWhiteLock = $(this).find('isWhiteLock').text();
//                     var isPower     = $(this).find('isPower').text();
//                     var condition   = $(this).find('condition').text();
//                     var comments    = $(this).find('comments').text();
//                     $(''+
//                         '<div class="xmlData">'+
//                             '<p>'+ aptType +
//                             '<br>'+ aptNum +
//                             '<br>'+ aptSize +
//                             '<br>'+ vacDate +
//                             '<br>'+ rdyDate + 
//                             '<br>'+ isWhiteLock +
//                             '<br>'+ isPower +
//                             '<br>'+ condition +
//                             '<br>'+ comments +'</p>'+
//                         '</div>'
//                     ).appendTo('#viewData');
//                 });
//             },
//             error: function(result){
//             console.log(result, "Did not Work");
//             }
//         });
//     });

//     $( '#csvButton' ).on( 'click', function() {
//         $('#viewData').empty();
//         $.ajax( {
//             url: 'xhr/data.csv',
//             type: 'GET',
//             dataType: 'text',
//             success:function ( result ) {
//                 console.log( "<<<It Works>>>", result);
//                 var lines = result.split("\n");
//                 //console.log(lines);
//                 var dataRow = lines[0];
//                 var dataCol = dataRow.split(",");
//                 for (var lineNum = 1; lineNum < lines.length; lineNum++) {
//                     var row = lines[lineNum];
//                     var columns = row.split(",");
//                     //console.log(columns);
//                     $(''+
//                             '<div class="csvData">'+
//                                 '<p>' + dataCol[0] + " " + columns[0] +
//                                 '<br>'+ dataCol[1] + " " + columns[1] +
//                                 '<br>'+ dataCol[2] + " " + columns[2] +
//                                 '<br>'+ dataCol[3] + " " + columns[3] +
//                                 '<br>'+ dataCol[4] + " " + columns[4] +
//                                 '<br>'+ dataCol[5] + " " + columns[5] +
//                                 '<br>'+ dataCol[6] + " " + columns[6] +
//                                 '<br>'+ dataCol[7] + " " + columns[7] +
//                                 '<br>'+ dataCol[8] + " " + columns[8] + '</p>' +
//                             '</div>'
//                         ).appendTo('#viewData');
//                 }
//             },
//             error: function(result){
//             console.log(result, "Did not Work");
//             }
//         });
//     });

// });
		
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

};



var getImage = function (catName, makeSubList) {
        var imageLi = $("<li>");
        makeSubList.append(imageLi);
        var newImage = $("<img>");
        var setSrc = newImage.attr("src", "images/" + catName + ".png");
        imageLi.append(newImage);
 
    };

var editItem = function () {
       
        var key = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        console.log(value);
        console.log(localStorage)

        $('#aptType').val(item.aptType[1]);
        $('#aptNum').val(item.aptNum[1]);
        $('#aptSize').val(item.aptSize[1]);
        $('#vacDate').val(item.vacDate[1]);
        $('#rdyDate').val(item.rdyDate[1]);
        $('#isWhiteLock').val(item.isWhiteLock[1]);
        $('#isPower').val(item.isPower[1]);
        $('#condition').val(item.condition[1]);
        $('#comments').val(item.comments[1]);

        thiskey = this.key
        $('submit').on('click', storeData(thiskey));
};

var makeItemLinks = function (key, linksLi) {

    // add edit single item link
        var editLink = $('<n>')
                        .attr('data-role','button')
                        .html('Edit Apartment')
                        .css('padding-top','10px')
                        .attr('this',key)
                        .on('click', editItem)
                        editLink.key = key;
                        editLink.appendTo(linksLi);
        ;


    // Add delete single item Link
        var deleteLink = $('<li>')
                        .attr('data-role','button')
                        .text('Delete Apartment')
                        .css('padding-top','10px')
                        .attr('key', key)
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
        //$('#showData').listview('refresh');
        window.location.reload();
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
    $( '#displayLink' ).on( 'click', getData );

    $( '#clearLink'   ).on( 'click', clearLocal );
    $( '#addNew'      ).on( 'click', '#addItem' );//.css('display','none');  FIX THIS SO IT TAKES ME BACK TO FORMPAGE

// $('<li><a href="#">New Link</a></li>').appendTo('#nav');
// $.mobile.changePage('#searchResult');




// Refresh listview
// $('#myList').listview('refresh');

// Dynamic refresh listview
// var cahngePage = function(pageId){
//     $('#'+ pageId).trigger('pageinit');
//     $.mobile.changePage($('#' + pageId),
//         {transition:"slide"});
// };