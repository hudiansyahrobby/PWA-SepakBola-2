const webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BIM_I6uR9U_5-uyooscxmiwMy__CwFrwIp5ySy-wSMf11g9ykGn97dcM5VtZtCHsd-IMqSA1iLz4XEauWN5xa6Y",
  privateKey: "Sc2US0hkcLr1_ggQDs9lxhz7rAWOG7UboIMFIcA03O4",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/eks4eQcTDOA:APA91bFuYQOQ8eNF_oR2gXi3-nhaEVMpkgBKuGVqQFyL_XE9v5p1jtXOcNiRPMFskf88pUf0HK-xfIM8wL3raEEqMt62GhM-9dAGp8sT22wCeUkkTux8E4GQpLaIP1YvOnQ9szrfJqQS",
  keys: {
    p256dh:
      "BKGiV4SEbCJHXf8uJiftzp2AX6rXZ2zhzfIgCTMuCy9/RvD3nUUGhwO0RJkwM5xuTDdQ4zIfLB2NECihJyaMJ+8=",
    auth: "XHgAAgo70ezWWEFyBROXKw==",
  },
};
const payload = "Open Your InFootball App now, Read your Favorite Teams";

const options = {
  gcmAPIKey: "1035187836516",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
