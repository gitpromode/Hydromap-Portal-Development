// Start EXPORT MAP LAYER IN PNG //
// This is Used For Exporting/Downloading A PNG Screenshot //
// filterApplied = false;
var exportPNGElement = document.getElementById('export-png');
exportPNGElement.crossOrigin = "anonymous";
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
    /**
     * display error message
     */
    info.style.display = '';
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
    image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'assets/data/marker.png'
    }))
});
iconFeature.setStyle(iconStyle);
// var styleFunction = function(feature, resolution) {
//   return styles[feature.getGeometry().getType()];
// };

//END OF ICON FEATURE/STYLE // 


//START OF GEOJSON LAYER With Polygon Layers //
var styleCache = {};

//Province Layer Start
provincesource = new ol.source.Vector({
    'projection': 'EPSG:3857',
    style: styleFunction,
    url: 'http://hydro.naxa.com.np/api/geojson/country',
    // url: static_url+'assets/data/province.geojson',
    format: new ol.format.GeoJSON()
});
var provinceLayer = new ol.layer.Vector({
    title: "Province",
    source: provincesource,
    style: function(feature, resolution) {
        var text = resolution < 5000 ? 'Province ' + feature.get('Province') : '';
        if (!styleCache[text]) {
            styleCache[text] = [new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0)',

                }),
                stroke: new ol.style.Stroke({
                    color: '#010405',
                    lineDash: [4], //[0.1, 5],
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

provinceLayer.setZIndex(1);

//Province Layer End

//Controls Function Start


var attribution = new ol.control.Attribution({
    collapsible: false
});
var scaleLineControl = new ol.control.ScaleLine();
var fullscreen = new ol.control.FullScreen();
//Control Function End


//base layers start

// var arcgis = new ol.layer.Tile({
//     title: 'arcgis', // same name as variable
//     type: 'base',
//     visible: true,
//     source: new ol.source.XYZ({
//       attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
//               'rest/services/World_Topo_Map/MapServer">ArcGIS</a> | Developer © <a href="http://www.naxa.com.np">NAXA</a>',

//         url : 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
//               'World_Topo_Map/MapServer/tile/{z}/{y}/{x}' //stamen toner 
//     })
// });
// arcgis.setZIndex(0);

var osm = new ol.layer.Tile({
    title: 'osm', // same name as variable
    visible: false,
    source: new ol.source.OSM({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">OSM</a> | Developer © <a href="http://www.naxa.com.np">NAXA</a>',
    })
});

osm.setZIndex(0);

var osm_light = new ol.layer.Tile({
    title: 'osm_light', // same name as variable
    type: 'base',
    visible: true,
    source: new ol.source.OSM({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">OSM Light</a> | Developer © <a href="http://www.naxa.com.np">NAXA</a>',
        "url": "http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
    })
});
osm_light.setZIndex(0);

var bing_aerial = new ol.layer.Tile({
    title: 'bing_aerial', // same name as variable
    type: 'base',
    visible: false,
    source: new ol.source.BingMaps({
        // attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        //         'rest/services/World_Topo_Map/MapServer">Bing_Aerial</a> | Developer © <a href="http://www.naxa.com.np">NAXA</a>',
        key: 'AoTlmaazzog43ImdKts9HVztFzUI4PEOT0lmo2V4q7f20rfVorJGAgDREKmfQAgd',
        imagerySet: 'AerialWithLabels',
        maxZoom: 19
    })
});
bing_aerial.setZIndex(0);

var bing_road = new ol.layer.Tile({
    title: 'bing_road', // same name as variable
    type: 'base',
    visible: false,
    source: new ol.source.BingMaps({
        // attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        //           'rest/services/World_Topo_Map/MapServer">Bing_Road</a> | Developer © <a href="http://www.naxa.com.np">NAXA</a>',
        key: 'AoTlmaazzog43ImdKts9HVztFzUI4PEOT0lmo2V4q7f20rfVorJGAgDREKmfQAgd',
        imagerySet: 'RoadOnDemand',
        maxZoom: 19
    })
});
bing_road.setZIndex(0);

// var mapquest = new ol.layer.Tile({
//       source: new ol.source.MapQuest({layer: 'sat'})
//     });

// var bingAerial = new ol.layer.Tile({
//     source: new ol.source.BingMaps({
//       key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
//       imagerySet: 'Aerial'
//     })
//   })


var base_layers = [{ /*'arcgis':arcgis,*/
    'osm': osm,
    'osm_light': osm_light,
    'bing_aerial': bing_aerial,
    'bing_road': bing_road
}];
//base layers end



//initialize map
map = new ol.Map({
    layers: [
        provinceLayer, osm, osm_light, bing_aerial, bing_road
    ],

    target: 'map',
    controls: ol.control.defaults({
        attribution: false
    }).extend([attribution, scaleLineControl, fullscreen]),

    view: new ol.View({
        center: [9369345.179083776, 3298410.6445619236],
        zoom: 7,
        minZoom: 7,
        // maxZoom: 13
    })

});


//CLUSTER OPENLAYERS 5 START
var cluster_radius = 13;


var earthquakeFill = new ol.style.Fill({
    color: 'rgba(255, 153, 0)' //, 0.8)'
});
var earthquakeStroke = new ol.style.Stroke({
    color: 'rgba(255, 204, 0)', //, 0.2)',
    width: 0 //1
});
var textFill = new ol.style.Fill({
    color: '#fff'
});
var textStroke = new ol.style.Stroke({
    color: 'white', //'rgba(0, 0, 0)',// 0.6)',
    width: 0.3 //3
});
var invisibleFill = new ol.style.Fill({
    color: 'rgba(255, 255, 255, 0.01)'
});

function createEarthquakeStyle(feature) {
   
    radius = cluster_radius; //5 + 20 * (magnitude - 5);
    var l_type = "";

    l_type = feature.N.license_type;
  
    var marker_url = "";
    if (l_type == "Survey") {
        //console.log("BLUE MARKER");
        marker_url = static_url + 'assets/img/marker/marker-red.png';
    } else if (l_type == "Generation") {
        marker_url = static_url + 'assets/img/marker/marker-blue.png';
    } else if (l_type == "Operation") {
        marker_url = static_url + 'assets/img/marker/marker-green.png';
    }
    return new ol.style.Style({
        geometry: feature.getGeometry(),
        image: new ol.style.Icon(({
            anchor: [0.5, 40],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            scale: 0.8,
            src: marker_url
        }))
    });
}

var maxFeatureCount, clusters;

function calculateClusterInfo(resolution) {
    maxFeatureCount = 0;
    var features = clusters.getSource().getFeatures();
    var feature, radius;
    for (var i = features.length - 1; i >= 0; --i) {
        feature = features[i];
        var originalFeatures = feature.get('features');
        var extent = ol.extent.createEmpty();
        var j, jj;
        for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
            ol.extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
        }
        maxFeatureCount = Math.max(maxFeatureCount, jj);
        radius = cluster_radius; //0.25 * (ol.extent.getWidth(extent) + ol.extent.getHeight(extent)) /
        resolution;
        feature.set('radius', radius);
    }
}

var currentResolution;

function styleFunction(feature, resolution) {
    if (resolution != currentResolution) {
        calculateClusterInfo(resolution);
        currentResolution = resolution;
    }
    var style;
    var size = feature.get('features').length;
    // console.log(feature.get('radius'));
    if (size > 1) {
        style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: cluster_radius, //feature.get('radius'),
                fill: new ol.style.Fill({
                    color: [22, 166, 150] //, Math.min(0.8, 0.4 + (size / maxFeatureCount))]
                })
            }),
            text: new ol.style.Text({
                text: size.toString(),
                textAlign: "center",
                textBaseline: "middle",
                fill: textFill,
                stroke: textStroke,
                offsetY: 1.5,
                offsetX: -1
            })

        });
    } else {
        var originalFeature = feature.get('features')[0];
        style = createEarthquakeStyle(originalFeature);
    }
    return style;
}

function selectStyleFunction(feature) {
    var styles = [new ol.style.Style({
        image: new ol.style.Circle({
            radius: cluster_radius, //feature.get('radius'),
            fill: invisibleFill
        })
    })];
    var originalFeatures = feature.get('features');
    var originalFeature;
    for (var i = originalFeatures.length - 1; i >= 0; --i) {
        originalFeature = originalFeatures[i];
        styles.push(createEarthquakeStyle(originalFeature));
    }
    return styles;
}

var hydrosource = new ol.source.Vector({
    url: 'http://hydro.naxa.com.np/api/Hydropower/', //static_url+'assets/data/earth.kml',
    format: new ol.format.GeoJSON({
        extractStyles: false
    })
});
var clusterSource = new ol.source.Cluster({
    distance: 100,
    source: hydrosource
});
clusters = new ol.layer.Vector({
    source: clusterSource,
    style: styleFunction
});
map.addLayer(clusters);

clusters.setZIndex(6);
//clusterSource.setDistance(0);

// cluster interaction start
var select = /*ol.interaction.defaults().extend([*/ new ol.interaction.Select({
    layers: [clusters],
    condition: function(evt) {
        //console.log(evt);
        // if(map == null){
        return evt.type == 'pointermove' ||
            evt.type == 'singleclick';
        // }

    },
    style: selectStyleFunction
}); //]);


map.addInteraction(select);
//cluster interaction end




// load districts function start
previous_district = null;

function loadDistricts(provinceid) {
    //Remove Previous Districts 
    if (previous_district != null) {

        map.removeLayer(previous_district);
    }

    window[provinceid + "source"] = new ol.source.Vector({
        projection: 'EPSG:3857',
        style: styleFunction,
        url: static_url + 'assets/data/province/' + provinceid + '.geojson',
        format: new ol.format.GeoJSON()
    });
    window[provinceid] = new ol.layer.Vector({
        source: window[provinceid + "source"],
        style: function(feature, resolution) {
            // console.log(feature);
            var text = resolution < 5000 ? feature.get('FIRST_DIST') : '';
            if (!styleCache[text]) {
                styleCache[text] = [new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0)',

                    }),
                    stroke: new ol.style.Stroke({
                        color: '#b2b3b4', //lineDash: [.1, 5],
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
    window[provinceid].setZIndex(1);
    previous_district = window[provinceid];

}
//function loaddistrict end


// function load municipality start

var previous_municipal = null;

function loadMunicipal(district) {
    // console.log(district);
    //Remove Previous Districts 
    if (previous_municipal != null) {
        // console.log(previous_municipal);
        //console.log('asdfasfsa');
        map.removeLayer(previous_district);
        map.removeLayer(previous_municipal);
    }
    window[district + "source"] = new ol.source.Vector({
        projection: 'EPSG:3857',
        style: styleFunction,
        url: static_url + 'assets/data/district/' + district + '.geojson',
        format: new ol.format.GeoJSON()
    });
    window[district] = new ol.layer.Vector({
        source: window[district + "source"],
        style: function(feature, resolution) {
            // console.log(feature);
            var text = resolution < 5000 ? feature.get('FIRST_GaPa') : '';
            if (!styleCache[text]) {
                styleCache[text] = [new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0)',

                    }),
                    stroke: new ol.style.Stroke({
                        color: '#cccccd',
                        lineDash: [4], // [.1, 5],
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
    window[district].setZIndex(1);
    previous_municipal = window[district];
}

//function loadmunicipality end


//map click start
provinceid = "";
map.on('singleclick', function(evt) {
    var element = document.getElementById('popup');
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    map.addOverlay(overlay);
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
                if (layer == clusters) {


                    //console.log(feature);
                    if (feature.getProperties().features.length == 1) {

                        $('#popup-sidebar').css("display", "block");
                        $('#popup').css("display", "block");
                        $('#bar_graph').css("display", "none");

                        // console.log(feature.N.features[0].N);
                        closer.onclick = function() {
                            overlay.setPosition(undefined);
                            closer.blur();
                            return false;
                        };
                        // console.log(feature);
                        var coordinates = evt.coordinate;
                        var contentHolder = document.getElementById('popup-sidebar');
                        var popupContent = '<div id="iw-container" class="">' +
                            '<div class="iw-title bg-gb text-white"><strong>' + feature.N.features[0].N.project + '</strong></div>' +

                            '<div id="container-data" class="bg-white scrolling-wrap sh-400">' +
                            '<table class="table table-striped">' +
                            '<tbody>' +
                            '<tr>' +
                            '<th><strong>Capacity</strong></th>' +
                            '<td>' + feature.N.features[0].N.capacity + ' (MW)</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<th><strong>Status</strong></th>' +
                            '<td>' + feature.N.features[0].N.license_type + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<th><strong>Issue Date</strong></th>' +
                            '<td>' + feature.N.features[0].N.issue_date_years + '/' + feature.N.features[0].N.issue_date_months + '/' + feature.N.features[0].N.issue_date_days + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<th><strong>Validity Date</strong></th>' +
                            '<td>' + feature.N.features[0].N.validity_date_years + '/' + feature.N.features[0].N.validity_date_months + '/' + feature.N.features[0].N.validity_date_days + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<th><strong>Promoter</strong></th>' +
                            '<td>' + feature.N.features[0].N.promoter + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<th><strong>Province</strong></th>' +
                            '<td>' + feature.N.features[0].N.province_name + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<th><strong>District</strong></th>' +
                            '<td>' + feature.N.features[0].N.district_name + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<th><strong>Local Government</strong></th>' +
                            '<td>' + feature.N.features[0].N.gapanapa_name + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<th><strong>River</strong></th>' +
                            '<td>' + feature.N.features[0].N.river + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<th><strong>Address</strong></th>' +
                            '<td>' + feature.N.features[0].N.address + '</td>' +
                            '</tr>' +
                            '</tbody>' +
                            '</table>' +

                            '</div>' +
                            '<a href="http://hydro.naxa.com.np/core/hydropower-profile/' + feature.N.features[0].N.pk + '" title="" class="btn bg-gb text-white btn-block btn-sm mt-3">View Detail</a>';
                        //console.log(coordinates);
                        contentHolder.innerHTML = popupContent;
                        content.innerHTML = '<div class="custom-popup-header"><span class="amenity-name" ><a href="http://hydro.naxa.com.np/core/hydropower-profile/' + feature.N.features[0].N.pk + '"><b>' + feature.N.features[0].N.project + '</b></a></span></div><code></code>'; //'Project Name:'+
                        // popup.innerHTML = feature.get('statuscode');
                        overlay.setPosition(coordinates);
                        // popup.setPosition(coordinates);
                        if ($.fn.niceScroll) {
                            $(".scrolling-wrap").niceScroll({
                                cursorcolor: "#16a696",
                                cursorborderradius: "0px",
                                cursorborder: "",
                                cursorwidth: "8px",
                                //autohidemode: false
                            });
                            $(".scrolling-wrap").mouseover(function() {
                                $(".scrolling-wrap").getNiceScroll().resize();
                            });
                        }
                    } else {

                        //console.log("else");
                    }
                }
            }
        });
});

//map click end

//remove clustering after certain zoom level start

var Cluster = true;
map.on('moveend', function(e) {

    //console.log(map.getView().getCenter());
    var center = map.getView().getCenter();
    var pixel = map.getPixelFromCoordinate(center);

    var zoom = e.map.getView().getZoom();

    if (previous_district != null && zoom < 8) {
        clusters.getSource().setDistance(60);
        map.removeLayer(previous_district);
    }

    if (previous_municipal != null && zoom < 10) {

        map.removeLayer(previous_district);
        map.removeLayer(previous_municipal);
    }

    //console.log(pixel);
    map.once('postrender', function(event) {


        map.forEachFeatureAtPixel(pixel,
            function(feature, layer) {
                // console.log(feature);
                if (feature.N.FIRST_DIST != undefined && zoom >= 10) {

                    loadMunicipal(feature.N.FIRST_DIST.toLowerCase());
                    clusters.getSource().setDistance(0);

                } else if (feature.N.Province != "undefined" && zoom >= 8) {
                    clusters.getSource().setDistance(0);
                    loadDistricts("province" + feature.N.Province);

                }

            });
    });

});

//remove clustering after certain zoom level end


//loading start
provincesource.on('change', function(evt) {
    var src = evt.target;
    if (src.getState() === 'ready') {
        document.getElementById("loader").style.display = "none";


        // console.log("READY PROVINCE LAYER");
    }

});

//loading end

// map control toolbox functions start

$("#zoomin").on('click', function() {
    console.log("zoomin");
    map.getView().setZoom(map.getView().getZoom() + 1);
});

$("#zoomout").on('click', function() {
    console.log("zoomout");
    map.getView().setZoom(map.getView().getZoom() - 1);
});
$("#refresh").on('click', function() {
    console.log("mc-item");
    // console.log(clusterSource.getExtent());
    map.setView(new ol.View({
        center: [9297188.62438256, 3260497.878532478],
        zoom: 7,
        minZoom: 7,

    }));
});
//map control toolbox functions end


$(document).ready(function() {

    var total_json = null;
    $.ajax({
        url: 'http://hydro.naxa.com.np/api/Hydropower/', //static_url+'assets/data/Hydropower_Sites.geojson',
        //data: {},
        async: false, //blocks window close
        success: function(data) {
            total_json = data;

        }
    });
    //var x = JSON.parse(total_json);
    // console.log(total_json);

    function applyFilter(siteListArray, provinceValue, districtValue, munValue, choose_status, choose_capacity) {
        for (i = siteListArray.features.length - 1; i >= 0; i--) {
            // || 
            //districtValue.trim()!= "Select District" ||  
            //console.log(provinceValue.trim());
            //console.log("province "+siteListArray.features[i].properties.province_name.trim());
            //console.log(districtValue);
            var regioncheck = 1;
            if (munValue.length >= 1) {
                //console.log(munValue);
                // console.log("mun selected"); 
                for (var a = 0; a < munValue.length; a++) {
                    if (siteListArray.features[i].properties.gapanapa_name.trim().toLowerCase() == munValue[a].trim().toLowerCase()) {
                        regioncheck = 0;
                        //regioncheck++;
                    }
                }
            } else if (districtValue.length >= 1) {
                // console.log(siteListArray.features[i].properties.district_name.trim().toLowerCase());
                // console.log(districtValue.trim().toLowerCase());
                // console.log("district selected"); 
                for (var b = 0; b < districtValue.length; b++) {
                    if (siteListArray.features[i].properties.district_name.trim().toLowerCase() == districtValue[b].trim().toLowerCase()) {
                        // console.log("district Entered");
                        regioncheck = 0;
                        //regioncheck++;
                    }
                }
            } else if (provinceValue.length >= 1) {

                //console.log("province selected"); 
                for (var c = 0; c < provinceValue.length; c++) {
                    if ("province " + siteListArray.features[i].properties.province_name.trim().toLowerCase() == provinceValue[c].trim().toLowerCase()) {

                        //console.log("here");
                        regioncheck = 0;
                        //regioncheck++;

                    }
                }
            } else if (munValue.length == 0 && districtValue.length == 0 && provinceValue.length == 0) {
                //   //console.log("dont delete this");
                regioncheck = 2;
            }

            //console.log(regioncheck);
            if (regioncheck == 1) {
                // console.log("deleted");
                siteListArray.features.splice(i, 1);
            } else {
                //console.log(choose_status);
                if (choose_status.length >= 1) {
                    var status_matched = 1;
                    for (var k = 0; k < choose_status.length; k++) {

                        if (siteListArray.features[i] != undefined) { //console.log(siteListArray.features[i].properties.license_type);
                            //console.log(choose_status[k]);
                            if (siteListArray.features[i].properties.license_type == choose_status[k]) { //console.log("status_entered");
                                status_matched = 0;
                                //console.log("inside if");
                                //break;
                                //console.log(progress[k]);
                            } else { //console.log("status_not entered");
                                status_matched++;
                            }
                        }
                    }
                }
                if (status_matched >= choose_status.length) { //console.log("progress deleted");
                    siteListArray.features.splice(i, 1);
                } else {

                    // console.log(choose_capacity.length);
                    if (choose_capacity.length >= 1) {

                        // console.log("varun")
                        //console.log(form_status);
                        var yes = 1;
                        for (var l = 0; l < choose_capacity.length; l++) { //console.log(form_status[i]);
                            // console.log(choose_capacity[l]);
                            capacity_max = parseInt(choose_capacity[l].split("_")[1]);
                            capacity_min = parseInt(choose_capacity[l].split("_")[0]);
                            // console.log(capacity_max);
                            if (siteListArray.features[i] != undefined) { //console.log(siteListArray.features[i].properties.capacity);
                                if (siteListArray.features[i].properties.capacity > capacity_min && siteListArray.features[i].properties.capacity <= capacity_max) { //console.log("progress_entered");
                                    yes = 0;
                                } else { //console.log("progress_not_entered");
                                    yes++;
                                }
                            }
                        }
                    }
                    if (yes >= choose_capacity.length) { //console.log("status deleted");
                        siteListArray.features.splice(i, 1);
                    }
                }
            }
        }
    }
    //console.log(total_sites);
    $("#apply_button").on('click', function() {

        var siteListArray = jQuery.extend(true, {}, total_json);

        // console.log(siteListArray);

        // console.log($("#inputProvince").multiselect('selectAll'));
        // province_multiselect.onSelectAll(function(){
        //    console.log("selected all");
        // });
        var provinceValue = [];
        if ($("#inputProvince").val() != null) {
            provinceValue = $("#inputProvince").val();
            // console.log(provinceValue);
        }

        // console.log(provinceValue);

        var districtValue = [];
        if ($("#inputDistrict").val() != null) {
            districtValue = $("#inputDistrict").val();

        }
        // console.log(districtValue);
        // console.log(districtValue);
        var munValue = [];
        if ($("#inputLocalGovernment").val() != null) {
            munValue = $("#inputLocalGovernment").val();

        }
        // console.log(munValue);


        $('#popup-sidebar').css("display", "none");
        $('#bar_graph').css("display", "block");

        //console.log(districtValue);
        //console.log(JSON.stringify(siteList));

        //console.log(choose_status);

        var choose_status = [];
        if ($("#statusSelect").val() != null) {
            choose_status = $("#statusSelect").val();
            // console.log(choose_status);

        }

        // console.log(choose_status);
        // $.each($("option[class='projectStatus']"), function(){
        //   console.log($(this).parent().siblings().html());
        //   choose_status.push($(this).parent().siblings().html());
        // console.log($(".statusSelect").on('click',function()
        //   {choose_status.push($(this).parent().siblings().html())}));
        //           console.log(choose_status);

        // });
        // console.log(choose_status);

        // console.log(choose_capacity);
        var choose_capacity = [];
        // console.log($("#capacitySelect").val());
        if ($("#capacitySelect").val() != null) {
            choose_capacity = $("#capacitySelect").val();
        }

        // console.log(choose_capacity);
        // var choose_capacity =[$("#capacitySelect").val()];
        // console.log(choose_capacity);
        // console.log(choose_capacity);
        // var choose_capacity = [];
        // $.each($("input[class='projectCapacity']".val()), function(){
        //   console.log($(this).parent().siblings().html());
        //   choose_capacity.push($(this).val());
        // });
        // console.log(choose_capacity);


        //console.log(multi_project);

        applyFilter(siteListArray, provinceValue, districtValue, munValue, choose_status, choose_capacity);
        // console.log(siteListArray);
        //console.log(filtered_sites);
        // console.log(provinceValue);


        filterApplied = true;
        filterhydrosource = new ol.source.Vector({

            features: (new ol.format.GeoJSON()).readFeatures(siteListArray, {
                featureProjection: 'EPSG:3857'
            })
        });

        filterclustersource = new ol.source.Cluster({
            distance: 60,
            source: filterhydrosource
        });

        // console.log(filterclustersource);


        clusters.setSource(filterclustersource);

        var zoom = map.getView().getZoom();

        if (zoom >= 10) {
            clusters.getSource().setDistance(0);

        } else {
            clusters.getSource().setDistance(60);
        }

        var isTimeline = false;
        CreateChartData(siteListArray, isTimeline);

    });



    // console.log("here");
    $(".maptype").on('click', function() {
        $(".ol-attribution-bing-tos").html("");
        //console.log(base_layers.length);
        clickedBaseLayer = $(this).attr('value');
        //console.log(clickedBaseLayer);

        $.each(base_layers[0], function(i) {
            $(".ol-attribution-bing-tos").html("");
            //console.log(i);
            //console.log(base_layers[0][i].get('title'));
            if (clickedBaseLayer == base_layers[0][i].get('title')) {
                //console.log("enterererererw");
                base_layers[0][i].setVisible(true);

                $(".ol-attribution-bing-tos").html("Tiles © | Developer © NAXA");
            } else if (base_layers[0][i].get('visible') == true) {
                base_layers[0][i].setVisible(false);
            }

        });
        $(".ol-attribution-bing-tos").html("");
    });


    //TimeLine Slider Start 

    //slider initialize
    var dragTapSlider = document.getElementById('dateslider');


    noUiSlider.create(dragTapSlider, {
        animate: false,
        //animationDuration: 600,
        connect: [false, true, false, false],
        range: {
            'min': 2030,
            'max': 2075
        },

        step: 5,

        // Handles start at ...
        //start: [ 1450, 2050, 2350, 3000 ],
        start: [2030, 2075, 2075],

        // ... must be at least 300 apart
        margin: -20,

        // ... but no more than 600
        //limit: 10,

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


    var connect = dragTapSlider.querySelectorAll('.noUi-connect');
    var classes = ['c-1-color', 'c-2-color'];

    for (var i = 0; i < connect.length; i++) {
        connect[i].classList.add(classes[i]);
    }
    //console.log(connect);

    //slider initialize end

    //filter time data start

    var paused = 0;
    var startPlay = 2035;
    var midPlay = 2075;
    var endPlay = 2075;

    function filterTimeData(start, end) {
        // console.log(start);
        // console.log(end);
        var siteListArrayForSlider = jQuery.extend(true, {}, total_json);
        //var siteListArrayForSlider = JSON.parse(total_json);
        //console.log(siteListArrayForSlider);
        for (i = siteListArrayForSlider.features.length - 1; i >= 0; i--) {
            // var date_initial = '2075';
            // var issue_date = siteListArrayForSlider.features[i].properties["issue1_date"];
            // //console.log(issue_date);
            // if(issue_date!=null){
            //     date_initial = issue_date.split("/");
            // }


            // console.log(siteListArrayForSlider.features);
            var year = parseInt(siteListArrayForSlider.features[i].properties.issue_date_years); //parseInt(date_initial[2]);
            if (year >= start && year <= end) {
                // console.log(year);
            } else {
                siteListArrayForSlider.features.splice(i, 1);
            }
        }


        // console.log(siteListArrayForSlider);
        timelinesource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(siteListArrayForSlider, {
                featureProjection: 'EPSG:3857'
            })
        });

        timelineclustersource = new ol.source.Cluster({
            distance: 0,
            source: timelinesource
        });


        clusters.setSource(timelineclustersource);
        var zoom = map.getView().getZoom();


        // if (zoom >= 10){
        //   clusters.getSource().setDistance(0);
        // }
        // else{
        //   clusters.getSource().setDistance(60);
        // }
        var isTimeline = true;
        CreateChartData(siteListArrayForSlider, isTimeline);


    }
    //filter time data end

    //play functionality start

    var player;
    var gap;

    function slideThisTimeline(i, durationPlay, startPlay, midPlay, endPlay) {


        window['player' + i] = setTimeout(function() {
            // console.log(i);
            // console.log(startPlay);
            filterTimeData(startPlay, i);
            dragTapSlider.noUiSlider.set([startPlay, i, endPlay]);
            // console.log("step"+i);
            if (i == endPlay) {
                $(".la.la-play").css("display", "block");
                $(".la.la-pause").css("display", "none");
                $(".noUi-handle-upper").css("display", "none");
                //dragTapSlider.noUiSlider.set([startPlay,startPlay, endPlay]);
            }

        }, durationPlay);
        if (durationPlay != 0) {
            gap = setTimeout(function() {}, durationPlay / 1.3);
        }


    }


    $(".la-play").on('click', function() {

        $(".noUi-handle-upper").css("display", "block");
        // console.log(paused);
        $(".la.la-play").css("display", "none");
        $(".la.la-pause").css("display", "block");
        //console.log("clicked");

        // var startPlay = 2035;
        // var endPlay = 2075;
        var i = midPlay;
        if (paused == 0) {
            currentValue = dragTapSlider.noUiSlider.get();
            startPlay = parseInt(currentValue[0]);
            midPlay = startPlay;
            endPlay = parseInt(currentValue[2]);
            i = startPlay;
        }


        var difference = endPlay - startPlay;

        var durationPlay = 0;

        var durationAnimate = difference / 5;

        //$(".noUi-state-tap .noUi-origin").css({"-webkit-transition":"transform "+durationAnimate+"s","transition":"transform "+durationAnimate+"s"});
        // console.log(startPlay);
        // console.log(endPlay);
        //slideThisTimeline(i, durationPlay);
        //filterTimeData();
        // filterTimeData(2072, 2075);

        while (i <= endPlay) {


            //console.log(durationPlay);


            slideThisTimeline(i, durationPlay, startPlay, midPlay, endPlay);



            i = i + 5;
            durationPlay = durationPlay + 1000;
            //console.log(i);
        }

        paused = 0;


    });

    //play functionality end

    //pause functionality start


    function stopAllTimeouts() {
        var id = window.setTimeout(null, 0);
        while (id--) {
            window.clearTimeout(id);
        }
    }


    $(".la-pause").on('click', function() {
        paused = 1;
        // console.log(startPlay);
        // console.log(endPlay);
        // console.log(paused);
        $(".la.la-play").css("display", "block");
        $(".la.la-pause").css("display", "none");
        var currentValue = dragTapSlider.noUiSlider.get();

        midPlay = parseInt(currentValue[1]);

        stopAllTimeouts();


    });

    //pause functionality end


    //reset map data on hide timeline
    $(".toggle-timeline").on('click', function() {
        map.setView(new ol.View({
            center: [9369345.179083776, 3298410.6445619236],
            zoom: 7,
            minZoom: 7
        }));
        //console.log("close clicked");
        if ($("#timeline-sidebar").hasClass("active")) {

            //console.log("timeline not active");
            var zoom = map.getView().getZoom();


            if (zoom >= 10) {
                clusters.setSource(hydrosource);
            } else {
                clusters.setSource(clusterSource);
            }

            dragTapSlider.noUiSlider.set(["2030", "2075", "2075"]);
            CreateChartData(total_json);

        } else {
            $('#example-reset-form').trigger("reset");
        }

    });
    //reset map data on hide timeline end

    // TimeLine Slider change function start

    dragTapSlider.noUiSlider.on('update.one', function() {
        paused = 0;

    });
    // TimeLine Slider change function end

    //timeline slider slide function

    dragTapSlider.noUiSlider.on('slide.one', function() {
        //console.log('slided');
        paused = 0;
        var currentValue = dragTapSlider.noUiSlider.get();
        dragTapSlider.noUiSlider.set([currentValue[0], currentValue[1], currentValue[1]]);

        filterTimeData(dragTapSlider.noUiSlider.get()[0], dragTapSlider.noUiSlider.get()[1]);
        //console.log();


    });
    //timeline slider slide function end

    //Chart Section Start 

    function CreateChartData(geojson, isTimeline) {
        $("#graphic").html("");
        $("#chart_pie").html("");
        $("#graphic2").html("");

        // console.log(geojson);
        var province1count = 0;
        var province2count = 0;
        var province3count = 0;
        var province4count = 0;
        var province5count = 0;
        var province6count = 0;
        var province7count = 0;

        var survey_count = 0;
        var operation_count = 0;
        var generation_count = 0;

        var lessthan20 = 0;
        var between20to100 = 0;
        var greaterthan100 = 0;

        for (var i = 0; i < geojson.features.length; i++) {
            // console.log(geojson);
            // console.log(total_json.features[i].properties.province);
            if (geojson.features[i].properties.province == 1) {
                province1count++;
            } else if (geojson.features[i].properties.province == 2) {
                province2count++;
            } else if (geojson.features[i].properties.province == 3) {
                province3count++;

            } else if (geojson.features[i].properties.province == 4) {
                province4count++;
            } else if (geojson.features[i].properties.province == 5) {
                province5count++;
            } else if (geojson.features[i].properties.province == 6) {
                province6count++;
            } else if (geojson.features[i].properties.province == 7) {
                // console.log(total_json.features[i].properties.province);
                province7count++;
            }


            if (geojson.features[i].properties.license_type == "Survey") {
                survey_count++;
            } else if (geojson.features[i].properties.license_type == "Generation") {
                generation_count++;
            } else if (geojson.features[i].properties.license_type == "Operation") {
                operation_count++;
            }

            if (geojson.features[i].properties.capacity <= 20) {
                // console.log("less than");
                lessthan20++;
            } else if (geojson.features[i].properties.capacity <= 100 && geojson.features[i].properties.capacity > 20) {
                // console.log("between");
                // console.log(geojson.features[i].properties.capacity);
                between20to100++;
            } else if (geojson.features[i].properties.capacity > 100) {
                // console.log("Greater THan");
                // console.log(geojson.features[i].properties.capacity);
                greaterthan100++;
            }

        }

        province_data = [{
                "name": "Province - 1",
                "value": province1count
            },
            {
                "name": "Province - 2",
                "value": province2count
            },
            {
                "name": "Province - 3",
                "value": province3count
            },
            {
                "name": "Province - 4",
                "value": province4count
            },
            {
                "name": "Province - 5",
                "value": province5count
            },
            {
                "name": "Province - 6",
                "value": province6count
            },
            {
                "name": "Province - 7",
                "value": province7count
            }
        ];
        // console.log(province_data);

        status_data = [{
                "name": "Survey",
                "value": survey_count
            },
            {
                "name": "Generation",
                "value": generation_count
            },
            {
                "name": "Operation",
                "value": operation_count
            },
        ];

        capacity_data = [{
                "name": "<=20MW",
                "value": lessthan20
            },
            {
                "name": "20-100MW",
                "value": between20to100
            },
            {
                "name": ">100MW",
                "value": greaterthan100
            }
        ];


        CreateChart(province_data, "graphic");
        CreateChart(capacity_data, "graphic2");
        CreatePie(status_data, isTimeline);


    }


    // console.log(province_data);
    function CreateChart(chart_data, bar_id) {
        data = chart_data.sort(function(a, b) {
            // console.log(d3.ascending(a.value, b.value));
            return d3.descending(a.name, b.name);
        })
        var hig = 75;
        if (bar_id == "graphic") {
            hig = 160;
        }
        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 5,
            right: 25,
            bottom: 5,
            left: 60
        };

        var width = 270 - margin.left - margin.right,
            height = hig - margin.top - margin.bottom;

        var svg = d3.select("#" + bar_id).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .style("margin-top", "30px")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(chart_data, function(d) {
                return d.value;
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .3)
            .domain(chart_data.map(function(d) {
                return d.name;
            }));

        //make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(chart_data)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function(d) {
                return y(d.name);
            })
            .attr("height", y.rangeBand())
            .attr("x", 3)
            .attr("width", function(d) {
                return x(d.value);
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function(d) {
                return y(d.name) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function(d) {
                return x(d.value) + 5;
            })
            .text(function(d) {
                return d.value;
            });

    }
    var isTimeline = false;
    CreateChartData(total_json, isTimeline);
    // PIE CHART EXAMPLE START
    function CreatePie(chart_data, isTimeline) {

        var pie = d3.layout.pie()
            .value(function(d) {
                return d.value
            })
            .sort(null)
            .padAngle(.03);

        var w = 270,
            h = 160;

        var outerRadius = 60;
        var innerRadius = 40;
        var timeout_duration = 1000;
        if (isTimeline == true) {
            timeout_duration = 0;

        }


        var color = d3.scale.ordinal()
            .domain(["Survey", "Generation", "Operation"])
            .range(["#f00", "#4564cc", "#248d24"]);

        var arc = d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        var svg = d3.select("#chart_pie")
            .append("svg")
            .attr({
                width: w,
                height: h
            }).append('g')
            .attr({
                transform: 'translate(89,81)'
            });
        var path = svg.selectAll('path')
            .data(pie(chart_data))
            .enter()
            .append('path')
            .attr({
                d: arc,
                fill: function(d, i) {
                    return color(d.data.name);
                }
            });

        path.transition()
            .duration(timeout_duration)
            .attrTween('d', function(d) {
                var interpolate = d3.interpolate({
                    startAngle: 0,
                    endAngle: 0
                }, d);
                return function(t) {
                    return arc(interpolate(t));
                };
            });


        var restOfTheData = function() {
            var text = svg.selectAll('text')
                .data(pie(chart_data))
                .enter()
                .append("text")
                .transition()
                .duration(timeout_duration)
                .attr("transform", function(d) {
                    return "translate(" + arc.centroid(d) + ")";
                })
                .attr("dy", ".4em")
                .attr("text-anchor", "middle")
                .text(function(d) {
                    return d.data.value;
                })
                .style({
                    fill: 'white',
                    'font-size': '10px'
                });

            var legendRectSize = 10;
            var legendSpacing = 4;
            var legendHeight = legendRectSize + legendSpacing;


            var legend = svg.selectAll('.legend')
                .data(color.domain())
                .enter()
                .append('g')
                .attr({
                    class: 'legend',
                    transform: function(d, i) {
                        //Just a calculation for x & y position
                        return 'translate(77,' + ((i * legendHeight) - 4) + ')';
                    }
                });
            legend.append('rect')
                .attr({
                    width: legendRectSize,
                    height: legendRectSize,
                    rx: 20,
                    ry: 30
                })
                .style({
                    fill: color,
                    stroke: color
                });

            legend.append('text')
                .attr({
                    x: 20,
                    y: 10
                })
                .text(function(d) {
                    return d;
                }).style({
                    fill: 'black',
                    'font-size': '14px'
                });
        };

        setTimeout(restOfTheData, timeout_duration);
    }
    // CreatePie(total_json);
    document.getElementById("the-basics").style.display = "block";


    //PIE CHART END

    //Chart Section End
    var style = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.6)'
        }),
        stroke: new ol.style.Stroke({
            color: '#319FD3',
            width: 1
        }),
        text: new ol.style.Text()
    });
    var featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector(),
        map: map,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#f00',
                width: 1
            }),
            fill: new ol.style.Fill({
                color: 'rgba(22, 166, 150, 0.1)'
            })
        }),
        zIndex: 0
    });
    var highlight;
    var displayFeatureInfo = function(pixel) {

        var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
        });
        if (feature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (feature) {
                featureOverlay.getSource().addFeature(feature);
            }
            highlight = feature;
        }
    }
    // map.on('pointermove', function(evt) {
    //         if (evt.dragging) {
    //           return;
    //         }
    //         var pixel = map.getEventPixel(evt.originalEvent);
    //         displayFeatureInfo(pixel);
    //       });


    map.on('pointermove', function(evt) {
        map.getTargetElement().style.cursor =
            map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
    });


    var total_data_search = jQuery.extend(true, {}, total_json);
    // for(i=0; i>10; i++){
    // console.log(total_data_search.features);
    //}

    // var search_data = [];
    // for(i = total_data_search.features.length-1; i>=0 ;i--){
    // // console.log(total_data_search.features[i].geometry.coordinates);
    // search_data.push({"coordinates":total_data_search.features[i].geometry.coordinates,"name":total_data_search.features[i].properties.project,});
    // }
    // console.log(search_data);

    var search_data = [];
    for (i = 0; i < total_data_search.features.length; i++) {
        // console.log(total_data_search.features[i].geometry.coordinates);
        search_data.push({
            'name': total_data_search.features[i].properties.project,
            'latlng': total_data_search.features[i].geometry.coordinates
        });
        //search_data.push(total_data_search.features[i].properties.project);
    }
    // console.log(search_data);
    // SEARCH BAR ON TOP HYDROPOWER TYPEAHEAD START //


    var substringMatcher = function(strs) {
        // console.log(strs);
        return function findMatches(q, cb) {
            //console.log(q);
            //console.log(cb);

            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, "i");

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                //console.log(strs);
                //console.log(str);
                if (substrRegex.test(str.name)) {
                    //console.log(str);
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

    $('#the-basics .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        //name: 'cities',
        display: 'name',
        source: substringMatcher(search_data),
        templates: {
            suggestion: function(data) {
                return '<p>' + data.name + '<a class="search_latlng" style="display:none;">' + data.latlng + '</a></p>';
            }
        }
    });
    /*.on('typeahead:selected', function(event, selection) {
        
        // the second argument has the info you want
        alert(selection.value);
        
        // clearing the selection requires a typeahead method
        */



    $('.twitter-typeahead').on('click', '.tt-suggestion', function() {
        // console.log($(this).find(".search_latlng").html());
        var string_latlng = $(this).find(".search_latlng").html();
        var string_latlng_array = string_latlng.split(',');
        // console.log(string_latlng_array);
        var lat = parseFloat(string_latlng_array[1]);
        var lon = parseFloat(string_latlng_array[0]);
        // console.log(lat);

        map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(15);
    });

    $(".tt-input").change(function() {
        $(".tt-suggestion:first-child", this).trigger('click');

    });
    $("#the-basics").on('keyup', function(e) {
        if (!($(".tt-suggestion"))) {
            if (e.which == 13) {
                console.log($(".tt-cursor", this));
                $(".tt-highlight", this).trigger('click');
            }
        }
    });

    // //   //SEARCH BAR END //

    $('#clear1').on('click', function() {
        var isTimeline = false;
        CreateChartData(total_json, isTimeline);
        var zoom = map.getView().getZoom();


        if (zoom >= 10) {
            clusters.setSource(hydrosource);
        } else {
            clusters.setSource(clusterSource);
        }
    });
    map.setView(new ol.View({
        center: [9369345.179083776, 3298410.6445619236],
        zoom: 7,
        minZoom: 7
    }));

    $.getJSON("http://hydro.naxa.com.np/api/gis-style/", function(gis_style) {
        $.getJSON("http://hydro.naxa.com.np/api/gislayer/", function(geo_layer) {

            // console.log(geo_layer);
            // console.log(gis_style);
            function loadGisLayer(url, layer_name, layer_id, ) {
                var b = Object.keys(gis_style);
                var result = gis_style.filter(word => word.gislayer == layer_id);

                fillColor_layer = result[0].fillColor; // "#54A2FF"
                Color_layer = result[0].color; // "#FF873B"
                weight_layer = result[0].weight; // 1 
                fillOpacity_layer = result[0].fillOpacity; // "0.2"
                opacity_layer = result[0].opacity; // "1"
                dashArray_layer = result[0].dashArray;

                var countryStyle = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: fillColor_layer
                    }),
                    stroke: new ol.style.Stroke({
                        color: Color_layer,
                        width: weight_layer,
                        lineCap: 'round'
                    })
                });
                // console.log(countryStyle);
                window[layer_name + "_source"] = new ol.source.Vector({
                    'projection': 'EPSG:3857',
                    url: url,
                    // url: static_url+'assets/data/province.geojson',
                    format: new ol.format.GeoJSON()
                });
                window[layer_name] = new ol.layer.Vector({
                    title: "gislayer",
                    source: window[layer_name + "_source"],
                    style: countryStyle

                });
                window[layer_name].setOpacity(fillOpacity_layer);
                // }
                map.addLayer(window[layer_name]);
                window[layer_name].setZIndex(2);
                window[layer_name + "_source"].on('change', function(evt) {
                    var src = evt.target;
                    if (src.getState() === 'ready') {
                        document.getElementById("loader").style.display = "none";
                    }
                });
            }

            $(".layerContainer").html('');
            for (var i = 0; i < geo_layer.length; i++) {
                $(".layerContainer").html($(".layerContainer").html() + '<li>' +
                    '<span><strong>' + geo_layer[i].name + '</strong></span>' +
                    '<label class="switch switch-xxs">' +
                    '<input class="CheckBox loadLayer" value = "' + geo_layer[i].name.replace(" ", "_") + '" name = "' + geo_layer[i].file + '"id = "' + geo_layer[i].id + '" type="checkbox">' +
                    '<span class="slider"></span>' +
                    '</label>' +
                    '</li>'
                )
            }


            $(".loadLayer").one('click', function() {
                //var checkstatus = $(".switch input[type='CheckBox']").attr("checked", true);

                document.getElementById("loader").style.display = "block";


                var url = $(this).attr('name');
                // console.log($(this).attr('value'));
                var layer_name = $(this).attr('value');
                var layer_id = $(this).attr('id');

                //  "0"


                // console.log(layer_name);
                // console.log(layer_id);
                loadGisLayer(url, layer_name, layer_id);

            });
            //console.log(gis_layer);

            $(".CheckBox").on("change", function() {
                var layer_name = $(this).attr('value');
                var layer_id = $(this).attr('id');
                // console.log($(this).is(':checked'));
                //if(window[layer_name].getVisible() == false){
                if ($(this).is(':checked') == true) {
                    window[layer_name].setVisible(true);
                } else {
                    window[layer_name].setVisible(false);
                }
            });
            //console.log(gislayer);
        });
    });
    
    //geo_layer end

    $('#form-car_v1').appendTo('#main-container');

    $('.sidebar.sm-sidebar.sb-top-left .nav-tabs li').on('click', function() {
        $('.sidebar.sm-sidebar.sb-top-left').toggleClass('autowidth');
    })

    var tabwidth = $(window).width();

    if (tabwidth <= 1024) {
        $('body').removeClass('overflow-off');
    };


});
//Ready Function END