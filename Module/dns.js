const ssid = "Slotheve-5G";
const name = "DNS";
let home = $network.wifi.ssid === ssid;

const getModuleStatus = new Promise((resolve) => {
  $httpAPI("GET", "v1/modules", null, (data) =>
      resolve(data.enabled.includes(name))
  );
});

getModuleStatus.then((enabled) => {
  if (home && !enabled) {
    $notification.post("Event", `开启${name}模块`, "");
    enableModule(true);
  } else if (!home && enabled) {
    $notification.post("Event", `关闭${name}模块`, "");
    enableModule(false);
  } else {
    $done({});
  }
});

function enableModule(status) {
  $httpAPI("POST", "v1/modules", { [name]: status }, () => $done());
}