if ($network.wifi.ssid === 'Slotheve' ) {
  $done({servers:$network.dns})
} else {
  $done({servers:'223.5.5.5'})
}
