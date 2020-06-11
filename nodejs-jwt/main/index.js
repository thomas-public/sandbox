const jwt = require("./jwt");
const fs = require("fs");
const privateKey = fs.readFileSync("../../certs/keys/device.pri.pem");
const cert = fs.readFileSync("../../certs/certs/rootca_device.crt.pem");

( async ()=>
{
    console.log(privateKey);
    const params =
    {
        "accountUid" : "560930208264656452f585941a54ea98",
        "userUid" : "a5069a7a4c5bcc64610a23b829ab0219"
    }
    const token = jwt.sign( privateKey, params);
    console.log(token);

    const decodec = jwt.verify(cert, token);
    console.log(decodec);

})();