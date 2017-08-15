module.exports = function(Employee) {
    (function() {
        //Hiding all the rest endpoints except login/logout/create
        Employee.disableRemoteMethod("create", true);
        Employee.disableRemoteMethod("upsert", true);
        Employee.disableRemoteMethod("updateAll", true);
        Employee.disableRemoteMethod("updateAttributes", false);

        //Employee.disableRemoteMethod("find", true);
        //Employee.disableRemoteMethod("findById", true);
        Employee.disableRemoteMethod("findOne", true);

        //Employee.disableRemoteMethod("deleteById", true);

        Employee.disableRemoteMethod("confirm", true);
        //Employee.disableRemoteMethod("count", true);
        Employee.disableRemoteMethod("exists", true);
        Employee.disableRemoteMethod("resetPassword", true);

        Employee.disableRemoteMethod('__count__accessTokens', false);
        Employee.disableRemoteMethod('__create__accessTokens', false);
        Employee.disableRemoteMethod('__delete__accessTokens', false);
        Employee.disableRemoteMethod('__destroyById__accessTokens', false);
        Employee.disableRemoteMethod('__findById__accessTokens', false);
        Employee.disableRemoteMethod('__get__accessTokens', false);
        Employee.disableRemoteMethod('__updateById__accessTokens', false);
    })();
};