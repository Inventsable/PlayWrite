// ArtboardCenterAroundSelectedPaths.jsx
// works with CS5
// http://forums.adobe.com/thread/1336506?tstart=0
// (title: script to align selected objects to artboard)
// quick & dirty, all selected items will be centered at the active artboard
// (include clipping paths  !visible result can be different)

// regards pixxxelschubser  19.Nov. 2013

var aDoc = app.activeDocument;
var Sel = aDoc.selection;

if (Sel.length >0 ) {
    var abIdx = aDoc.artboards.getActiveArtboardIndex();
    var actAbBds = aDoc.artboards[abIdx].artboardRect;

    var vBounds = Sel[0].visibleBounds;
    vBounds_Li = vBounds[0];
    vBounds_Ob = vBounds[1];
    vBounds_Re = vBounds[2];
    vBounds_Un = vBounds[3];

if (Sel.length > 1) {
    for (var i = 1; i < Sel.length; i++) {
        vBdsI = Sel[i].visibleBounds;
        if( vBounds_Li > vBdsI[0] ) {vBounds_Li = vBdsI[0]};
        if( vBounds_Ob < vBdsI[1] ) {vBounds_Ob = vBdsI[1]};
        if( vBounds_Re < vBdsI[2] ) {vBounds_Re = vBdsI[2]};
        if( vBounds_Un > vBdsI[3] ) {vBounds_Un = vBdsI[3]};
        }

    aDoc.artboards[abIdx].artboardRect = [vBounds_Li +((vBounds_Re - vBounds_Li)/2-(actAbBds[2]-actAbBds[0])/2), vBounds_Ob -((vBounds_Ob - vBounds_Un)/2+(actAbBds[3]-actAbBds[1])/2), vBounds_Li +((vBounds_Re - vBounds_Li)/2-(actAbBds[2]-actAbBds[0])/2)+(actAbBds[2]-actAbBds[0]), vBounds_Ob -((vBounds_Ob - vBounds_Un)/2+(actAbBds[3]-actAbBds[1])/2)+(actAbBds[3]-actAbBds[1])];
    }
} else {
  alert ("No selection");
}
