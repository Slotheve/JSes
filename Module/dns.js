const dns_module_home = 'WiFi DNS';
const dns_module_out = 'Cellular DNS';
const home = $network.wifi.ssid === 'Slotheve-5G' || $network.wifi.ssid === 'Slotheve-2.4G';
 
function getModuleStatus() {
  return new Promise((resolve) => {
    $httpAPI('GET', 'v1/modules', null, (data) => {
      let enabled = data.enabled;
      resolve([enabled.includes(dns_module_home), enabled.includes(dns_module_out)]);
    });
  });
}
 
const switchModule = (enable_module_name, disable_module_name) => {
  $httpAPI('POST', 'v1/modules', {
    [enable_module_name]: true,
    [disable_module_name]: false,
  }, () => $done());
}
 
getModuleStatus().then((module_status) => {
  if (home && (!module_status[0] || module_status[1])) {
    $notification.post('WiFi DNS', '', '')
    switchModule(dns_module_home, dns_module_out);
  } else if (!home && (module_status[0] || !module_status[1])) {
    $notification.post('数据 DNS', '', '')
    switchModule(dns_module_out, dns_module_home);
  } else {
    $done();
  }
})