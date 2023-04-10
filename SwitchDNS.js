if ($network.wifi.ssid === 'Slotheve' ) {
$notification.post(`dns → system`, "" ,"");
$done({servers:$network.dns})
} else {
$notification.post(`dns → cunstom`, "" ,"");
$done({})
}
