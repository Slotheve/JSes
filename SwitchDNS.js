if ($network.wifi.ssid === 'Slotheve' ) {
$done({servers:$network.dns})
} else {
$done({})
}
