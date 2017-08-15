'use strict';
module.exports = ( SnaphyUser, server, helper) => {
    //Write the snaphy base validation..method here..

    //SnaphyBase custom methods..
    SnaphyUser.observe("before save", function(ctx, next){
        const instance = ctx.instance || ctx.data;
        const currentInstance = ctx.currentInstance;
        if(ctx.isNewInstance){
            instance.added = new Date();
            instance.updated = new Date();
            instance.is_deleted = false;
        }else{
            instance.updated = new Date();
        }

        next();
    });
};