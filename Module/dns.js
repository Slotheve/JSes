const DNS = 'WiFi-DNS';
const home = $network.wifi.ssid === 'Slotheve-5G' || $network.wifi.ssid === 'Slotheve-2.4G';
 
function getModuleStatus() {
  return new Promise((resolve) => {
    $httpAPI('GET', 'v1/modules', null, (data) => {
      let enabled = data.enabled;
      resolve(enabled.includes(DNS));
    });
  });
}
 
const switchModule = (enable_module, disable_module) => {
  $httpAPI('POST', 'v1/modules', {
    [enable_module]: true,
    [disable_module]: false,
  }, () => $done());
}

getModuleStatus().then((module_status) => {
  if (home && (!module_status[0] || module_status[1])) {
    $notification.post('关 DNS模块', '', '')
    switchModule(DNS);
  } else if (!home && (module_status[0] || !module_status[1])) {
    $notification.post('开 DNS模块', '', '')
    switchModule(DNS);
  } else {
    $done();
  }
})