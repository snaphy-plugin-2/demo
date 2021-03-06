(function(){"use strict";})();
const Promise = require("bluebird");

/**
 * Return the Error object with message
 * @param  {String}  message       Error message
 * @return {Object} Error object.
 */
const getError = function(message){
    message = typeof message === "string" ? message.trim() : "";
    return new Error(message);
};


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

/**
 * Captalize first word of each string..
 * @param string
 * @returns {string}
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



/**
 * Validate presense of a properties by checking for value in both currentInstance and instance
 * @param  {Object} instance        loopback ctx.instance object.
 * @param  {Object} currentInstance loopback ctx.currentInstance object occurs in the case of beforeSave of updateAttributes method.
 * @param  {String} prop            Properties name which you want to validate
 * @return {Boolean}                True means the validation is true and vice versa.
 */
const validate = function(instance, currentInstance, prop){
    if(instance[prop] === undefined){
        if(currentInstance){
            if(!currentInstance[prop]){
                return false
            }
        }else{
            return false;
        }
    }

    return true;

};



/**
 * https://nodejs.org/en/docs/guides/dont-block-the-event-loop/
 * Loop Async ..
 * @param {*} customerObjList 
 */
const forEach = function(list, callback){
    return new Promise(function(resolve, reject){
        const length = list.length;
        const loopRecursive = function(i){
            const item = list[i];
            i =  i+1;
            if(i < length){
                callback(item, i);
                setImmediate(loopRecursive.bind(null, i));
            }else{
                callback(item, i);
                return resolve();
            }
            
        };
        loopRecursive(0);
    });
};



module.exports = {
  getError: getError,
  validate: validate,
  guid: guid,
  capitalizeFirstLetter: capitalizeFirstLetter
};