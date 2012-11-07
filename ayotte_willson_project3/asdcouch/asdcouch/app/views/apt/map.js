function ( doc ) {
  if ( doc._id.substr(0, 2) === "apt" ) {
    emit(doc._id, { 
        "aptType"    	: doc.aptType,
        "aptNum"  		: doc.aptNum,
        "aptSize"		: doc.aptSize,
        "vacDate"   	: doc.vacDate,
        "rdyDate"       : doc.rdyDate,
        "isWhiteLock"   : doc.isWhiteLock,
        "isPower"      	: doc.isPower,
        "condition"     : doc.condition,
        "comments"      : doc.comments
    });
  }
};