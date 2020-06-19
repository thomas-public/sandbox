### generate RSA private keys
# mkdir keys
# openssl genrsa -out keys/rootca.pri.pem 2048
# openssl genrsa -out keys/server.pri.pem 2048
# openssl genrsa -out keys/device.pri.pem 2048
# openssl genrsa -out keys/client.pri.pem 2048
# openssl rsa -in keys/rootca.pri.pem -pubout > keys/rootca.pub.pem
# openssl rsa -in keys/server.pri.pem -pubout > keys/server.pub.pem
# openssl rsa -in keys/device.pri.pem -pubout > keys/device.pub.pem
# openssl rsa -in keys/client.pri.pem -pubout > keys/client.pub.pem

# ### generate certificates
# mkdir certs
# ### sign rootca
# openssl req -new -x509 -config openssl.cnf -key keys/rootca.pri.pem -days 36524 -sha256 -out certs/rootca.crt.pem -subj "/C=TW/O=TEST ORG/OU=TEST ORG UNIT/CN=TEST ROOTCA"
# echo `openssl x509 -noout -fingerprint -sha256 -in certs/rootca.crt.pem | cut -d= -f2 | sed 's/\://g' | tr '[:upper:]' '[:lower:]'` > certs/rootca.crt.id

# ### sign rootca verification cert
# openssl req -new -key keys/server.pri.pem -out certs/rootca_verify.csr.pem -subj "/CN=8cbfebb2fa981210bbb7b4ee365ec90f4e98a4ef0e7cf301657481a252949b42"
# openssl x509 -req -in certs/rootca_verify.csr.pem -CA certs/rootca.crt.pem -CAkey keys/rootca.pri.pem -CAcreateserial -out certs/rootca_verify.crt.pem -days 36524 -sha256

# ### sign device cert by rootca cert
# openssl req -new -key keys/device.pri.pem -out certs/rootca_device.csr.pem -subj "/C=TW/O=TEST ORG/OU=TEST ORG UNIT/CN=thomas_rootca_jit_provisioning_dev-apn1"
# openssl x509 -req -extfile openssl.cnf -extensions client_cert -sha256 -days 36524 -in certs/rootca_device.csr.pem -CA certs/rootca.crt.pem -CAkey keys/rootca.pri.pem -CAcreateserial -out certs/rootca_device.crt.pem
# echo `openssl x509 -noout -fingerprint -sha256 -in certs/rootca_device.crt.pem | cut -d= -f2 | sed 's/\://g' | tr '[:upper:]' '[:lower:]'` > certs/rootca_device.crt.id
# cat certs/rootca.crt.pem >> certs/rootca_device.crt.pem

# ### sign server by rootca cert
# openssl req -new -key keys/server.pri.pem -out certs/server.csr.pem -subj "/C=TW/O=TEST ORG/OU=TEST ORG UNIT/CN=TEST SERVER"
# openssl x509 -req -extfile openssl.cnf -extensions server_cert -sha256 -days 36524 -in certs/server.csr.pem -CA certs/rootca.crt.pem -CAkey keys/rootca.pri.pem -CAcreateserial -out certs/server.crt.pem
# echo `openssl x509 -noout -fingerprint -sha256 -in certs/server.crt.pem | cut -d= -f2 | sed 's/\://g' | tr '[:upper:]' '[:lower:]'` > certs/server.crt.id

# ### sign server verification cert
# openssl req -new -key keys/server.pri.pem -out certs/server_verify.csr.pem -subj "/CN=8cbfebb2fa981210bbb7b4ee365ec90f4e98a4ef0e7cf301657481a252949b42"
# openssl x509 -req -in certs/server_verify.csr.pem -CA certs/server.crt.pem -CAkey keys/server.pri.pem -CAcreateserial -out certs/server_verify.crt.pem -days 36524 -sha256

# ### sign device cert by server cert
# openssl req -new -key keys/device.pri.pem -out certs/server_device.csr.pem -subj "/C=TW/O=TEST ORG/OU=TEST ORG UNIT/CN=thomas_server_jit_provisioning_dev-apn1"
# openssl x509 -req -in certs/server_device.csr.pem -CA certs/server.crt.pem -CAkey keys/server.pri.pem -CAcreateserial -out certs/server_device.crt.pem -days 36524 -sha256
# echo `openssl x509 -noout -fingerprint -sha256 -in certs/server_device.crt.pem | cut -d= -f2 | sed 's/\://g' | tr '[:upper:]' '[:lower:]'` > certs/server_device.crt.id
# cat certs/server.crt.pem >> certs/server_device.crt.pem
# cat certs/rootca.crt.pem >> certs/server_device.crt.pem

# ### verify certificate ###
# openssl verify -CAfile certs/rootca.crt.pem certs/server.crt.pem
# openssl verify -CAfile certs/rootca.crt.pem certs/rootca_device.crt.pem
# openssl verify -CAfile certs/server.crt.pem certs/rootca_device.crt.pem
# echo "===> server.crt.pem verify rootca_device.crt.pem FAILED!!!"
# echo "===> attach rootca certificate to server certificate"
# cat certs/rootca.crt.pem >> certs/server.crt.pem
# openssl verify -CAfile certs/server.crt.pem certs/rootca_device.crt.pem
# echo "===> server.crt.pem verify rootca_device.crt.pem PASSED!!!"

echo "====> gen cert DOME"