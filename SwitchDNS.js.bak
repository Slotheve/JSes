const WIFI_DONT_NEED_PROXYS = ['Slotheve'];
const CURRENT_WIFI_SSID_KEY = 'current_wifi_ssid';

if (wifiChanged()) {
  const mode = WIFI_DONT_NEED_PROXYS.includes($network.wifi.ssid)
    ? 'direct'
    : 'rule';
  const 模式 = WIFI_DONT_NEED_PROXYS.includes($network.wifi.ssid)
    ? '直连'
    : '规则';
  $surge.setOutboundMode(mode);
  $notification.post(`出站 → ${模式}`, ``, ``);
}

function wifiChanged() {
  const currentWifiSSid = $persistentStore.read(CURRENT_WIFI_SSID_KEY);
  const changed = currentWifiSSid !== $network.wifi.ssid;
  changed && $persistentStore.write($network.wifi.ssid, CURRENT_WIFI_SSID_KEY);
  return changed;
}

const ssid = "Slotheve";
const name = "RewriteDNS";
let home = ($network.wifi.ssid === ssid);

const getModuleStatus = new Promise((resolve) => {
  $httpAPI("GET", "v1/modules", null, (data) =>
	  resolve(data.enabled.includes(name))
  );
});

getModuleStatus.then((enabled) => {
  if (home && enabled) {
	$notification.post(`关 ${name} 模块`, "" ,"");
	enableModule(false);
  } else if (!home && !enabled) {
	$notification.post(`开 ${name} 模块`, "" ,"");
	enableModule(true);
  } else {
	$done();
  }
});

function enableModule(status) {
  $httpAPI("POST", "v1/modules", { [name]: status }, () => $done());
}

$done();
