const ssid1 = "Slotheve-5G";
const ssid2 = "Slotheve-2.4G";
const name = "WiFi-DNS";
let home = ($network.wifi.ssid === ssid1) || ($network.wifi.ssid === ssid2);

const getModuleStatus = new Promise((resolve) => {
  $httpAPI("GET", "v1/modules", null, (data) => {
      let enabled = data.enabled;
	  resolve(enabled.includes(name))
  });
});

getModuleStatus.then((enabled) => {
  if (home && enabled) {
	$notification.post(`关 ${name} 模块`, "" ,"");
	enableModule(false);
  } else if (!home && !enabled) {
	$notification.post(`开 ${name} 模块`, "" ,"");
	enableModule(true);
  } else {
	$done({});
  }
});

function enableModule(status) {
  $httpAPI("POST", "v1/modules", { [name]: status }, () => $done());
}