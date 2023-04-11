if ($network.wifi.ssid === 'Slotheve' ) {
  $done({servers:$network.dns})
  const 方式 = System
} else {
  $done({})
  const 方式 = Custom
}

$notification.post(`DNS → ${方式}`, ``, ``);

$done();
