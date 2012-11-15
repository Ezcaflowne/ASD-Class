function(doc) {
  if (doc._id !== "_design/app") {
    emit(doc._id, {
    	"aptType"		: doc.aptType,
    	"aptNum"		: doc.aptNum,
    	"aptSize"		: doc.aptSize,
    	"vacDate"		: doc.vacDate,
    	"rdyDate"		: doc.rdyDate,
    	"isWhiteLock"	: doc.isWhiteLock,
    	"isPower"		: doc.isPower,
    	"condition"		: doc.condition,
    	"comments"		: doc.comments,
    	"rev" 			: doc._rev
    });
  }
};