#!/bin/bash

# A script to clean up some of the data that's in our Redis database.

# One of 9301's submissions included the whole URL as their ID.
#
# > KEYS "response:9301*"
# 1) "response:9301"
# 2) "response:9301 <https://parenthood.herokuapp.com/partner-iat.html?id=9301>"
#
# > HKEYS "response:9301 <https://parenthood.herokuapp.com/partner-iat.html?id=9301>"
# 1) "992"
#
# > HGET "response:9301 <https://parenthood.herokuapp.com/partner-iat.html?id=9301>" "992"

echo "fixing 9301"
data_9301_992=`redis-cli HGET "response:9301 <https://parenthood.herokuapp.com/partner-iat.html?id=9301>" "992"`
redis-cli HSET "response:9301" "992" "$data_9301_992"
redis-cli HDEL "response:9301 <https://parenthood.herokuapp.com/partner-iat.html?id=9301>" "992"

# 15002 also has *15002 <url>*.
#
# > KEYS "response:*15002*"
# 1) "response:*15002*  <https://parenthood.herokuapp.com/partner-iat.html?id=15002>"
# 2) "response:15002"
#
# > HKEYS "response:*15002*  <https://parenthood.herokuapp.com/partner-iat.html?id=15002>"
# 1) "1599"

echo "fixing 15002"
data_15002_1599=`redis-cli HGET "response:*15002*  <https://parenthood.herokuapp.com/partner-iat.html?id=15002>" "1599"`
redis-cli HSET "response:15002" "1599" "$data_15002_1599"
redis-cli HDEL "response:*15002*  <https://parenthood.herokuapp.com/partner-iat.html?id=15002>" "1599"

# "13301" also has "13301?".
# None with the "?" have response data, so ignore it.

redis-cli HDEL "response:601" "694"

redis-cli HDEL "response:15002" "1296"
redis-cli HDEL "response:15002" "2103"

redis-cli HDEL "response:15801" "1597"

redis-cli HDEL "response:22101" "4163"

redis-cli HDEL "response:11802" "784"

redis-cli HDEL "response:301" "220"
redis-cli HDEL "response:301" "223"
redis-cli HDEL "response:302" "221"
redis-cli HDEL "response:302" "233"
redis-cli HDEL "response:302" "234"

redis-cli HDEL "response:15302" "1077"

redis-cli HDEL "response:9002" "1117"

redis-cli HDEL "response:12401" "1416"

redis-cli HDEL "response:21901" "2857"
