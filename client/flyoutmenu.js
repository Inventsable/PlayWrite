var csInterface = new CSInterface();

var menuXML = '<Menu> \
  <MenuItem Id="refresh" Label="Refresh panel" Enabled="true" Checked="false"/> \
  <MenuItem Id="run" Label="Run Script" Enabled="true" Checked="false"/> \
  \
  <MenuItem Label="---" /> \
  \
</Menu>';

csInterface.setPanelFlyoutMenu(menuXML);
csInterface.addEventListener("com.adobe.csxs.events.flyoutMenuClicked", setPanelCallback);

function setPanelCallback(event) {
  if (event.data.menuId == "refresh") {
    location.reload();
} else if (event.data.menuId == "run") {
    runScript();
  } else {
    console.log(`Nothing happened.`);
  }
}
