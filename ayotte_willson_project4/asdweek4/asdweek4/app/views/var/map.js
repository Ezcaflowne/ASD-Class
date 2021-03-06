function(doc) {
  if (doc._id.substring(0, 14) === "apartment:var:") {
    emit(doc._id.substr(14), {
    	"aptType"		: doc.aptType,
    	"aptNum"		: "Apartment Number: " 	+ doc.aptNum,
    	"aptSize"		: "Apartment Size: " 	+ doc.aptSize,
    	"vacDate"		: "Vacate Date: " 			+ doc.vacDate,
    	"rdyDate"		: "Ready Date: " 			+ doc.rdyDate,
    	"isWhiteLock"	: "Whitelock: " 		+ doc.isWhiteLock,
    	"isPower"		: "Power: " 			+ doc.isPower,
    	"condition"		: "Condition: " 		+ doc.condition,
    	"comments"		: "Comments: " 			+ doc.comments
    });
  }
};