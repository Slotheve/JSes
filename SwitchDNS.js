if ($network.wifi.ssid === 'Slotheve' ) {
  $done({servers:$network.dns})
  方式 = 'System'
} else {
  $done({})
  方式 = 'Custom'
}

$notification.post(`DNS → ${方式}`, ``, ``);

$done();
