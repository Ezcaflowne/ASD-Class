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

//PAGE SHOW
//VACANT AVAILABLE
$('#vaa').live('pageinit', function(){
    $.couch.db( "project4" ).view( "app/apartments", {
        success: function( result ) {
            //console.log(data);
            $( '#vaaList' ).empty();
            $( '<li>' ).attr( "data-role", "list-divider" )
                        .text( "Apartment Number - Size" ).appendTo('#vaaList');
           $.each( result.rows, function( index, apartments ){
                    //console.log(times.value.Options);
                    var aptType       = apartments.value.aptType;
                    if ( aptType[1] === "Vacant Available" ) {
                        var aptNum      = apartments.value.aptNum;
                        var aptSize     = apartments.value.aptSize;
                            
                        $( '<li>' ).append(
                            $( '<a>' )
                                .attr( "href", "apartment.html?aptNum=" + 
                                        aptNum[1] )
                                .text( aptNum[1] + " - " + aptSize[1] )
                        ).appendTo( '#vaaList' );
                    }
            });
            $( '#vaaList' ).listview( 'refresh' );
        }
    });
});
//END VACANT AVAILABLE apartments

//VACANT RENTED
$('#var').live('pageinit', function(){
    $.couch.db( "project4" ).view( "app/apartments", {
        success: function( result ) {
            //console.log(data);
            $( '#varList' ).empty();
            $( '<li>' ).attr( "data-role", "list-divider" )
                        .text( "Apartment Number - Size" ).appendTo('#varList');
           $.each( result.rows, function( index, apartments ){
                    //console.log(times.value.Options);
                    var aptType       = apartments.value.aptType;
                    if ( aptType[1] === "Vacant Rented" ) {
                        var aptNum      = apartments.value.aptNum;
                        var aptSize     = apartments.value.aptSize;
                            
                        $( '<li>' ).append(
                            $( '<a>' )
                                .attr( "href", "apartment.html?aptNum=" + 
                                        aptNum[1] )
                                .text( aptNum[1] + " - " + aptSize[1] )
                        ).appendTo( '#varList' );
                    }
            });
            $( '#varList' ).listview( 'refresh' );
        }
    });
});
//END VACANT RENTED

//NOTICE AVAILABLE
$('#noa').live('pageinit', function(){
    $.couch.db( "project4" ).view( "app/apartments", {
        success: function( result ) {
            //console.log(data);
            $( '#noaList' ).empty();
            $( '<li>' ).attr( "data-role", "list-divider" )
                        .text( "Apartment Number - Size" ).appendTo('#noaList');
           $.each( result.rows, function( index, apartments ){
                    //console.log(times.value.Options);
                    var aptType       = apartments.value.aptType;
                    if ( aptType[1] === "Notice Available" ) {
                        var aptNum      = apartments.value.aptNum;
                        var aptSize     = apartments.value.aptSize;
                            
                        $( '<li>' ).append(
                            $( '<a>' )
                                .attr( "href", "apartment.html?aptNum=" + 
                                        aptNum[1] )
                                .text( aptNum[1] + " - " + aptSize[1] )
                        ).appendTo( '#noaList' );
                    }
            });
            $( '#noaList' ).listview( 'refresh' );
        }
    });
});
//END NOTICE AVAILABLE
var urlVars = function(){
    var urlData     = $($.mobile.activePage).data('url');
    var urlParts    = urlData.split('?');
    var urlPairs    = urlParts[1].split('=');
    var urlValues   = {};
    for (var pair in urlPairs) {
        var keyValue    = urlPairs[pair].split('=');
        var key         = decodeURIComponet(keyValue[0]);
        var value       = decodeURIComponet(keyValue[1]);
        urlValues[key]  = value;
    }
    console.log(urlValue);
    return urlValues;
};

$('#apartment').live('pageshow', function(){
    var key = urlVars()['aptNum'];
    //console.log(key)
    $('#aptList').empty();
    $.couch.db('project4').view('app/apartments', {
        success: function(result){
            //console.log(result);
            $.each(result.rows, function(index, apartments){
                //console.log(apartments.value.aptType)
                var aptNum       = apartments.value.aptNum;
                if ( aptNum[1] === key) {
                    var aptType      = apartments.value.aptType;
                    var aptSize      = apartments.value.aptSize;
                    var vacDate      = apartments.value.vacDate;
                    var rdyDate      = apartments.value.rdyDate;
                    var isWhiteLock  = apartments.value.isWhiteLock;
                    var isPower      = apartments.value.isPower;
                    var condition    = apartments.value.condition;
                    var comments     = apartments.value.comments;
                    var id  = apartments.id;
                    var rev = apartments.value.rev;
                    console.log(id);
                    console.log(rev);
                    $('#deleteApt').on('click', function(){
                        var ask = confirm("Are you sure you would like to delete this Apartment?");
                        if (ask){
                            var doc = {
                                _id: id,
                                _rev: rev
                            };
                            $.couch.db('project4').removeDoc(doc, {
                                success: function(data) {
                                    console.log(data);
                                    $.mobile.changePage($('#index'));
                                    alert('Apartment Deleted');
                                },
                                error: function(status) {
                                    console.log(status);
                                }
                            });
                        }
                        else{
                            alert('Apartment not deleted!');
                        }
                    });
                    var apartment = {
                        _id: id,
                        _rev: rev,
                        aptType: aptType,
                        aptNum: aptNum,
                        aptSize: aptSize,
                        vacDate: vacDate,
                        rdyDate: rdyDate,
                        isWhiteLock: isWhiteLock,
                        isPower: isPower,
                        condition: condition,
                        comments: comments
                    }
                    $('#editApt').on('click', function(){
                        editApt( apartment );
                    });
                    $(' ' +
                        '<div class="apartment">' +
                        '<p>'  + aptType[0]         + " " + aptType[1] +
                        '<br>' + aptNum[0]          + " " + aptNum[1] + 
                        '<br>' + aptSize[0]         + " " + aptSize[1] + 
                        '<br>' + vacDate[0]         + " " + vacDate[1] + 
                        '<br>' + rdyDate[0]         + " " + rdyDate[1] + 
                        '<br>' + isWhiteLock[0]     + " " + isWhiteLock[1] + 
                        '<br>' + isPower[0]         + " " + isPower[1] +
                        '<br>' + condition[0]       + " " + condition[1] +
                        '<br>' + comments[0]        + " " + comments[1] + '</p>' +
                        '<div>'
                        ).appendTo('#aptList');
                }
            });
        }
    });
});

//END PAGE SHOW

		
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
        
    var makeDiv = document.createElement('div');
    makeDiv.setAttribute('id', 'items');
    var makeList = document.createElement('ul');
    makeDiv.appendChild(makeList);
    $('#showData').append(makeDiv);
    for( var i = 0, len = localStorage.length; i < len; i++){
        var makeLi      = document.createElement('li');
        var linksLi     = document.createElement('li');
        makeList.appendChild(makeLi);
        var key         = localStorage.key(i);
        var value       = localStorage.getItem(key);
        var obj         = JSON.parse(value);
        var makeSubList = document.createElement('ul');
        makeLi.appendChild(makeSubList);
        for (var n in obj){
            var makeSubLi     = document.createElement('li');
            makeSubList.appendChild(makeSubLi);
            var optSubText      = obj[n][0] + " " + obj[n][1];
            makeSubLi.innerHTML = optSubText;
            makeSubList.appendChild(linksLi);
        }
        makeItemLinks(localStorage.key(i), linksLi);
    }

    // var makeList = $('<div>');
    // $('#showData').append(makeList)
    // for (var i = 0, len = localStorage.length; i < len; i++) {
        
    //         var makeLi = $('<li>').css('background','black');
    //         var linksLi = $('<li>');
    //         makeList.append(makeLi);
    //         var key = localStorage.key(i);
    //         var value = localStorage.getItem(key);
    //         var obj = JSON.parse(localStorage.getItem(key));
    //         var makeSubList = $('<ul>');
    //         makeLi.append(makeSubList);
    //         getImage(obj.aptType[1], makeSubList);
    //     for (var n in obj) {
    //         var makeSubLi = $('<li>')
    //         makeSubList.append(makeSubLi);
    //         var optSubText = $('<p>' + obj[n][0]+" "+obj[n][1] + '</p>').appendTo(makeLi);
    //         makeSubLi.html(optSubText);
    //         makeSubList.append(linksLi);
    //     }
    //     makeItemLinks(localStorage.key(i), linksLi);
    // }

};

var storeData = function (key){
    var id;
    if (key){
        console.log('key:' + key);
        $.couch.db('project4').openDoc(key._id,{
            success: function(data) {
                console.log(data);
            },
            error: function(status){
                console.log(status);
            }
        });
        $('#submit').on('click', function(){
            doc = {
                _id: key._id,
                _rev: key._rev,
            }   
            doc.aptType         = ['Apartment Type:',       $('#aptType').val()];
            doc.aptNum          = ['Apartment Number:',     $('#aptNum').val()];
            doc.aptSize         = ['Apartment Size:',       $('#aptSize').val()];
            doc.vacDate         = ['Vacate Date:',          $('#vacDate').val()];
            doc.rdyDate         = ['Ready Date:',           $('#rdyDate').val()];
            doc.isWhiteLock     = ['Whitelock:',            $('#isWhiteLock').val()];
            doc.isPower         = ['Power:',                $('#isPower').val()];
            doc.condition       = ['Condition:',            $('#condition').val()];
            doc.comments        = ['Comments:',             $('#comments').val()];

            console.log(doc);
            $.couch.db('project4').saveDoc(doc, {
                success: function(data) {
                    console.log(data);
                    $.mobile.changePage($('#gold'));
                    alert('Apartment Updated!');
                },
                error: function(status) {
                    console.log(status);
                }
            });
        });
                return false;
    }
    else {
        var id      = Math.floor( Math.random() * 10000001);
        var item            = {};

        item.aptType        = ['Apartment Type:',       $('#aptType').val()];
        item.aptNum         = ['Apartment Number:',     $('#aptNum').val()];
        item.aptSize        = ['Apartment Size:',       $('#aptSize').val()];
        item.vacDate        = ['Vacate Date:',          $('#vacDate').val()];
        item.rdyDate        = ['Ready Date:',           $('#rdyDate').val()];
        item.isWhiteLock    = ['Whitelock:',            $('#isWhiteLock').val()];
        item.isPower        = ['Power:',                $('#isPower').val()];
        item.condition      = ['Condition:',            $('#condition').val()];
        item.comments       = ['Comments:',             $('#comments').val()];
    //item._id          =[item.aptType[1]];

    var doc = {
                _id: item.aptNum[1]
    };
    doc.aptType         = ['Apartment Type:',       $('#aptType').val()];
    doc.aptNum          = ['Apartment Number:',     $('#aptNum').val()];
    doc.aptSize         = ['Apartment Size:',       $('#aptSize').val()];
    doc.vacDate         = ['Vacate Date:',          $('#vacDate').val()];
    doc.rdyDate         = ['Ready Date:',           $('#rdyDate').val()];
    doc.isWhiteLock     = ['Whitelock:',            $('#isWhiteLock').val()];
    doc.isPower         = ['Power:',                $('#isPower').val()];
    doc.condition       = ['Condition:',            $('#condition').val()];
    doc.comments        = ['Comments:',             $('#comments').val()];

    $.couch.db('project4').saveDoc(doc, {
        success: function(data) {
            console.log(data);
        },
        error: function(status) {
            console.log(status);
        }
    });
    localStorage.setItem( id, JSON.stringify(item));
    alert('Apartment Added');
    }
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

var windowReload = function(){
        $.mobile.changePage($('#gold'),{transition:"left"});
        return false;
};

var editItem = function ( apartment ) {
       
        $.mobile.changePage($('#addItem'));
        item = apartment;
        console.log(apartment);

        $('#aptType').val(item.aptType[1]);
        $('#aptNum').val(item.aptNum[1]);
        $('#aptSize').val(item.aptSize[1]);
        $('#vacDate').val(item.vacDate[1]);
        $('#rdyDate').val(item.rdyDate[1]);
        $('#isWhiteLock').val(item.isWhiteLock[1]);
        $('#isPower').val(item.isPower[1]);
        $('#condition').val(item.condition[1]);
        $('#comments').val(item.comments[1]);

        $('submit').on('click', storeData(item));
};


function makeItemLinks (key, linksLi) {

    // add edit single item link
        var editLink        = document.createElement('n');
        editLink.href       = '#';
        editLink.key        = key;
        var editText        = 'Edit Apartment';
        editLink.addEventListener ('click', editItem);
        editLink.innerHTML  = editText;
        linksLi.appendChild(editLink); 
        
        // $('<n>')
        //                 .attr('data-role','button')
        //                 .html('Edit Apartment')
        //                 .css('padding-top','10px')
        //                 .attr('this',key)
        //                 .on('click', editItem)
        //                 editLink.key = key;
        //                 editLink.appendTo(linksLi);
        // ;
        var breakTag         = document.createElement( 'br' );
        linksLi.appendChild( breakTag );

    // Add delete single item Link
        var deleteLink      = document.createElement('n');
        deleteLink.href     = '#';
        deleteLink.key      = key;
        var deleteText      = 'Delete Apartment';
        deleteLink.addEventListener('click',deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);

        // $('<li>')
        //                 .attr('data-role','button')
        //                 .text('Delete Apartment')
        //                 .css('padding-top','10px')
        //                 .attr('key', key)
        //                 .on('click', deleteItem)
        //                 deleteLink.key = key;
        //                 deleteLink.appendTo(linksLi);
        // ;
};      

    $( '#displayLink' ).on( 'click', getData );
    $( '#clearLink'   ).on( 'click', clearLocal );
    $( '#addNew'      ).on( 'click', windowReload );
    $('#apartmentFormErrors').css('display','none');    
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