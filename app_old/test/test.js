// App tests

describe('API test', function(){

    it('todo lib should be defined', function(){
        expect(todoApp).toBeDefined();
    });
    it('method convertPhone to be defined', function(){
        expect(todoApp.convertPhone).toBeDefined();
    });
    it('method isEntryTimeInFuture to be defined', function(){
        expect(todoApp.isEntryTimeInFuture).toBeDefined();
    });
    it('method getFirstFutureEntryDate to be defined', function(){
        expect(todoApp.getFirstFutureEntryDate).toBeDefined();
    });
    it('method convertPhone should return correct string', function(){
        var testPhone = '+(420)-225951111';
        var testPhone2 = '+420225951111';
        var result = todoApp.convertPhone(testPhone);
        var result2 = todoApp.convertPhone(testPhone2);
        expect(result).toEqual('00420 225 951 111');
        expect(result2).toEqual('00420 225 951 111');
    });
    it('method isEntryTimeInFuture should return bolean', function(){
        var testTime = '00:00';
        var testTime2 = '23:59';
        var result = todoApp.isEntryTimeInFuture(testTime);
        var result2 = todoApp.isEntryTimeInFuture(testTime2);
        expect(result).toBe(false);
        expect(result2).toBe(true);
    });
    it('method isEntryTimeInFuture should should return date when second parameter is present ', function(){
        var testTime = '00:00';
        var result = todoApp.isEntryTimeInFuture(testTime, 1);
        var correctDate = new Date();
        correctDate.setHours('00', '00');
        expect(result).toEqual(correctDate);
    });
});