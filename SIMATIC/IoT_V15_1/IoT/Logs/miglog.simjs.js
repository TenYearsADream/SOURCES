
function simJs_initialize() {

	//SimJS_Item
	SimJs_Item.prototype = new Object();
	SimJs_Item.prototype.constructor = SimJs_Item;
	SimJs_Item.base = Object.prototype;
	
	SimJs_Item.prototype.show = SimJs_Item_show;
	SimJs_Item.prototype.hide = SimJs_Item_hide;
	SimJs_Item.prototype.attr = SimJs_Item_attr;
	SimJs_Item.prototype.text = SimJs_Item_prototype_text;
	SimJs_Item.prototype.click = SimJs_Item_prototype_click;
	SimJs_Item.prototype.handleOnClick = SimJs_Item_prototype_handleOnClick;
	SimJs_Item.prototype.change = SimJs_Item_prototype_change;
	SimJs_Item.prototype.handleOnChange = SimJs_Item_prototype_handleOnChange;
	SimJs_Item.prototype.hover = SimJs_Item_prototype_hover;
	SimJs_Item.prototype.handleOnMouseOver = SimJs_Item_prototype_handleOnMouseOver;
	SimJs_Item.prototype.handleOnMouseOut = SimJs_Item_prototype_handleOnMouseOut;
	SimJs_Item.prototype.isHidden = SimJs_Item_isHidden;
	SimJs_Item.prototype.isChecked = SimJs_Item_isChecked;
	SimJs_Item.prototype.selectedValue = SimJs_Item_selectedValue;
	

	//SimJs_ItemCollection
    SimJs_ItemCollection.prototype = new Object();
    SimJs_ItemCollection.prototype.constructor = SimJs_ItemCollection;
    SimJs_ItemCollection.base = Object.prototype; 
    
    SimJs_ItemCollection.prototype.hide = SimJs_ItemCollection_prototype_hide;
    SimJs_ItemCollection.prototype.show = SimJs_ItemCollection_prototype_show;
    SimJs_ItemCollection.prototype.push = SimJs_ItemCollection_prototype_push;
	SimJs_ItemCollection.prototype.pushAll = SimJs_ItemCollection_prototype_pushAll;
	SimJs_ItemCollection.prototype.convertPushAll = SimJs_ItemCollection_prototype_convertPushAll;
	SimJs_ItemCollection.prototype.pop = SimJs_ItemCollection_prototype_pop;
	SimJs_ItemCollection.prototype.first = SimJs_ItemCollection_prototype_first;
	SimJs_ItemCollection.prototype.firstHtmlElement = SimJs_ItemCollection_prototype_firstHtmlElement;
	SimJs_ItemCollection.prototype.find = SimJs_ItemCollection_prototype_find;
	SimJs_ItemCollection.prototype.getElementById = SimJs_ItemCollection_prototype_getElementById;
	SimJs_ItemCollection.prototype.getElementsByClassName = SimJs_ItemCollection_prototype_getElementsByClassName;
	SimJs_ItemCollection.prototype.getElementsByAttribute = SimJs_ItemCollection_prototype_getElementsByAttribute;
	SimJs_ItemCollection.prototype.getElementsByTagName = SimJs_ItemCollection_prototype_getElementsByTagName;
	SimJs_ItemCollection.prototype.each = SimJs_ItemCollection_prototype_each;
	SimJs_ItemCollection.prototype.hover = SimJs_ItemCollection_prototype_hover;
	SimJs_ItemCollection.prototype.click = SimJs_ItemCollection_prototype_click;
    
	
    prepareClassNameSearch();
	prepareAttributeSearch();

}

// -------------------------------------------------------------------------------------
// SimJs_Item
//
// This is a model of html element, enables to manipulate html element via simple function calls
// -------------------------------------------------------------------------------------
function SimJs_Item( htmlElement ) {
	
    this.htmlElement = htmlElement;
    this.id = htmlElement.id;
    this.style = htmlElement.style;
    htmlElement.simjs_item = this;

    this.clickHandler = null;
    this.changeHandler = null;
    this.mouseOverHandler = null;
    this.mouseOutHandler = null;
}

function SimJs_findOrCreateItem(htmlElement) {
    if (htmlElement.simjs_item == undefined || htmlElement.simjs_item == null) {
        return new SimJs_Item(htmlElement);
    }
    else {
        return htmlElement.simjs_item;
    }
}

function SimJs_Item_hide() {
	this.htmlElement.style.display = 'none';
}

function SimJs_Item_show() {
	this.htmlElement.style.display = 'block';
}

function SimJs_Item_attr (attribName) {
	return this.htmlElement.getAttribute(attribName);
}

function SimJs_Item_prototype_text (textForOverride) {
    if (textForOverride == undefined) return this.htmlElement.innerHTML;
    this.htmlElement.innerHTML = textForOverride;
}


function SimJs_Item_prototype_click(funcToCall) {
    this.clickHandler = funcToCall;
    this.htmlElement.onclick = this.handleOnClick;
}

function SimJs_Item_prototype_handleOnClick() {
    if (this.simjs_item.clickHandler != null) {
        if (typeof this.simjs_item.clickHandler == 'function') {
             this.simjs_item.clickHandler.call(this.simjs_item);
        }
    }
}

function SimJs_Item_prototype_change(funcToCall) {
    this.changeHandler = funcToCall;
    this.htmlElement.onchange = this.handleOnChange;
}

function SimJs_Item_prototype_handleOnChange() {
    if (this.simjs_item.changeHandler != null) {
        if (typeof this.simjs_item.changeHandler == 'function') {
             this.simjs_item.changeHandler.call(this.simjs_item);
        }
    }
 }

 function SimJs_Item_prototype_hover(funcToCallOnRollOver, funcToCallOnRollOut) {
     //alert("::SimJs_Item.hover");
     this.mouseOverHandler = funcToCallOnRollOver;
     this.mouseOutHandler = funcToCallOnRollOut;
     this.htmlElement.onmouseover = this.handleOnMouseOver;
     this.htmlElement.onmouseout = this.handleOnMouseOut;
 }

 function SimJs_Item_prototype_handleOnMouseOver() {
     if (this.simjs_item.mouseOverHandler != null) {
         if (typeof this.simjs_item.mouseOverHandler == 'function') {
             this.simjs_item.mouseOverHandler.call(this.simjs_item);
        }
    }
 }

 function SimJs_Item_prototype_handleOnMouseOut() {
     if (this.simjs_item.mouseOutHandler != null) {
         if (typeof this.simjs_item.mouseOutHandler == 'function') {
             this.simjs_item.mouseOutHandler.call(this.simjs_item);
         }
     }
 }

function SimJs_Item_isHidden() {
	return this.htmlElement.style.display == 'none';
}

function SimJs_Item_isChecked() {
	return this.htmlElement.checked;
}

function SimJs_Item_selectedValue(valueToSelect) {
    if (valueToSelect == undefined) {
        if (this.htmlElement.tagName == "SELECT") {
            return this.htmlElement.options[this.htmlElement.selectedIndex].value;
        }
        return null;
    }
    else {
        // to do: put setter logic here
    }
}

// -------------------------------------------------------------------------------------
// SimJs_ItemCollection
//
// Collection of SimJs_Items. 
// Enables batch manipulation of html elements through batch method calls
// -------------------------------------------------------------------------------------
function SimJs_ItemCollection() {   
    this.version = 1;
    this.length = 0;
    this.innerArray = new Array();
}

function SimJs_ItemCollection_prototype_hide() {
    for (var i = 0; i < this.innerArray.length; i++) {
        var item = this.innerArray[i];        
        //item.htmlElement.style.display = 'none';
		item.hide();
    }
}

function SimJs_ItemCollection_prototype_show() {
    for (var i = 0; i < this.innerArray.length; i++) {
        var item = this.innerArray[i];          
        //item.htmlElement.style.display = 'block';
		item.show();
    }
}

function SimJs_ItemCollection_prototype_push(objectToAdd) {
	this.length = this.innerArray.push(objectToAdd);
    return (this.length);
}

function SimJs_ItemCollection_prototype_pushAll(itemCollectionToMerge) {
	var len = itemCollectionToMerge.innerArray.length;
	for(var i = 0; i < len; i++) {
		this.length = this.innerArray.push(itemCollectionToMerge.innerArray[i]);	
	}
	return (this.length);
}


function SimJs_ItemCollection_prototype_convertPushAll(htmlElementCollectionToAdd) {
	var len = htmlElementCollectionToAdd.length;
	for (var i=0; i < len; i++) {
		var itemToAdd = SimJs_findOrCreateItem(htmlElementCollectionToAdd[i]);
		this.length = this.innerArray.push(itemToAdd);
	}
    return (this.length);
}

function SimJs_ItemCollection_prototype_pop() {
    return (this.innerArray.pop());
}

function SimJs_ItemCollection_prototype_first() {
    return (this.innerArray[0]);
}

function SimJs_ItemCollection_prototype_firstHtmlElement() {
    return (this.innerArray[0].htmlElement);
}

function SimJs_ItemCollection_prototype_each(FuncToCall) {
    for (var i = 0; i < this.innerArray.length; i++) {
        FuncToCall.call(this.innerArray[i]);
    }
}

function SimJs_ItemCollection_prototype_click(funcToCall) {
    for (var i = 0; i < this.innerArray.length; i++) {
        this.innerArray[i].click(funcToCall);
    }
}


function SimJs_ItemCollection_prototype_hover(funcToCallOnRollOver, funcToCallOnRollOut) {
    //alert("::SimJs_ItemCollection.hover - " + this);
    for (var i = 0; i < this.innerArray.length; i++) {
        this.innerArray[i].hover(funcToCallOnRollOver, funcToCallOnRollOut);
    }
}


function SimJs_ItemCollection_prototype_find(searchExpression) {
	//alert('::find - ' + searchExpresion);
    var se = searchExpression.toString();
    var arr = se.replace(" ", "").split(",");
    var resultList = new SimJs_ItemCollection();

    for (var index in arr) {
        var s = arr[index];

        if (s.indexOf('#') == 0) {            
            var element = this.getElementById(s.substr(1));
            //alert('htmlElement:' + htmlElement);
            resultList.push(element);
        }
        else if (s.indexOf('.') == 0) {
			// search by class
            var elementList = this.getElementsByClassName(s.substr(1));
			resultList.pushAll(elementList);
        }
        else if (s.indexOf('[') == 0) {
			// search by attribute
            var elementList = this.getElementsByAttribute(s.substr(1, s.indexOf(']')-1));
			resultList.pushAll(elementList);
        }
        else {
            //search by tag name
			var elementList = this.getElementsByTagName(s);
			resultList.pushAll(elementList);
        }
    }
    return resultList;
}

SimJs_ItemCollection_prototype_getElementById = function(searchId) {
	var ind = 0;
	
	while(ind < this.length) {
		if (this.innerArray[ind].htmlElement.id.toUpperCase() == searchId.toUpperCase()) {
			return this.innerArray[ind];
		}
		ind++;
	}
	return undefined;
}

function SimJs_ItemCollection_prototype_getElementsByClassName(searchClassName) {
	var resultList = new SimJs_ItemCollection();
	var ind = 0;
	
	while(ind < this.length) {
		var found = false;
		var className = this.innerArray[ind].htmlElement.className.toUpperCase();
		
		if (className != null && arrayIndexOf(className.split(" "), searchClassName.toUpperCase()) >= 0) {
			resultList.push(this.innerArray[ind]);
		}
		
		ind++;
	}
	return resultList;
}

function arrayIndexOf(searchedArray, searchedElement) {
	var len = searchedArray.length;
	for (var i = 0; i < len; i++) {
		if (searchedArray[i] == searchedElement) return i;
	}
	return -1;	
}

function SimJs_ItemCollection_prototype_getElementsByAttribute(searchAttribute) {
	var resultList = new SimJs_ItemCollection();
	var ind = 0;
	
	while(ind < this.length) {
		if (this.innerArray[ind].htmlElement.getAttribute(searchAttribute) != undefined) {
			resultList.push(this.innerArray[ind]);
		}
		ind++;
	}
	return resultList;	
}

function SimJs_ItemCollection_prototype_getElementsByTagName(searchTagName) {
	var resultList = new SimJs_ItemCollection();
	var ind = 0;
	
	while(ind < this.length) {
		if (this.innerArray[ind].htmlElement.tagName.toUpperCase() == searchTagName.toUpperCase()) {
			resultList.push(this.innerArray[ind]);
		}
		ind++;
	}
	return resultList;
}

function find(searchExpresion) {
    //alert('::find - ' + searchExpresion);
    var se = searchExpresion.toString();
    var arr = se.replace(" ", "").split(",");
    var resultList = new SimJs_ItemCollection();

    for (var index in arr) {
        var s = arr[index];

        if (s.indexOf('#') == 0) {            
            var htmlElement = document.getElementById(s.substr(1));
            //alert('htmlElement:' + htmlElement);
            if (htmlElement != null) {
                var simjs_item = SimJs_findOrCreateItem(htmlElement);
                resultList.push(simjs_item);                
            }
        }
        else if (s.indexOf('.') == 0) {
			// search by class
            var htmlElementList = document.getElementsByClassName(s.substr(1));
			
			var len = htmlElementList.length;
			for (var i=0; i < len; i++) {
				var simjs_item = SimJs_findOrCreateItem(htmlElementList[i]);
				resultList.push(simjs_item);
			}
        }
        else if (s.indexOf('[') == 0) {
        // search by attribute
            var attributeName = s.substring(1, s.indexOf(']'));
            var htmlElementList = document.getElementsByAttribute(document, '*', attributeName);
			var len = htmlElementList.length;
			for (var i=0; i < len; i++) {
				var simjs_item = SimJs_findOrCreateItem(htmlElementList[i]);
				resultList.push(simjs_item);				
			}			
			var st="sd";
			
        }
        else {
            //search by tag name
			var htmlElementList = elementList.getElementsByTagName(s);
			var len = htmlElementList.length;
			for (var i=0; i < len; i++) {
				var simjs_item = SimJs_findOrCreateItem(htmlElementList[i]);
				resultList.push(simjs_item);
			}
        }
    }
    return resultList;
}

function prepareClassNameSearch() {
    if (document.getElementsByClassName == undefined) {
        document.getElementsByClassName = function(className) {
            var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
            var allElements = document.getElementsByTagName("*");
            var results = [];

            var element;
            for (var i = 0; (element = allElements[i]) != null; i++) {
                var elementClass = element.className;
                if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
                    results.push(element);
            }

            return results;
        }
    }
}

function prepareAttributeSearch() {
    if (document.getElementsByAttribute == undefined) {
        
      document.getElementsByAttribute = function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
        var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
        var arrReturnElements = new Array();
        var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
        var oCurrent;
        var oAttribute;
        for(var i=0; i<arrElements.length; i++){
            oCurrent = arrElements[i];
            oAttribute = oCurrent.getAttribute(strAttributeName);
            if(typeof oAttribute == "string" && oAttribute.length > 0){
                if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
                    arrReturnElements.push(oCurrent);
                }
            }
         }
        return arrReturnElements;
      }

    }
}