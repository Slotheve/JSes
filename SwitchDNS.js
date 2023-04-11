const wifi = 'Slotheve';
const current_wifi_ssid = 'current_wifi_ssid';

function wifiChanged() {
  const changed = current_wifi_ssid !== $network.wifi.ssid;
  changed && $persistentStore.write($network.wifi.ssid, current_wifi_ssid);
  return changed;
}

if (wifiChanged()) {
  const 方式 = wifi.includes($network.wifi.ssid)
    ? 'System'
    : 'Cunstom';
  $notification.post(`DNS → ${方式}`, ``, ``);
  $done({servers:$network.dns})
}
