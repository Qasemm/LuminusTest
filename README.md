# LuminusTest

## System requirements
you only need to have docker installed.

## Installation and operation
- clone the repository.
- ```sh $ cd LuminusTest```
- ```sh $ docker-compose up```

- ```sh $ docker ps```

- copy the container ID of luminustest_db_1

- ```sh $ docker inspect container_id  | grep "IPAddress"```

- copy the IP address into "LuminusTest/app/src/config/mysql.js" in the host key in the config object.

- go to ```localhost:5000```
