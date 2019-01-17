             // Start EXPORT MAP LAYER IN PNG //
   // This is Used For Exporting/Downloading A PNG Screenshot //



    filterApplied = false;

    var exportPNGElement = document.getElementById('export-png');

  if ('download' in exportPNGElement) {
    exportPNGElement.addEventListener('click', function(e) {
      map.once('postcompose', function(event) {
        var canvas = event.context.canvas;
        exportPNGElement.href = canvas.toDataURL('image/png');
      });
      map.renderSync();
    }, false);
  } else {
    var info = document.getElementById('no-download');
    console.log(info);
    /**
     * display error message
     */
    info.display = '';
  }
                // END EXPORT MAP LAYER IN PNG //



                    //START OF ICON FEATURE/STYLE //
            // ICON RELATED STUFF ((IMG,STYLE,DATA) OF MARKER) //
  var iconFeature = new ol.Feature({
          geometry: new ol.geom.Point([0, 0]),
          name: 'Null Island',
          population: 4000,
          rainfall: 500
        });

  var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 0.75,
      src: 'assets/data/marker.png'
    }))
  });
  iconFeature.setStyle(iconStyle);
  var styleFunction = function(feature, resolution) {
    return styles[feature.getGeometry().getType()];
  };

                //END OF ICON FEATURE/STYLE // 


                //START OF GEOJSON LAYER With Polygon Layers //
  var styleCache = {};

                      //Province Layer Start
  provincesource = new ol.source.Vector({
                 'projection': 'EPSG:3857', 
                  style: styleFunction,
                  //url: 'http://hydro.naxa.com.np/api/geojson/country'
                  url: static_url+'assets/data/province.geojson',
                  format: new ol.format.GeoJSON()
              });
  var provinceLayer = new ol.layer.Vector({
    title:"Province",
    source: provincesource,
    style: function(feature, resolution) {
      var text = resolution < 5000 ? feature.get('Province') : '';
      if (!styleCache[text]) {
        styleCache[text] = [new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0)',

          }),
          stroke: new ol.style.Stroke({
            color: '#010405',lineDash: [4],//[0.1, 5],
            width: 2
          }),
          text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            text: text,
            fill: new ol.style.Fill({
              color: '#000'
            }),
            stroke: new ol.style.Stroke({
              color: '#fff',
              width: 3
            })
          })
        })];
      }
      return styleCache[text];
      // return styles[feature.getGeometry().getType().getExtent()];
    }
  });

  // provinceLayer.setZIndex(2);

  //Province Layer End



//base layers start

  var osm = new ol.layer.Tile({
      title: 'osm',
      type: 'base',
      visible: true,
      source: new ol.source.OSM({
          "url" : "http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          //"url" : "http://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" // cartodb dark
          //"url" : "http://{a-c}.tile.stamen.com/toner/{z}/{x}/{y}.png" //stamen toner 
          //"url" : "http://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png" // thunderforest landscape - api key required
          //"url" : "http://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" // thunderforest outdoorsy
          //"url" : "https://maps-cdn.salesboard.biz/styles/klokantech-3d-gl-style/{z}/{x}/{y}.png" //Klokantech 3D
          //"url" : "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" //Wikimedia map
          //"url" : "http://{a-c}.tile.stamen.com/watercolor/{z}/{x}/{y}.png" //stamen watercolor
      })
  });
  
// osm.setZIndex(0);

  var osm_steman = new ol.layer.Tile({
      title: 'osm_steman',
      type: 'base',
      visible: false,
      source: new ol.source.OSM({
          "url" : "http://{a-c}.tile.stamen.com/toner/{z}/{x}/{y}.png" //stamen toner 
      })
  });

    var osm_wikimedia = new ol.layer.Tile({
      title: 'osm_wikimedia',
      type: 'base',
      visible: false,
      source: new ol.source.OSM({
          "url" : "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" //Wikimedia map
      })
  });


  // var mapquest = new ol.layer.Tile({
  //       source: new ol.source.MapQuest({layer: 'sat'})
  //     });

  // var bingAerial = new ol.layer.Tile({
  //     source: new ol.source.BingMaps({
  //       key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
  //       imagerySet: 'Aerial'
  //     })
  //   })


var base_layers = [{'osm':osm, 'osm_steman':osm_steman, 'osm_wikimedia':osm_wikimedia}];
//base layers end



  //initialize map
  map = new ol.Map({
    layers: [
      provinceLayer,osm_wikimedia,osm_steman, osm
      
    ],
    target: 'map',
    controls: ol.control.defaults().extend([
          // new ol.control.ScaleLine(),
          // new ol.control.ZoomSlider(),
       ]).extend([
      new ol.control.ZoomToExtent({
        extent: [
          813079.7791264898, 5929220.284081122,
          848966.9639063801, 5936863.986909639
        ]
      })
    ]),
    view: new ol.View({
      center: ol.proj.transform([84.35814212, 27.29004424], 'EPSG:4326', 'EPSG:3857'),
      zoom: 7
  })

  });

  //map.addControl(new ol.control.LayerSwitcher());
  //map initialize end\


//setup style for visible and transparent markers
function setClusterStyle(size, normal){
  if(normal == "normal"){
      var normalClusterStyle = [new ol.style.Style({
          image: new ol.style.Circle({
            radius: 10,
            stroke: new ol.style.Stroke({
              color: '#fff'
            }),
            fill: new ol.style.Fill({
              color: '#3399CC'
            })
          }),
          zIndex:9999,
          text: new ol.style.Text({
            text: size.toString(),
            fill: new ol.style.Fill({
              color: '#fff'
            })
          })
        })];
      return normalClusterStyle;
  }
  else{
      var filteredClusterStyle = [new ol.style.Style({
          image: new ol.style.Circle({
            radius: 10,
            stroke: new ol.style.Stroke({
              color: [255,255,255,0]
            }),
            fill: new ol.style.Fill({
              color: [255,255,255,0]
            })
          }),
          zIndex:9999,
          text: new ol.style.Text({
            text: size.toString(),
            fill: new ol.style.Fill({
              color: [255,255,255,0]
            })
          })
        })];

      return filteredClusterStyle;
  }
}



var normalMarkerStyle =  [new ol.style.Style({
                image: new ol.style.Icon(({
                    anchor: [0.5, 40],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: static_url+'assets/data/marker.png'
                }))
            })];

var filteredMarkerStyle =  [new ol.style.Style({
                image: new ol.style.Icon(({
                    opacity: 1,
                    anchor: [0.5, 40],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: static_url+'assets/data/marker.png'
                }))
            })];

//setup style end



  //hydrodata cluster start
  hydrosource = new ol.source.Vector({
                 'projection': 'EPSG:3857' , 
                  url: static_url+'assets/data/Hydropower_Sites.geojson',  //'http://hydro.naxa.com.np/api/Hydropower/',
                  format: new ol.format.GeoJSON()
              });

  console.log(hydrosource);

  var clusterSource = new ol.source.Cluster({
    distance: 40,
    source: hydrosource
  });
   console.log(clusterSource);
  var styleCacheCluster={};
  var clusters = new ol.layer.Vector({
    source: clusterSource,
    style: function(feature, resolution) {
      var size = 1;

      var zoom = map.getView().getZoom();
      //console.log(zoom);
      if (zoom < 10 && feature.C.features != "undefined") {
        //console.log(feature.C.features);
        size = feature.C.features.length;
      }

      var style = styleCacheCluster[size];
      if (!style) {
        if(size == 1){
            style = normalMarkerStyle;
        }
        else{

          // console.log(size);
        style = setClusterStyle(size,'normal');
        styleCacheCluster[size] = style;
       }
      }
      return style;
    }
  });

  map.addLayer(clusters);

  //clusters.setZIndex(5);

  //hydrodata cluster end


  // load districts function start
  previous_district= null ;
  function loadDistricts(provinceid){
      //Remove Previous Districts 
        if(previous_district != null){
              
                map.removeLayer(previous_district);
    }

    window[provinceid +"source"]= new ol.source.Vector({
      projection: 'EPSG:3857' ,
      style: styleFunction,
      url: static_url+'assets/data/province/'+provinceid+'.geojson',
      format: new ol.format.GeoJSON()
    });
    window[provinceid]= new ol.layer.Vector({
    source: window[provinceid+"source"] ,
    style: function(feature, resolution) {
      // console.log(feature);
      var text = resolution < 5000 ? feature.get('FIRST_DIST') : '';
      if (!styleCache[text]) {
        styleCache[text] = [new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0)',

          }),
          stroke: new ol.style.Stroke({
            color: '#b2b3b4',//lineDash: [.1, 5],
            width: 1
          }),
          text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            text: text,
            fill: new ol.style.Fill({
              color: 'black'
            }),
            stroke: new ol.style.Stroke({
              color: 'grey',
              width: 1
            })
          })
        })];
      }
      return styleCache[text];
      // return styles[feature.getGeometry().getType().getExtent()];
    }
  });

    map.addLayer(window[provinceid]);
    //window[provinceid].setZIndex(3);
    previous_district=window[provinceid];

  }
  //function loaddistrict end


  // function load municipality start

  var previous_municipal= null;
  function loadMunicipal(district){
    // console.log(district);
      //Remove Previous Districts 
      if(previous_municipal != null){
        // console.log(previous_municipal);
              //console.log('asdfasfsa');
              map.removeLayer(previous_district);
              map.removeLayer(previous_municipal);
         }
      window[district+"source"]= new ol.source.Vector({
      projection: 'EPSG:3857',
      style: styleFunction,
      url: static_url+'assets/data/district/'+district+'.geojson',
      format: new ol.format.GeoJSON()
    });
      window[district]= new ol.layer.Vector({
    source: window[district+"source"] ,
    style: function(feature, resolution) {
      // console.log(feature);
      var text = resolution < 5000 ? feature.get('FIRST_GaPa') : '';
      if (!styleCache[text]) {
        styleCache[text] = [new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0)',

          }),
          stroke: new ol.style.Stroke({
            color: '#cccccd',lineDash: [4],// [.1, 5],
            width: 3
          }),
          text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            text: text,
            fill: new ol.style.Fill({
              color: 'black'
            }),
            stroke: new ol.style.Stroke({
              color: '#fff',
              width: 3
            })
          })
        })];
      }
      return styleCache[text];
      // return styles[feature.getGeometry().getType().getExtent()];
    }
  });
      map.addLayer(window[district]);
      //window[district].setZIndex(4);
      previous_municipal=window[district];
  }

  //function loadmunicipality end


  //map click start
  provinceid="";
  map.on('singleclick', function(evt) {
   var element = document.getElementById('popup');

        var popup = new ol.Overlay({
          element: element,
          positioning: 'bottom-center',
          stopEvent: false,
          offset: [0, 50]
        });
        map.addOverlay(popup);
        //console.log(evt.pixel);
        //console.log(evt);
    // console.log("varun");
    var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature, layer) {
              // if(layer !=provinceLayer || layer !=geojsonLayer || layer !=planningAppsLayer){
                
              //   return feature;
              // }
              //console.log(feature.getProperties().features.length);
              //console.log(hydrosource);
              if (feature) {
                if(layer == clusters){
                  //console.log(feature);
                   if (feature.getProperties().features.length == 1) {
                    console.log("if");
                    var coordinates = feature.getGeometry().getCoordinates();
                    var contentHolder = document.getElementById('popup');
                    var popupContent =feature.getProperties().features[0].C.project;
                    //console.log(coordinates);
                     contentHolder.innerHTML = '<code>' + popupContent +
                    '</code>';
                    // popup.innerHTML = feature.get('statuscode');
                    popup.setPosition(coordinates);
                  } else {
                    
                  console.log("else");
                }
                }
              } 

              // if(layer ==provinceLayer && layer!=window[provinceid]){
              //   console.log("Province ENtered");
              //   // console.log(feature);
              //   provinceid= "province"+feature.o.Province;
              //   loadDistricts(provinceid);
              // }
              // if(layer == window[provinceid]){
              //   // console.log("Municipal");
              //   // console.log(feature);
              //   districtClicked= feature.o.FIRST_DIST.toLowerCase(); 
              //     loadMunicipal(districtClicked);

              //    // popup.innerHTML = '&nbsp;';
              // }
              // popup.setPosition(coordinates);
            });
          
            // console.log(layer);
                
     });

  //map click end


//remove clustering after certain zoom level start

 var Cluster = true;
map.on('moveend', function (e) {
    //console.log(map.getView().getCenter());
    var center = map.getView().getCenter();
    var pixel = map.getPixelFromCoordinate(center);

    var zoom = e.map.getView().getZoom();

    if(previous_district != null && zoom < 8){
              
                map.removeLayer(previous_district);
    }
    
    if(previous_municipal != null && zoom < 10){
              
                map.removeLayer(previous_district);
                map.removeLayer(previous_municipal);
    }

    //console.log(pixel);
    map.once('postrender', function(event) {
    

      map.forEachFeatureAtPixel(pixel,
        function(feature, layer) {
          // console.log(feature);
          if(feature.C.FIRST_DIST != undefined && zoom>=10){

                loadMunicipal(feature.C.FIRST_DIST.toLowerCase());
  
          }
          else if(feature.C.Province != "undefined" && zoom >= 8){

                  loadDistricts("province"+feature.C.Province);

          }

      }); 
    });

    //remove and add cluster

    if (zoom >= 10 && Cluster) {
        // do remove the cluster layer
        if(filterApplied == false){ console.log("filternot applied");
            clusters.setSource(hydrosource);
        }
        else if(filterApplied == true && filterhydrosource != 'undefined'){console.log("filter applied");
            clusters.setSource(filterhydrosource);
        }
        
        Cluster = false;
    } else {
        if (!Cluster && filterApplied == false) {console.log("filternot applied cluster");
          
            clusters.setSource(clusterSource);
            Cluster = true;
        }
        else if(!Cluster && filterApplied == true && filterclustersource != 'undefined'){console.log("filter applied cluster");
            clusters.setSource(filterclustersource);
            Cluster = true;
        }
    }

});

//remove clustering after certain zoom level end




  // $('#sel1').on('change',function(){
  //   var province_id=$(this).children(":selected").attr("id");
  //  //  console.log($(this)[0].id);

      
  //     $.ajax({
  //       type: "GET",
  //       url: 'http://localhost:8000/core/process',
  //       success: function(result) {

  //        console.log(result);
  //     }

  // });
  // });

  //loading start
  provincesource.on('change', function (evt) {
      var src = evt.target;
      if (src.getState() === 'ready') {
          document.getElementById("loader").style.display = "none";
          console.log("READY PROVINCE LAYER");
      }

  });

  //loading end

  //clear filter inputs start
  $("#clear1").on('click',function(){
      console.log("VARUN CLICKED")
     $('#select2-inputProvince-container').html('<option>Select Province</option>');
     $('#select2-inputDistrict-container').html('<option>Select District</option>');
     $('#select2-inputLocalGovernment-container').html('<option>Select Local Government</option>');
     $('.projectStatus').prop('checked', false);
     $('.projectCapacity').prop('checked', false);


  });
  //clear filter inputs end
  // console.log(.getSource().getExtent());
// var extent = 

  // map control toolbox functions start
  var extent = [ 8912081.095892394, 3042226.2175816484, 9818564.90071572, 3561141.6062973104];


  $("#zoomin").on('click',function(){console.log("zoomin");
            map.getView().setZoom(map.getView().getZoom()+1);    
  });

  $("#zoomout").on('click',function(){console.log("zoomout");
            map.getView().setZoom(map.getView().getZoom()-1);    
  });
  $("#refresh").on('click', function(){console.log("mc-item");
            // console.log(clusterSource.getExtent());
            map.getView().fit(extent, map.getSize());
          });
  //map control toolbox functions end


  $(document).ready(function(){
    var total_json = null;
    $.ajax({
            url: static_url+'assets/data/Hydropower_Sites.geojson', //'http://hydro.naxa.com.np/api/Hydropower/',
            //data: {},
            async: false, //blocks window close
            success: function(data) {
              total_json = data;  

            }
        });
    var x = JSON.parse(total_json);
    console.log(x.features.length);

    function applyFilter(siteListArray, provinceValue, districtValue, munValue, choose_status, choose_capacity){
          for(i = siteListArray.features.length-1; i>=0 ;i--){
                  // || 
                  //districtValue.trim()!= "Select District" ||  
                  //console.log(provinceValue.trim());
                  //console.log("province "+siteListArray.features[i].properties.province_name.trim());
                  var regioncheck = 1;
                  if(munValue.trim() != "Select Local Government"){
                      
                      //console.log("mun selected"); 
                      if(siteListArray.features[i].properties.gapanapa_name.trim().toLowerCase() == munValue.trim().toLowerCase()){
                          regioncheck = 0;
                      }
                  }
                  else if(districtValue.trim()!= "Select District"){
                    
                    //console.log("district selected"); 
                    if(siteListArray.features[i].properties.district_name.trim().toLowerCase() == districtValue.trim().toLowerCase()){
                          regioncheck = 0;
                    }
                  }
                  else if(provinceValue.trim() != "Select Province"){ 
                    
                    //console.log("province selected"); 
                    if("province "+siteListArray.features[i].properties.province_name.trim().toLowerCase() == provinceValue.trim().toLowerCase() ){ 
                   
                          //console.log("here");
                          regioncheck = 0;
                          
                      }
                  }
                  else if(munValue.trim() == "Select Local Government" && districtValue.trim()== "Select District" && provinceValue.trim() == "Select Province"){
                    //console.log("dont delete this");
                    regioncheck = 2;
                  }
                  
                    //console.log(regioncheck);
                    if(regioncheck == 1){
                      //console.log("deleted");
                      siteListArray.features.splice(i, 1);
                    }
                  
                  

                

              else{
                //console.log(choose_status);
                if(choose_status.length >= 1){
                    var status_matched = 1;
                    for(var k = 0; k<choose_status.length; k++){

                      if(siteListArray.features[i] != undefined){ //console.log(siteListArray.features[i].properties.license_type);
                        //console.log(choose_status[k]);
                        if(siteListArray.features[i].properties.license_type == choose_status[k]){ //console.log("status_entered");
                          status_matched = 0;
                          //console.log("inside if");
                          //break;
                          //console.log(progress[k]);
                        }
                        else{//console.log("status_not entered");
                          status_matched++;
                        }
                      }
                    }
                    }
                    if(status_matched >= choose_status.length){ //console.log("progress deleted");
                      siteListArray.features.splice(i, 1);
                    }

                    else{
                    
                  
                  if(choose_capacity.length >= 1){
                  
                  
                    //console.log(form_status);
                    var yes = 1;
                    for(var l = 0; l<choose_capacity.length; l++){//console.log(form_status[i]);
                        console.log(choose_capacity[l]);
                      capacity_max = parseInt(choose_capacity[l].split("_")[1]);
                        capacity_min = parseInt(choose_capacity[l].split("_")[0]);
                        console.log(capacity_max);
                        if(siteListArray.features[i] != undefined){ console.log(siteListArray.features[i].properties.capacity);
                          if(siteListArray.features[i].properties.capacity <= capacity_max && siteListArray.features[i].properties.capacity >= capacity_min){ //console.log("progress_entered");
                            yes = 0;
                          }
                          else{ //console.log("progress_not_entered");
                            yes++;
                          }
                        }
                    }
                    }
                    if(yes >= choose_capacity.length){ //console.log("status deleted");
                      siteListArray.features.splice(i, 1);
                    }
                  }  
                  
                
                /*else {
                  if(choose_status == "Site Progress"){
                      //manage style
                    }
                  else{
                      //manage style
                  }
                }*/
                }
                
               
              
            }
        }
        //console.log(total_sites);
        $("#apply_button").on('click',function(){
          
          var siteListArray = jQuery.extend(true, {}, total_json);
        
          console.log(siteListArray);
         var provinceValue = $("#inputProvince").val();

          var districtValue = $("#inputDistrict").val();
                    
          var munValue = $("#inputLocalGovernment").val();

          //console.log(districtValue);
          //console.log(JSON.stringify(siteList));
          var choose_status = [];
          $.each($("input[class='projectStatus']:checked"), function(){
            //console.log($(this).parent().siblings().html());
            choose_status.push($(this).parent().siblings().html());
          });

          var choose_capacity = [];
          $.each($("input[class='projectCapacity']:checked"), function(){
            //console.log($(this).parent().siblings().html());
            choose_capacity.push($(this).val());
          });
          //console.log(choose_capacity);
        
            
            //console.log(multi_project);
            
            applyFilter(siteListArray, provinceValue, districtValue, munValue, choose_status, choose_capacity);
            // console.log(siteListArray);
            //console.log(filtered_sites);
            


            filterApplied = true;
            filterhydrosource = new ol.source.Vector({
                  features: (new ol.format.GeoJSON()).readFeatures(siteListArray,{
                      featureProjection: 'EPSG:3857'
                  })
              });

              filterclustersource = new ol.source.Cluster({
                distance: 40,
                source: filterhydrosource
              });

              console.log(filterclustersource);



              var zoom = map.getView().getZoom();


              if (zoom >= 10){
                clusters.setSource(filterhydrosource);
              }
              else{
                clusters.setSource(filterclustersource);
              }
              


        });



        console.log("here");
        $(".img-maptype").on('click',function(){ 
            //console.log(base_layers.length);
            clickedBaseLayer = $(this).attr('value');
            //changeVisibility(clickedBaseLayer);
        
              $.each(base_layers[0], function (i) {
                    //console.log(i);
                    //console.log(base_layers[0][i].get('visible'));
                    if(clickedBaseLayer == base_layers[0][i].get('title')){
                        //console.log("enterererererw");
                        base_layers[0][i].setVisible(true);

                    }
                    else if(base_layers[0][i].get('visible') == true){
                        base_layers[0][i].setVisible(false);
                    }
            });
        });


        //TimeLine Slider Start 

        //slider initialize
        var dragTapSlider = document.getElementById('dateslider');

        noUiSlider.create(dragTapSlider, {
          animate: false,
          //animationDuration: 600,
          range: {
            'min': 2030,
            'max': 2075
          },

          step: 5,

          // Handles start at ...
          //start: [ 1450, 2050, 2350, 3000 ],
          start: [ 2030, 2075 ],

          // ... must be at least 300 apart
          margin: 0,

          // ... but no more than 600
          //limit: 600,

          // Display colored bars between handles
          //connect: true,

          // Put '0' at the bottom of the slider
          //direction: 'rtl',
          orientation: 'horizontal',

          // Move handle on tap, bars are draggable
          behaviour: 'tap-drag',
          tooltips: true,
          /*format: wNumb({
            decimals: 0
          }),*/

          // Show a scale with the slider
          pips: {
            mode: 'steps',
            stepped: true,
            density: 4
          }
        });
        //slider initialize end

        //filter time data start
        function filterTimeData(start, end){
            //var siteListArrayForSlider = jQuery.extend(true, {}, total_json);
            var siteListArrayForSlider = JSON.parse(total_json);
            //console.log(siteListArrayForSlider);
            for(i = siteListArrayForSlider.features.length-1; i>=0 ;i--){
              var date_initial = siteListArrayForSlider.features[i].properties["Isuue_Date"].split("/");
              var year = parseInt(date_initial[2]);
              //console.log(typeof(start));
              //console.log(siteListArrayForSlider.features[i].properties["Isuue_Date"]);
              //console.log(start);
              if(year >= start && year <= end){
                  //console.log(year);
              }
              else{
                  siteListArrayForSlider.features.splice(i, 1);
              }
            }
            
            timelinesource = new ol.source.Vector({
                  features: (new ol.format.GeoJSON()).readFeatures(siteListArrayForSlider,{
                      featureProjection: 'EPSG:3857'
                  })
              });

          timelineclustersource = new ol.source.Cluster({
              distance: 40,
              source: timelinesource
          });

          var zoom = map.getView().getZoom();


              if (zoom >= 10){
                clusters.setSource(timelinesource);
              }
              else{
                clusters.setSource(timelineclustersource);
              }

        }
        //filter time data end

        //play functionality start

        var player;
        var gap;
        function slideThisTimeline(i, durationPlay, playing){
          

          player = setTimeout(function(){
            dragTapSlider.noUiSlider.set(i);



           }, durationPlay);
          if(durationPlay != 0){
            gap = setTimeout(function(){ }, durationPlay/1.3);
          }
         
         
        }

        var playing = 1;
        $(".la-play").on('click',function(){
            $(".la.la-play").css("display","none");
            $(".la.la-pause").css("display","block");
            //console.log("clicked");
          
            var startPlay = 2035;
            var endPlay = 2075;

            var currentValue = dragTapSlider.noUiSlider.get();
            
            var startPlay = parseInt(currentValue[0]);
            var endPlay = parseInt(currentValue[1]);

            var difference = endPlay-startPlay;
            var i = startPlay;
            var durationPlay = 0;

            var durationAnimate = difference/5;

            //$(".noUi-state-tap .noUi-origin").css({"-webkit-transition":"transform "+durationAnimate+"s","transition":"transform "+durationAnimate+"s"});
            // console.log(startPlay);
            // console.log(endPlay);
            //slideThisTimeline(i, durationPlay);
              //filterTimeData();
             // filterTimeData(2072, 2075);
             var playing = 1;
          while(i<=endPlay && playing != 0){
              //console.log(durationPlay);

              
              slideThisTimeline(i, durationPlay, playing);
              filterTimeData(i,endPlay);


              i=i+5;
              durationPlay = durationPlay+1000;
              //console.log(i);
          }
          
          
          
        
        });

        //play functionality end

        //pause functionality start
        $(".la-pause").on('click',function(){

            $(".la.la-play").css("display","block");
            $(".la.la-pause").css("display","none");
            
            console.log(player);
            //while(player>1){
                clearTimeout(player);
                clearTimeout(player);
                clearTimeout(player);
                clearTimeout(player);
                clearTimeout(player);
                clearTimeout(gap);
            //}
            
        });

        //pause functionality end

        // TimeLine Slider change function start

        dragTapSlider.noUiSlider.on('set.one', function () { 
            //var siteListArrayForSlider = jQuery.extend(true, {}, total_json);
            //var currentValue = dragTapSlider.noUiSlider.get();
            //console.log(currentValue);

            

        });
        // TimeLine Slider change function stop
  });