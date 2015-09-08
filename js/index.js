// 'todo calls' functionality
(function () {
	'use strict';

	var data = [];
	var addBlock = $('.add-item');
	var listBlock = $('.list-item');
    var nextBlock = $('.next-item');
    var listTable = listBlock.find('table');
	var addForm = addBlock.find('form');
    var counter = 0;
    
    function render() {
        var localData = localStorage.getItem('list');
        if (localData) {
            data = JSON.parse(localData);
            counter = data.length;
            $(data).each(function(index, item) {
                addData(item);
            });
            showNextCall();
        }
    }
    function saveData(entry) {
        data.push(entry);
        updateData();
    }
    function updateData() {
        localStorage.setItem('list', JSON.stringify(data));
    }
	function getData(context) {
		var entry = {};
        var phoneVal = context.find('input[name="user-phone"]').val();

        entry.id = ++counter;
		entry.name = context.find('input[name="user-name"]').val();
		entry.phone = convertPhone(phoneVal);
		entry.time = context.find('input[name="user-time"]').val();
        entry.fullTime = isEntryTimeInFuture(entry.time, 1);
        entry.inFuture = isEntryTimeInFuture(entry.time);

		return entry;
	}
	function addData(entry) {
		var addPlace = listBlock.find('tbody');
        var isChecked = entry.inFuture ? '' : 'checked';
		var template = '<tr data-id="'+ entry.id +'">\
	                        <td>'+ entry.name +'</td>\
	                        <td>'+ entry.phone +'</td>\
	                        <td>'+ entry.time +'</td>\
	                        <td><a href="#">delete</a></td>\
	                        <td><input type="checkbox" name="viwed" disabled '+ isChecked +'></td>\
	                    </tr>';
	    addPlace.append(template);
        listTable.trigger("update"); //re-init table sorting
	}
    function removeData(context) {
        var parentBlock = $(context).parents('tr');
        var id = parentBlock.data('id');
        var dataIds = $.map(data, function(item){ return item.id; });
        var result = $.inArray(id, dataIds);

        data.splice(result, 1);
        parentBlock.remove();
        listTable.trigger("update"); //re-init table sorting
        updateData();
        showNextCall();
    }
    function convertPhone(phone_number){
        var result = phone_number;
        result = result.replace(/\(|\)|-| /g, "");
        result = result.replace(/\+/g, "00");
        //convert to this line 00XXX XXX XXX XXX
        return result.slice(0, 5) + ' ' + result.slice(5, 8) + ' ' + result.slice(8, 11) + ' ' + result.slice(11);
    }
    function showNextCall(entry) {
        var data = getFirstFutureEntryDate() || entry;
        if (data) {
            nextBlock.find('input[name="user-name"]').val(data.name);
            nextBlock.find('input[name="user-phone"]').val(data.phone);
            nextBlock.find('input[name="user-time"]').val(data.time);
        } else {
            nextBlock.find('input[type="text"]').val(''); //clearFields
        }
    }
    function isEntryTimeInFuture(entryTimeVal, converToDate) {
        var currTime = new Date();
        var entryHour = entryTimeVal.split(':')[0];
        var entryMinutes = entryTimeVal.split(':')[1];
        var entryTime = new Date();
        entryTime.setHours(entryHour, entryMinutes);

        if(converToDate) return entryTime;

        return (currTime.getTime() < entryTime.getTime());
    }
    function toogleTableLines(state){
        var lines = listBlock.find('tbody tr');
        lines.hide();
        lines.each(function(index, item){
            if($(item).find('input[type="checkbox"]').is(':checked') == state){
                $(item).show();
            }
        })
    }
    function getFirstFutureEntryDate() {
        var futureData;
        futureData = data.filter(function(i){
            if (i.inFuture == 1) return i;
        }).sort(function(a, b){
            var dateA=new Date(a.fullTime),
                dateB=new Date(b.fullTime);
            return dateA-dateB;
        });

        return futureData[0];
    }
    function updateEntrylist(){
        var currentNext = getFirstFutureEntryDate();
        if(currentNext) {
            var stillInFuture = isEntryTimeInFuture(currentNext.time);
            if (!stillInFuture) {
                $(data).each(function(i, el){
                    if (el.id === currentNext.id) {
                        el.inFuture = false;
                        updateData();
                        showNextCall();
                    }
                });
                listBlock.find('tr[data-id="'+currentNext.id+'"] input[type="checkbox"]').attr('checked', true);
            }
        }
    }

	addForm.submit(function(e){
		e.preventDefault();
		var entryData;
        var validateResult = addForm.valid();
		if(validateResult) {
			entryData = getData($(this));
            saveData(entryData);
 			addData(entryData);
            showNextCall();
		}
	});
    listBlock.on('click', 'td a', function(e){
        e.preventDefault();
        removeData($(this));
    });
    listBlock.on('click', 'p a', function(e){
        e.preventDefault();
        var elTitle = $(this).attr('title');
        switch(elTitle) {
            case 'next' :
                toogleTableLines(0);
                break;
            case 'finished' :
                toogleTableLines(1);
                break;
            default :
                listBlock.find('tbody tr').show();
        }
    });

    render();
    setInterval(updateEntrylist, 60000); // update call list every minute
})();