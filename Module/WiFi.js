const WIFI_DONT_NEED_PROXYS = ['Slotheve-5G'];
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

$done();
