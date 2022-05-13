if ($network.wifi.ssid === 'Slotheve-5G' || $network.wifi.ssid === 'Slotheve-2.4G') {
$done({servers:$network.dns})
} else {
$done({})
}