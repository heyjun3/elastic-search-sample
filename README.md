# elastic-search-sample


##  セットアップ

elasticsearchが立ち上がらないのでメモリマップの最大数を変更する。

```
sudo sysctl -w vm.max_map_count=262144
```

環境変数をいい感じに変更する。
```
cp .env.example .env
```

docker compose でコンテナ起動する。

```
docker compose up -d
```

証明書コピー

```
docker compose cp es01:/usr/share/elasticsearch/config/certs/ca/ca.crt ./
```

動作確認
```
curl https://localhost:9200/search-test --cacert ca.crt -H "Authorization: ApiKey "${API_KEY}"" -H "Content-Type: application/json"
```