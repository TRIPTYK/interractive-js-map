(function($){
	$(document).ready(function(){
		ajaxUI.init();
	});

	var resourcesObject={
		dataMap : ''
	};

	var ajaxUI={
		init: function()
		{
			ajaxUI.callAjax('data/data-map.json');
		},
		callAjax : function(dataUrl)
		{
			$.ajax({
				url: dataUrl,
				type: 'POST',
				dataType: 'json',
				data: '{}',
				contentType: 'application/json',
				complete: function(xhr, textStatus) {
                    console.log("GET DATA COMPLETE WITH :"+textStatus);
                },
                success: function(data, textStatus, xhr) {
                    console.log("GET DATA SUCCESS WITH :"+textStatus);
                    resourcesObject.dataMap = data;
                    vmapUI.init();
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log("GET DATA ERROR WITH :"+textStatus);
                }
            });
		}
	};

	var vmapUI={
		init : function()
		{
			vmapUI.mapGenerator(resourcesObject.dataMap);
		},
		mapGenerator : function(data)
		{
			$('#world-map').vectorMap({
		        map: 'world_mill_en',
		        focusOn: {
		          x: 0.5,
		          y: 0.5,
		          scale: 2
		        },
		        series: {
		          regions: [{
		            scale: ['#C8EEFF', '#0071A4'],
		            normalizeFunction: 'polynomial',
		            values: data
		          }]
		        },
		        onRegionLabelShow: function(e, el, code)
		        {
				    el.html(el.html()+' (GDP - '+resourcesObject.dataMap[code]+')');
				},
				onRegionClick: function(e, code)
				{
					console.log('La région "'+code+'" contient '+resourcesObject.dataMap[code]+' diabétique(s).');
				}
		    });
		}
	};
})(jQuery);