function(doc) {
  if (doc._id.substring(0, 10) === "apartment:") {
    emit(doc._id.substr(10), {
    	"aptType"		: doc.aptType,
    	"aptNum"		: doc.aptNum,
    	"aptSize"		: doc.aptSize,
    	"vacDate"		: doc.vacDate,
    	"rdyDate"		: doc.rdyDate,
    	"isWhiteLock"	: doc.isWhiteLock,
    	"isPower"		: doc.isPower,
    	"condition"		: doc.condition,
    	"comments"		: doc.comments
    });
  }
};