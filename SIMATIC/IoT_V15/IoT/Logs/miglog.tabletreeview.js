    // Override plugin default settings
    var settings = {}; 
	settings.open = "-";
	settings.close = "+";

    // cache
	var cachedItems;
	var cachedLeaves;

    //Initialization function for filtering on errorType
    //$("table#<filtertableid>").tabletreeview();
		setupFiltering = function() {						
			cachedItems = newDocument.find("table").find("[data-errorType]");
			cachedItems.pushAll(newDocument.find("div").find("[data-errorType]"));
			cachedLeaves = newDocument.find("table").find(".LeafTable");
			var busyIcon = find("#busyIcon");
			var dropdown = filterTable.find("select").first();
            //The filtering is switched by the radio buttons on the filtertable

            dropdown.change(function () {
                var dropdown = filterTable.find("select").first();
                var selval = dropdown.selectedValue();
                busyIcon.show();
                setTimeout(function () {
                    filterTree(selval);
                    busyIcon.hide();
                    },200);
            });            
    }

    function filterTree(selectedFilter) {
        //alert("->filterTree - " + selectedFilter);
        newDocument.find("span").find(".PlusMinus").each(function () {
            this.text(settings.open);
        });

        if (selectedFilter == "ERRORS") {
            // $cachedItems.each(function() {
            newDocument.find("[data-errorType]").each(function () {
                var item = this;
                var errorType = item.attr("data-errorType");
                if (errorType == "Error" || errorType == "CriticalError") item.show();
                else item.hide();
            });
        }

        if (selectedFilter == "WARNINGS") {
            //alert("->" + $("[data-errorType]").length);
            //alert($cachedItems.length);

            cachedItems.each(function () {
                var item = this;
                var errorType = item.attr("data-errorType");
                if (errorType == "Error" || errorType == "CriticalError" || errorType == "Warning") item.show();
                else item.hide();
            });
        }

        if (selectedFilter == "ALL" || selectedFilter == "INFOS") {
            cachedItems.show();
        }

        if (selectedFilter == "INFOS") {
            cachedLeaves.each(function () {
                var item = this;
                var errorType = item.attr("data-errorType");
                if (errorType == "Information" || errorType == "Success") item.show();
                else item.hide();
            });
        }

        newDocument.find(".HeaderTable1").show();        
    }

    //Main function for extending the preformatted table with treeview functions
    //usage: $("table#<tableid>").tabletreeview();
    tabletreeview = function() {

        // var $tree = $(this);

        //Method for help showing only errors on first page load
        // function showIfContainsError($divsToToggle) {
            // var showCount = 0;
            // $divsToToggle.each(function() {
                // if ($(this).attr("data-errorType") == "Error") {
                    // $(this).show();
                    // showCount++;
                // } else {
                    // $(this).hide();
                // }
            // });
            // return showCount;
        // }

        //Setup the tabletreeview extension, applied on the preformatted table
        //Table structure is: table (contains span handle), div { table, div {...}, table, div {...}, ... }
        function setup() {

            //Apply the setup script for every span handle
            newDocument.find("span").find(".PlusMinus").each(function() {
                //The span's target div will be toggled when clicked on span
                var divsToToggleId = this.attr("data-target");
                //var findString = '#' + divsToToggleId;
				var searchString = divsToToggleId;

                //by default, show all filtered elements
                // var showedChildrenCount = showIfContainsError($divsToToggle);
                // if (showedChildrenCount > 0) {
                //   //will be opened
                //   //$(this).html(settings.open);
                //} else {
				//	  //will be closed
                //    $(this).html(settings.close);
                //}
				
				this.text(settings.open);

                //The span's onClick function
                this.click(function() {
					var divToToggle = newDocument.getElementById(searchString);
                    var isHidden = divToToggle.isHidden();

                    if (isHidden) {
                        //show
                        this.text(settings.open);
                        divToToggle.show();
                    } else {
                        //hide
                        this.text(settings.close);
                        divToToggle.hide();
                    }
                });
            });
        }
		
		setup();
    }

    //Function for expanding all table elements
    expandAll = function() {
        var busyIcon = find("#busyIcon");
		busyIcon.show();
		
        setTimeout(function() {
            //var $root = $(this);
            //set all spans to settings.close and show everything
            newDocument.find("div").find("[data-collapsible]").each(function() {
				this.show();
			});
            newDocument.find("span").find(".PlusMinus").each(function() {
				this.text(settings.open);
			});
			busyIcon.hide();
        }, 200);
    }

    //Function for collapsing all table elements 
    //(only which are on the highest level will be displayed)
    collapseAll = function() {
		var busyIcon = find("#busyIcon");
		busyIcon.show();
		
        setTimeout(function() {
            //var $root = $(this);
            //set all spans to settings.open and hide everything
            newDocument.find("div").find("[data-collapsible]").each(function() {
				this.hide();
			});
            newDocument.find("span").find(".PlusMinus").each(function() {
				this.text(settings.close);
			});
            busyIcon.hide();
        }, 200);
    }
