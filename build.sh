npm run build:h5
echo ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/pszx-zzgx-h5:$1
docker build -t ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/pszx-zzgx-h5:$1 .
docker push ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/pszx-zzgx-h5:$1
echo ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/pszx-zzgx-h5:$